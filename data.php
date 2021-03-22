<?php

    $clicks = 0;

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

    $arr = []; 

    if ($result->num_rows > 0) {
        // output data of each row 
        while($row = $result->fetch_assoc()) {
            $arr2 = array(
                $row["oldLink"] => $row["newLink"],
                'clicks' => $row["clicks"]
            ); 
            array_push($arr, $arr2);
        }
    }

    echo json_encode($arr); 
    $conn->close();

?>