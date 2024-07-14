<?php

namespace Bryntum\Util;

use Exception;

class MySql
{
    /**
     * @throws Exception
     */
    public static function databaseExists($dbname, $host = '', $configFile = '')
    {
        if (defined('DSN')) {
            $dsn = DSN;
            $user = DBUSERNAME;
            $pwd = DBUSERPASSWORD;
        } elseif ($configFile) {
            $consts = ConfigFile::parseConfigFile($configFile);
            $dsn = $consts['DSN'];
            $user = $consts['DBUSERNAME'];
            $pwd = $consts['DBUSERPASSWORD'];
        } else {
            throw new Exception("No DSN specified");
        }

        if (!$host) {
            list($host) = self::getDSNParts($dsn, ['host']);
        }

        system("mysql -v --host=$host --user=$user --password=\"$pwd\" --database $dbname -e \"exit\"", $retval);

        return !$retval;
    }

    /**
     * @throws Exception
     */
    public static function createRandomDatabase($configFile = '', $dbPrefix = 'db_')
    {
        $dbCreated = false;

        if (defined('DSN')) {
            $dsn = DSN;
        } elseif ($configFile) {
            $consts = ConfigFile::parseConfigFile($configFile);
            $dsn = $consts['DSN'];
        } else {
            throw new Exception("No DSN specified");
        }

        list($host) = self::getDSNParts($dsn, ['host']);

        $dbname = '';
        while (!$dbCreated) {
            $dbname = uniqid($dbPrefix);

            if (!self::databaseExists($dbname, $host, $configFile)) {
                self::createDatabase($dbname, $host, $configFile);

                $dbCreated = true;
            }
        }

        return $dbname;
    }

    /**
     * @throws Exception
     */
    public static function createDatabase($dbname, $host, $configFile = '')
    {
        if (defined('DSN')) {
            $dsn = DSN;
            $user = DBUSERNAME;
            $pwd = DBUSERPASSWORD;

        } elseif ($configFile) {
            $consts = ConfigFile::parseConfigFile($configFile);
            $dsn = $consts['DSN'];
            $user = $consts['DBUSERNAME'];
            $pwd = $consts['DBUSERPASSWORD'];
        } else {
            throw new Exception("No DSN specified");
        }

        if (!$dbname || !$host) {
            list($_dbname, $_host) = self::getDSNParts($dsn, ['dbname', 'host']);

            if (!$dbname) {
                $dbname = $_dbname;
            }

            if (!$host) {
                $host = $_host;
            }
        }

        $command = "mysql -v --host=$host --user=$user --password=\"$pwd\" -e \"create database $dbname\"";
        system($command, $retval);

        if ($retval) {
            throw new Exception("Database creation has failed ($dbname).\nCmd: $command");
        }
    }

    /**
     * @throws Exception
     */
    public static function dropDatabase()
    {
        // read the database connection parameters
        list($dbname, $host) = self::getDSNParts(DSN, ['dbname', 'host']);

        $user = DBUSERNAME;
        $pwd = DBUSERPASSWORD;
        $command = "mysql -v --host=$host --user=$user --password=\"$pwd\" -e \"drop database $dbname\"";

        system($command, $retval);

        if ($retval) {
            throw new \Exception('Database removal has failed.\nCmd: $command"');
        }
    }

    public static function getDSNParts($dsn, $names)
    {
        $parts = [];
        foreach ($names as $name) {
            preg_match("/$name=(.+?)(;|\$)/", $dsn, $matches);
            $parts[] = @$matches[1];
        }
        return $parts;
    }

    /**
     * @throws Exception
     */
    public static function executeScript($script)
    {
        global $host, $dbname;

        $user = DBUSERNAME;
        $pwd = DBUSERPASSWORD;
        $command = "mysql -v --host=$host --user=$user --password=\"$pwd\" --database=$dbname < \"$script\"";

        echo "Executing sql/$script:<pre>";

        system($command, $retval);

        if ($retval) {
            throw new Exception('Script execution has failed.\nCmd: $command"');
        }
    }

    /**
     * Prepare a date string for database insertion.
     *
     * @param string $value A date string in the format "YYYY-MM-DDTHH:MM:SS".
     *
     * @return string The formatted date string in the format "YYYY-MM-DD HH:MM:SS".
     */
    public static function formatDate($value)
    {
        // Input example: "2017-05-22T10:37:12"
        // Replace "T" in the date string w/ " " to match the format we use further
        // Convert the date string passed from the client timezone to the server one
        // if the timezone is passed, like this for example: "2017-05-22 10:37:12+06:00".
        return date('Y-m-d H:i:s', strtotime(str_replace('T', ' ', $value)));
    }

}
