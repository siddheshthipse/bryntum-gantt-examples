<?php

namespace Bryntum\Gantt;

use Bryntum\CRUD\SyncHandler;
use Bryntum\Util\MySql;
use Exception;

class TaskSyncHandler extends SyncHandler
{

    /**
     * @var Gantt
     */
    private $gantt;

    private $phantomIdMap;

    public function __construct(&$gantt)
    {
        parent::__construct();
        $this->gantt = &$gantt;
        $this->phantomIdMap = &$gantt->phantomIdMap['tasks'];
    }

    protected function prepareTask(&$data)
    {
        // initialize returning hash
        $result = array();

        // Process datetime fields (turns field values to server timezone)

        if (isset($data['constraintDate'])) {
            $data['constraintDate'] = MySql::formatDate($data['constraintDate']);
        }

        if (isset($data['startDate'])) {
            $data['startDate'] = MySql::formatDate($data['startDate']);
        }

        if (isset($data['endDate'])) {
            $data['endDate'] = MySql::formatDate($data['endDate']);
        }

        if (isset($data['deadline'])) {
            $data['deadline'] = MySql::formatDate($data['deadline']);
        }

        if (isset($data['duration'])) {
            $data['duration'] = floatval($data['duration']);
        }

        if (isset($data['effort'])) {
            $data['effort'] = floatval($data['effort']);
        }

        if (isset($data['parentIndex'])) {
            $data['parentIndex'] = intval($data['parentIndex']);
        }

        if (array_key_exists('expanded', $data)) {
            $data['expanded'] = intval($data['expanded']);
        }

        if (array_key_exists('manuallyScheduled', $data)) {
            $data['manuallyScheduled'] = intval($data['manuallyScheduled']);
        }

        if (array_key_exists('ignoreResourceCalendar', $data)) {
            $data['ignoreResourceCalendar'] = intval($data['ignoreResourceCalendar']);
        }

        if (array_key_exists('effortDriven', $data)) {
            $data['effortDriven'] = intval($data['effortDriven']);
        }

        if (array_key_exists('inactive', $data)) {
            $data['inactive'] = intval($data['inactive']);
        }

        if (isset($data['parentId']) && (strtolower($data['parentId']) == 'root')) {
            $data['parentId'] = null;
        }

        // get newly created task Id if this is a reference to a phantom parent task
        if (isset($this->phantomIdMap[@$data['$PhantomParentId']])) {
            // use & return actual Id
            $data['parentId'] = $result['parentId'] = $this->phantomIdMap[$data['$PhantomParentId']];
        }

        $phantomCals = &$this->gantt->phantomIdMap['calendars'];
        // get newly created calendar Id if this is a reference to a phantom parent task
        if (isset($phantomCals[@$data['calendar']])) {
            // use & return actual Id
            $data['calendar'] = $result['calendar'] = $phantomCals[$data['calendar']];
        }

        if (isset($data['calendar']) && !$data['calendar']) {
            $data['calendar'] = null;
        }

        return $result;
    }

    /**
     * @throws Exception
     */
    public function add(&$record)
    {
        $response = $this->prepareTask($record);
        $this->gantt->saveTask($record);
        return $response;
    }

    /**
     * @throws Exception
     */
    public function update(&$record)
    {
        $response = $this->prepareTask($record);
        $this->gantt->saveTask($record);
        return $response;
    }

    /**
     * @throws Exception
     */
    public function remove($record)
    {
        $response = [];
        $this->gantt->removeTask($record['id']);
        return $response;
    }

    protected function onRecordAdded($record, &$recordResponse, $phantomId)
    {
        parent::onRecordAdded($record, $recordResponse, $phantomId);

        // let's keep phantom Id to real Id mapping
        $this->phantomIdMap[$phantomId] = $recordResponse['id'];

        return $recordResponse;
    }
}
