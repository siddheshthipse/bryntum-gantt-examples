/* global Ext */

Ext.define('Bryntum.GanttPanel', {
    extend   : 'Ext.Panel',
    xtype    : 'ganttpanel',
    requires : [
        'Ext.panel.Resizer'
    ],

    layout : 'fit',
    cls    : 'bryntum-gantt',

    config : {
        project : null,

        subGridConfigs : {
            locked : {
                flex : 1
            },
            normal : {
                flex : 2
            }
        },

        /**
         * Column definitions
         * @type {Object[]}
         * @config
         */
        columns : [],

        /**
         * An object containing Feature configuration objects (or `true` if no configuration is required)
         * keyed by the Feature class name in all lowercase.
         * @type {Object}
         * @config
         */
        features : null,

        /**
         * A string key used to lookup a predefined {@link gantt.preset.ViewPreset} (e.g. 'weekAndDay', 'hourAndDay'),
         * managed by {@link gantt.preset.PresetManager}. See {@link gantt.preset.PresetManager} for more information.
         * Or a config object for a viewPreset.
         *
         * Options:
         * - 'secondAndMinute'
         * - 'minuteAndHour'
         * - 'hourAndDay'
         * - 'dayAndWeek'
         * - 'weekAndDay'
         * - 'weekAndMonth',
         * - 'monthAndYear'
         * - 'year'
         * - 'manyYears'
         * - 'weekAndDayLetter'
         * - 'weekDateAndMonth'
         * - 'day'
         * - 'week'
         *
         * If passed as a config object, the settings from the viewPreset with the provided 'name' property will be used
         * along with any overridden values in your object.
         *
         * To override:
         * ```javascript
         * viewPreset       : {
         *   name           : 'hourAndDay',
         *   headers        : [
         *       {
         *           unit       : 'hour',
         *           increment  : 12,
         *           renderer   : (startDate, endDate, headerConfig, cellIdx) => {
         *               return '';
         *           }
         *       }
         *   }
         * }
         * ```
         * or set a new valid preset config if the preset is not registered in the {@link gantt.preset.PresetManager}.
         *
         * When you use gantt in weekview mode, this config is used to pick view preset. If passed view preset is not
         * supported by weekview (only 2 supported by default - 'day' and 'week') default preset will be used - 'week'.
         * @type {String|Object}
         * @default
         * @config
         */
        viewPreset : 'weekAndDayLetter',

        /**
         * @cfg {Number} weekStartDay A valid JS day index between 0-6 (0: Sunday, 1: Monday etc.) to be considered the
         * start day of the week. When omitted, the week start day is retrieved from `Ext.Date.firstDayOfWeek`.
         * @type {number}
         * @config
         */
        weekStartDay : Ext.Date.firstDayOfWeek,

        /**
         * The start date of the timeline. If omitted, and a TimeAxis has been set, the start date of the provided
         * {@link gantt.data.TimeAxis} will be used. If no TimeAxis has been configured, it'll use the start/end dates
         * of the loaded event dataset. If no date information exists in the event data set, it defaults to the current
         * date and time.
         * @type {Date}
         * @config
         */

        /**
         * The end date of the timeline. If omitted, it will be calculated based on the {@link #config-startDate} setting
         * and the 'defaultSpan' property of the current {@link gantt.view.mixin.ganttViewPresets#config-viewPreset}.
         * @type {Date}
         * @config
         */

        /**
         * Row height in pixels. When set to null, an empty row will be measured and its height will be used as
         * default row height, enabling it to be controlled using CSS
         * @type {Number}
         * @config
         */
        rowHeight : null,

        /**
         * A task field (id, wbsCode, sequenceNumber etc) that will be used when displaying and editing linked tasks.
         * @config {String} dependencyIdField
         */
        dependencyIdField : 'sequenceNumber'
    },

    exportedProperties : {
        // properties that are creation-only (ie, readonly after creation):
        features          : 0,
        subGridConfigs    : 0,
        dependencyIdField : 0,
        viewPreset        : 0,

        // properties that are read/write
        barMargin    : 1,
        columns      : 1,
        endDate      : 1,
        project      : 1,
        rowHeight    : 1,
        startDate    : 1,
        weekStartDay : 1
    },

    // NOTE: Do NOT use ES6 method syntax (it breaks callParent in Safari and Firefox):
    //      initialize() {
    //
    initialize : function() {
        const me = this;

        me.on({
            single  : true,
            painted : function() {
                me.getGantt().render(me.bodyElement.dom);
            }
        });

        me.callParent();
    },

    /**
     * Returns the Bryntum gantt instance which this Panel wraps.
     * @private
     */
    getGantt : function() {
        const
            me = this,
            exportedProperties = me.exportedProperties;

        let gantt = me._gantt,
            proto = me.self.prototype,
            cfg, name;

        if (!gantt) {
            cfg = Object.assign({}, proto.config, me.initialConfig);

            me._gantt = gantt = new bryntum.gantt.Gantt(Ext.copy({
                // This Panel is layout: 'fit', but we are not going through the
                // ExtJS child component add pathway which adds required classes
                // for the layout. Ensure that the gantt element is sized.
                cls : 'x-layout-fit-item'
            }, cfg, Object.keys(exportedProperties)));

            // We export all events fired by the gantt.
            gantt.on({
                catchAll : me.onGanttEvent,
                thisObj  : me,
                prio     : 100
            });

            // Create getters and setters to export the Bryntum gantt's properties
            // as getXxx/setXxx methods.
            if (!me.propertiesExported) {
                for (name in exportedProperties) {
                    me.createPropertyProxy(proto, name, exportedProperties[name]);
                }

                proto.propertiesExported = true;
            }
        }

        return gantt;
    },

    createPropertyProxy : function(proto, name, writable) {
        const capName = Ext.String.capitalize(name);

        proto['get' + capName] = function() {
            return (this._gantt || this.getGantt())[name];
        };

        if (writable) {
            proto['set' + capName] = function(value) {
                (this._gantt || this.getGantt())[name] = value;
            };
        }
    },

    onGanttEvent : function(event) {
        return this.fireEvent(event.type, event);
    },

    destroy : function() {
        // If we get destroyed before the gantt is created, do not call it into existence
        // just to destroy it.
        this._gantt && this._gantt.destroy();

        this.callParent();
    }
});
