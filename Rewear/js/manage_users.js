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
    LoadEditUsers();
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

function LoadEditUsers() {
    var table = document.getElementById("usersTableBody");
    for (let i = 0; i < usuariosBD.length; i++) {
      var row = table.insertRow(-1);
      var cell_id = row.insertCell(0);
      var cell_fname = row.insertCell(1);
      var cell_lname = row.insertCell(2);
      var cell_email = row.insertCell(3);
      var cell_pass = row.insertCell(4);
      var cell_type = row.insertCell(5);
      var cell_rmv = row.insertCell(6);
      var cell_edit = row.insertCell(7);
      row.id = `user-row${usuariosBD[i].id}`;
      cell_id.innerHTML = `<p>${usuariosBD[i].id}</p>`;
      cell_fname.innerHTML = `<p>${usuariosBD[i].nombre}</p>`;
      cell_lname.innerHTML = `<p>${usuariosBD[i].apellido}</p>`;
      cell_email.innerHTML = `<p>${usuariosBD[i].email}</p>`;
      cell_pass.innerHTML = `<p>${usuariosBD[i].pass}</p>`;
      cell_type.innerHTML = `<p>${usuariosBD[i].tipo}</p>`;
      cell_rmv.innerHTML = `<a onclick = "RemoveUser(${usuariosBD[i].id})"><i class="fas fa-minus-square rmvbtn"></i></a>`;
      cell_edit.innerHTML = `<a data-toggle="modal" data-target="#EditUserModal" onclick = "OpenEditUsersModal(${usuariosBD[i].id})"><i class="fas fa-edit editbtn"></i></a>`;
    }
  }
  
  function getUser(id) {
    for (let i = 0; i < usuariosBD.length; i++) {
      if (usuariosBD[i].id == id) {
        return usuariosBD[i];
      }
    }
  }
  
  function OpenEditUsersModal(id) {
    document.getElementById(
      "editUserModalLabel"
    ).innerHTML = `Editing User Id: <span id="userEdited">${id}</span>`;
  
    user = getUser(id);
  
    document.getElementById("editFName").value = user.nombre;
    document.getElementById("editLName").value = user.apellido;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPassword").value = user.pass;
  
    // console.log(user);
  
    let options = document.getElementById("editTypeSelect").options; //[1].selected = true;
  
    for (let i = 0; i < options.length; i++) {
      if (user.tipo === options[i].value) {
        // console.log("aqui", user.tipo, options[i].value);
        document.getElementById("editTypeSelect").options[i].selected = true;
      }
    }
  
    // console.log(id + " was edited");
  }
  
  function EditUser() {
    let id = document.getElementById("userEdited").innerHTML;
    let fname = document.getElementById("editFName").value;
    console.log(fname);
    let lname = document.getElementById("editLName").value;
    let email = document.getElementById("editEmail").value;
    let pass = document.getElementById("editPassword").value;
    let type = document.getElementById("editTypeSelect").value;
  
    id = parseInt(id);
    $.ajax({
      // En data puedes utilizar un objeto JSON, un array o un query string
      data:{id:id,nombre:fname,apellido:lname,email:email,pass:pass,tipo:type},      
      //Cambiar a type: POST si necesario
      type: "POST",
      // Formato de datos que se espera en la respuesta
      jsonp:'jsoncallback',
      // URL a la que se enviará la solicitud Ajax
      url: "php/edtiUser.php",

      success: function(data){
          let mensaje=JSON.parse(data);
          alert(mensaje);                    
      },
      error: function(){
          alert("error");
      }
    });
    $("#EditUserModal").modal("hide");
  
    document.getElementById("usersTableBody").innerHTML = "";
  
    LoadEditUsers();

    window.location.reload();
  }
  
  function AddNewUser() {

    
    let fname = document.getElementById("newFName").value;
    let lname = document.getElementById("newLName").value;
    let email = document.getElementById("newEmail").value;
    let pass = document.getElementById("newPassword").value;
    let type = document.getElementById("inputTypeSelect").value;
  
    $.ajax({
      // En data puedes utilizar un objeto JSON, un array o un query string
      data:{nombre:fname,apellido:lname,email: email,pass:pass,tipo:type},
      //Cambiar a type: POST si necesario
      type: "POST",
      // Formato de datos que se espera en la respuesta
      jsonp:'jsoncallback',
      // URL a la que se enviará la solicitud Ajax
      url: "php/insertarUser.php",

      success: function(data){
          let mensaje=JSON.parse(data);
          alert(mensaje);                    
      },
      error: function(){
          alert("error");
      }
    });
    $("#AddNewUserModal").modal("hide");
  
    document.getElementById("usersTableBody").innerHTML = "";
  
    LoadEditUsers();
    window.location.reload();

  }
  
  function RemoveUser(id) {
    document
      .getElementById(`user-row${id}`)
      .parentNode.removeChild(document.getElementById(`user-row${id}`));
    for (let i = 0; i < usuariosBD.length; i++) {
      if (id === usuariosBD[i].id) {
        usuariosBD.splice(i, 1);
      }
    }
    $.ajax({
      // En data puedes utilizar un objeto JSON, un array o un query string
      data:{id:id},
      //Cambiar a type: POST si necesario
      type: "POST",
      // Formato de datos que se espera en la respuesta
      jsonp:'jsoncallback',
      // URL a la que se enviará la solicitud Ajax
      url: "php/removeUser.php",

      success: function(data){
          let mensaje=JSON.parse(data);
          alert(mensaje);                    
      },
      error: function(){
          alert("error");
      }
    });


  }
  
  