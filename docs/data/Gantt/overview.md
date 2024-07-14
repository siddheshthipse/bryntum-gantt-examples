[//]: # (Links in this document only works when viewed in the documentation browser, surf to ./docs)

# Bryntum Gantt

## What is Bryntum Gantt?

Welcome to Bryntum Gantt - the most **reliable** and **feature-complete** JavaScript Gantt chart component.

For more general information on our Gantt product, please read on. This documentation provides you with everything you
need to get started.

If you are excited to have a go now, we suggest you to start with one of our **quick start guides** below:

<div class="framework-logos">
<a href="#Gantt/guides/quick-start/react.md"><img src="Core/logo/react.svg" alt="React"><span>React</span></a>
<a href="#Gantt/guides/quick-start/angular.md"><img src="Core/logo/angular.svg" alt="Angular"><span>Angular</span></a>
<a href="#Gantt/guides/quick-start/vue-3.md"><img src="Core/logo/vue.svg" alt="Vue"><span>Vue</span></a>
<a href="#Gantt/guides/quick-start/javascript.md"><img src="Core/logo/js.svg" alt="Vanilla JS"><span>Vanilla JS</span></a>
<a href="#Gantt/guides/quick-start/salesforce.md"><img src="Core/logo/salesforce.svg" alt="Salesforce"><span>Salesforce</span></a>
</div>

Bryntum Gantt chart offers a wide range of features, such as:
* <a target="_blank" href="#Gantt/guides/data/project_data.md">Scheduling tasks using dependencies and constraints</a>
* <a target="_blank"  href="#Gantt/guides/basics/calendars.md">Leveraging calendars for projects, tasks, and resources</a>
* <a target="_blank" href="#../engine/gantt_events_scheduling.md">Using recurrent and fixed time intervals</a>
* <a target="_blank" href="#Gantt/guides/customization/styling.md">Customizing rendering and styling</a>
* <a target="_blank" href="#Grid/guides/basics/columns.md">Customizing user Experience through many different column types</a> & <a target="_blank" href="#Gantt/guides/customization/taskedit.md">task editors</a>
* <a target="_blank" href="../examples/bigdataset/">Dealing with extensive data sets</a> and <a target="_blank" href="#Gantt/guides/build-production.md#performance-optimization">performance tuning</a>
* and more...

## Live demo

Try out some of the Bryntum Gantt features with the Live demo below.

<div class="external-example" data-file="Gantt/guides/readme/intro.js"></div>

To get a complete view of Bryntum Gantt Component capabilities, please read topic-specific guides from the menu and
visit our [API documentation](#Gantt/view/Gantt) and [examples browser](../examples).

## Integration

Bryntum Gantt runs in all modern browsers (Chrome, Firefox, Safari, and modern Edge), whatever is your target technology.

You can use Bryntum Gantt out of the box or integrate it with the frameworks of your choice and many third-party solutions. Visit the integration section of our documentation for further details:
* <a href="#Gantt/guides/integration/react/guide.md">React <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/react.svg" alt="React"></a>
* <a href="#Gantt/guides/integration/angular/guide.md">Angular <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/angular.svg" alt="Angular"></a>
* <a href="#Gantt/guides/integration/vue/guide.md">Vue <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/vue.svg" alt="Vue"></a>
* <a href="#Gantt/guides/integration/ionic/guide.md">Ionic <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/ionic.svg" alt="Ionic"></a>
* <a href="#Gantt/guides/integration/nodejs.md">Node.JS <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/nodejs.svg" alt="Node.js"></a>
* <a href="#Gantt/guides/integration/sharepoint.md">Sharepoint <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/sharepoint.svg" alt="Sharepoint"></a>
* <a href="#Gantt/guides/integration/salesforce/readme.md">Salesforce <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/salesforce.svg" alt="Salesforce"></a>

<div class="note">
If you have already downloaded Bryntum Gantt, please note that it ships with framework examples found in the 
<code>examples/frameworks</code> folder. If you have not, you can <a href="https://bryntum.com/download">download your 
free trial version from here</a>
</div>

## How does it work?

The Bryntum Gantt consists of two parts. 
The first part is the project data, consisting of tasks, dependencies, resources, assignments, and calendars. 
The second part is the visualization, the **User Interface** for the **project data**.

### Project Data

Gantt is one of a kind. Its scheduling engine matches Microsoft Project logic and supports projects of any size. It is
built on top of [ChronoGraph](https://github.com/bryntum/chronograph) - an open-source reactive computational engine
also developed by Bryntum.

<img src="Gantt/chronograph.png" class="b-screenshot" alt="Scheduling engine">

The component will perform everything under the hood for you. Defaults suit most situations, but you can also customize
the scheduling rules with specific business logic if needed!

The scheduling engine is self-contained/headless, designed to be compatible with a server-side Node.js environment. It
is a built-in dependency and should require no additional installation or configuration.
The documentation for this part of the codebase is available in [Bryntum Scheduling Engine API Docs](engine).

### Visualisation and UI

The visualisation and user interface part of the Gantt is based on [Bryntum Grid](https://bryntum.com/products/grid)
and is written in plain JavaScript. So you can use most Grid features like for instance filtering, sorting or
summarizing in the Gantt too. For more information about Grid capabilities, please visit
the [Grid Component documentation](https://bryntum.com/products/grid/docs/).

In a traditional setup, you will want to use **frozen grid** columns to the left and let the **Gantt Timeline** (which
is a specialised grid) occupy the rest of the available space with a horizontal scrollbar to scroll the timeline. You
can also associate as many extra grids as needed to improve even more the user experience.

<img src="Gantt/gantt-layout.png" class="b-screenshot" alt="Gantt layout">

[//]: # (do not change the title of the last section unless you adapt GA Tag tutorial_complete)

## What to do next?

The best way to learn how to use our Gantt component is to first select a quick start guide and after that follow our
tutorial. To get started, please choose your target technology below:

<div class="framework-logos">
<a href="#Gantt/guides/quick-start/react.md"><img src="Core/logo/react.svg" alt="React"><span>React</span></a>
<a href="#Gantt/guides/quick-start/angular.md"><img src="Core/logo/angular.svg" alt="Angular"><span>Angular</span></a>
<a href="#Gantt/guides/quick-start/vue-3.md"><img src="Core/logo/vue.svg" alt="Vue"><span>Vue</span></a>
<a href="#Gantt/guides/quick-start/javascript.md"><img src="Core/logo/js.svg" alt="Vanilla JS"><span>Vanilla JS</span></a>
</div>

## Professional Services

Feeling you need help? Don’t hesitate to request support from our [Professional Services here](https://bryntum.com/services/).

## Copyright and license

Copyright © 2009 - {{YEAR}}, Bryntum

All rights reserved.

[License](https://bryntum.com/products/gantt/license/)


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>