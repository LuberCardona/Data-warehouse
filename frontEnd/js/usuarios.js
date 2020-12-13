
let ocultarform = document.getElementById('ocultarform');
let tablaUsuarios = document.getElementById('usuarios');
let btnCrearUsuario = document.getElementsByClassName('btnCrearU')[0]; 
let btnLimpiar = document.getElementsByClassName('btnLimpiar')[0];

let nombreCrearUsuario=document.getElementsByClassName('nombreCrearUsuario')[0];
let apellidoCrearUsuario=document.getElementsByClassName('apellidoCrearUsuario')[0];
let emailCrearUsuario = document.getElementsByClassName('emailCrearUsuario')[0];
let perfil = document.getElementsByClassName('perfil')[0];
let passwordCrearUsuario = document.getElementsByClassName('passwordCrearUsuario')[0];
//let confirmarPassword = document.getElementsByClassName('confirmarPassword')[0];

btnCrearUsuario.addEventListener('click', function () {   
    function crearUsuario(){        
        let ocultarform = document.getElementById('ocultarform');             
        ocultarform.classList.toggle("ocultarMostrar");
    } 
    crearUsuario();        
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
                //"repeat_password":"${confirmarPassword.value}"}`,*/

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

let datosUsuarios = document.getElementById('datosUsuarios');
//let filasUsuarios = document.getElementById('filasUsuarios');

window.onload = function () {
        fetch('http://localhost:3000/infoUsuarios', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr><td><input type="checkbox"></td>
                        <td>${e.nombreCrearUsuario}</td>
                        <td>${e.apellidoCrearUsuario}</td>
                        <td>${e.emailCrearUsuario}</td>
                        <td>${e.perfil}</td>
                        <td><button type='button' class='btn btn-danger btn-smd' data-toggle="modal" data-target="#modalDelete"><span class="material-icons" onclick="confirmation(${e.id})">delete</span></button>
                        </td></tr>`;
                    datosUsuarios.insertAdjacentHTML('beforeend', template);
                });
            });
        }).catch(error => {
           console.log(error);
    });
};