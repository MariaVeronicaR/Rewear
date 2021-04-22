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
    $apellido=$_POST['apellido'];
    $email=$_POST['email'];
    $pass=$_POST['pass'];
    $tipo=$_POST['tipo'];

   $act=array();
  
   $sql = "INSERT INTO usuario (nombre, apellido,email,pass, tipo) values ( '$nombre','$apellido','$email','$pass','$tipo')";

   
			if (mysqli_query($con, $sql)) {
       
                        $act[]="Done";


			} 
            

            $con->close();
            echo json_encode($act);
   
?>
