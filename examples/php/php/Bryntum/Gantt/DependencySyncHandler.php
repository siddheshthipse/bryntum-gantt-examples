<?php

namespace Bryntum\Gantt;

use Bryntum\CRUD\SyncHandler;

class DependencySyncHandler extends SyncHandler
{

    private $gantt;

    public function __construct(&$gantt)
    {
        parent::__construct();
        $this->gantt = &$gantt;
    }

    protected function prepareData(&$data)
    {
        // initialize response part related to the record
        $response = array();

        $taskIds = $this->gantt->phantomIdMap['tasks'];

        if (isset($data['type'])) {
            $data['typ'] = $data['type'];
            unset($data['type']);
        }

        // get newly created task Ids if these are references to phantom tasks
        if (isset($data['fromEvent']) && isset($taskIds[$data['fromEvent']])) {
            // use & return actual Id
            $data['fromEvent'] = $response['fromEvent'] = $taskIds[$data['fromEvent']];
        }

        if (isset($data['toEvent']) && isset($taskIds[$data['toEvent']])) {
            // use & return actual Id
            $data['toEvent'] = $response['toEvent'] = $taskIds[$data['toEvent']];
        }

        return $response;
    }

    public function add(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveDependency($record);
        return $response;
    }

    public function update(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveDependency($record);
        return $response;
    }

    public function remove($record)
    {
        $response = [];
        $this->gantt->removeDependency($record['id']);
        return $response;
    }
}
