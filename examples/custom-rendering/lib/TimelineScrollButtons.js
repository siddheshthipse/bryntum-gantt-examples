import InstancePlugin from '../../../lib/Core/mixin/InstancePlugin.js';
import GridFeatureManager from '../../../lib/Grid/feature/GridFeatureManager.js';
import DateHelper from '../../../lib/Core/helper/DateHelper.js';
import DomHelper from '../../../lib/Core/helper/DomHelper.js';
import EventHelper from '../../../lib/Core/helper/EventHelper.js';

/**
 * A custom demo feature that shows buttons used to scroll the time axis easily
 */
export default class TimelineScrollButtons extends InstancePlugin {
    // Add a stable class name that survives code minification
    static $name = 'TimelineScrollButtons';

    scrollAmount = 4;

    construct(client, config) {
        super.construct(client, config);

        // Use the headerRenderer method to inject our buttons
        client.columns.last.headerRenderer = this.timeAxisHeaderRender.bind(this);
    }

    timeAxisHeaderRender({ headerElement }) {
        const parent = headerElement.closest('.b-schedulerheader');

        if (parent.querySelector('.b-scroll-button')) {
            return;
        }

        DomHelper.createElement({
            parent,
            className : 'b-scroll-button b-scroll-button-previous b-fa b-fa-chevron-left'
        });

        DomHelper.createElement({
            parent,
            className : 'b-scroll-button b-scroll-button-next b-fa b-fa-chevron-right'
        });

        // Set up the click listener
        EventHelper.on({
            element  : parent,
            click    : this.onClick,
            thisObj  : this,
            delegate : '.b-scroll-button'
        });
    }

    // Handling when a button is clicked
    onClick({ target }) {
        const
            { client }           = this,
            { visibleDateRange } = client,
            unit                 = client.viewPreset.headers[0].unit;

        let date;

        if (target.matches('.b-scroll-button-next')) {
            date = DateHelper.add(visibleDateRange.endDate, this.scrollAmount, unit);
        }
        else {
            date = DateHelper.add(visibleDateRange.startDate, -this.scrollAmount, unit);
        }
        client.scrollToDate(date, { animate : { duration : 600, easing : 'easeInOutSine' } });
    }
}

GridFeatureManager.registerFeature(TimelineScrollButtons, false, 'Gantt');
