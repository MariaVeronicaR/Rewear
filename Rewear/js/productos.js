
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
window.addEventListener('load', function () {
    elegirp();
    LoadProducts();
});

var productsoncart = [];
var activeUser = JSON.parse(sessionStorage.getItem('usuario'));
// Funcion para elegir la pagina que se carga;
function elegirp(){
   

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
  

// FUNCIONES PARA PAGINA DE PRODUCTOS



function LoadProducts() {
    let lista = document.getElementById("products").innerHTML;
  
    for (let i = 0; i < productosBD.length; i++) {
      lista += `<div class="col-12 col-sm-6 col-lg-4">
          <div class="card" style="width: auto;">
            <img class="card-img-top" src="${productosBD[i].url}" />
            <div class="card-body">
              <h5 class="card-title">${productosBD[i].nombre}</h5>
              <p class="card-text">$${productosBD[i].precio}</p>
              <button id="idproduct${i}" class="btn btn-primary addcartbtn" onclick = AddToCart(${i})>Add to cart</button>
            </div>
          </div>
        </div>`;
    }
  
    document.getElementById("products").innerHTML = lista;
}
  
  function AddToCart(id) {
    document.getElementById(`idproduct${id}`).disabled = true;
    document.getElementById(
      "product-details"
    ).innerHTML += `<tr id="product-row${id}" class = "added-products">
    <td>${productosBD[id].nombre}</td>
    <td id = "u-price${id}">${productosBD[id].precio}</td>
    <td id="input${id}">
      <input id = "qty${id}" class="qtyinput" type="number" min="1" value="1" onchange= "ChangeValueInput(${id})"/>
    </td>
    <td id = "price${id}" class= "prices">${productosBD[id].precio}</td>
    <td><i class="fas fa-times-circle rmv-btn" onclick="RemoveFromCart(${id})"></i></td>
  </tr>`;
  
    productsoncart.push({ id: id + 1, qty: 1 }); //se le suma 1 por id de bd
    //console.log("anadir", productsoncart);
    CalculateTotal();
  }
  
  function ChangeValueInput(id) {
    var input = document.getElementById(`qty${id}`).value;
    document.getElementById(
      `input${id}`
    ).innerHTML = `<input id = "qty${id}" class="qtyinput" type="number" min="1" value="${input}" onchange= "ChangeValueInput(${id})"/>`;
  
    let price = document.getElementById(`u-price${id}`).innerHTML;
    document.getElementById(`price${id}`).innerHTML = parseFloat(price) * input;
  
    for (let i = 0; i < productsoncart.length; i++) {
      //console.log(productsoncart[i].id, id);
      if (productsoncart[i].id === id + 1) {
        productsoncart[i].qty = parseInt(input);
      }
    }
    //console.log("cambiar 2", productsoncart);
    CalculateTotal();
  }
  
  var carttotal = 0;
  
  function CalculateTotal() {
    var qty = document.getElementsByClassName("qtyinput");
    var prices = document.getElementsByClassName("prices");
  
    let total = 0;
  
    for (let i = 0; i < qty.length; i++) {
      total += parseFloat(prices[i].innerText);
    }
  
    if (total > 0) {
      document.getElementById("buy-btn").disabled = false;
    } else {
      document.getElementById("buy-btn").disabled = true;
    }
  
    carttotal = total;
  
    document.getElementById("shopping-total").innerHTML = total;
    //console.log(total);
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


  function BuyCart() {
    let date = getDate();
    var user=activeUser[0].id;

    $.ajax({
        // En data puedes utilizar un objeto JSON, un array o un query string
        data:{id_usuario:user,fecha:date,total:carttotal},
        //Cambiar a type: POST si necesario
        type: "POST",
        // Formato de datos que se espera en la respuesta
        jsonp:'jsoncallback',
        // URL a la que se enviará la solicitud Ajax
        url: "php/Insertarcompra.php",

        success: function(data){
            let mensaje=JSON.parse(data);
            console.log(mensaje[0].id_venta);
            let id= mensaje[0].id_venta;
            ventap(id);

        },
        error: function(){
            alert("error");
        }
    });

    
  
    //console.log("buy");
  }

  function ventap(id){
    console.log(productsoncart.length);
    for (let i = 0; i < productsoncart.length; i++) {
      console.log(id);

      let p_id = productsoncart[i].id;
      let qty = productsoncart[i].qty;
      $.ajax({
        // En data puedes utilizar un objeto JSON, un array o un query string
        data:{id_venta:id,id_producto:p_id,cantidad:qty},
        //Cambiar a type: POST si necesario
        type: "POST",
        // Formato de datos que se espera en la respuesta
        jsonp:'jsoncallback',
        // URL a la que se enviará la solicitud Ajax
        url: "php/insertarVP.php",

        success: function(data){
            let mensaje=JSON.parse(data);
            console.log(mensaje);                    
        },
        error: function(){
            alert("error");
        }
    });
    }
    ResetPage();

  }
  
  function ResetPage() {
    productsoncart = [];
    carttotal = 0;
    for (let i = 0; i < productosBD.length; i++) {
      document.getElementById(`idproduct${i}`).disabled = false;
    }
    document.getElementById("buy-btn").disabled = true;
    document.getElementById("shopping-total").innerHTML = carttotal;
    document.getElementById("product-details").innerHTML = "";
  }
  
  function RemoveFromCart(id) {
    document.getElementById(`idproduct${id}`).disabled = false;
    document
      .getElementById(`product-row${id}`)
      .parentNode.removeChild(document.getElementById(`product-row${id}`));
  
    for (let i = 0; i < productsoncart.length; i++) {
      //console.log(productsoncart[i].id, id + 1);
      if (productsoncart[i].id === id + 1) {
        //se suma 1 por id de bd
        productsoncart.splice(i, 1);
      }
    }
  
    //console.log("remove", productsoncart);
    CalculateTotal();
}

