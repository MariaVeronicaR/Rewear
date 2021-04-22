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
    $id_venta=$_POST['id_venta'];
    $id_producto=$_POST['id_producto'];
    $cantidad=$_POST['cantidad'];

   $sql = "INSERT INTO venta_producto (id_venta,id_producto,cantidad) values ('$id_venta','$id_producto','$cantidad')";

   
			if (mysqli_query($con, $sql)) {
				$jsondata[0]="Registro realizado exitosamente";
			} else{
				$jsondata[0]= $cantidad;
            }
            

            $con->close();
            echo json_encode($jsondata);
   
?>
