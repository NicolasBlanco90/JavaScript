// EVITAR EL RECARGO DE DATOS POR DEFECTO (SUBMIT) DEL FORMULARIO
let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
}
