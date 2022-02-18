<?php
    include ("db_conn.php");

    $ID = $_POST["ID"];

    $sql = "DELETE FROM shopcar WHERE foodID = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($ID));

    header('Location: shopcar.php');
?>