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

    $venta_producto = mysqli_query($con, "SELECT * FROM venta_producto"); 
    
    while ($row=mysqli_fetch_assoc($venta_producto)){
        $jsondata[]=$row;
    }


    $con->close();
    echo json_encode($jsondata);


?>