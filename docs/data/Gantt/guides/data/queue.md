# Using Project queue

Older approach to synchronize project changes between clients using CRUD Manager allowed us to use simpler
assumption that every change to the project could not be interrupted. It allowed us to not worry about data
changing in the background. But requirement to support more responsive project and live updates made that
assumption obsolete. With `applyProjectChanges` API it became possible to change data interrupting current
user actions and breaking expectations of the State Tracking Manager.

In this guide we're covering new concept of the project queue, which can be thought of as consequent,
uninterruptible transactions.

## Problem

Assume there are two clients working on the same project at once and sending changes to each other. Such
change can arrive at get applied at an arbitrary moment. If first client is typing task name into cell editor
and project receives changes from another client with a new name for the same task, first client changes will
be lost. And not only that, but view would also be updated and current value of the input field will be
changed. With CRUD Manager last client to send his changes would _win_. With live editing, first one to send
changes _wins_.

Another problem would be undo/redo support. How can we tell which change is made by the current user and
which isn't?

## Solution

To solve this problem we decided to use popular idea of transactions. It allows to have some boundaries to
tell individual sets of changes apart. It would allow us to solve above problems:
    
1. When user starts actively changing the data (editing record, dragging it around, etc.) we can start such
transaction and combine actions into a set, unaffected by other changes.
2. Incoming changes do not affect the view if user is actively doing something. View itself is not suspended,
user's changes may cause refresh. But incoming changes will only be displayed when user becomes inactive.
3. We know boundaries to perform correct undo operations.
4. When user is only viewing the data, he may observe changes made by other clients.

## How it works

We achieve this functionality by creating a chain of promises. You can think of it as of queue working by
FIFO principle. You can queue functions which are going to be executed when all previously scheduled
promises are settled (either resolved or rejected). It means rejected promise (or async function which
triggered exception) will not break the queue.

When using queue be aware of possible deadlocks. If you put on a queue a promise which does not resolve,
queue will be halted. We will cover that in more details below.

By default, this behavior is disabled. You can enable it by setting `enableTransactionalFeatures` config on
a target component (SchedulerPro or Gantt) to `true`. When enabled, this config will change behavior of
features to wrap their work into transactions. For example, when you start dragging an event transaction
will start and will pause queue until drag is finished.

When using queue you're in charge of the STM and project calculation. We do not automatically wrap queue
steps into STM transactions and do not call extra project calculation.

## Using queue

### Basics

To put some work on a queue you need to pass a function (we will call it a *step*) to a queue method which
returns a promise:

```javascript
// step can be empty
await project.queue(() => {});

// ...or synchronous
await project.queue(() => project.taskStore.getById(1).name = 'foo');

// ...or asynchronous
await project.queue(async () => {
    project.taskStore.getById(1).duration = 1;
    await project.commitAsync();
    project.taskStore.getById(2).duration = 2;
    await project.commitAsync();
});
```

You can chain more promises to a queue call, but those will be executed in its own order and may overlap
with steps:

```javascript
await project.queue(() => console.log(1))
await project.queue(() => console.log(2))
// logs: 1, 2

// this will log: 1, 2, 3, 4
await project.queue(() => console.log(1)).then(() => console.log(2));
await project.queue(() => console.log(3)).then(() => console.log(4));

// however, if you create a chain of promises and don't await for them order might be
// other than you expect. this one would log: 1, 2, 4, 3, 5, 6
project.queue(() => console.log(1)).then(() => console.log(2)).then(() => console.log(3));
project.queue(() => console.log(4)).then(() => console.log(5)).then(() => console.log(6));

// if you want specific order you should wrap entire promise chain to a step
// this will log: 1, 2, 3, 4, 5, 6
project.queue(() => {
    return new Promise(resolve => {
        console.log(1);
        resolve();
    }).then(() => console.log(2)).then(() => console.log(3));
});
project.queue(() => {
    return new Promise(resolve => {
        console.log(4);
        resolve();
    }).then(() => console.log(5)).then(() => console.log(6));
});
```

Step only runs once, when queue gets to it. Let's see how execution flows:

```javascript
async function test() {
    console.log(1)

    // this will schedule a microtask
    const step1 = project.queue(() => console.log(2))

    // this will execute synchronously
    console.log(3)
    
    // here we put new step on the queue and await the queue
    // by extension it will also await for step1
    await project.queue(() => console.log(4))
}

test() // logs: 1, 3, 2, 4
```

Features using queue will handle STM transaction recordings, but if you call queue on your own you may want
to record transaction manually:

```javascript
await project.queue(async () => {
    const { stm } = project;

    // Stop previous auto-recorded transaction
    if (stm.isRecording) {
        stm.stopTransaction();
    }
    
    stm.startTransaction();
    
    // change project
    
    await project.commitAsync();
    
    stm.stopTransaction();
});
```

Auto-recorded STM will start transaction on any change and will stop it after delay. In this case it is
enough to stop transaction:

```javascript
await project.queue(async () => {
    const { stm } = project;
    
    // Stop previous auto-recorded transaction
    if (stm.isRecording) {
        stm.stopTransaction();
    }
    
    // change project
    
    await project.commitAsync();
    
    // Optionally stop current transaction. If you don't - other changes may get into it
    stm.stopTransaction();
});
```

### Handling errors

You can handle step exceptions like you normally do with promises:

```javascript
await project.queue(() => {
    throw new Error('Error');
}).catch(err => {
    console.log(err.message); // logs: Error
});

// Despite the exception you can continue using queue
await project.queue(() => console.log('queue is unblocked')); // logs: queue is unblocked
```

### Avoiding deadlocks

Promise may never get resolved and block the queue. To avoid deadlocks you need to make sure every step
eventually resolves

```javascript
// This is a deadlock
await project.queue(() => {
    // Queue is currently running first step which depends on the 2nd step.
    // Such promise will never resolve
    return project.queue(() => console.log(1));
});

// This is a deadlock too
await project.queue(() => {
    return new Promise(resolve => {
        // Let's assume you have a conditional expression which unintentionally
        // always resolves to false
        if (false) {
            resolve();
        }
    });
});

// As well as this
await project.queue(async () => {
    await Promise.all([
        project.queue(() => console.log(2)),
        Promise.resolve()
    ]);
});

// But this is NOT a deadlock
await project.queue(async () => {
    console.log(1);
    
    // We added a step to queue, but Promise.race will resolve anyway, unblock the queue
    // and eventually log 2 to the console
    await Promise.race([
        project.queue(() => console.log(2)),
        new Promise(resolve => setTimeout(resolve, 100))
    ])
});
```

At the same time it is absolutely valid to call queue within a step. Just make sure you do not wait for this
promise to resolve:

```javascript
let step2;

await project.queue(() => {
    // We only schedule a promise here, we can store it to a variable and await later
    step2 = project.queue(() => console.log(1));
});

await step2;

// Or you can just wait for next queue step
await project.queue(() => {
    project.queue(() => console.log(2));
});

// This will work because we waited for the 1st step to resolve. 1st step added 2nd step
// and quit before promise got resolved. This call adds 3rd step to a queue
await project.queue(() => console.log(3)); // this will log 2, 3
```


### Actual usage

Our understanding is that queue would be mostly used working with  `applyProjectChanges` API to sync
changes between projects. Likely via websocket connection.

For demo purposes we will assume both projects are running on the same page and target project is used in
the Gantt view. Below is prerequisite code which sets up two identical projects and awaits for initial
calculation:

```javascript
const sourceProject = new ProjectModel({ /* config */ });
const targetProject = new ProjectModel({ /* config */ });

await Promise.all([sourceProject.commitAsync(), targetProject.commitAsync()])
```

Now we can modify one project and move changes to another:

```javascript
await sourceProject.taskStore.getById(1).setDuration(1);

// This will apply duration change
await targetProject.applyProjectChanges(sourceProject.changes);
```

This code may execute while user is creating new dependency and move task. To avoid confusion and allow
user to finish his action we need to wrap this into a queue step:

```javascript
await sourceProject.taskStore.getById(1).setDuration(1);

// This will apply duration change
await targetProject.queue(() => targetProject.applyProjectChanges(sourceProject.changes));
```


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>