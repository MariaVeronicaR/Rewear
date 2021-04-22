
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
$("#datepicker").datepicker({ format: "yyyy-mm-dd" });

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
var data = [];

function VerReporte() {
  data = [];
  document.getElementById("tabla-reportes-body").innerHTML = "";
  let count = 0;
  let usuario = "";
  let date = document.getElementById("datepicker").value;

  for (let i = 0; i < ventaBD.length; i++) {
    for (let j = 0; j < usuariosBD.length; j++) {
      if (ventaBD[i].id_usuario === usuariosBD[j].id) {
        usuario = usuariosBD[j].nombre + " " + usuariosBD[j].apellido;
      }
    }
    if (ventaBD[i].fecha === date) {
      count++;
      document.getElementById(
        "tabla-reportes-body"
      ).innerHTML += `<tr><td>${ventaBD[i].fecha}</td><td>${ventaBD[i].id_venta}</td><td>${ventaBD[i].id_usuario}</td><td>${usuario}</td><td>$${ventaBD[i].total}</td></tr>`;
      data.push([
        ventaBD[i].fecha,
        ventaBD[i].id_venta,
        ventaBD[i].id_usuario,
        usuario,
        ventaBD[i].total,
      ]);
    }
  }

  if (count === 0) {
    document.getElementById("div-tabla-reportes").style.display = "none";
    document.getElementById("empty-alert").style.display = "block";
  } else {
    document.getElementById("div-tabla-reportes").style.display = "block";
    document.getElementById("empty-alert").style.display = "none";
  }
}

function DownloadCSV() {
  if (data.length === 0) {
    alert("Hubo un error");
  } else {
    var csv = "Fecha,ID_Venta,ID_Usuario,Nombre_Usuario,Total\n";
    data.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });

    let d = data[0][0];
    console.log(d);
    console.log(csv);
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = `Reporte-${d}.csv`;
    hiddenElement.click();
  }
}