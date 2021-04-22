<?php
    // Conexion
    $host="localhost";
    $port=3306;
    $socket="";
    $user="root";
    $password="987654321mv";
    $dbname="tienda";
    
    $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
        or die ('Could not connect to the database server' . mysqli_connect_error());
    // Fin de conexion

    $jsondata = array();

    $id=$_POST['id'];
    $name=$_POST['name'];
    $precio=$_POST['precio'];
    $url=$_POST['url'];


   $sql = "UPDATE producto SET nombre = '$name', precio = '$precio' , url='$url' WHERE id = $id";

   
			if (mysqli_query($con, $sql)) {
				$jsondata[0]="Edited";
			} else{
				$jsondata[0]= "Fail";
            }
            

            $con->close();
            echo json_encode($jsondata);
   
?>
