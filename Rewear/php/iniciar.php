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
       $correo= $_POST['email'];
       $contrasena= $_POST['pass'];

       $usuario = mysqli_query($con, "SELECT * FROM usuario where email='$correo'"); 


		if(mysqli_num_rows($usuario)>0)
        {
            $contrasena_u = mysqli_query($con, "SELECT * FROM usuario where email='$correo' and pass='$contrasena'");
			if(mysqli_num_rows($contrasena_u)>0){
				while ($row=mysqli_fetch_assoc($contrasena_u)){
					$jsondata[]=$row;
				}
			}else{
                $jsondata[0] = 'Contraseña incorrecta';
            }
			
        }else{
            $jsondata[0] = 'Cuenta inexistente';        
        }

            $con->close();
            echo json_encode($jsondata);


?>