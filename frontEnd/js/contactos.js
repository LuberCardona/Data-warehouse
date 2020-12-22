
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


setTimeout(() => {
    $(document).ready(function() {
        $('#tablaContactos').DataTable();
    });
}, 1050);


// obtener todos los contactos DB
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
                        <td>${e.nom_Compania}</td>                       
                        
                        <td>
                            <button type="button" onclick="getInfoContactoAmodificar(${e.id_Contacto})" class="btn btn-warning" id="modificarBtnMostrarModal" data-bs-toggle="modal" data-bs-target="#agregarContactoModal">
                            Modificar
                            </button>
                            
                            <button type="button" class="btn btn-danger"  onclick="eliminarSoloUnContacto(${e.id_Contacto})" data-bs-toggle="modal" data-bs-target="#eliminarVariosContactos">
                             Eliminar
                            </button>
                        </td>
                    </tr>`;
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
        emailC.value = "";
        cargo.value = "";
        editarContactoBtn.style.display = "none";
        //crearContactoBtn.style.display = "initial";
    });
    crearContactoBtn.addEventListener('click', () => {
    agregarContactoN(jwt);
    });    
    
};



//onclick="validarActualizar(${e.id_Contacto})"



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
       // console.log(e);
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

// obtener compañias

function encontrarCompanias(jwt) {
    fetch('http://localhost:3000/infoCompanias', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
               // console.log(e);
                let templateCompanias = `<option value=${e.id_Comp}>${e.nom_Comp}</option>`
               // console.log(e.nom_Comp);
               // console.log(e.id_Comp);
                listaCompanias.insertAdjacentHTML('beforeend', templateCompanias);
            });
        });
    }).catch(error => {
        console.log(error);
    });
};

// Obtener regiones
function encontrarRegiones(jwt) {
    fetch('http://localhost:3000/infoRegiones', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
               // console.log(e);
                let templateRegiones = `<option value=${e.id}>${e.Nombre}</option>`
                listaRegiones.insertAdjacentHTML('beforeend', templateRegiones);
            });
        });
            
    }).catch(error => {
        console.log(error);
    });
};

// ubicacion pais/ region
listaRegiones.addEventListener('change', () => {
    document.getElementById('pais').innerHTML = '';
    document.getElementById('ciudad').innerHTML = '';
    let opcionPaises = document.createElement("option");
    let opcionCiudades = document.createElement("option");
    opcionPaises.innerHTML = "Seleccionar...";
    opcionPaises.value = 0;
    opcionCiudades.innerHTML = "Seleccionar...";
    opcionCiudades.value = 0;
    listaPaises.appendChild(opcionPaises);
    listaCiudades.appendChild(opcionCiudades);

    encontrarPaises(jwt, listaRegiones.value);
});

// obtener paises x region id
function encontrarPaises(jwt, region_id) {
    fetch(`http://localhost:3000/infopaises/${region_id}`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
               // console.log(e);
                let templatePaises = `<option value=${e.id}>${e.Nombre}</option>`
                listaPaises.insertAdjacentHTML('beforeend', templatePaises);
            });
        });
        
    }).catch(error => {
        console.log(error);
    });
}
// ciudad pais
listaPaises.addEventListener('change', () => {
    document.getElementById('ciudad').innerHTML = '';
    let option = document.createElement("option");
    option.innerHTML = "Seleccionar...";
    option.value = 0;
    listaCiudades.appendChild(option);
    encontrarCiudad(jwt, listaPaises.value);
});

// obtener ciudad por pais id
function encontrarCiudad(jwt, pais_id) {
    fetch(`http://localhost:3000/infoCiudades/${pais_id}`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
               // console.log(e);
               let templateCiudades = `<option value=${e.id}>${e.Nombre}</option>`
                listaCiudades.insertAdjacentHTML('beforeend', templateCiudades);
            });
        });
        
    }).catch(error => {
        console.log(error);
    });
}

// agragar contacto

function agregarContactoN(){  
    if(jwt != null){    
    fetch('http://localhost:3000/agregarContactoN',{
            method:'POST',
            body:`{
                "Nombre": "${nombre.value}",
                "Apellido": "${apellido.value}",
                "Cargo": "${cargo.value}",
                "email": "${emailC.value}",
                "Canal_favorito": "${canal_favorito.value}",
                "Interes": "${interes.value}",
                "ciudad_id": ${listaCiudades.value},
                "compania_id": ${listaCompanias.value}         
            }`,
                headers:{"Content-Type":"application/json"}
        }).then(response3 => {
            response3.json().then((data3)=>{  
                console.log(response3.status);                          
                if(response3.status == 200){                
                    alert('Contacto creado');                                  
                }else if(response3.status == 409){                
                    alert('Contacto ya existe');                
                }
            }).catch( error => {
            });
        }).catch( error => {
        });
    } 
    
}


// modal modificar sin btn crear - GET DE CONTACTOS POR ID

function getInfoContactoAmodificar(id_Contacto) {
    if (jwt != null) {
        fetch(`http://localhost:3000/infoContacto/${id_Contacto}`, {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {
                nombre.value = data[0].Nombre;
                apellido.value = data[0].Apellido;
                cargo.value = data[0].Cargo;
                emailC.value = data[0].email;
                canal_favorito.value = data[0].Canal_favorito;
                interes.value = data[0].Interes;
                listaCompanias.value = data[0].compania_id;        
               
                console.log(data);
             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 
    }
    crearContactoBtn.style.display = "none";
    editarContactoBtn.style.display = "initial";
    editarContactoBtn.addEventListener('click', () => {
    editarContactoN(jwt, id_Contacto);
    }); //  BTN MODIFCAR DEL MODAL
}

// FUNCION MODIFICAR CONTACTO POR ID

function editarContactoN(jwt, id_Contacto) {
    //console.log(id_Contacto);
    if (jwt != null) {
        fetch(`http://localhost:3000/modificarContacto/${id_Contacto}`, {
             method: 'PUT',
             body: `{
                "Nombre": "${nombre.value}",
                "Apellido": "${apellido.value}",
                "Cargo": "${cargo.value}",
                "email": "${emailC.value}",
                "Canal_favorito": "${canal_favorito.value}",
                "Interes": "${interes.value}",
                "ciudad_id": ${listaCiudades.value},
                "compania_id": ${listaCompanias.value}
            }`,
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("Contacto Actualizado");
                location.href = location.href; 

            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }
}