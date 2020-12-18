
let ocultarform = document.getElementsByClassName('ocultarform')[0];
let tablaUsuarios = document.getElementById('usuarios');
let agregarBtn = document.getElementsByClassName('btnCrearU')[0]; 
let btnLimpiar = document.getElementsByClassName('btnLimpiar')[0];
let agregarUsuario = document.getElementById("agregarUsuario");
let tabla = document.getElementById("tabla");
let nombreCrearUsuario=document.getElementsByClassName('nombreCrearUsuario')[0];
let apellidoCrearUsuario=document.getElementsByClassName('apellidoCrearUsuario')[0];
let emailCrearUsuario = document.getElementsByClassName('emailCrearUsuario')[0];
let perfil = document.getElementsByClassName('perfil')[0];
let passwordCrearUsuario = document.getElementsByClassName('passwordCrearUsuario')[0];
let datosUsuarios = document.getElementById('datosUsuarios');
let eliminarUsuarioBtn = document.getElementById("eliminarUsuario"); 
let crearUsuarioBtn = document.getElementById("crearUsuario");
let modificarUsuarioBtn= document.getElementsByClassName('modificarUsuarioBtn')[0];
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
                            <td>${e.Nombre}</td>
                            <td>${e.Apellido}</td>
                            <td>${e.email}</td>
                            <td>${e.perfil}</td>  
                            <td>
                            <button type="button" class="btn btn-warning" onclick="modificarUdatosEnForm(${e.id})" >Modificar</button>
                            <button onclick="eliminarUsuario(${e.id})" data-toggle="modal" data-target="#modalBorrarUsurio" type='button' class='btn btn-danger btn-sm acc'><span class="material-icons"><i class="fa fa-trash-o" aria-hidden="true"></i>Eliminar</span></button>
                        </td>                   
                    </tr>`;
                    datosUsuarios.insertAdjacentHTML('beforeend', template);                    
                });
            });
        }).catch(error => {
           console.log(error);
    });    
};

agregarBtn.addEventListener('click', function () {  
    MostrarOcultarForm(); 
});

function MostrarOcultarForm(){                   
    tabla.classList.toggle("ocultarMostrar");
    ocultarform.classList.toggle("mostrarform");     
    crearUsuarioBtn.classList.add('mostrarform');
    crearUsuarioBtn.classList.add('bgCrearMostrar');
    modificarUsuarioBtn.classList.add('ocultarform');

} 
function MostrarOcultarModUsuBtn(){  
    modificarUsuarioBtn.classList.add('mostrarform');
    modificarUsuarioBtn.classList.add('bgModificar');
    crearUsuarioBtn.classList.toggle('ocultarform');
    crearUsuarioBtn.classList.add('bgCrear');
    crearUsuarioBtn.classList.remove('bgCrearMostrar');

}

btnVolver.addEventListener('click', function () {               
    tabla.classList.toggle("ocultarMostrar");
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
           location.href = location.href; // recargar 

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
            MostrarOcultarForm(); 
                console.log(data);                     
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
    }
    MostrarOcultarModUsuBtn();
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

