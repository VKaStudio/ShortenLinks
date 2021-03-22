<?php

    $link = current($_POST);
    $clicks = next($_POST);

    // Connect DB

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "testTask";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Get data from DB

    $sql = "SELECT id, oldLink, newLink, clicks FROM Links";
    $result = $conn->query($sql);

    // Update data clicks

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            if ($row["newLink"] === $link) {
                $sum = $row["clicks"] + 1;
                $id = $row["id"];
                $sql = "UPDATE Links SET clicks='$sum' WHERE id=$id";
                $conn->query($sql);
                echo json_encode($row["oldLink"]);
            }            
        }
    }

    $conn->close();
?>