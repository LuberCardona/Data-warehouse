
let btnLogin = document.getElementsByClassName('btnLogin');
let email = document.getElementsByClassName('email');
let password = document.getElementsByClassName('password');

btnLogin.addEventListener('click',()=>{
    console.log('llamado al API');
    fetch('http://localhost:5000/login',{
        method:'POST',
        body:`{"mail":"${email.value}","pass":"${password.value}"}`,
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        console.log(res);
        if(res.status==200){
            res.json().then((data)=>{
                console.log(data);
            });        
            location.href = "./usuarios.html";
        }
        else{
            alert("usuario o contraseña inválido");
        }
    });
});