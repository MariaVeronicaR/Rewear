$(document).ready(function(){
    $("#iniciar").click(function(evento){
        let correo=document.getElementById('InputEmail').value;
        let contrasena=document.getElementById('InputPassword').value;
        console.log(contrasena.length+' '+correo.length);
        let datos={pass:contrasena, email:correo};
        console.log(datos);
        if(correo.length>0&&contrasena.length>0){
            $.ajax({
                // En data puedes utilizar un objeto JSON, un array o un query string
                data:datos,
                //Cambiar a type: POST si necesario
                type: "POST",
                // Formato de datos que se espera en la respuesta
                jsonp:'jsoncallback',
                // URL a la que se enviará la solicitud Ajax
                url: "php/iniciar.php",

                success: function(data){
                    var usuario=JSON.parse(data);
                    console.log(usuario);
                    if (correo==usuario[0].email&&contrasena==usuario[0].pass){
                        sessionStorage.setItem('usuario',JSON.stringify(usuario));

                        window.location="index.html";

                    }

                    
                },
                error: function(){
                    console.log("error");
                }
            });
             
    
        }else{
            alert("Datos incorrectos");
        }
        return false;

    });
});



