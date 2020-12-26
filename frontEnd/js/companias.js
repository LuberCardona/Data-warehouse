let rowsC = document.getElementById("rowsC"); 
let menuUsuarios = document.getElementById("menuUsuarios");  
let nombreC = document.getElementById("nombre");
let direccionC = document.getElementById("direccion");
let emailComp = document.getElementById("email");
let telefono = document.getElementById("telefono");

let listaCiudades  = document.getElementById("ciudad"); 


let agregarCompania = document.getElementById("agregarCompania"); 
let crearCompaniaBtn = document.getElementById("crearCompania"); 
let editarCompaniaBtn = document.getElementById("editarCompania"); 

setTimeout(() => {
    $(document).ready(function() {
        $('#tablaCompanias').DataTable();
    });
}, 180);

  

window.onload = function () {
    if (jwt != null) {
        if (parseJwt(jwt).perfilUsuario == "Contactos") {
           removeUserPage.remove();
    }
        fetch('http://localhost:3000/infoCompanias', {
                method: 'GET',
                headers: { "Authorization": "Bearer " + jwt }
            }).then(res => {
                res.json().then(data => {
                    data.forEach((e) => {

                        let template = 
                        `<tr>
                            <td>${e.nom_Comp}</td>
                            <td>${e.direccion_Comp}</td>
                            <td>${e.email_Comp}</td>
                            <td>${e.telefono_Comp}</td>
                            <td>${e.nom_Ciudad}</td>                            
                            <td>
                              <button type="button" class="btn btn-warning" onclick="validarActualizar(${e.id_Comp})" data-bs-toggle="modal" data-bs-target="#agregarCompaniaModal">
                                Modificar
                              </button>                             

                              <button type="button" class="btn btn-danger" onclick="eliminarCompaniaConfirmar(${e.id_Comp})" data-bs-toggle="modal" data-bs-target="#eliminarCompaniasModal">
                               Eliminar
                              </button>
                            </td>
                        </tr>`;
                        rowsC.insertAdjacentHTML('beforeend', template);
                    });
                });
               encontrarCiudades(jwt);
            }).catch(error => {
                console.log(error);
            });
    } else {
        location.href = "../index.html";
    }
    
        agregarCompania.addEventListener('click', () => {
            nombreC.value = "";
            direccionC.value = "";
            emailComp.value = "";
            telefono.value = "";
            editarCompaniaBtn.style.display = "none";
           // crearCompaniaBtn.style.display = "initial";
        });
         crearCompaniaBtn.addEventListener('click', () => {
            agregarCompaniaN(jwt);
        });
            
};   




// funcion eliminar compañias // DELETE

function eliminarCompaniaConfirmar(id_Comp) {      
   let eliminarCompaniaBtn = document.getElementById("eliminarCompaniasBtn");  // btn eliminar del modal 
   eliminarCompaniaBtn.addEventListener('click', ()=> {
    eliminarUnaCompania(id_Comp);    
    });    
}

function eliminarUnaCompania(id_Comp) {
    console.log(id_Comp);
    if (jwt != null) {
        console.log(jwt);
        fetch(`http://localhost:3000/eliminarCompania/${id_Comp}`, {
        method: 'DELETE',
        headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            console.log(res.status);
            alert('Compañía eliminada');
            location.href = location.href; 

        } else if(res.status == 400){
            console.log(res.status);
            alert('No es posible eliminar la compañia ya que ésta se encuentra asociada a un contacto');
            location.href = location.href; 
        }
    }).catch(error => {
         console.log(error);
    }); 
    }
}



// obtener ciudades

function encontrarCiudades(jwt) {
    fetch('http://localhost:3000/infoCiudades', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
               // console.log(e);
                let templateCiudades = `<option value=${e.id_Ciudad}>${e.nom_Ciudad}</option>`
                listaCiudades.insertAdjacentHTML('beforeend', templateCiudades);
            });
        });
    }).catch(error => {
        console.log(error);
    });
};

// AGREGAR COMPAÑIA

function agregarCompaniaN(jwt) {
  //  console.log(listaCiudades.value);
    if (jwt != null) {
       fetch('http://localhost:3000/agregarCompania', {
            method: 'POST',
            body: `{
                "Nombre": "${nombreC.value}",
                "Direccion": "${direccionC.value}",
                "email": "${emailComp.value}",
                "Telefono": ${telefono.value},
                "ciudad_id": ${listaCiudades.value}
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
               // console.log(data);
                alert("Compañía Creada");
                location.href = location.href; // recargar

            });
        } else {
            console.log("error");
            }
        }).catch(error => {
            console.log(error);
        }); 
    } 
}


// modificar compañia

function validarActualizar(compania_id) {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:3000/infoCompania/${compania_id}`, {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {
                nombreC.value = data[0].Nombre;
                direccionC.value = data[0].Direccion;
                emailComp.value = data[0].email;
                telefono.value = data[0].Telefono;
                listaCiudades.value = data[0].ciudad_id;
                //console.log(data);
             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 
    }
    crearCompaniaBtn.style.display = "none";
    editarCompaniaBtn.style.display = "initial";
    editarCompaniaBtn.addEventListener('click', () => { // clic btn modificar del modal
    editarCompaniaFunc(jwt, compania_id);
    });
}


function editarCompaniaFunc(jwt, compania_id) {
    console.log(compania_id);

    if (jwt != null) {
        fetch(`http://localhost:3000/modificarCompania/${compania_id}`, {
             method: 'PUT',
             body: `{
                "Nombre": "${nombreC.value}",
                "Direccion": "${direccionC.value}",
                "email": "${emailComp.value}",
                "Telefono": ${telefono.value},
                "ciudad_id": ${listaCiudades.value}
            }`,
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("Compañía modificada");
               location.href = location.href; //recargar

            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }
}



