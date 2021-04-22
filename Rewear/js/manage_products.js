
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
    LoadEditProducts();
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

function LoadEditProducts() {
    var table = document.getElementById("productsTableBody");
    for (let i = 0; i < productosBD.length; i++) {
      var row = table.insertRow(-1);
      var cell_id = row.insertCell(0);
      var cell_name = row.insertCell(1);
      var cell_price = row.insertCell(2);
      // var cell_url = row.insertCell(3);
      var cell_rmv = row.insertCell(3);
      var cell_edit = row.insertCell(4);
      row.id = `product-row${productosBD[i].id}`;
      cell_id.innerHTML = `<p>${productosBD[i].id}</p>`;
      cell_name.innerHTML = `<p>${productosBD[i].nombre}</p>`;
      cell_price.innerHTML = `<p>${productosBD[i].precio}</p>`;
      // cell_url.innerHTML = `<p>${productosBD[i].url}</p>`;
      // cell_url.className = "urls";
      cell_rmv.innerHTML = `<a onclick = "RemoveProduct(${productosBD[i].id})"><i class="fas fa-minus-square rmvbtn"></i></a>`;
      cell_edit.innerHTML = `<a data-toggle="modal" data-target="#EditProductModal" onclick = "OpenEditModal(${productosBD[i].id})"><i class="fas fa-edit editbtn"></i></a>`;
  
      // var RemoveHandler = function (row) {
      //   return function () {
      //     var cell = row.getElementsByTagName("td")[0];
      //     var id = cell.innerHTML;
      //     RemoveFromProductsTable(id);
      //   };
      // };
  
      // cell_id.onclick = RemoveHandler(row);
    }
  }
  
  function RemoveProduct(id) {
    document
      .getElementById(`product-row${id}`)
      .parentNode.removeChild(document.getElementById(`product-row${id}`));
    
    $.ajax({
      // En data puedes utilizar un objeto JSON, un array o un query string
      data:{id:id},
      //Cambiar a type: POST si necesario
      type: "POST",
      // Formato de datos que se espera en la respuesta
      jsonp:'jsoncallback',
      // URL a la que se enviará la solicitud Ajax
      url: "php/removeProd.php",

      success: function(data){
          let mensaje=JSON.parse(data);
          alert(mensaje);                    
      },
      error: function(){
          alert("error");
      }
    });
  }
  
  function getProduct(id) {
    for (let i = 0; i < productosBD.length; i++) {
      console.log(productosBD[i].id+ " "+id);
      if (productosBD[i].id == id) {
        
        return productosBD[i];
      }
    }
  }
  
  function OpenEditModal(id) {
    document.getElementById(
      "editModalLabel"
    ).innerHTML = `Editing Product Id: <span id="idEdited">${id}</span>`;
  
    product = getProduct(id);
      console.log(product);
    document.getElementById("editName").value = product.nombre;
    document.getElementById("editPrice").value = product.precio;
    document.getElementById("editUrl").value = product.url;
    console.log(id + " was edited");
  }
  
  function EditProduct() {
    let id = document.getElementById("idEdited").innerHTML;
    let name = document.getElementById("editName").value;
    let price = document.getElementById("editPrice").value;
    let url = document.getElementById("editUrl").value;
  
    id = parseInt(id);
    /*
    for (let i = 0; i < productosBD.length; i++) {
      if (productosBD[i].id === id) {
        productosBD[i] = { id: id, nombre: name, precio: price, url: url };
        console.log("aqui");
      }
    }*/

    $.ajax({
      // En data puedes utilizar un objeto JSON, un array o un query string
      data:{id:id,name:name,precio:price,url:url},
      //Cambiar a type: POST si necesario
      type: "POST",
      // Formato de datos que se espera en la respuesta
      jsonp:'jsoncallback',
      // URL a la que se enviará la solicitud Ajax
      url: "php/edtiProd.php",

      success: function(data){
          let mensaje=JSON.parse(data);
          alert(mensaje);                    
      },
      error: function(){
          alert("error");
      }
    });
    $("#EditProductModal").modal("hide");
  
    document.getElementById("productsTableBody").innerHTML = "";
  
    LoadEditProducts();
    window.location.reload();

  }
  
  function AddNewProduct() {

    let name = document.getElementById("newName").value;
    let price = document.getElementById("newPrice").value;
    let url = document.getElementById("newUrl").value;


    $.ajax({
      // En data puedes utilizar un objeto JSON, un array o un query string
      data:{nombre:name,precio:price,url: url},
      //Cambiar a type: POST si necesario
      type: "POST",
      // Formato de datos que se espera en la respuesta
      jsonp:'jsoncallback',
      // URL a la que se enviará la solicitud Ajax
      url: "php/insertarProd.php",

      success: function(data){
          let mensaje=JSON.parse(data);
          alert(mensaje);                    
      },
      error: function(){
          alert("error");
      }
    });
  
    $("#AddNewProductModal").modal("hide");
  
    document.getElementById("productsTableBody").innerHTML = "";
  
    LoadEditProducts();
    window.location.reload();


  }