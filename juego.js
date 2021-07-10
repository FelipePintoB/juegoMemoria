const btnEmpezar = document.getElementById('btnEmpezar')
const color1 = document.getElementById('color1')
const color2 = document.getElementById('color2')
const color3 = document.getElementById('color3')
const color4 = document.getElementById('color4')

class Juego {
    constructor(){
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }

    inicializar(){
        btnEmpezar.classList.add('hide') // A las clases de css de ese botón se añade una que se llama 'hide' definida en el .css
        this.nivel = 1
        this.colores = {
            color1,
            color2,
            color3,
            color4
        }
    }

    generarSecuencia(){
        //Se crea un array de la cantidad como parámetro, se llena de solo valores cero, se mapea y modifica uno a uno con el metodo map. Con la funcnión mat se crean valores aleatorios
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel(){
        this.iluminarSecuencia()
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

    iluminarSecuencia(){
        for (let i= 0; i < this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i])
        setTimeout(() => {
            this.iluminarColor(color)
        }, 750 * i ); 
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
        console.log(color)
        this.colores[color].classList.remove('light')
    }
}

function empezarJuego() {
    // alert('El juego va a comenzar')
    juego = new Juego()
}