
// modal crear // modificar
let agregarNuevoUsuarioBtn = document.getElementById("agregarNuevoUsuarioBtn"); 
let modificarUsuarioBtn= document.getElementsByClassName('modificarUsuarioBtn')[0]; 

// datos form
let nombreCrearUsuario=document.getElementsByClassName('nombreCrearUsuario')[0];
let apellidoCrearUsuario=document.getElementsByClassName('apellidoCrearUsuario')[0];
let emailCrearUsuario = document.getElementsByClassName('emailCrearUsuario')[0];
let perfil = document.getElementsByClassName('perfil')[0];
let passwordCrearUsuario = document.getElementsByClassName('passwordCrearUsuario')[0];

// tabla - template
let datosUsuarios = document.getElementById('datosUsuarios');

let eliminarUsuarioBtnConfir = document.getElementById('eliminarUsuarioBtnConfir');
let crearUsuarioBtn = document.getElementById("crearUsuario");


setTimeout(() => {
    $(document).ready(function() {
        $('#usuarios').DataTable();
    });
}, 180);


window.onload = function () {
    if (jwt != null) {
        if (parseJwt(jwt).perfilUsuario == "Contactos") {
            removeUserPage.remove();
        } 
        fetch('http://localhost:3000/infoUsuarios', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                  //  console.log(e);
                    let template = 
                       `<tr>                        
                            <td>${e.Nombre}</td>
                            <td>${e.Apellido}</td>
                            <td>${e.email}</td>
                            <td>${e.perfil}</td>  
                            <td>
                            <button type="button" onclick="modificarUdatosEnForm(${e.id})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#crearUsuarioNuevoModal">
                             Modificar
                            </button>

                            <button type="button" class="btn btn-danger" onclick="validarEliminar(${e.id})" data-bs-toggle="modal" data-bs-target="#confirmarEliminarUsuarioModal">
                             Eliminar
                            </button>
                        </td>                   
                    </tr>`;
                    datosUsuarios.insertAdjacentHTML('beforeend', template);                    
                });
            });
            
        }).catch(error => {
           console.log(error);
       }); 
    }else {
        location.href = "../html/index.html";
    }
    agregarNuevoUsuarioBtn.addEventListener('click', () => {
        nombreCrearUsuario.value = "";
        apellidoCrearUsuario.value = "";
        emailCrearUsuario.value = "";
        perfil.value = "";
        passwordCrearUsuario.value = "";
        
        modificarUsuarioBtn.style.display = "none";
    });   
};

// POST USUARIO
function adicionarUsuario(){  
    if(jwt != null){    
    fetch('http://localhost:3000/crearUsuario',{
            method:'POST',
            body:`{
                "Nombre":"${nombreCrearUsuario.value}",
                "Apellido":"${apellidoCrearUsuario.value}", 
                "email":"${emailCrearUsuario.value}",
                "perfil":"${perfil.value}",
                "password":"${passwordCrearUsuario.value}"}`,
                headers:{"Content-Type":"application/json"}
        }).then(response2 => {
            response2.json().then((data2)=>{  
                console.log(response2.status);                          
                if(response2.status == 200){                
                    alert('Usuario creado'); 
                    location.href = location.href;                                 
                }else if(response2.status == 409){                
                    alert('Usuario o email ya existe');                
                }else if(response2.status == 401){               
                    alert('La contraseña debe contener minimo 4 caracteres');                    
                }
            }).catch( error => {
            });
        }).catch( error => {
        });
    } 
}


function validarEliminar(id) {
    eliminarUsuarioBtnConfir.addEventListener('click', ()=> {
        eliminarUsuario((id) );
    });
}

function eliminarUsuario(id) {
    console.log(id);
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:3000/eliminarUsuario/${id}`, {
        method: 'DELETE',
        headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            alert('Usuario eliminado');
           location.href = location.href; // 

        } else {
            console.log("error");
        }
    }).catch(error => {
         console.log(error);
    }); 
    }
}

function modificarUdatosEnForm(id) {  // muestra en formulario datos del usuario selecionado para modificar
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:3000/infoUsuarios/${id}`, {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {            
                //console.log(data);                     
                nombreCrearUsuario.value = data[0].Nombre;
                apellidoCrearUsuario.value = data[0].Apellido;
                emailCrearUsuario.value = data[0].email;
                perfil.value = data[0].perfil;
                passwordCrearUsuario.value = data[0].password;             

             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 

         crearUsuarioBtn.style.display = "none";
         modificarUsuarioBtn.style.display = "initial";
    }
    modificarUsuarioBtn.addEventListener('click', () => {
        modificarUsuarioDb(id);
    });
}

function modificarUsuarioDb(id) {
    //console.log(id);
    if (jwt != null) {
        fetch(`http://localhost:3000/modificarUsuario/${id}`, {
             method: 'PUT',
             body: `{
                "Nombre":"${nombreCrearUsuario.value}",
                "Apellido":"${apellidoCrearUsuario.value}", 
                "email":"${emailCrearUsuario.value}",
                "perfil":"${perfil.value}",
                "password":"${passwordCrearUsuario.value}"}`,            
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            console.log(perfil.value);
            if (res.status == 200) {
                alert("Usuario Actualizado");
                location.href = location.href; 

            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }   
};

