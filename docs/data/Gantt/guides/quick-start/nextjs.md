# Getting started with Bryntum Gantt in Next.js

This quick start guide will show you how to build a basic Bryntum Gantt in a Next.js TypeScript application using the [Next.js getting started guide](https://nextjs.org/docs/getting-started/installation) as a starting point.

You can also take a shortcut and start with our [Bryntum Gantt Next.js with TypeScript starter template](https://github.com/bryntum/bryntum-gantt-nextjs-quick-start) that we'll create in this guide. The starter template uses Next.js version 14.1 and the [app router](https://nextjs.org/docs/app), which uses [server components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) by default.
We'll also show you how to persist your data to a database.  

## Requirements

Next.js version 14.1 requires [Node.js 18.17](https://nodejs.org/) or higher. Bryntum Gantt requires React `16.0.0` or higher and TypeScript `3.6.0` or higher for applications written in TypeScript.

## Getting started

To get started, we'll follow these steps to create a basic Bryntum Gantt Next.js app:

1. Setup a Next.js application.
2. Install the Bryntum Gantt component.
3. Create a Bryntum Gantt component.
4. Run the application.

The basic Bryntum Gantt starter template that we'll build will look like this:

<img src="Gantt/getting-started-nextjs-result.png" class="b-screenshot" alt="Getting Started on Bryntum Gantt with Next.js Result">

## Setup a Next.js application

We'll use the [Next.js getting started guide](https://nextjs.org/docs/getting-started/installation) to create a Next.js application. Next.js recommends using `create-next-app` to create a new Next.js app as it sets everything up for you, automatically. Create a Next.js application by running the following command:

```shell
npx create-next-app@latest
```

You'll see multiple prompts. To follow along with this guide, choose the following options:

```shell
What is your project named? bryntum-gantt
Would you like to use TypeScript? No / Yes ✔️
Would you like to use ESLint? No / Yes ✔️
Would you like to use Tailwind CSS? No ✔️ / Yes
Would you like to use `src/` directory? No / Yes ✔️
Would you like to use App Router? (recommended) No / Yes ✔️
Would you like to customize the default import alias (@/*)? No ✔️ / Yes
```

After you've selected your answers for the prompt questions, `create-next-app` will create a folder with your project name and install the dependencies. 

Change your current working directory to the new Next.js project directory:

```shell
cd bryntum-gantt
```

## Install the Bryntum Gantt component

Installing the Bryntum Gantt component using npm is the quickest way to use our products. First, get access to the Bryntum private npm registry by following the [guide in our docs](#Gantt/guides/npm-repository.md#repository-access). Once you’ve logged in to the registry, install the Bryntum Gantt component packages:

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

The application configuration may add a caret "^" as a prefix of the dependencies version in your `package.json` file. We recommend removing the caret character as a version prefix so that you have full control over package updates.

## Create a Bryntum Gantt component

Let's start by creating a config file called `ganttConfig.ts` in the `src/` folder. Add the following lines of code to it:
 
```typescript
import { BryntumGanttProps } from "@bryntum/gantt-react";

const ganttConfig: BryntumGanttProps = {
  columns: [{ type: "name", field: "name", width: 250 }],
  viewPreset: "weekAndDayLetter",
  barMargin: 10,
};
export { ganttConfig };
```

This object will be used for configuration of the Bryntum Gantt component.

Next, we'll create a Bryntum Gantt React component. Create a `components` folder in the `src` folder. Create a file called `Gantt.tsx` in the `src/components/` folder. Add the following lines of code to it:

```typescript
"use client";

import { BryntumGantt } from "@bryntum/gantt-react";
import { useEffect, useRef, useState } from "react";

export default function Gantt({ ...props }) {
  const [projectConfig] = useState({
    transport: {
      load: {
        url: "data/data.json",
      },
    },
    autoLoad: true,
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production.
    validateResponse: true,
  });
  const ganttRef = useRef<BryntumGantt>(null);

  useEffect(() => {
    // Bryntum Gantt instance
    const gantt = ganttRef?.current?.instance;
  }, []);

  return <BryntumGantt {...props} ref={ganttRef} project={projectConfig} />;
}
```

The Gantt component is a React [client component](https://nextjs.org/docs/app/building-your-application/rendering/client-components) as it uses the "use client" directive at the top of the file.

The Bryntum Gantt project configuration has a [built-in CrudManager](#Gantt/model/ProjectModel#built-in-crudmanager) that's used for loading example JSON data. The project configuration is stored in a React state variable to keep the same `projectConfig` object between re-renders.

The code in the useEffect hook setup function shows you how to access the Bryntum Gantt instance.

The example data loaded from the `data.json` file is the [project data](#Gantt/guides/data/project_data.md).

Let's create the file for the example data. In the `public` folder, create a folder called `data`. In the `data` folder, create a file called `data.json` and add the following JSON object to it:

```json
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

We need to create a wrapper component for the Bryntum Gantt React component to render on the client only. In the `components` folder, create a file called `GanttWrapper.tsx` and add the following lines of code to it:

```typescript
import dynamic from "next/dynamic";
import { ganttConfig } from "../ganttConfig";

const Gantt = dynamic(() => import("./Gantt"), {
  ssr: false,
  loading: () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  },
});

const GanttWrapper = () => {
  return <Gantt {...ganttConfig} />;
};
export { GanttWrapper };
```

The Bryntum Gantt React component is [dynamically imported](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic) with server-side rendering (`ssr`) set to `false`. This is done to prevent the Bryntum Gantt React client component from being pre-rendered on the server as Bryntum components are client-side only.

Next, replace the code in the `src/app/page.tsx` file with the following lines of code:

```typescript
import { GanttWrapper } from "@/components/GanttWrapper";
import "@bryntum/gantt/gantt.stockholm.css";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <GanttWrapper />
    </main>
  );
}
```

We imported the CSS styles for the Bryntum Gantt Stockholm theme, which is one of five available themes.

### Styling

To style the Bryntum Gantt so that it takes up the whole page, replace the styles in the `src/app/globals.css` file with the following styles:

```css
body,
html {
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Poppins, "Open Sans", Helvetica, Arial, sans-serif;
  font-size: 14px;
}
```

In the `src/app/page.module.css` file, replace the styles with the following style for the `<main>` HTML tag:

```css
.main {
  height: 100%;
}
```

You can learn more about styling your Bryntum Gantt in our [style guide](#Gantt/guides/customization/styling.md). 

## Run the application

Run the local development server:

```shell
npm run dev
```
 
You'll see the Bryntum Gantt app at the URL [http://localhost:3000](http://localhost:3000/).

## Persisting data to a database

Now that you have the client-side Bryntum Gantt up and running, you can adjust your Gantt configuration and add some server-side code to get data from and persist data changes to a database.

There are three ways of populating Bryntum Gantt project data stores:

- [Using a project transport](#Gantt/guides/integration/react/data-binding.md#using-project-transport).
- [Binding existing data to the component](#Gantt/guides/integration/react/data-binding.md#binding-existing-data-to-the-component).
- [Binding existing data to the project](#Gantt/guides/integration/react/data-binding.md#binding-existing-data-to-the-project).

The Next.js starter template uses a project transport, which is the simplest way of connecting to a server. You can set your Next.js API route to load data from the [`loadUrl`](#Scheduler/crud/AbstractCrudManagerMixin#config-loadUrl). Use the [`syncUrl`](#Gantt/guides/data/crud_manager_project.md#gantt-stores) to set the Next.js API route to sync data changes to the server. All changes are sent to the `syncUrl` as a single POST request.

To use a project transport, the data sent back from your Next.js API routes must have specific [load](#Gantt/guides/data/crud_manager_project.md#load-response-structure) and [sync](#Gantt/guides/data/crud_manager_project.md#sync-response-structure) response structures. 

For a detailed explanation of how to get your data from and persist it to a database using a project transport and Next.js API routes, take a look at our blog post [Creating a Bryntum Gantt chart with React, TypeScript, Prisma, and SQLite: Remix vs. Next.js](https://bryntum.com/blog/creating-a-bryntum-gantt-chart-with-react-typescript-prisma-and-sqlite-remix-vs-next-js/). 

See an example of binding existing data to a component using a Next.js API route in our blog post [Create a scheduler with Bryntum using Next.js, Prisma, SQLite, and GraphQL](https://bryntum.com/blog/create-a-scheduler-using-bryntum-next-js-prisma-sqlite-and-graphql/). 

From Next.js version 14, you can use [server actions and mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) instead of API routes in your Bryntum Gantt client component to persist data changes to a database. You can use the [dataChange event](#Scheduler/guides/integration/react/events.md#using-datachange-event-to-synchronize-data) to listen for store changes so that you can sync data changes using server actions as shown in the example code below:

```typescript
  const syncData = ({ store, action, records }) => {
    // Call your server actions here
    if (store.id === "resources") {
      if (action === "add") {
        //...
      }
      //...
    };
  };

  return (
    <BryntumGantt 
      {...props} 
      ref={ganttRef} 
      onDataChange={syncData} 
    />
  )
```

## What to do next?

Take a look at our [guide to using Bryntum Gantt with React](#Gantt/guides/quick-start/react.md) to learn about the following topics and more: 

- Using TypeScript.
- Rendering React components in column cells, tooltips, and widgets.
- Adding features like the [ExcelExporter](#Grid/feature/experimental/ExcelExporter).
- Using Bryntum Gantt CSS themes.

## Troubleshooting

If you get stuck, take a look at our [guide to troubleshooting Bryntum Gantt with React](#Gantt/guides/integration/react/troubleshooting.md). If you find any errors in our docs or guides, please report them in [our forums](https://forum.bryntum.com/).


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>