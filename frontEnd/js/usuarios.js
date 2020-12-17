
let ocultarform = document.getElementById('ocultarform');
let tablaUsuarios = document.getElementById('usuarios');
let agregarBtn = document.getElementsByClassName('btnCrearU')[0]; // ESTE ES AGREGAR USUSARIO
let btnLimpiar = document.getElementsByClassName('btnLimpiar')[0];
let agregarUsuario = document.getElementById("agregarUsuario");
let tabla = document.getElementById("tabla");

//let ocultarform=document.getElementById("ocultarform");

let nombreCrearUsuario=document.getElementsByClassName('nombreCrearUsuario')[0];
let apellidoCrearUsuario=document.getElementsByClassName('apellidoCrearUsuario')[0];
let emailCrearUsuario = document.getElementsByClassName('emailCrearUsuario')[0];
let perfil = document.getElementsByClassName('perfil')[0];
let passwordCrearUsuario = document.getElementsByClassName('passwordCrearUsuario')[0];
//let confirmarPassword = document.getElementsByClassName('confirmarPassword')[0];

let datosUsuarios = document.getElementById('datosUsuarios');
//let filasUsuarios = document.getElementById('usuarios')[0];

let eliminarUsuarioBtn = document.getElementById("eliminarUsuario"); 
//let editarUsuarioBtn = document.getElementById("editarUsuario"); 
let crearUsuarioBtn = document.getElementById("crearUsuario");
let btnVolver =  document.getElementsByClassName('btnVolver')[0];

setTimeout(() => {
    $(document).ready(function() {
        $('#usuarios').DataTable();
    });
}, 100);

window.onload = function () {
        fetch('http://localhost:3000/infoUsuarios', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                  //  console.log(e);
                    let template = 
                    `<tr>
                        <td><input type="checkbox"></td>
                            <td>${e.Nombre}</td>
                            <td>${e.Apellido}</td>
                            <td>${e.email}</td>
                            <td>${e.perfil}</td>  
                            <td>
                            <button  onclick="modificarU(${e.id})"  type='button' data-toggle="modal" data-target="#modalAgregarUsuario" class='btn btn-info btn-sm acc'><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Modificar</button>
                            <button onclick="eliminarUsuario(${e.id})" onclick="location.href = location.href" data-toggle="modal" data-target="#modalBorrarUsurio" type='button' class='btn btn-danger btn-sm acc'><span class="material-icons"><i class="fa fa-trash-o" aria-hidden="true"></i>Eliminar</span></button>
                        </td>                   
                    </tr>`;
                    datosUsuarios.insertAdjacentHTML('beforeend', template);
                    
                });
            });
        }).catch(error => {
           console.log(error);
    }); 


   
};

/*agregarBtn.addEventListener('click', function () {   
    function MostrarOcultarForm(){        
        let ocultarform = document.getElementById('ocultarform');             
        ocultarform.classList.toggle("ocultarMostrar");
        
    } 
    MostrarOcultarForm();        
});*/

agregarBtn.addEventListener('click', function () {   
    function MostrarOcultarForm(){        
        let tabla = document.getElementById('tabla');             
        tabla.classList.toggle("ocultarMostrar");
        let ocultarform=document.getElementsByClassName("ocultarform")[0];
        ocultarform.classList.toggle("mostrarform");        
    } 
    MostrarOcultarForm();        
});

btnVolver.addEventListener('click', function () {   
    location.href = location.href; 
    let tabla = document.getElementById('tabla');             
    tabla.classList.toggle("ocultarMostrar");
    let ocultarform=document.getElementsByClassName("ocultarform")[0];
    ocultarform.classList.toggle("mostrarform");
    
});


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

btnLimpiar.addEventListener('click', () => {
    nombreCrearUsuario.value = "";
    apellidoCrearUsuario.value = "";
    emailCrearUsuario.value = "";
    passwordCrearUsuario.value = "";
});


/*function validarEliminar(usuarioId) {
    eliminarUsuarioBtn.addEventListener('click', ()=> {
        eliminarUsuario((usuarioId) );
    });
}*/

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
           location.href = location.href; /////////// ---->>>>> ////////

        } else {
            console.log("error");
        }
    }).catch(error => {
         console.log(error);
    }); 
    }
}

/// modificar usuario


function modificarU() {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch('http://localhost:3000/infoUsuarios', {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {          
              /*  Nombre.value = data[0].nombre;
                Apellido.value = data[0].apellido;
                email.value = data[0].email;
                perfil.value = data[0].roleId;
                password.value = data[0].contrasena;*/
                console.log(data);

             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 
    }
   /* crearUsuarioBtn.style.display = "none";
    editarUsuarioBtn.style.display = "initial";
    editarUsuarioBtn.addEventListener('click', () => {
    editarUsuarioFunc(jwt, usuarioId);
    });*/
}


function editarUsuarioFunc(jwt, id) {
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
                location.href = location.href; /////////// ---->>>>> ////////

            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }
}

