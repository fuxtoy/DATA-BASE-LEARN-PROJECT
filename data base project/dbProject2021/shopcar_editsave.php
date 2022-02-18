<?php
    include ("db_conn.php");

    $ID = $_POST["ID"];
    $bID = $_POST["bID"];

    $sql = "UPDATE shopcar SET foodID = ?, Name = (SELECT Name From foodtype WHERE foodID = ?), Price = (SELECT Price From foodtype WHERE foodID = ?) WHERE foodID = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($ID, $ID, $ID, $bID));

    header('Location: shopcar.php');
?>