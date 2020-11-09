
let email = document.getElementsByClassName('email')[0];
let password = document.getElementsByClassName('password')[0];

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
                   // sessionStorage.setItem("jwt", data.token)               
            });          
            location.href = "../html/usuarios.html";
            }else if(response1.status==401){
               location.href = "../html/contactos.html";                
            }     
    }).catch( error => {
        console.error(error);
    })
}

let nombreCrearUsuario=document.getElementsByClassName('nombreCrearUsuario')[0];
let apellidoCrearUsuario=document.getElementsByClassName('apellidoCrearUsuario')[0];
let emailCrearUsuario = document.getElementsByClassName('emailCrearUsuario')[0];
let perfil = document.getElementsByClassName('perfil')[0];
let passwordCrearUsuario = document.getElementsByClassName('passwordCrearUsuario')[0];
let confirmarPassword = document.getElementsByClassName('confirmarPassword')[0];
  
function crearUsuario(){
  //  let jwt =  sessionStorage.getItem("jwt");
  //  console.log(jwt);
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
                    location.href = "../html/contactos.html";
                }
            }).catch( error => {
                console.error( 'función enRechazo invocada: ', error );
            })
        }).catch( error => {
            console.error( 'función enRechazo invocada: ', error );
        })
}
      

    
       
    
    

