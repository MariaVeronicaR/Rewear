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

    $sql1 = "DELETE FROM venta_producto where id_producto= '$id'";

   
			if (mysqli_query($con, $sql1)) {
                $sql = "DELETE FROM producto where id = '$id'";
                if (mysqli_query($con, $sql)) {
                $jsondata[0]="Removed";
            }
			} else{
				$jsondata[0]= $id;
            }
            

            $con->close();
            echo json_encode($jsondata);
   
?>
