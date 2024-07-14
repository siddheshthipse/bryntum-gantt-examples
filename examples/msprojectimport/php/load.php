<?php

require 'UploadException.php';

$dir      = dirname(__FILE__);
$jar_path = $dir . '/../projectreader/target/bryntum-project-reader-6.1.22.jar';
$tmp_dir  = $dir . '/tmp/';

// Force UTF-8 encoding to make sure multi-byte characters returned by bryntum-project-reader-xxx.jar
// are not corrupted
putenv('LANG=en_US.UTF-8');

$result = ['success' => true];

try {

    if (!isset($_FILES['mpp-file'])) {
        throw new Exception('Upload failed!<br>Probably the upload request exceeds the maximum allowed size.');
    }

    if ($_FILES['mpp-file']['error'] !== UPLOAD_ERR_OK) {
        throw new Bryntum\UploadException($_FILES['mpp-file']['error']);
    }

    $tmp_file = $_FILES['mpp-file']['tmp_name'];

    if (!is_uploaded_file($tmp_file)) {
        throw new Exception('Upload failed.');
    }

    if (!is_dir($tmp_dir)) {
        throw new Exception('No temp directory exists.');
    }

    $move_path = $tmp_dir . uniqid();

    if (!move_uploaded_file($tmp_file, $move_path)) {
        throw new Exception('Cannot save uploaded file!<br>Please verify, that web-server user account has write permission to: <br>' . $tmp_dir);
    }

    // Checking if java is installed
    exec('java -version', $json, $exec_result);

    if ($exec_result > 0) {
        throw new Exception('Could not process uploaded file!<br>Please verify that server side Java is installed.');
    }

    // launch JAR file to extract the uploaded MPP-file contents
    $shell_command = 'java -jar ' . escapeshellarg($jar_path) . ' ' . escapeshellarg($move_path) . ' 1';

    $json = shell_exec($shell_command);

    // ensure the output is actually a JSON string
    $decoded = json_decode($json, false);

    if (!$json || !$decoded) {
        throw new Exception('Could not process uploaded file!<br>Command: ' . $shell_command);
    }

    // cleanup copied file
    unlink($move_path);

    $result['data'] = $decoded;

} catch (Exception $e) {

    $result = [
        'success' => false,
        'msg'     => $e->getMessage()
    ];

}

die(json_encode($result));
