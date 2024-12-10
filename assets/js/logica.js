const asignarEventos = ()=>{
    let elBotonConsumo = document.getElementById('btnConsumo');
    elBotonConsumo.addEventListener('click', consumirAPIStarWarsCompleta);
    let elDivPopulares = document.getElementById('divPopulares');
    elDivPopulares.addEventListener('mouseenter', pintarPopulares);
    let elDivSecundarios = document.getElementById('divSecundarios');
    elDivSecundarios.addEventListener('mouseenter', pintarSecundarios);
    let elDivOtros = document.getElementById('divOtros');
    elDivOtros.addEventListener('mouseenter', pintarOtros);
};

let contadorPopulares = 1;
let contadorSecundarios = 6;
let contadorOtros = 12;

var generadorCrearCardPopulares = crearCardPopulares();
var generadorCrearCardSecundarios = crearCardSecundarios();
var generadorCrearCardOtros = crearCardOtros();


const consumirAPIStarWarsCompleta = ()=>{
    console.log('consumiendo API');
    let url = `https://swapi.dev/api/people/`;
    fetch(url)
        .then( (respuesta)=>{
            // respuesta cruda de la API -raw-
            console.log(respuesta);
            // transformamos la respuesta cruda en un objeto legible por JS
            respuesta.json()
                    .then( (objJsonRespuesta)=>{
                        console.log(objJsonRespuesta);

                    })
                    .catch( (errorTransformacion)=>{
                        console.log('Error transformando en JSON la respuesta: ', errorTransformacion);
                    });

        })
        .catch( (error)=>{
            console.log('error consumiendo la API: ',error);
        });
};



const consumirAPIStarWars = (contador, color)=>{
    console.log('consumiendo API');
    let url = `https://swapi.dev/api/people/${contador}`;
    fetch(url)
        .then( (respuesta)=>{
            // respuesta cruda de la API -raw-
            console.log(respuesta);
            // transformamos la respuesta cruda en un objeto legible por JS
            respuesta.json()
                    .then( (objJsonRespuesta)=>{
                        console.log(objJsonRespuesta);
                        
                            let divCard = document.createElement('div');
                            divCard.setAttribute("class", "estilosCards");
                            let laClaseCirculo = '';

                            switch(color){
                                case 'rojo':
                                    laClaseCirculo = "circuloRojo";
                                    break;
                                case 'verde':
                                    laClaseCirculo = "circuloVerde";
                                    break;
                                case 'azul':
                                    laClaseCirculo = "circuloAzul";
                                    break;
                                default:
                                    laClaseCirculo = "circuloDefault";
                            }
                                

                            let contenidoCard = `
                                                    <div class="card" style="width: 18rem;">
                                                        <div class="card-body">
                                                        <h5 class="card-title" id="txtNombre"><div class=${laClaseCirculo}></div>  ${objJsonRespuesta.name} </h5>
                                                        <div class="container">
                                                            <div class="row">
                                                                <div class="col-6">
                                                                    <p>Altura: <span id="txtAltura">${objJsonRespuesta.height}</span> cm </p>
                                                                </div>
                                                                <div class="col-6">
                                                                    <p>Masa: <span id="txtMasa">${objJsonRespuesta.mass}</span> kg </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                            `;
                            divCard.innerHTML = contenidoCard;
                            // buscamos el contenedor de cards para asociarle el div recien creado
                            document.getElementById('contenedorCards').appendChild(divCard);


                    })
                    .catch( (errorTransformacion)=>{
                        console.log('Error transformando en JSON la respuesta: ', errorTransformacion);
                    });

        })
        .catch( (error)=>{
            console.log('error consumiendo la API: ',error);
        });
};




const pintarPopulares = ()=>{
    console.log('Pintando Populares');
    generadorCrearCardPopulares.next();
    console.log('Contador Populares: ', contadorPopulares);
};

const pintarSecundarios = ()=>{
    console.log('Pintando Secundarios');
    generadorCrearCardSecundarios.next();
    console.log('Contador Secundarios: ', contadorSecundarios);

};

const pintarOtros = ()=>{
    console.log('Pintando Otros');
    generadorCrearCardOtros.next();
    console.log('Contador Otros: ', contadorOtros);
};


function* crearCardPopulares(){

    while( contadorPopulares<=5){

        consumirAPIStarWars(contadorPopulares, 'rojo');

        yield contadorPopulares++;

    }
}


function* crearCardSecundarios(){

    while( contadorSecundarios<=11){

        consumirAPIStarWars(contadorSecundarios, 'verde');

        yield contadorSecundarios++;

    }
}


function* crearCardOtros(){

    while( contadorOtros<=17){

        consumirAPIStarWars(contadorOtros, 'azul');

        yield contadorOtros++;

    }
}