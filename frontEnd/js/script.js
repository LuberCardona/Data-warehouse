let email = document.getElementsByClassName('email')[0];
let password = document.getElementsByClassName('password')[0];

// LOGIN USUARIO
function login(){  
    sessionStorage.clear();
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
        
    })
}


function parseJwt (token) {
    var base64Url = jwt.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};




 


    
       
    
    

