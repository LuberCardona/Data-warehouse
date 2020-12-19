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
let eliminarVariosContactosBtn = document.getElementById("eliminarVariosContactosBtn"); 

let modalTitle = document.getElementsByClassName('modal-title')[0];
let modalTexto = document.getElementsByClassName('modal-texto')[0];


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
                   // console.log(e);
                    let template = 
                    `<tr>
                        <td> <input type="checkbox" data-id="${e.id_Contacto}" onclick="getChecked()"></td>
                        <td>${e.nom_Contacto}</td>
                        <td>${e.apellido_Contacto}</td>
                        <td>${e.cargo}</td>
                        <td>${e.email}</td>
                        <td>${e.canal_favorito}</td>
                        <td><div class="progress">
                                <div class="progress-bar" style="width: ${e.interes}%" role="progressbar" aria-valuenow="${e.interes}" aria-valuemin="0" aria-valuemax="100">${e.interes}%</div>
                            </div>
                        </td>
                        <td>${e.nom_Ciudad}</td>
                        <td>${e.nom_Compañia}</td>                       
                        
                        <td><button  onclick="validarActualizar(${e.id_Contacto})" type='button' data-toggle="modal" data-target="#modalAgregarContacto" class='btn btn-info btn-warning btn-sm acc'><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Modificar</button>                            
                            <button type="button" class="btn btn-danger"  onclick="eliminarSoloUnContacto(${e.id_Contacto})" data-bs-toggle="modal" data-bs-target="#eliminarVariosContactos">
                             Eliminar
                            </button>
                        </td></tr>`;
                    rows.insertAdjacentHTML('beforeend', template);
                });
            });
           // encontrarCompanias(jwt);
          //  encontrarRegiones(jwt);
        }).catch(error => {
            console.log(error);
        });
    }else {
        location.href = "../html/index.html";
    }
    agregarContacto.addEventListener('click', () => {
        nombre.value = "";
        apellido.value = "";
        emailC.value = "";
        cargo.value = "";
        editarContactoBtn.style.display = "none";
        crearContactoBtn.style.display = "initial";
    });
    crearContactoBtn.addEventListener('click', () => {
        agregarContactoFunc(jwt);
    });
};

// eliminar varios contactos  seleccionados
let idsContacts = [];

function getChecked() {
    let itemSelect = document.querySelectorAll('input[type="checkbox"]:checked');
    count.innerHTML = itemSelect.length + " Contactos Seleccionados";
    multDelete.style.display = itemSelect.length <= 1 ? "none": "initial";   
}

eliminarVariosContactosBtn.addEventListener('click', () => {
    multDeleteContacts();
});

function multDeleteContacts() {
    let itemSelect = document.querySelectorAll('input[type="checkbox"]:checked');
    itemSelect.forEach((e) => {
        console.log(e);
        if (jwt != null) {
            fetch(`http://localhost:3000/eliminarContacto/${e.dataset.id}`, {
                method: 'DELETE',
                headers:{"Content-Type":"application/json"}
            }).then(res => {
                if (res.status == 200) {
                    console.log(res.status);                   
                } else {
                    console.log("error");
                    alert('No se pudo realizar la acción');
                }
            }).catch(error => {
                 console.log(error);
            }); 
        }        
    }); 
    alert('Los contactos seleccionados han sido eliminados');
    location.href = location.href;
}

// eliminar un solo contacto


function eliminarSoloUnContacto(id_Contacto) {  
    let eliminarUnContactoBtn = document.getElementById("eliminarVariosContactosBtn");   
    eliminarUnContactoBtn.addEventListener('click', ()=> {
        eliminarUnContacto(id_Contacto);    
    });    
}


function eliminarUnContacto(id_Contacto) {
    console.log(id_Contacto);
   // let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:3000/eliminarContacto/${id_Contacto}`, {
        method: 'DELETE',
        headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
           // alert('Contacto eliminado');
           location.href = location.href; // recargar 

        } else {
            console.log("error");
        }
    }).catch(error => {
         console.log(error);
    }); 
    }
    location.href = location.href;
}