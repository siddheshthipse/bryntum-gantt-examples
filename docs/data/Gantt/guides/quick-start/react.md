# Getting Started with Bryntum Gantt in React

## Try React demos

Bryntum Gantt is delivered with a variety of React demo applications showing its functionality.
All demo applications have been verified to be compatible with Node.js 20.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/gantt/examples/?framework=react" class="b-card"><i class="fas b-fa-globe"></i>View online React demos</a>
<a href="#Gantt/guides/integration/react/guide.md#build-and-run-local-demos" class="b-card"><i class="fab b-fa-react">
</i>Build and run React demos</a>
</div>

## Requirements

Bryntum Gantt requires React `16.0.0` or higher,
and for applications written in TypeScript, TypeScript `3.6.0` or higher.

## Get Started

In this guide we will explain how to get started if you are using [vitejs.org guide](https://vitejs.dev/guide).

To get started, the broad steps are as follows:

1. [Access to npm registry](##access-to-npm-registry)
2. [Project setup](##project-setup)
3. [Create Gantt Application](##create-gantt-application)
4. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the illustration below:

<img src="Gantt/getting-started-result-react-cra.png" class="b-screenshot" alt="Getting Started on Bryntum Gantt with React Result">

## Access to npm registry

Please refer to this [guide for Bryntum NPM repository access](#Gantt/guides/npm-repository.md).

## Project setup

There are many possible ways of creating and building React applications. Let’s use
[React Vite guide](https://vitejs.dev/guide), which has proven to offer higher efficiency and better performance in
development.

If you are using **javascript only**, please type:

```shell
npm create vite@latest bryntum-gantt-app -- --template react
```

or if you prefer using **typescript**:

```shell
npm create vite@latest bryntum-gantt-app -- --template react-ts
```

Please feel free to change `bryntum-gantt-app` to your preferred application name

Once the template is created, install the node modules:

```shell
cd bryntum-gantt-app
npm install && npm install sass
```

### Install Bryntum Gantt packages

Now that our project has been setup successfully, it's time for us to install Bryntum Gantt package into it so that
we can access the Bryntum features. From your terminal, you can install the following Bryntum Gantt packages:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```shell
npm install @bryntum/gantt@npm:@bryntum/gantt-trial @bryntum/gantt-react
```

</div>
<div>

```shell
npm install @bryntum/gantt @bryntum/gantt-react
```
</div>
</div>

<div class="note">

Note: Ensure that you have configured your npm properly to get access to the Bryntum packages. If not, refer to <a href="#Gantt/guides/npm-repository.md">this guide</a>.

</div>

### Dependencies

The application configuration may add a caret `^` as a prefix of dependencies version. We recommend not to use the caret
character as a version prefix to take upgrades fully under control. If necessary, please check the generated
**package.json** file and replace `dependencies` and `devDependencies` by the following:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```json
"dependencies": {
  "@bryntum/gantt": "npm:@bryntum/gantt-trial@5.6.11",
  "@bryntum/gantt-react": "5.6.11",
  "react": "18.2.0",
  "react-dom": "18.2.0"
},
"devDependencies": {
  "@types/react": "~18.2.14",
  "@types/react-dom": "~18.2.6",
  "@vitejs/plugin-react": "~4.0.1",
  "postinstall": "~0.7.4",
  "sass": "~1.69.6",
  "typescript": "~5.1.6",
  "vite": "~4.4.5"
}
```

</div>
<div>

```json
"dependencies": {
  "@bryntum/gantt": "5.6.11",
  "@bryntum/gantt-react": "5.6.11",
  "react": "18.2.0",
  "react-dom": "18.2.0"
},
"devDependencies": {
  "@types/react": "~18.2.14",
  "@types/react-dom": "~18.2.6",
  "@vitejs/plugin-react": "~4.0.1",
  "postinstall": "~0.7.4",
  "sass": "~1.69.6",
  "typescript": "~5.1.6",
  "vite": "~4.4.5"
}
```
</div>
</div>

<div class="note">

Note: The version of React above is not mandatory and is used here only for the purpose of the example. Please
adjust the dependencies according to your development requirement.

</div>

### Vite Configuration

When using Vite to run a Bryntum application in development mode, in order to fix loading bundles multiple times, it is
recommended to include Bryntum packages in the [optimizeDeps](https://vitejs.dev/config/dep-optimization-options.html)
in **vite.config.js**.
Please follow [this guide](#Gantt/guides/integration/react/troubleshooting.md#vite-application) for more
configuration information.

## Create Gantt Application

Now that your project has been setup, let's start with creating a config file in the `src`, which will have Gantt configuration.

<div class="docs-tabs" data-name="Gantt">
<div>
    <a>GanttConfig.js</a>
    <a>GanttConfig.ts</a>
</div>
<div>

```javascript
const ganttConfig = {
    columns    : [{ type : 'name', field : 'name', width : 250 }],
    viewPreset : 'weekAndDayLetter',
    barMargin  : 10,

    project : {
        transport : {
            load : {
                url : 'data.json'
            }
        },
        autoLoad : true
    }
};

export { ganttConfig };
```

</div>
<div>

```typescript
import { GanttConfig } from "@bryntum/gantt";

const ganttConfig: Partial<GanttConfig> = {
  columns: [{ type: "name", field: "name", width: 250 }],
  viewPreset: "weekAndDayLetter",
  barMargin: 10,

  project: {
    transport: {
      load: {
        url: "data.json",
      },
    },
    autoLoad: true,
  },
};

export { ganttConfig };
```
</div>
</div>

With that, add the following content to `public/data.json`.
```javascript
{
    "success": true,
    "project": {
      "calendar": "general",
      "startDate": "2022-03-14",
      "hoursPerDay": 24,
      "daysPerWeek": 5,
      "daysPerMonth": 20
    },
    "calendars": {
      "rows": [
        {
          "id": "general",
          "name": "General",
          "intervals": [
            {
              "recurrentStartDate": "on Sat at 0:00",
              "recurrentEndDate": "on Mon at 0:00",
              "isWorking": false
            }
          ],
          "expanded": true,
          "children": [
            {
              "id": "business",
              "name": "Business",
              "intervals": [
                {
                  "recurrentStartDate": "every weekday at 12:00",
                  "recurrentEndDate": "every weekday at 13:00",
                  "isWorking": false
                },
                {
                  "recurrentStartDate": "every weekday at 17:00",
                  "recurrentEndDate": "every weekday at 08:00",
                  "isWorking": false
                }
              ]
            },
            {
              "id": "night",
              "name": "Night shift",
              "intervals": [
                {
                  "recurrentStartDate": "every weekday at 6:00",
                  "recurrentEndDate": "every weekday at 22:00",
                  "isWorking": false
                }
              ]
            }
          ]
        }
      ]
    },
    "tasks": {
      "rows": [
        {
          "id": 1000,
          "name": "Launch SaaS Product",
          "percentDone": 50,
          "startDate": "2022-03-14",
          "expanded": true,
          "children": [
            {
              "id": 1,
              "name": "Setup web server",
              "percentDone": 50,
              "duration": 10,
              "startDate": "2022-03-14",
              "rollup": true,
              "endDate": "2022-03-23",
              "expanded": true,
              "children": [
                {
                  "id": 11,
                  "name": "Install Apache",
                  "percentDone": 50,
                  "startDate": "2022-03-14",
                  "rollup": true,
                  "duration": 3,
                  "color": "teal",
                  "endDate": "2022-03-17",
                  "cost": 200,
                  "baselines": [
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-16T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-16T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-16T23:00:00"
                    }
                  ]
                },
                {
                  "id": 12,
                  "name": "Configure firewall",
                  "percentDone": 50,
                  "startDate": "2022-03-14",
                  "rollup": true,
                  "duration": 3,
                  "endDate": "2022-03-17",
                  "showInTimeline": true,
                  "cost": 1000,
                  "baselines": [
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-16T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-16T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-16T23:00:00"
                    }
                  ]
                },
                {
                  "id": 13,
                  "name": "Setup load balancer",
                  "percentDone": 50,
                  "startDate": "2022-03-14",
                  "rollup": true,
                  "duration": 3,
                  "endDate": "2022-03-17",
                  "cost": 1200,
                  "baselines": [
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-16T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-16T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-16T23:00:00"
                    }
                  ]
                },
                {
                  "id": 14,
                  "name": "Configure ports",
                  "percentDone": 50,
                  "startDate": "2022-03-14",
                  "rollup": true,
                  "duration": 2,
                  "endDate": "2022-03-16",
                  "cost": 750,
                  "baselines": [
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-15T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-15T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-15T23:00:00"
                    }
                  ]
                },
                {
                  "id": 15,
                  "name": "Run tests",
                  "percentDone": 0,
                  "startDate": "2022-03-21",
                  "rollup": true,
                  "duration": 2,
                  "endDate": "2022-03-23",
                  "cost": 5000,
                  "baselines": [
                    {
                      "startDate": "2022-03-20T23:00:00",
                      "endDate": "2022-03-22T23:00:00"
                    },
                    {
                      "startDate": "2022-03-20T23:00:00",
                      "endDate": "2022-03-22T23:00:00"
                    },
                    {
                      "startDate": "2022-03-20T23:00:00",
                      "endDate": "2022-03-22T23:00:00"
                    }
                  ]
                }
              ],
              "baselines": [
                {
                  "startDate": "2022-03-13T23:00:00",
                  "endDate": "2022-03-22T23:00:00"
                },
                {
                  "startDate": "2022-03-13T23:00:00",
                  "endDate": "2022-03-22T23:00:00"
                },
                {
                  "startDate": "2022-03-13T23:00:00",
                  "endDate": "2022-03-22T23:00:00"
                }
              ]
            },
            {
              "id": 2,
              "name": "Website Design",
              "percentDone": 60,
              "startDate": "2022-03-23",
              "rollup": true,
              "endDate": "2022-04-13",
              "expanded": true,
              "children": [
                {
                  "id": 21,
                  "name": "Contact designers",
                  "percentDone": 70,
                  "startDate": "2022-03-23",
                  "rollup": true,
                  "duration": 5,
                  "endDate": "2022-03-30",
                  "cost": 500,
                  "baselines": [
                    {
                      "startDate": "2022-03-22T23:00:00",
                      "endDate": "2022-03-25T23:00:00"
                    },
                    {
                      "startDate": "2022-03-22T23:00:00",
                      "endDate": "2022-03-28T23:00:00"
                    },
                    {
                      "startDate": "2022-03-22T23:00:00",
                      "endDate": "2022-03-29T23:00:00"
                    }
                  ]
                },
                {
                  "id": 22,
                  "name": "Create shortlist of three designers",
                  "percentDone": 60,
                  "startDate": "2022-03-30",
                  "rollup": true,
                  "duration": 1,
                  "endDate": "2022-03-31",
                  "cost": 1000,
                  "baselines": [
                    {
                      "startDate": "2022-03-27T23:00:00",
                      "endDate": "2022-03-28T23:00:00"
                    },
                    {
                      "startDate": "2022-03-28T23:00:00",
                      "endDate": "2022-03-29T23:00:00"
                    },
                    {
                      "startDate": "2022-03-29T23:00:00",
                      "endDate": "2022-03-30T23:00:00"
                    }
                  ]
                },
                {
                  "id": 23,
                  "name": "Select & review final design",
                  "percentDone": 50,
                  "startDate": "2022-03-31",
                  "rollup": true,
                  "duration": 2,
                  "showInTimeline": true,
                  "endDate": "2022-04-02",
                  "cost": 1000,
                  "baselines": [
                    {
                      "startDate": "2022-03-28T23:00:00",
                      "endDate": "2022-03-30T23:00:00"
                    },
                    {
                      "startDate": "2022-03-29T23:00:00",
                      "endDate": "2022-03-31T23:00:00"
                    },
                    {
                      "startDate": "2022-03-30T23:00:00",
                      "endDate": "2022-04-01T23:00:00"
                    }
                  ]
                },
                {
                  "id": 24,
                  "name": "Inform management about decision",
                  "percentDone": 100,
                  "startDate": "2022-04-04",
                  "rollup": true,
                  "duration": 0,
                  "cost": 500,
                  "baselines": [
                    {
                      "startDate": "2022-03-30T23:00:00",
                      "endDate": "2022-03-30T23:00:00"
                    },
                    {
                      "startDate": "2022-03-31T23:00:00",
                      "endDate": "2022-03-31T23:00:00"
                    },
                    {
                      "startDate": "2022-04-01T23:00:00",
                      "endDate": "2022-04-01T23:00:00"
                    }
                  ]
                },
                {
                  "id": 25,
                  "name": "Apply design to web site",
                  "percentDone": 0,
                  "startDate": "2022-04-04",
                  "rollup": true,
                  "duration": 7,
                  "endDate": "2022-04-13",
                  "cost": 11000,
                  "baselines": [
                    {
                      "startDate": "2022-03-30T23:00:00",
                      "endDate": "2022-04-08T23:00:00"
                    },
                    {
                      "startDate": "2022-03-31T23:00:00",
                      "endDate": "2022-04-11T23:00:00"
                    },
                    {
                      "startDate": "2022-04-03T23:00:00",
                      "endDate": "2022-04-12T23:00:00"
                    }
                  ]
                }
              ],
              "baselines": [
                {
                  "startDate": "2022-03-22T23:00:00",
                  "endDate": "2022-04-08T23:00:00"
                },
                {
                  "startDate": "2022-03-22T23:00:00",
                  "endDate": "2022-04-11T23:00:00"
                },
                {
                  "startDate": "2022-03-22T23:00:00",
                  "endDate": "2022-04-12T23:00:00"
                }
              ]
            },
            {
              "id": 3,
              "name": "Setup Test Strategy",
              "percentDone": 20,
              "startDate": "2022-03-14",
              "expanded": true,
              "children": [
                {
                  "id": 31,
                  "name": "Hire QA staff",
                  "percentDone": 40,
                  "startDate": "2022-03-14",
                  "duration": 5,
                  "endDate": "2022-03-19",
                  "cost": 6000,
                  "baselines": [
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-18T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-18T23:00:00"
                    },
                    {
                      "startDate": "2022-03-13T23:00:00",
                      "endDate": "2022-03-18T23:00:00"
                    }
                  ]
                },
                {
                  "id": 33,
                  "name": "Write test specs",
                  "percentDone": 9,
                  "duration": 5,
                  "startDate": "2022-03-21",
                  "expanded": true,
                  "children": [
                    {
                      "id": 331,
                      "name": "Unit tests",
                      "percentDone": 20,
                      "startDate": "2022-03-21",
                      "duration": 10,
                      "endDate": "2022-04-02",
                      "showInTimeline": true,
                      "cost": 7000,
                      "baselines": [
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-04-01T23:00:00"
                        },
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-04-01T23:00:00"
                        },
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-04-01T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 332,
                      "name": "UI unit tests / individual screens",
                      "percentDone": 10,
                      "startDate": "2022-03-21",
                      "duration": 5,
                      "endDate": "2022-03-26",
                      "showInTimeline": true,
                      "cost": 5000,
                      "baselines": [
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-03-25T23:00:00"
                        },
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-03-25T23:00:00"
                        },
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-03-25T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 333,
                      "name": "Application tests",
                      "percentDone": 0,
                      "startDate": "2022-03-21",
                      "duration": 10,
                      "endDate": "2022-04-02",
                      "cost": 2500,
                      "baselines": [
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-04-01T23:00:00"
                        },
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-04-01T23:00:00"
                        },
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-04-01T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 334,
                      "name": "Monkey tests",
                      "percentDone": 0,
                      "startDate": "2022-03-21",
                      "duration": 1,
                      "endDate": "2022-03-22",
                      "cost": 250,
                      "baselines": [
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-03-21T23:00:00"
                        },
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-03-21T23:00:00"
                        },
                        {
                          "startDate": "2022-03-20T23:00:00",
                          "endDate": "2022-03-21T23:00:00"
                        }
                      ]
                    }
                  ],
                  "endDate": "2022-04-02",
                  "baselines": [
                    {
                      "startDate": "2022-03-20T23:00:00",
                      "endDate": "2022-04-01T23:00:00"
                    },
                    {
                      "startDate": "2022-03-20T23:00:00",
                      "endDate": "2022-04-01T23:00:00"
                    },
                    {
                      "startDate": "2022-03-20T23:00:00",
                      "endDate": "2022-04-01T23:00:00"
                    }
                  ]
                }
              ],
              "endDate": "2022-04-02",
              "baselines": [
                {
                  "startDate": "2022-03-13T23:00:00",
                  "endDate": "2022-04-01T23:00:00"
                },
                {
                  "startDate": "2022-03-13T23:00:00",
                  "endDate": "2022-04-01T23:00:00"
                },
                {
                  "startDate": "2022-03-13T23:00:00",
                  "endDate": "2022-04-01T23:00:00"
                }
              ]
            },
            {
              "id": 4,
              "name": "Application Implementation",
              "percentDone": 60,
              "startDate": "2022-04-04",
              "expanded": true,
              "children": [
                {
                  "id": 400,
                  "name": "Phase #1",
                  "expanded": true,
                  "children": [
                    {
                      "id": 41,
                      "name": "Authentication module",
                      "percentDone": 100,
                      "duration": 5,
                      "startDate": "2022-04-04",
                      "endDate": "2022-04-09",
                      "cost": 8000,
                      "baselines": [
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-08T23:00:00"
                        },
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-08T23:00:00"
                        },
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-08T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 42,
                      "name": "Single sign on",
                      "percentDone": 100,
                      "duration": 3,
                      "startDate": "2022-04-04",
                      "endDate": "2022-04-07",
                      "cost": 4700,
                      "baselines": [
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-06T23:00:00"
                        },
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-06T23:00:00"
                        },
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-06T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 43,
                      "name": "Implement role based access",
                      "percentDone": 0,
                      "duration": 4,
                      "startDate": "2022-04-04",
                      "endDate": "2022-04-08",
                      "cost": 5800,
                      "baselines": [
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-07T23:00:00"
                        },
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-07T23:00:00"
                        },
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-07T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 44,
                      "name": "Basic test coverage",
                      "showInTimeline": true,
                      "percentDone": 0,
                      "duration": 3,
                      "startDate": "2022-04-04",
                      "endDate": "2022-04-07",
                      "cost": 7000,
                      "baselines": [
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-06T23:00:00"
                        },
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-06T23:00:00"
                        },
                        {
                          "startDate": "2022-04-03T23:00:00",
                          "endDate": "2022-04-06T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 45,
                      "name": "Verify high test coverage",
                      "percentDone": 0,
                      "duration": 2,
                      "startDate": "2022-04-11",
                      "endDate": "2022-04-13",
                      "cost": 16000,
                      "baselines": [
                        {
                          "startDate": "2022-04-11",
                          "endDate": "2022-04-13"
                        },
                        {
                          "startDate": "2022-04-11",
                          "endDate": "2022-04-13"
                        },
                        {
                          "startDate": "2022-04-11",
                          "endDate": "2022-04-13"
                        }
                      ]
                    },
                    {
                      "id": 46,
                      "name": "Make backup",
                      "percentDone": 0,
                      "duration": 0,
                      "startDate": "2022-04-13",
                      "endDate": "2022-04-13",
                      "showInTimeline": true,
                      "rollup": true,
                      "cost": 500,
                      "baselines": [
                        {
                          "startDate": "2022-04-11",
                          "endDate": "2022-04-11"
                        },
                        {
                          "startDate": "2022-04-12",
                          "endDate": "2022-04-12"
                        },
                        {
                          "startDate": "2022-04-13",
                          "endDate": "2022-04-13"
                        }
                      ]
                    }
                  ],
                  "startDate": "2022-04-04",
                  "endDate": "2022-04-09",
                  "baselines": [
                    {
                      "startDate": "2022-04-03T23:00:00",
                      "endDate": "2022-04-08T23:00:00"
                    },
                    {
                      "startDate": "2022-04-03T23:00:00",
                      "endDate": "2022-04-08T23:00:00"
                    },
                    {
                      "startDate": "2022-04-03T23:00:00",
                      "endDate": "2022-04-08T23:00:00"
                    }
                  ]
                },
                {
                  "id": 401,
                  "name": "Phase #2",
                  "expanded": true,
                  "children": [
                    {
                      "id": 4011,
                      "name": "Authentication module",
                      "percentDone": 70,
                      "duration": 15,
                      "startDate": "2022-04-11",
                      "endDate": "2022-05-02",
                      "cost": 1200,
                      "baselines": [
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-05-01T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-05-01T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-05-01T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 4012,
                      "name": "Single sign on",
                      "percentDone": 60,
                      "duration": 5,
                      "startDate": "2022-04-11",
                      "endDate": "2022-04-16",
                      "cost": 2500,
                      "baselines": [
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-04-15T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-04-15T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-04-15T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 4013,
                      "name": "Implement role based access",
                      "percentDone": 50,
                      "duration": 21,
                      "startDate": "2022-04-11",
                      "endDate": "2022-05-12",
                      "cost": 4100,
                      "baselines": [
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-05-11T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-05-11T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-05-11T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 4014,
                      "name": "Basic test coverage",
                      "percentDone": 0,
                      "duration": 20,
                      "startDate": "2022-04-11",
                      "endDate": "2022-05-09",
                      "cost": 1100,
                      "baselines": [
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-05-08T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-05-08T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-05-08T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 4015,
                      "name": "Verify high test coverage",
                      "percentDone": 0,
                      "duration": 4,
                      "startDate": "2022-04-11",
                      "endDate": "2022-04-15",
                      "cost": 3000,
                      "baselines": [
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-04-14T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-04-14T23:00:00"
                        },
                        {
                          "startDate": "2022-04-10T23:00:00",
                          "endDate": "2022-04-14T23:00:00"
                        }
                      ]
                    }
                  ],
                  "startDate": "2022-04-11",
                  "endDate": "2022-05-12",
                  "baselines": [
                    {
                      "startDate": "2022-04-10T23:00:00",
                      "endDate": "2022-05-11T23:00:00"
                    },
                    {
                      "startDate": "2022-04-10T23:00:00",
                      "endDate": "2022-05-11T23:00:00"
                    },
                    {
                      "startDate": "2022-04-10T23:00:00",
                      "endDate": "2022-05-11T23:00:00"
                    }
                  ]
                },
                {
                  "id": 402,
                  "name": "Acceptance phase",
                  "expanded": true,
                  "children": [
                    {
                      "id": 4031,
                      "name": "Company bug bash",
                      "percentDone": 70,
                      "duration": 3,
                      "startDate": "2022-05-12",
                      "endDate": "2022-05-15",
                      "cost": 10000,
                      "baselines": [
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-14T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-14T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-14T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 4032,
                      "name": "Test all web pages",
                      "percentDone": 60,
                      "duration": 2,
                      "startDate": "2022-05-12",
                      "endDate": "2022-05-14",
                      "cost": 5000,
                      "baselines": [
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-13T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-13T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-13T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 4033,
                      "name": "Verify no broken links",
                      "percentDone": 50,
                      "duration": 4,
                      "startDate": "2022-05-12",
                      "endDate": "2022-05-16",
                      "cost": 1000,
                      "baselines": [
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-15T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-15T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-15T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 4034,
                      "name": "Make test release",
                      "percentDone": 0,
                      "duration": 3,
                      "startDate": "2022-05-12",
                      "endDate": "2022-05-15",
                      "cost": 1200,
                      "baselines": [
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-14T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-14T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-14T23:00:00"
                        }
                      ]
                    },
                    {
                      "id": 4035,
                      "name": "Send invitation email",
                      "percentDone": 0,
                      "duration": 0,
                      "startDate": "2022-05-15",
                      "endDate": "2022-05-16",
                      "cost": 250,
                      "baselines": [
                        {
                          "startDate": "2022-05-14T23:00:00",
                          "endDate": "2022-05-14T23:00:00"
                        },
                        {
                          "startDate": "2022-05-13T00:00:00",
                          "endDate": "2022-05-13T00:00:00"
                        },
                        {
                          "startDate": "2022-05-12T00:00:00",
                          "endDate": "2022-05-12T00:00:00"
                        }
                      ]
                    },
                    {
                      "id": 4036,
                      "name": "Celebrate launch",
                      "iconCls": "b-fa b-fa-glass-cheers",
                      "percentDone": 0,
                      "duration": 1,
                      "startDate": "2022-05-12",
                      "endDate": "2022-05-13",
                      "cost": 2500,
                      "baselines": [
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-12T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-12T23:00:00"
                        },
                        {
                          "startDate": "2022-05-11T23:00:00",
                          "endDate": "2022-05-12T23:00:00"
                        }
                      ]
                    }
                  ],
                  "startDate": "2022-05-12",
                  "endDate": "2022-05-16",
                  "baselines": [
                    {
                      "startDate": "2022-05-11T23:00:00",
                      "endDate": "2022-05-15T23:00:00"
                    },
                    {
                      "startDate": "2022-05-11T23:00:00",
                      "endDate": "2022-05-15T23:00:00"
                    },
                    {
                      "startDate": "2022-05-11T23:00:00",
                      "endDate": "2022-05-15T23:00:00"
                    }
                  ]
                }
              ],
              "endDate": "2022-05-16",
              "baselines": [
                {
                  "startDate": "2022-04-03T23:00:00",
                  "endDate": "2022-05-15T23:00:00"
                },
                {
                  "startDate": "2022-04-03T23:00:00",
                  "endDate": "2022-05-15T23:00:00"
                },
                {
                  "startDate": "2022-04-03T23:00:00",
                  "endDate": "2022-05-15T23:00:00"
                }
              ]
            }
          ],
          "endDate": "2022-05-16",
          "baselines": [
            {
              "startDate": "2022-03-13T23:00:00",
              "endDate": "2022-05-15T23:00:00"
            },
            {
              "startDate": "2022-03-13T23:00:00",
              "endDate": "2022-05-15T23:00:00"
            },
            {
              "startDate": "2022-03-13T23:00:00",
              "endDate": "2022-05-15T23:00:00"
            }
          ]
        }
      ]
    },
    "dependencies": {
      "rows": [
        {
          "id": 1,
          "fromTask": 11,
          "toTask": 15,
          "lag": 2
        },
        {
          "id": 2,
          "fromTask": 12,
          "toTask": 15
        },
        {
          "id": 3,
          "fromTask": 13,
          "toTask": 15
        },
        {
          "id": 4,
          "fromTask": 14,
          "toTask": 15
        },
        {
          "id": 5,
          "fromTask": 15,
          "toTask": 21
        },
        {
          "id": 7,
          "fromTask": 21,
          "toTask": 22
        },
        {
          "id": 8,
          "fromTask": 22,
          "toTask": 23
        },
        {
          "id": 9,
          "fromTask": 23,
          "toTask": 24
        },
        {
          "id": 10,
          "fromTask": 24,
          "toTask": 25
        },
        {
          "id": 11,
          "fromTask": 31,
          "toTask": 331
        },
        {
          "id": 111,
          "fromTask": 31,
          "toTask": 332
        },
        {
          "id": 112,
          "fromTask": 31,
          "toTask": 333
        },
        {
          "id": 113,
          "fromTask": 31,
          "toTask": 334
        },
        {
          "id": 12,
          "fromTask": 400,
          "toTask": 401
        },
        {
          "id": 13,
          "fromTask": 401,
          "toTask": 402
        },
        {
          "id": 15,
          "fromTask": 3,
          "toTask": 4
        },
        {
          "id": 16,
          "fromTask": 41,
          "toTask": 45
        },
        {
          "id": 17,
          "fromTask": 42,
          "toTask": 45
        },
        {
          "id": 18,
          "fromTask": 43,
          "toTask": 45
        },
        {
          "id": 19,
          "fromTask": 44,
          "toTask": 45
        },
        {
          "id": 20,
          "fromTask": 4034,
          "toTask": 4035
        }
      ]
    },
    "resources": {
      "rows": [
        {
          "id": 1,
          "name": "Celia",
          "city": "Barcelona",
          "calendar": null,
          "image": "celia.jpg"
        },
        {
          "id": 2,
          "name": "Lee",
          "city": "London",
          "calendar": null,
          "image": "lee.jpg"
        },
        {
          "id": 3,
          "name": "Macy",
          "city": "New York",
          "calendar": null,
          "image": "macy.jpg"
        },
        {
          "id": 4,
          "name": "Madison",
          "city": "Barcelona",
          "calendar": null,
          "image": "madison.jpg"
        },
        {
          "id": 5,
          "name": "Rob",
          "city": "Rome",
          "calendar": "business",
          "image": "rob.jpg"
        },
        {
          "id": 6,
          "name": "Dave",
          "city": "Barcelona",
          "calendar": "night",
          "image": "dave.jpg"
        },
        {
          "id": 7,
          "name": "Dan",
          "city": "London",
          "calendar": "night",
          "image": "dan.jpg"
        },
        {
          "id": 8,
          "name": "George",
          "city": "New York",
          "calendar": null,
          "image": "george.jpg"
        },
        {
          "id": 9,
          "name": "Gloria",
          "city": "Rome",
          "calendar": null,
          "image": "gloria.jpg"
        },
        {
          "id": 10,
          "name": "Henrik",
          "city": "London",
          "calendar": null,
          "image": "henrik.jpg"
        }
      ]
    },
    "assignments": {
      "rows": [
        {
          "id": 1,
          "event": 11,
          "resource": 1
        },
        {
          "id": 2,
          "event": 4033,
          "resource": 1
        },
        {
          "id": 3,
          "event": 12,
          "resource": 9
        },
        {
          "id": 4,
          "event": 13,
          "resource": 2
        },
        {
          "id": 5,
          "event": 13,
          "resource": 3
        },
        {
          "id": 6,
          "event": 13,
          "resource": 6
        },
        {
          "id": 7,
          "event": 13,
          "resource": 7
        },
        {
          "id": 8,
          "event": 13,
          "resource": 8
        },
        {
          "id": 9,
          "event": 21,
          "resource": 5
        },
        {
          "id": 10,
          "event": 21,
          "resource": 9
        },
        {
          "id": 11,
          "event": 22,
          "resource": 8
        },
        {
          "id": 12,
          "event": 25,
          "resource": 3
        }
      ]
    },
    "timeRanges": {
      "rows": [
        {
          "id": 1,
          "name": "Important date",
          "startDate": "2022-03-30",
          "duration": 0,
          "durationUnit": "d",
          "cls": "b-fa b-fa-diamond"
        }
      ]
    }
  }
```

Next is to replace your `App.jsx` or `App.tsx` with the following code:

<div class="docs-tabs" data-name="App">
<div>
    <a>App.jsx</a>
    <a>App.tsx</a>
</div>
<div>

```javascript
import { BryntumGantt } from "@bryntum/gantt-react";
import { ganttConfig } from "./GanttConfig";
import "./App.scss";

function App() {
  return <BryntumGantt {...ganttConfig} />;
}

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/gantt/docs/guide/Gantt/integration/react/data-binding

export default App;
```

</div>
<div>

```typescript
import { FunctionComponent, useRef } from "react";
import { BryntumGantt } from "@bryntum/gantt-react";
import { ganttConfig } from "./GanttConfig";
import "./App.scss";

const App: FunctionComponent = () => {
  const gantt = useRef<BryntumGantt>(null);

  return <BryntumGantt ref={gantt} {...ganttConfig} />;
};

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/gantt/docs/guide/Gantt/integration/react/data-binding

export default App;
```
</div>
</div>

This will setup your Gantt, but you need to apply some styling to it.

### Styling

To ensure there is no unexpected styling, delete the `index.css` file and also remove it from the `main.jsx` or `main.tsx`.

Next, rename the `App.css` file to `App.scss` and replace it with the following:

```scss
// import bryntum theme
@import "@bryntum/gantt/gantt.stockholm.css";

// Giving our gantt some height
#root {
  height: 100vh;
}
```

## Run Application

Run application development server:

```shell
npm run dev
```

Your application is now available under [http://localhost:5173](http://localhost:5173) in your browser.

Happy coding!

## Next.js guide

If you're looking for a guide on how to use Gantt with Next.js, we have a [blog post](https://bryntum.com/blog/creating-a-gantt-chart-with-react-using-next-js/) that covers the topic. You can also checkout [this boilerplate](https://github.com/bryntum/gantt-chart-nextjs-starter) used in the blog post.

## Troubleshooting

Please refer to this [Troubleshooting guide](#Gantt/guides/integration/react/troubleshooting.md).

## What to do next?

### Further on integration with React

Do you want to know more about how Bryntum Gantt integrates with react and start to customize your application? We
provide you with a [complete React guide here](#Gantt/guides/integration/react/guide.md).

### Learn about Data

[Data Binding Guide](#Gantt/guides/integration/react/data-binding.md) explains how data can be bound to the component.

Bryntum components often use multiple collections and entities.

The [Data guide](#Gantt/guides/data/project_data.md) explains how they all fit together.



<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>