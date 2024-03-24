let botonEnviar = document.getElementById("enviar");
const mensajeErrorFaltantes = document.getElementById("mensajeErrorFaltantes");
let aPaterno_elemento = document.getElementById("aPaterno");
let aMaterno_elemento = document.getElementById("aMaterno");
let nombres_elemento = document.getElementById("nombres");
let correo_elemento = document.getElementById("correo");
const fechaNacimiento_elemento = document.getElementById("fecha");//
const valorNoControl_elemento = document.getElementById("noControl");
let edadInput = document.getElementById("edad");
let telefono_elemento = document.getElementById("telefono");

const cadenaRegexEspacios = /^\s+$/;
let numeroFinal = "";
let contador = 0;


botonEnviar.addEventListener("click", function () {

  validarNoControl();
  calcularEdad();
  verificarNombre();
  validarTelefono();
  validarCorreo();


  if (contador == 7) {
    alert("Se agregó con éxito");

    mensajeErrorFaltantes.innerText = "";
    let id=valorNoControl_elemento.value;
    let nombre=nombres_elemento.value;
    let apellidos= aPaterno_elemento.value+ " " +aMaterno_elemento.value;
    let correo=correo_elemento.value;
    let edad=edadInput.value;
    let fechaNacimiento=fechaNacimiento_elemento.value;
    const envio={
     id,nombre,apellidos,numeroFinal, correo,edad,fechaNacimiento
    }
    const envios = JSON.parse(localStorage.getItem("envios")) || [];
         // Agregar el nuevo envío al arreglo
        envios.push(envio);
         // Guardar el arreglo actualizado en el almacenamiento local
        localStorage.setItem("envios", JSON.stringify(envios));
         // Redireccionar a la página de resultados
        window.open("resultados.html",'_blank');
   
    limpiarForm();
  }

  
});
function limpiarForm() {
  document.location.reload();

}
function validarNoControl() {
  // ^inicio de expreesion
  // \d valor numerico
  //{5} 5 caracters
  const noControlTamano = /^\d{5}$/;
  if (valorNoControl_elemento.value === "" || cadenaRegexEspacios.test(valorNoControl_elemento.value)) {
    marcarError("vacio", valorNoControl_elemento);


  }
  else if (!noControlTamano.test(valorNoControl_elemento.value)) {
    document.getElementById("mensajeErrorNoControl").innerText = "Número de control debe contener solo 5 digitos";
    valorNoControl_elemento.style.borderColor = "red";


  }
  else {
    valorNoControl_elemento.style.borderColor = "green";
    document.getElementById("mensajeErrorNoControl").innerText = "";
    contador++;
  }

}
function marcarError(condicion, elemento, mensajeEspecial, labelError) {
  switch (condicion) {
    case "vacio":
      elemento.style.borderColor = "red";
      mensajeErrorFaltantes.innerText = "*Ingresa los campos faltantes";
      contador = 0;
      break;
    case "invalido":
      contador = 0;
      elemento.style.borderColor = "red";
      labelError.innerText = mensajeEspecial;
      break;
  }


}


function marcarCorrecto(elemento, labelError) {

  elemento.style.borderColor = "green";
  labelError.innerText = "";

}
function verificarNombre() {
  let labelErrorAM = document.getElementById("mensajeErrorAmaterno");// label para mostrar mensaje de error appelido materno
  let labelErrorAP = document.getElementById("mensajeErrorApaterno");// label para mostrar mensaje de error appelido paterno
  let labelErrorNombres = document.getElementById("mensajeErrorNombres");//label para mostrar mensaje de error nombre

  const cadenaRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  // Apellido Materno
  if (aMaterno_elemento.value === "" || cadenaRegexEspacios.test(aMaterno_elemento.value)) {//si aMaterno esta vacio o si la cadena contiene solo espacios
    aMaterno_elemento.value = "";//resetea el valor de aMaterno a vacio; 
    marcarError("vacio", aMaterno_elemento, "", null);//llama al metodo para remarcar caja de color rojo


  }
  else if (cadenaRegex.test(aMaterno_elemento.value)) {//si aMaterno cumple con expresion regular

    marcarCorrecto(aMaterno_elemento, labelErrorAM);
    contador++;

  }
  else {//si aMaterno NO cumple con expresionRegular

    marcarError("invalido", aMaterno_elemento, "Apellido materno inválido", labelErrorAM); //


  }

  // Apellido Paterno
  if (aPaterno_elemento.value === "" || cadenaRegexEspacios.test(aPaterno_elemento.value)) {//si aPaterno esta vacio o si la cadena contiene solo espacios
    aPaterno_elemento.value = "";//resetea el valor de aPaterno a vacio; 
    marcarError("vacio", aPaterno_elemento, "", null);

  }
  else if (cadenaRegex.test(aPaterno_elemento.value)) {//si aPaterno cumple con expresion regular

    marcarCorrecto(aPaterno_elemento, labelErrorAP);
    contador++;
  }
  else {//si aPaterno NO cumple con expresionRegular

    marcarError("invalido", aPaterno_elemento, "Apellido paterno inválido", labelErrorAP); //

  }

  //Nombres
  if (nombres_elemento.value === "" || cadenaRegexEspacios.test(nombres_elemento.value)) {//si aPaterno esta vacio o si la cadena contiene solo espacios
    nombres_elemento.value = "";//resetea el valor de aPaterno a vacio; 
    marcarError("vacio", nombres_elemento, "", null);

  }
  else if (cadenaRegex.test(nombres_elemento.value)) {//si aPaterno cumple con expresion regular

    marcarCorrecto(nombres_elemento, labelErrorNombres);
    contador++;
  }
  else {//si aPaterno NO cumple con expresionRegular

    marcarError("invalido", nombres_elemento, "Nombre(s) inválido", labelErrorNombres); //

  }


}
function validarCorreo() {
  let labelErrorCorreo = document.getElementById("mensajeErrorCorreo");
  let cadenaRegexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (correo_elemento.value === "" || cadenaRegexEspacios.test(correo_elemento.value)) {
    marcarError("vacio", correo_elemento, "", null);
    correo_elemento.value = "";


  }

  else if (cadenaRegexCorreo.test(correo_elemento.value)) {
    marcarCorrecto(correo_elemento, labelErrorCorreo);
    contador++;

  }
  else {
    marcarError("invalido", correo_elemento, "Correo Invalido", labelErrorCorreo);

  }

}
function validarTelefono() {

  let labelErrorTelefono = document.getElementById("mensajeErrorTelefono");
  let cadenaRegexTelefono = /^\d{3}\d{3}\d{4}$/;
  // ^inicio de la expresion
  if (telefono_elemento.value == "" || cadenaRegexEspacios.test(telefono_elemento.value)) {
    marcarError("vacio", telefono_elemento, "", null);
    telefono_elemento.value = "";

  }

  else if (cadenaRegexTelefono.test(telefono_elemento.value)) {
    contador++;
    marcarCorrecto(telefono_elemento, labelErrorTelefono);
    let nuevoNumero = Array.from(telefono_elemento.value);
    nuevoNumero[0] = "(" + nuevoNumero[0];
    nuevoNumero[2] = nuevoNumero[2] + ") ";
    nuevoNumero[5] = nuevoNumero[5] + " - "
    numeroFinal = nuevoNumero.join("");

  }
  else {
    marcarError("invalido", telefono_elemento, "Ingresa solo numeros", labelErrorTelefono);

  }
}

function calcularEdad() {
  let edad = 0;
  let labelFecha = document.getElementById("mensajeErrorFecha");//label para mensaje de error fechaNacimiento

  const fechaArray = fechaNacimiento_elemento.value.split("-");//crea un array 3 elementos con los valores de fecha de nacimiento {año,mes,dia}
  const fechaHoy = new Date().toJSON().slice(0, 10).split("-");//crea un array de 3 elementos con los valores de fecha del dia de hoy {año,mes,dia}
  let mesHoy = parseInt(fechaHoy[1]);// guarda el mes actual
  let mesNacimiento = parseInt(fechaArray[1]);//guarda el mes de la fecha de nacimiento del array
  let diaHoy = parseInt(fechaHoy[2]);// guarda el dia de hoy del array
  let diaNacimiento = parseInt(fechaArray[2]); // guarda el dia de la fecha de nacimiento del array
  let anioHoy = parseInt(fechaHoy[0]); // guarda el anio de la fecha de hoy del array
  let anioNacimiento = parseInt(fechaArray[0]);// guarda el anio de la fecha de nacimiento del array

  if (fechaNacimiento_elemento.value === "") {//evalua si esta vacia la fecha de nacimiento

    marcarError("vacio", fechaNacimiento_elemento);

  }

  else if (anioNacimiento > anioHoy)
    marcarError("invalido", fechaNacimiento_elemento, "Año de nacimiento no puede ser mayor al año actual", labelFecha);


  else if (mesHoy < mesNacimiento || (mesHoy === mesNacimiento && diaHoy < diaNacimiento)) { //evalua si el mes y el dia de nacimiento aun no suceden 
    edad = (anioHoy - anioNacimiento) - 1;
    edadInput.value = edad;
    marcarCorrecto(fechaNacimiento_elemento, labelFecha);
    contador++;
  }

  else {

    edad = anioHoy - anioNacimiento;
    edadInput.value = edad;
    fechaNacimiento_elemento.style.borderColor = "green";
    contador++;
  }




}


 
let eventoFecha=document.getElementById("fecha");
eventoFecha.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    calcularEdad();
    contador--;
  }
});

