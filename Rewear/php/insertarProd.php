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
    $nombre=$_POST['nombre'];
    $precio=$_POST['precio'];
    $url=$_POST['url'];
    $sql = "INSERT INTO producto (nombre, precio, url) values 
    ('$nombre','$precio', '$url')";

   
			if (mysqli_query($con, $sql)) {
				$jsondata[0]="Registro realizado exitosamente";
			} else{
				$jsondata[0]= $cantidad;
            }
            

            $con->close();
            echo json_encode($jsondata);
   
?>
