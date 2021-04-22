
var  usuariosBD;
          $.ajax({
          // En data puedes utilizar un objeto JSON, un array o un query string
     
          //Cambiar a type: POST si necesario
          type: "POST",
          // Formato de datos que se espera en la respuesta
          jsonp:'jsoncallback',
          // URL a la que se enviará la solicitud Ajax
          url: "php/usuarios.php",

          success: function(data){
              let usuario=JSON.parse(data);
              setUsuario(usuario);
          },
          error: function(){
              console.log("error");
          }
        });

function setUsuario(user){
  usuariosBD=user;
}
window.addEventListener('load', function () {
    elegirp();
});

// Funcion para elegir la pagina que se carga;
function elegirp(){
    var activeUser = JSON.parse(sessionStorage.getItem('usuario'));

    document.getElementById("usertypeheading").innerHTML = activeUser[0].tipo;

  document.getElementById(
    "usernametxt"
  ).innerText = `${activeUser[0].nombre} ${activeUser[0].apellido}`;

  let navitems = [];

  switch (activeUser[0].tipo) {
    case "operador":
      navitems = document.getElementsByClassName("op");
      break;
    case "administrador":
      navitems = document.getElementsByClassName("admin");
      break;
    case "superusuario":
      navitems = document.getElementsByClassName("su");
      break;
  }

  for (let i = 0; i < navitems.length; i++) {
    navitems[i].style.display = "list-item";
  }
}


var ventaBD;
      $.ajax({
        // En data puedes utilizar un objeto JSON, un array o un query string

        //Cambiar a type: POST si necesario
        type: "POST",
        // Formato de datos que se espera en la respuesta
        jsonp:'jsoncallback',
        // URL a la que se enviará la solicitud Ajax
        url: "php/ventas.php",

        success: function(data){
          let venta=JSON.parse(data);
            setventa(venta);
        },
        error: function(){
            console.log("error");
        }
      });

      function setventa(venta){
        ventaBD=venta;
      }

function RealizarCorte() {
    let date = getDate();
    let count = 0;
    let usuario = "";
    for (let i = 0; i < ventaBD.length; i++) {
      for (let j = 0; j < usuariosBD.length; j++) {
        if (ventaBD[i].id_usuario === usuariosBD[j].id) {
          usuario = usuariosBD[j].nombre + " " + usuariosBD[j].apellido;
        }
      }
      if (ventaBD[i].fecha === date) {
        count++;
        document.getElementById(
          "tabla-corte-body"
        ).innerHTML += `<tr><td>${ventaBD[i].fecha}</td><td>${ventaBD[i].id_venta}</td><td>${ventaBD[i].id_usuario}</td><td>${usuario}</td><td>$${ventaBD[i].total}</td></tr>`;
      }
    }
  
    if (count === 0) {
      document.getElementById("div-tablacorte").style.display = "none";
      document.getElementById("none-alert").style.display = "block";
      document.getElementById("btn-realizar-corte").disabled = false;
    } else {
      document.getElementById("div-tablacorte").style.display = "block";
      document.getElementById("none-alert").style.display = "none";
      document.getElementById("btn-realizar-corte").disabled = true;
    }
  }
  
  function getDate() {
    let d = new Date();
    let date = d.getFullYear() + "-";
  
    if (d.getMonth() + 1 < 10) {
      date += "0" + (d.getMonth() + 1) + "-";
    } else {
      date += d.getMonth() + 1 + "-";
    }
  
    if (d.getDate() < 10) {
      date += "0" + d.getDate();
    } else {
      date += d.getDate();
    }
  
    return date;
  }