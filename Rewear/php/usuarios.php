<?php
    $host="localhost";
    $port=3306;
    $socket="";
    $user="root";
    $password="987654321mv";
    $dbname="tienda";
    
    $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
        or die ('Could not connect to the database server' . mysqli_connect_error());

    $jsondata = array();

    $usuario = mysqli_query($con, "SELECT * FROM usuario"); 
    
    while ($row=mysqli_fetch_assoc($usuario)){
        $jsondata[]=$row;
    }


    $con->close();
    echo json_encode($jsondata);


?>