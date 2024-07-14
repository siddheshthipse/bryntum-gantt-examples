<?php

namespace Bryntum\Gantt;

use Bryntum\CRUD\SyncHandler;
use Bryntum\Util\MySql;
use Exception;
use const Bryntum\CRUD\ALL_ROWS;

class ProjectSyncHandler extends SyncHandler
{
    /**
     * @var Gantt
     */
    private $gantt;

    /**
     * @param Gantt $gantt
     */
    public function __construct(&$gantt)
    {
        parent::__construct();
        $this->gantt = &$gantt;
    }

    /**
     * @throws Exception
     */
    public function add(&$record)
    {
        throw new Exception('Project adding is not supported');
    }

    /**
     * @throws Exception
     */
    public function remove($record)
    {
        throw new Exception('Project removing is not supported');
    }

    /**
     * @throws Exception
     */
    public function update(&$record)
    {
        $response = [];

        if (isset($record['startDate'])) {
            $record['startDate'] = MySql::formatDate($record['startDate']);
        }

        if (isset($record['endDate'])) {
            $record['endDate'] = MySql::formatDate($record['endDate']);
        }

        $phantomCals = &$this->gantt->phantomIdMap['calendars'];
        // get newly created calendar Id if this is a phantom identifier
        if (isset($phantomCals[@$record['calendar']])) {
            // use actual calendar Id
            $record['calendar'] = $phantomCals[$record['calendar']];
        }

        $this->gantt->saveProject($record);

        return $response;
    }

    /**
     * @throws Exception
     */
    public function handle($request, $mode = ALL_ROWS)
    {
        $this->update($request);
    }

}
