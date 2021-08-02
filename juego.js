const btnEmpezar = document.getElementById('btnEmpezar')

const color1 = document.getElementById('color1')
const color2 = document.getElementById('color2')
const color3 = document.getElementById('color3')
const color4 = document.getElementById('color4')
const color5 = document.getElementById('color5')
const color6 = document.getElementById('color6')
const color7 = document.getElementById('color7')
const color8 = document.getElementById('color8')
const color9 = document.getElementById('color9')
const color10 = document.getElementById('color10')
const color11 = document.getElementById('color11')
const color12 = document.getElementById('color12')

const dificultad = document.getElementById('input1')
const level = document.getElementById('input2')
const velocidad = document.getElementById('input3')

const ULTIMO_NIVEL = 10

class Juego {

    constructor(){
        this.inicializar()

        let difficulty = dificultad.options[dificultad.selectedIndex].value
        this.dif = this.difficultySelected(difficulty)
        
        let velocidadSelected = velocidad.options[velocidad.selectedIndex].value
        this.vel = this.seclectVelocity(velocidadSelected)

        this.inicializar = this.inicializar.bind(this)
        // Cada vez que se ejecute la función con el onclick se vuelve a ejecutar las siguientes 3 funciones.
        
        this.generarSecuencia(this.dif) 
        setTimeout(() => {
            this.siguienteNivel()                 
        }, 500);         
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
            color4,
            color5,
            color6,
            color7,
            color8,
            color9,
            color10,
            color11,
            color12
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

    generarSecuencia(tamaño){
        //Se crea un array de la cantidad como parámetro, se llena de solo valores cero, se mapea y modifica uno a uno con el metodo map. Con la funcnión mat se crean valores aleatorios
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * tamaño))
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
            case 4:
                return 'color5'
            case 5:
                return 'color6'
            case 6:
                return 'color7'
            case 7:
                return 'color8'
            case 8:
                return 'color9'
            case 9:
                return 'color10'
            case 10:
                return 'color11'
            case 11:
                return 'color12'
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
            case 'color5':
                return 4
            case 'color6':
                return 5
            case 'color7':
                return 6
            case 'color8':
                return 7
            case 'color9':
                return 8
            case 'color10':
                return 9
            case 'color11':
                return 10
            case 'color12':
                return 11

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
        this.colores.color5.addEventListener('click', this.elegirColor)
        this.colores.color6.addEventListener('click', this.elegirColor)
        this.colores.color7.addEventListener('click', this.elegirColor)
        this.colores.color8.addEventListener('click', this.elegirColor)
        this.colores.color9.addEventListener('click', this.elegirColor)
        this.colores.color10.addEventListener('click', this.elegirColor)
        this.colores.color11.addEventListener('click', this.elegirColor)
        this.colores.color12.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.color1.removeEventListener('click', this.elegirColor)
        this.colores.color2.removeEventListener('click', this.elegirColor)
        this.colores.color3.removeEventListener('click', this.elegirColor)
        this.colores.color4.removeEventListener('click', this.elegirColor)
        this.colores.color5.removeEventListener('click', this.elegirColor)
        this.colores.color6.removeEventListener('click', this.elegirColor)
        this.colores.color7.removeEventListener('click', this.elegirColor)
        this.colores.color8.removeEventListener('click', this.elegirColor)
        this.colores.color9.removeEventListener('click', this.elegirColor)
        this.colores.color10.removeEventListener('click', this.elegirColor)
        this.colores.color11.removeEventListener('click', this.elegirColor)
        this.colores.color12.removeEventListener('click', this.elegirColor)
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

    difficultySelected(difficulty) {
        console.log(difficulty)
        switch (difficulty) {
            case "Easy":
                this.colores.color5.setAttribute("hidden","")
                this.colores.color6.setAttribute("hidden","")
                this.colores.color7.setAttribute("hidden","")
                this.colores.color8.setAttribute("hidden","")
                this.colores.color9.setAttribute("hidden","")
                this.colores.color10.setAttribute("hidden","")
                this.colores.color11.setAttribute("hidden","")
                this.colores.color12.setAttribute("hidden","")
                return 4
            case "Normal":
                this.colores.color5.removeAttribute("hidden","")
                this.colores.color6.removeAttribute("hidden","")
                this.colores.color7.removeAttribute("hidden","")
                this.colores.color8.removeAttribute("hidden","")
                this.colores.color9.setAttribute("hidden","")
                this.colores.color10.setAttribute("hidden","")
                this.colores.color11.setAttribute("hidden","")
                this.colores.color12.setAttribute("hidden","")
                return 8
            case "Hard":
                this.colores.color5.removeAttribute("hidden","")
                this.colores.color6.removeAttribute("hidden","")
                this.colores.color7.removeAttribute("hidden","")
                this.colores.color8.removeAttribute("hidden","")
                this.colores.color9.removeAttribute("hidden","")
                this.colores.color10.removeAttribute("hidden","")
                this.colores.color11.removeAttribute("hidden","")
                this.colores.color12.removeAttribute("hidden","")
            return 12
        }
    }
}

function empezarJuego() { // Esta función se ejecuta con un atributo onclick del elemento button
    juego = new Juego()
}
