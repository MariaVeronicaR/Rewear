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
 
    $id_usuario=$_POST['id_usuario'];
    $fecha=$_POST['fecha'];
    $total=$_POST['total'];

   $act=array();
  
   $sql = "INSERT INTO venta (id_usuario,fecha,total) values ( '$id_usuario','$fecha','$total')";

   
			if (mysqli_query($con, $sql)) {
                $actividades = mysqli_query($con, "SELECT id_venta FROM venta ORDER BY id_venta DESC LIMIT 1");
                    while ($row1=mysqli_fetch_assoc($actividades)){
                        $act[]=$row1;
                    }

			} 
            

            $con->close();
            echo json_encode($act);
   
?>
