<?php
    include ("db_conn.php");

    $ID = $_POST["ID"];

    $sql = "INSERT INTO comfirm (foodID) VALUES (?)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($ID));

    $sql = "INSERT INTO shopcar (Name, Price, foodID) VALUES ((SELECT Name FROM foodtype WHERE foodID = ?), (SELECT Price FROM foodtype WHERE foodID = ?), ?)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($ID, $ID, $ID));

    $sql = "DELETE from comfirm";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    header('Location: shopcar.php');
?>
