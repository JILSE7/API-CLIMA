//Variables
import { formulario, container, resultado } from './variables.js';
//Funciones
import { buscarClima } from './funciones.js';
window.addEventListener('load', () => {

    formulario.addEventListener('submit', buscarClima);
});