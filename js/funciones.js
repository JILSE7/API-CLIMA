import { validacion } from '../../32-PROYECTO-CRMIndexedDB/js/variables.js';
import { select, input, container, resultado } from './variables.js';
//Funciones del programa
function buscarClima(e) {
    e.preventDefault();
    if (!validar()) {
        mostrarError('Ambos campos son obligatorios');

        return
    }
    //Consultar API
    consultarAPI(input.value, select.value);
}

//Valida formulario
function validar() {
    //Si los valores no existen 
    if ((!select.value || !input.value)) {
        return false;
    } else { return true }
}

//Mostrar cuadro de error
function mostrarError(mensaje) {

    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        //Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
             <strong class='font-bold'>Error</strong>
              <span class='block'>${mensaje}</span>
                                                     `;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove()
        }, 2000);
    }
};


//Consultando API
function consultarAPI(ciudad, pais) {

    const appID = 'cd64f4eb49f4e8de11eb5a1729cd49b3';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    spinner();
    setTimeout(() => {
        fetch(url)
            .then(resultado => resultado.json())
            .then(resultado => {
                limpiarHtml()
                if (resultado.cod === '404') {
                    mostrarError('ciudad no encontrada');
                    return
                }
                mostrarClima(resultado)
            })
            // .catch(er => {
            //     console.log(er);
            // })
            //Este caso es importante, ya que si mandamos una ciudad que no existe
            //la promesa se resuelve pero, la ciudad no existe, por eso no cae en el catch

    }, 5000);

}

//Mostrar el clima
function mostrarClima(datos) {

    //Desestrcuturando un objeto dentro de otro objeto
    const { name, main: { temp, temp_max, temp_min } } = datos;
    const centigrado = toCelcius(temp);
    const max = toCelcius(temp_max);
    const min = toCelcius(temp_min);
    const actual = document.createElement('p'),
        tmax = document.createElement('p'),
        tmin = document.createElement('p'),
        ciudad = document.createElement('h4');

    ciudad.textContent = name;
    actual.innerHTML = `${centigrado} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');
    ciudad.classList.add('font-bold', 'text-3xl');


    tmax.innerHTML = `Max: ${max} &#8451;`;
    tmin.innerHTML = `Min: ${min} &#8451;`;


    const resultadoDiv = document.createElement('div');
    resultadoDiv.className = 'text-center text-white';
    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(tmax).appendChild(actual);
    resultado.appendChild(resultadoDiv).appendChild(tmin);



}

const toCelcius = grados => (grados - 272.15).toFixed(2);



//Limpiar HTML
function limpiarHtml() {

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

//Spinner
const spinner = () => {
    limpiarHtml();
    const spinnerDiv = document.createElement('div');
    spinnerDiv.classList.add('sk-fading-circle');
    spinnerDiv.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(spinnerDiv);
}
export {
    buscarClima
}