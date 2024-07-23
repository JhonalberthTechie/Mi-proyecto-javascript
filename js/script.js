
function pedirNombre() {
    let nombre = prompt("¿Cómo te llamas?");
    return nombre;
}

// procesa nombre
function procesarNombre(nombre) {
    return `Hola, ${nombre}! Bienvenido a mi simulador .`;
}

// redactar el resultado
function mostrarResultado(mensaje) {
    alert(mensaje);
}

// Función para pedir y mostrar el interés del usuario
function preguntarInteres() {
    let interes = prompt("¿Qué te gustaría aprender hoy? Opciones: Funciones, Variables, Ciclos?");
    return `Genial! Aprenderás sobre ${interes}.`;
}

// Funcion para mostrar características de la página
function mostrarCaracteristicas() {
    return `Esta clase ofrece los siguientes recursos:\n1. Tutoriales interactivos\n2. Ejemplos de código\n3. Desafíos para practicar`;
}

// Funcion de let 
function simulador() {
    let nombre = pedirNombre();
    let mensaje = procesarNombre(nombre);
    mostrarResultado(mensaje);
    
    let interes = preguntarInteres();
    mostrarResultado(interes);
    
    let caracteristicas = mostrarCaracteristicas();
    mostrarResultado(caracteristicas);
}


simulador();
