<?php

namespace Bryntum\Gantt;

use Bryntum\CRUD\SyncHandler;

class AssignmentSyncHandler extends SyncHandler
{

    private $gantt;

    public function __construct(&$gantt)
    {
        parent::__construct();
        $this->gantt = &$gantt;
    }

    protected function prepareData(&$data)
    {
        // initialize returning hash
        $result = array();

        $taskIds = $this->gantt->phantomIdMap['tasks'];
        // get newly created task Id if this is a reference to a phantom task
        if (isset($taskIds[@$data['event']])) {
            // use & return actual Id
            $data['event'] = $result['event'] = $taskIds[$data['event']];
        }

        $resourceIds = $this->gantt->phantomIdMap['resources'];
        // get newly created resource Id if this is a reference to a phantom resource
        if (isset($resourceIds[@$data['resource']])) {
            // use & return actual Id
            $data['resource'] = $result['resource'] = $resourceIds[$data['resource']];
        }

        return $result;
    }

    public function add(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveAssignment($record);
        return $response;
    }

    public function update(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveAssignment($record);
        return $response;
    }

    public function remove($record)
    {
        $response = [];
        $this->gantt->removeAssignment($record['id']);
        return $response;
    }
}
