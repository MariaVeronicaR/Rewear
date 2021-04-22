

var  productosBD;
          $.ajax({
          // En data puedes utilizar un objeto JSON, un array o un query string
     
          //Cambiar a type: POST si necesario
          type: "POST",
          // Formato de datos que se espera en la respuesta
          jsonp:'jsoncallback',
          // URL a la que se enviará la solicitud Ajax
          url: "php/productos.php",

          success: function(data){
            let productos=JSON.parse(data);
              setproductos(productos);
          },
          error: function(){
              console.log("error");
          }
        });

function setproductos(productos){
  productosBD=productos;
}

var venta_productoBD;

          $.ajax({
          // En data puedes utilizar un objeto JSON, un array o un query string
     
          //Cambiar a type: POST si necesario
          type: "POST",
          // Formato de datos que se espera en la respuesta
          jsonp:'jsoncallback',
          // URL a la que se enviará la solicitud Ajax
          url: "php/ventas_productos.php",

          success: function(data){
            let venta_producto=JSON.parse(data);
              setVenta_producto(venta_producto);
          },
          error: function(){
              console.log("error");
          }
        });
function setVenta_producto(venta_producto){
          venta_productoBD=venta_producto;
}
window.addEventListener('load', function () {
    elegirp();
    LoadChart();
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



function getBest5() {
    let productos_vendidos = [];
    for (let i = 0; i < productosBD.length; i++) {
      let t = 0;
      for (let j = 0; j < venta_productoBD.length; j++) {
        // console.log("aqui", productosBD[i].id, venta_productoBD[j].id_producto);
        if (productosBD[i].id === venta_productoBD[j].id_producto) {
          t += venta_productoBD[j].cantidad;
        }
      }
      productos_vendidos.push({
        p_id: productosBD[i].id,
        name: productosBD[i].nombre,
        qty: t,
      });
    }
  
    var mayor_menor = [];
  
    var names = [];
    var qty = [];
  
    for (let i = 0; i < 5; i++) {
      var max = productos_vendidos.reduce(function (prev, current) {
        return prev.qty > current.qty ? prev : current;
      });
      mayor_menor.push(max);
      names.push(max.name);
      qty.push(max.qty);
      for (let j = 0; j < productos_vendidos.length; j++) {
        if (max.p_id === productos_vendidos[j].p_id) {
          productos_vendidos.splice(j, 1);
        }
      }
    }
  
    console.log(mayor_menor);
    return [names, qty];
  }
  
  function LoadChart() {
    var labels = getBest5();
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels[0],
        datasets: [
          {
            label: "#Sells per product",
            data: labels[1],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
  