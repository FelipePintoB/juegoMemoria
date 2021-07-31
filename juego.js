const btnEmpezar = document.getElementById('btnEmpezar')
const color1 = document.getElementById('color1')
const color2 = document.getElementById('color2')
const color3 = document.getElementById('color3')
const color4 = document.getElementById('color4')

const dificultad = document.getElementById('input1')
const level = document.getElementById('input2')
const velocidad = document.getElementById('input3')


console.log(dificultad.options[dificultad.selectedIndex].value)


const ULTIMO_NIVEL = 10

class Juego {

    constructor(){
        this.inicializar = this.inicializar.bind(this)
        // Cada vez que se ejecute la función con el onclick se vuelve a ejecutar las siguientes 3 funciones.
        this.inicializar() 
        this.generarSecuencia() 
        setTimeout(() => {
            this.siguienteNivel()                 
        }, 100);
        
        let velocidadSelected = velocidad.options[velocidad.selectedIndex].value
        this.vel = this.seclectVelocity(velocidadSelected)
              
    }

    inicializar(){
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)// Para dejar atado el this "clase Juego" al método elegirColor, esto porque si no se usa el eventlistener escucha es el HTML del bloton de color
        this.toggleBtnEmpezar()
        
        this.nivel = level.value
        this.colores = {
            color1,
            color2,
            color3,
            color4
        }
    }

    toggleBtnEmpezar(){
        let check = btnEmpezar.classList.contains('btn-startD')
        if (check){
            btnEmpezar.classList.replace('btn-startD','btn-start') // A las clases de css de ese botón se remueve una que se llama 'hide' definida en el .css
            btnEmpezar.removeAttribute("disabled","")
            btnEmpezar.innerText = "Vuelvelo a intentar!"

        } else {
            btnEmpezar.classList.replace('btn-start','btn-startD') // A las clases de css de ese botón se añade una que se llama 'hide' definida en el .css
            btnEmpezar.setAttribute("disabled","")
            btnEmpezar.innerText = "Estas Jugando!"
        }
    }

    generarSecuencia(){
        //Se crea un array de la cantidad como parámetro, se llena de solo valores cero, se mapea y modifica uno a uno con el metodo map. Con la funcnión mat se crean valores aleatorios
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero){
        switch(numero){ // Como se usa return no se necesita break en cada case
            case 0:
                return 'color1'
            case 1:
                return 'color2'
            case 2:
                return 'color3'
            case 3:
                return 'color4'
    
        } 
    }

    transformarColorANumero(color){
        switch(color){ // Como se usa return no se necesita break en cada case
            case 'color1':
                return 0
            case 'color2':
                return 1
            case 'color3':
                return 2
            case 'color4':
                return 3
    
        } 
    }

    iluminarSecuencia(){
        for (let i= 0; i < this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => {
                this.iluminarColor(color)
            }, this.vel * ( i+1 ) ); 
        }
    }

    iluminarColor(color){
        //Se añade la clase a una propiedad de colores, esta clase se llama 'light' y loque hace es cambiar el color.
        this.colores[color].classList.add('light')
        //Se ejecuta un timeout para que vuelva a su color original
        setTimeout(() => {
            this.apagarColor(color)
        }, 200)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        this.colores.color1.addEventListener('click', this.elegirColor)
        this.colores.color2.addEventListener('click', this.elegirColor)
        this.colores.color3.addEventListener('click', this.elegirColor)
        this.colores.color4.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.color1.removeEventListener('click', this.elegirColor)
        this.colores.color2.removeEventListener('click', this.elegirColor)
        this.colores.color3.removeEventListener('click', this.elegirColor)
        this.colores.color4.removeEventListener('click', this.elegirColor)

    }

    elegirColor(ev){ //El metodo AddEventListener llama un parámetro que lo podemos bautizar ev o event, se llama MouseEvent
        // console.log(ev)
        // console.log(this)
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel == this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel(), 1000) // Se hace Bind porque setTimeout cambia el this a windows y queremos el this de la clase
                    console.log("Se ejecutó siguiente nivel")
                } 
            }
        } else {
            this.perdioElJuego()
        }
    }

    ganoElJuego(){
        swal("Good job!", "Felicitaciones, ganaste el juego!", "success")
        .then(() =>{
            this.inicializar()
        })
    }

    perdioElJuego(){
        swal("Bad!", "Lo lamentamos, perdistes :s", "error")
        .then(() =>{
            this.eliminarEventosClick()
            this.inicializar()
        })
    }

    seclectVelocity(velocidad) {
        switch (velocidad) {
            case "Slow":
            return 750
            case "Normal":
            return 500
            case "Fast":
            return 250
        }
    }

}

function empezarJuego() { // Esta función se ejecuta con un atributo onclick del elemento button
    juego = new Juego()
}
