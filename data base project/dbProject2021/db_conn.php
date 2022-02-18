<?php
    $user = 'root';
    $password = 'tim900719';
    try {
        $db = new PDO('mysql:localhost;port=3306;dbname=final;charset=utf8',$user,$password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }catch(PDOException $e) {
        Print "ERROR!: " . $e->getMessage();
        die();
    }
?>