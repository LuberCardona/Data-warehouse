//let jwt = sessionStorage.getItem("jwt");


let rows = document.getElementById("rows"); 
let menuUsuarios = document.getElementById("menuUsuarios");  
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let emailC = document.getElementById("email");
let cargo = document.getElementById("cargo");
let listaCompanias  = document.getElementById("compania"); 
let listaRegiones  = document.getElementById("region"); 
let listaPaises  = document.getElementById("pais"); 
let listaCiudades = document.getElementById("ciudad");  
let interes = document.getElementById("interes"); 
let canal_favorito = document.getElementById("contacto1"); 
let eliminarCont = document.getElementById("eliminarContacto");  

let agregarContacto = document.getElementById("agregarContacto"); 
let crearContactoBtn = document.getElementById("crearContacto"); 
let editarContactoBtn = document.getElementById("editarContacto"); 
let eliminarContactoBtn = document.getElementById("eliminarContacto"); 
let multDelete = document.getElementById("multDelete"); 
let deleteMultContact = document.getElementById("deleteMultContact"); 



multDelete
setTimeout(() => {
    $(document).ready(function() {
        $('#tablaContactos').DataTable();
    });
}, 1050);

window.onload = function () {
    if (jwt != null) {
        if (parseJwt(jwt).perfilUsuario == "Contactos") {
            removeUserPage.remove();
        }     
    
        fetch('http://localhost:3000/infoContactos', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    console.log(e);
                    let template = 
                    `<tr>
                        <td> <input type="checkbox" data-id="${e.id_Contacto}" onclick="getChecked()"></td>
                        <td>${e.nom_Contacto}</td>
                        <td> ${e.apellido_Contacto}</td>
                        <td>${e.cargo}</td>
                        <td>${e.email}</td>
                        <td>${e.canal_favorito}</td>
                        <td><div class="progress">
                                <div class="progress-bar" style="width: ${e.interes}%" role="progressbar" aria-valuenow="${e.interes}" aria-valuemin="0" aria-valuemax="100">${e.interes}%</div>
                            </div>
                        </td>
                        <td>${e.nom_Ciudad}</td>
                        <td>${e.nom_Compañia}</td>                       
                        
                        <td><button  onclick="validarActualizar(${e.contactosId})" type='button' data-toggle="modal" data-target="#modalAgregarContacto" class='btn btn-info btn-sm acc'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            <button onclick="validarEliminar(${e.contactosId})"  data-toggle="modal" data-target="#modalBorrarContacto" type='button' class='btn btn-danger btn-sm acc'><span class="material-icons"><i class="fa fa-trash-o" aria-hidden="true"></i></span></button>
                        </td></tr>`;
                    rows.insertAdjacentHTML('beforeend', template);
                });
            });
            encontrarCompanias(jwt);
            encontrarRegiones(jwt);
        }).catch(error => {
            console.log(error);
        });
    }else {
        location.href = "../html/index.html";
    }
    agregarContacto.addEventListener('click', () => {
        nombre.value = "";
        apellido.value = "";
        email.value = "";
        cargo.value = "";
        editarContactoBtn.style.display = "none";
        crearContactoBtn.style.display = "initial";
    });
    crearContactoBtn.addEventListener('click', () => {
        agregarContactoFunc(jwt);
    });
};

