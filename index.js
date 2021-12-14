const draggables = document.querySelectorAll('.draggable')
console.log('array rincipal ',draggables)
const containers = document.querySelectorAll('.container')
var aux = [];

//forEach => es un bucle que se utiliza para recorrer arrays en este caso recorre la classes
draggables.forEach(parametro => {

    parametro.addEventListener('dragstart', () => { //Se dispara cuando el usuario selecciona el elemento que quiere arrastrar.
        //console.log('comienza el drag')
        //classList => es accede a la lista de clases 
        //add => agrega un nuevo valor al final, 
        parametro.classList.add('dragging') //esra en el css
    })
    //dragend => Se dispara cuando el elemento se suelta,no importa si adentro o fuera del contenedor.
    parametro.addEventListener('dragend', () => {
        //remove => elimina una propiedad
        parametro.classList.remove('dragging')
    })
})

containers.forEach(parametro => {
    parametro.addEventListener('dragover', e => { //Se dispara cuando el elemento se encuentra por encima de un elemento dentro del contenedor 
        e.preventDefault()

        const despuesDelElemento = getDragAfterElement(parametro, e.clientX)
        const estilo = document.querySelector('.dragging')

        if (despuesDelElemento == null) {
            //inserta un nuevo nodo al final del contenedor con las caracteristicas de css
            parametro.appendChild(estilo)
        } else {
            //inserta un hijo nuevo en un lugar determinado, se le pasa 1ro elemento a insertar 2do antes que noo hijo va ir el nuevo 
            //nodo
            parametro.insertBefore(estilo, despuesDelElemento)
        };
    })
});

function getDragAfterElement(parametro, x) {
    aux.length=0;
    // con Spread Operator realizo una copia exacta de la matriz, va ser utilizada  varias veces, con el selector llamo a las classes 
    //que son 3 antes era 4, el elemento seleccionado queda oculto por 'dragstart' y con css le doy otro color 
    // :not() => es una pseudoclase de css. le da color aquel elemento que NO esta en el array 
    // es Spread Operator
    const draggableElements = [...parametro.querySelectorAll('.draggable:not(.dragging)')]
    //console.log('que es draggableElements ', draggableElements) //es un array
    //valor acomlado y evento que se esta iterando del evento
    return draggableElements.reduce((valorAnterior, vuelActualN) => {

        //getBoundingClientRect() => devuelve el tamaño de un elemento y su posición 
        //muestra la ubicacion
        const caja = vuelActualN.getBoundingClientRect()
        //cuando la caja es vertucal usamos top y height y si es horizontal es left y width del metodo ofset()
        const offset = x - caja.left - caja.width / 2
        //aca calculamos las coordinadas para las 
        if (offset < 0 && offset > valorAnterior.offset) {
                //concat => une en un solo array
                aux =aux.concat(draggableElements) 
            return {
                offset: offset,
                element: vuelActualN,
            }
        } else {
            aux =aux.concat(draggableElements)
            return valorAnterior
        };
        },{ 
        offset: Number.NEGATIVE_INFINITY
    }).element
};

var palabra1 = document.getElementById('box1').outerText
var palabra2 = document.getElementById('box2').outerText
var palabra3 = document.getElementById('box3').outerText
var palabra4 = document.getElementById('box4').outerText
var palabra5 = document.getElementById('box5').outerText

var frase = [palabra2, palabra1, palabra5, palabra4 , palabra3 ]

function comparacion() {
    const resultado = document.querySelectorAll('.draggable')
    let arayN = []
    var cont=0;

    for (let i = 0; i < 5; i++) {
        //push => se agrega un elemento al final del array
        arayN.push(resultado[i].outerText)
    };
    
    for (let i = 0; i < 5; i++) {

        if (frase[i] === arayN[i]) {
            cont++
        }
    };

    if (cont == 5) {
            console.log('muy bien ')
            let fondo1 = document.getElementById("body");
            fondo1.style.backgroundImage="url('a_1.jpg')";
            
        }else{
            console.log('error');
            let fondo2 = document.getElementById('body');
            fondo2.style.backgroundImage = "url('incorrecto.jpg')";
            
        };
};