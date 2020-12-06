/*class Perfil{
    parseJwt(token) {
        let tokenSplit = sessionStorage.getItem("jwt");
        console.log(tokenSplit);
        var base64Url = tokenSplit.split('.')[1];
        console.log(base64Url);
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        console.log(base64);
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return console.log(JSON.parse(jsonPayload).perfilUsuario);
           
    };
    parseJwt();
    
}

module.exports = Perfil;*/