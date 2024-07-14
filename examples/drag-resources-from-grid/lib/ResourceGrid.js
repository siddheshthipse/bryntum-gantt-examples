import TreeGrid from '../../../lib/Grid/view/TreeGrid.js';
import AvatarRendering from '../../../lib/Core/widget/util/AvatarRendering.js';

export default class ResourceGrid extends TreeGrid {
    // Original class name getter. See Widget.$name docs for the details.
    static get $name() {
        return 'ResourceGrid';
    }

    // Factoryable type name
    static get type() {
        return 'resourcegrid';
    }

    static get configurable() {
        return {
            resourceImagePath : '../_shared/images/users/',
            selectionMode     : {
                row         : true,
                multiSelect : true
            },
            columns : [
                {
                    type           : 'tree',
                    text           : 'Resources',
                    showEventCount : false,
                    field          : 'name',
                    renderer       : ({ record, grid, value }) => ({
                        class    : 'b-resource-info',
                        children : [
                            grid.avatarRendering.getResourceAvatar({
                                initials : record.initials,
                                color    : record.eventColor,
                                iconCls  : record.iconCls,
                                imageUrl : record.image ? `${grid.resourceImagePath}${record.image}` : null
                            }),
                            value
                        ]
                    }),
                    flex : 1
                }
            ]
        };
    }

    afterConstruct() {
        this.avatarRendering = new AvatarRendering({
            element : this.element
        });
    }
};

// Register this widget type with its Factory
ResourceGrid.initClass();
