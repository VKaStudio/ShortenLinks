<?php

    $inputValue = $_POST['subject'];
    $clicks = 0;

    // Connect DB

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "testTask";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Gen path for new link

    function RandomString($length) {
        $key = "";
        $keys = array_merge(range('a', 'z'), range('A', 'Z'));
    
        for($i=0; $i < $length; $i++) {
            $key .= $keys[array_rand($keys)];
        }
        return $key;
    }

    $shortWord = RandomString(5);

    $url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";

    $newLink = $url . "/" . $shortWord;

    $sql = "INSERT INTO Links (oldLink, newLink, clicks)
            VALUES ('$inputValue', '$newLink', '$clicks')";
    $conn->query($sql);

    if (isset($_POST['subject'])) { 

        // Forming an array for the JSON response
        $result = array(
            $inputValue => $newLink
        ); 
    
        // Converting an array to JSON
        echo json_encode($result); 
    }

    $conn->close();
?>