let rowsR = document.getElementById("rows");
let menuUsuarios = document.getElementById("menuUsuarios");  
let region = document.getElementById("region"); 
let pais = document.getElementById("pais"); 
let ciudad = document.getElementById("ciudad"); 
let listaRegiones = document.getElementById("regionList"); 

let listaRegionesEdit = document.getElementById("regionListEdit"); 
let listaPaisesEdit = document.getElementById("paisListEdit"); 
let listaCiudadesEdit = document.getElementById("ciudadListEdit"); 


let listaPaises = document.getElementById("paisList"); 

let agregarRegion = document.getElementById("agregarRegion"); 
let agregarPais = document.getElementById("agregarPais"); 
let agregarCiudad = document.getElementById("agregarCiudad"); 

let regionEdit = document.getElementById("regionEdit"); 
let paisEdit = document.getElementById("paisEdit"); 
let ciudadEdit = document.getElementById("ciudadEdit"); 


let crearRegionBtn = document.getElementById("crearRegion"); 
let crearPaisBtn = document.getElementById("crearPais"); 
let crearCiudadBtn = document.getElementById("crearCiudad"); 

let editarRegionBtn = document.getElementById("editarRegion"); 
let editarPaisBtn = document.getElementById("editarPais"); 
let editarCiudadBtn = document.getElementById("editarCiudad"); 


let listaRegionesElim = document.getElementById("regionListElim"); 
let eliminarRegionDefinitivamente = document.getElementById("eliminarRegionDefinitivamente");

let listaPaisesElim = document.getElementById("paisListElim"); 
let eliminarPaisDefinitivamente = document.getElementById("eliminarPaisDefinitivamente"); 

let listaCiudadesElim = document.getElementById("ciudadListElim"); 
let eliminarCiudadDefinitivamente = document.getElementById("eliminarCiudadDefinitivamente"); 


setTimeout(() => {
    $(document).ready(function () {
        $('#tablaRegiones').DataTable();
    });
}, 230);

window.onload = function () {
    if (jwt != null) {
        if (parseJwt(jwt).perfilUsuario == "Contactos") {
            removeUserPage.remove();
        } 
        fetch('http://localhost:3000/infoCiudades', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                   // console.log(e);
                    let template = `<tr><td><input type="checkbox"></td>
                                        <td>${e.nom_Region}</td>
                                        <td>${e.nom_Pais}</td>
                                        <td>${e.nom_Ciudad}</td>
                                        </tr>`;
                    rowsR.insertAdjacentHTML('beforeend', template);
                });
            });
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../index.html";
    }




  /*  agregarRegion.addEventListener('click', () => {
        region.value = "";
/*         editarContactoBtn.style.display = "none";
 */      /*  crearRegionBtn.style.display = "initial";
    });
    crearRegionBtn.addEventListener('click', () => {
        agregarRegionFunc(jwt);
    });




    agregarPais.addEventListener('click', () => {
        pais.value = "";
/*         editarContactoBtn.style.display = "none";
 */    /* crearPaisBtn.style.display = "initial";
        encontrarRegiones(jwt)
    });
    crearPaisBtn.addEventListener('click', () => {
        agregarPaisFunc(jwt);
    });





    agregarCiudad.addEventListener('click', () => {
        ciudad.value = "";
/*         editarContactoBtn.style.display = "none";
 */    /* crearCiudadBtn.style.display = "initial";
        encontrarPaises(jwt)
    });
    crearCiudadBtn.addEventListener('click', () => {
        agregarCiudadFunc(jwt);
    });*/

};
