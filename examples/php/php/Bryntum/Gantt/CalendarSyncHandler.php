<?php

namespace Bryntum\Gantt;

use Bryntum\CRUD\SyncHandler;
use Exception;

class CalendarSyncHandler extends SyncHandler
{

    /**
     * @var Gantt
     */
    private $gantt;

    private $calendarIntervalHandler;

    private $phantomIdMap;

    public function __construct(&$gantt)
    {
        parent::__construct();
        $this->gantt = &$gantt;
        $this->phantomIdMap = &$gantt->phantomIdMap['calendars'];

        $this->calendarIntervalHandler = new CalendarIntervalSyncHandler($gantt);
    }

    protected function prepareData(&$data)
    {
        // initialize record related response part
        $response = [];

        if (isset($data['parentId'])) {
            if (strtolower($data['parentId']) == 'root') {
                $data['parentId'] = null;
            }

            if (isset($this->phantomIdMap[$data['parentId']])) {
                // use & return actual Id
                $data['parentId'] = $response['parentId'] = $this->phantomIdMap[$data['parentId']];
            }
        }

        return $response;
    }

    /**
     * @throws Exception
     */
    public function add(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveCalendar($record);

        if (@$record['intervals']) {
            $this->calendarIntervalHandler->setCalendarId($record['id']);
            $response['intervals'] = $this->calendarIntervalHandler->handle($record['intervals']);
        }

        return $response;
    }

    /**
     * @throws Exception
     */
    public function update(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveCalendar($record);

        // save intervals
        if (@$record['intervals']) {
            $this->calendarIntervalHandler->setCalendarId($record['id']);
            $response['intervals'] = $this->calendarIntervalHandler->handle($record['intervals']);
        }

        return $response;
    }

    /**
     * @throws Exception
     */
    public function remove($record)
    {
        $response = [];
        $this->gantt->removeCalendar($record['id']);
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
