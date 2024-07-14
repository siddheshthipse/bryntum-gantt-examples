<?php

# TODO: not implemented yet

namespace Bryntum\Gantt;

use Bryntum\CRUD\SyncHandler;
use Bryntum\Util\MySql;
use Exception;

class CalendarIntervalSyncHandler extends SyncHandler
{

    /**
     * @var Gantt
     */
    private $gantt;

    private $calendarId;

    public function __construct(&$gantt)
    {
        parent::__construct();
        $this->gantt = &$gantt;
    }

    public function setCalendarId($calendarId)
    {
        $this->calendarId = $calendarId;
    }

    public function prepareData(&$data)
    {
        $response = [];

        if (isset($data['startDate'])) {
            $data['startDate'] = MySql::formatDate($data['startDate']);
        }

        if (isset($data['endDate'])) {
            $data['endDate'] = MySql::formatDate($data['endDate']);
        }

        if (isset($data['isWorking'])) {
            $data['isWorking'] = intval($data['isWorking']);
        }

        if ($this->calendarId) {
            $data['calendar'] = $this->calendarId;
        }

        $phantomIdMap = &$this->gantt->phantomIdMap['calendars'];
        if (isset($phantomIdMap[$data['calendar']])) {
            // use & return actual Id
            $data['calendar'] = $response['calendar'] = $phantomIdMap[$data['calendar']];
        }

        return $response;
    }

    /**
     * @throws Exception
     */
    public function add(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveCalendarInterval($record);
        return $response;
    }

    /**
     * @throws Exception
     */
    public function update(&$record)
    {
        $response = $this->prepareData($record);
        $this->gantt->saveCalendarInterval($record);
        return $response;
    }

    /**
     * @throws Exception
     */
    public function remove($record)
    {
        $response = [];
        $this->gantt->removeCalendarIntervals(['id' => $record['id']]);
        return $response;
    }
}
