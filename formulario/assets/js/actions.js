
/*$(document).ready(function () {
    alert("Jquery Funciona");
}); */


/* diccionario
(e) = evento
=>: Arrow Function (Función): Es una forma concisa de escribir funciones en JavaScript. La sintaxis () => {} representa una función flecha sin parámetros, mientras que 
(parametro) => {} representa una función flecha con un parámetro.
[] = Indica la creación de un nuevo array vacio
{} =  Indica la creación de un nuevo objeto vacio
forEach = (metodo array) se utiliza para iterar sobre todos los elementos de un array

*/
const formulario = document.getElementById('formulario');
// almacenamos todos los input del formulario. ALL para acceder a todos ellos
const inputs = document.querySelectorAll('#formulario input');

// EXPRESIONES REGULARES
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

//comprobamos los campos cuando levantemos la tecla y cliquemos afuera
const validarFormulario = (e) => {
    //console.log('se ejecuta bien');
    switch (e.target.name) {
        //validaciones
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;

        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;

        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;

        case "password2":
            validarPassword2();
            break;

        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;

        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');

            break;
    }
}

// agregamos la funcion y le pasamos 3 valores. (campo tomara un valor dinamico)
// `` tomara el valor que nosotros le pasemos a nuestra variable desde arriba ej "name"
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        // si la expresion es correcta se ejecuta
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        // icono ARREGLAR
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        //agregamos la clase para formulario incorrecto
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        // icono 
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        //aparece el texto invisible del html
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;

    }
}
// funcion que asignamos a password2
const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    //que se ejecute si la condicion NO es igual
    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        // icono 
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        //aparece el texto invisible del html
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;

    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        // icono 
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        //aparece el texto invisible del html
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;

    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

// cuando el usuario presione el boton enviara los datos en la barra
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    // validamos si todos los campos estan correctos
    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        //reiniciamos todos los campos del formulario
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        //que el mensaje se elimine despues de 5 segundos
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });

        //si algun campo o todos NO estan completados lanzara el mensaje
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }

});
