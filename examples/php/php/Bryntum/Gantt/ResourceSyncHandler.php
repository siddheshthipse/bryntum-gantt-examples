<?php

namespace Bryntum\Gantt;

use Bryntum\CRUD\SyncHandler;
use Exception;

class ResourceSyncHandler extends SyncHandler
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
        $this->phantomIdMap = &$gantt->phantomIdMap['resources'];
    }

    protected function prepareData(&$data)
    {
        $result = array();

        $phantomCals = $this->gantt->phantomIdMap['calendars'];

        // get newly created calendar Id if this is a reference to a phantom parent task
        if (isset($phantomCals[@$data['calendar']])) {
            // return real identifier of the record
            $data['calendar'] = $result['calendar'] = $phantomCals[$data['calendar']];
        }

        if (isset($data['calendar']) && !$data['calendar']) {
            $data['calendar'] = null;
        }

        if (@!$data['id']) {
            unset($data[$this->phantomIdField]);
        }

        return $result;
    }

    /**
     * @throws Exception
     */
    public function add(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveResource($record);
        return $response;
    }

    /**
     * @throws Exception
     */
    public function update(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveResource($record);
        return $response;
    }

    /**
     * @throws Exception
     */
    public function remove($record)
    {
        $response = [];
        $this->gantt->removeResource($record['id']);
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
