
### Proyecto: Data Warehouse ###
Herramienta que permite a una compañía de Marketing administrar todos
los contactos de sus clientes para sus campañas.


Pasos para la ejecucion del proyecto:

# Instalación de dependencias
---
1. Ejecutar en consola `npm install`.


# Ejecutar script  para crear la base de datos
1. crear la base de datos en mysql ejecutando el codigo que hay en el archivo script_BD.sql que se encuentra dentro de la carpeta db.


# Crear variables de entorno 
1. crear un archivo .env dentro de la carpeta backEnd/js
2. crear las siguientes variables en el archivo .env asignandoles valores para la conexion y generacion de token:

   USER=
   PASS=
   SECRET=

Nota: USER y PASS para la conexion a la base de datos 
      Ejemplo :  USER=root
                 PASS=1234

      SECRET para la generacion del token 
      Ejemplo :  SECRET=llave


# Ejecutar la aplicación 
 En la carpeta js que se encuentra dentro de la carpeta backEnd (backEnd\js>)

1. Ejecutar en la consola `node app.js `. 


# Documentación 

Se debe ingresar a la carpeta DataWarehouse/frontEnd/html e ingresar al archivo index.html. Posteriormente se debe de iniciar sesión con datos de usuarios que se encuentran en la tabla usuarios creada anteriormente, allí encontrará usuarios con perfil de Administrador y usuarios con perfil Contactos para los usuarios comunes.



# Endpoints
A continuación se indican algunos ejemplos de las peticiones realizadas


POST --> Login: http://localhost:3000/login

POST --> Agregar Usuarios: http://localhost:3000/crearUsuario

GET --> Listar Usuarios: http://localhost:3000/infoUsuarios

PUT --> Actualizar Usuario: http://localhost:3000/modificarUsuario/:id

DELETE --> Eliminar Usuario: http://localhost:3000/eliminarUsuario/:id



¡continuar navegando sobre la página!...


