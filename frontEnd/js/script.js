

let btnLogin = document.getElementsByClassName('btnLogin')[0];
let email = document.getElementsByClassName('email')[0];
let password = document.getElementsByClassName('password')[0];

btnLogin.addEventListener('click',()=>{    
        fetch('http://localhost:5000/login',{
            method:'POST',
            body:`{"email":"${email.value}","password":"${password.value}"}`,
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response1 => {
            console.log(response1.status);                     
            if(response1.status==200){
                response1.json().then((data)=>{
                    console.log(data);
                });        
                location.href = "../html/usuarios.html";
            }
            else{
                alert("usuario o contraseña inválido");
            }
        });
    
    
});

