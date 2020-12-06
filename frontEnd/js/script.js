let email = document.getElementsByClassName('email')[0];
let password = document.getElementsByClassName('password')[0];

// Login usuario inicio
function login(){     
    fetch('http://localhost:3000/login',{
        method:'POST',
        body:`{"email":"${email.value}","password":"${password.value}"}`,
        headers:{
           "Content-Type":"application/json"} 
    }).then(response1 => {
         console.log(response1);                     
        if(response1.status==200){
            response1.json().then((data)=>{
            console.log(data); 
            sessionStorage.setItem("jwt", data);  
            location.href = "../html/contactos.html";
            });  
            
        }else{
           alert('Usuario o contraseña inválidos');        
        }  
        
    }).catch( error => {
        console.error(error);
    });
}

let jwt = sessionStorage.getItem("jwt");

function parseJwt (token) {
    var base64Url = jwt.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
parseJwt();

let removeUserPage = document.getElementsByClassName('removeUserPage')[0];

// si no es Administrador no puede acceder a la pestaña de usuarios
window.onload = function () {
    if (jwt != null) {
        if (parseJwt(jwt).perfilUsuario == "Contactos") {
            removeUserPage.remove();
        }      
    }
} 
  
/*

let nombreCrearUsuario=document.getElementsByClassName('nombreCrearUsuario')[0];
let apellidoCrearUsuario=document.getElementsByClassName('apellidoCrearUsuario')[0];
let emailCrearUsuario = document.getElementsByClassName('emailCrearUsuario')[0];
let perfil = document.getElementsByClassName('perfil')[0];
let passwordCrearUsuario = document.getElementsByClassName('passwordCrearUsuario')[0];
let confirmarPassword = document.getElementsByClassName('confirmarPassword')[0];


 
function crearUsuario(){
    if (parseJwt(jwt).perfilUsuario == "Contactos") {
        removeUserPage.remove();
    } 
    fetch('http://localhost:3000/crearUsuario',{
            method:'POST',
            body:`{"Nombre":"${nombreCrearUsuario.value}","Apellido":"${apellidoCrearUsuario.value}", 
                   "email":"${emailCrearUsuario.value}", "perfil":"${perfil.value}", "password":"${passwordCrearUsuario.value}",
                   "repeat_password":"${confirmarPassword.value}"}`,
            headers:{
               "Authorization":"Bearer ",
               "Content-Type":"application/json"
            } 
        }).then(response2 => {
            console.log('entra el response 2');
            console.log(response2)
            response2.json().then((data2)=>{
                console.log(data2);                   
                if(response2.status==200){
                    response2.json().then((data2)=>{
                        console.log(data2);
                    });
                    alert('usuario creado')
                   // location.href = "../html/contactos.html";
                }
            }).catch( error => {
                console.error( 'función enRechazo invocada: ', error );
            });
        }).catch( error => {
            console.error( 'función enRechazo invocada: ', error );
        });
}
    
crearUsuario(); */
       
    
    

