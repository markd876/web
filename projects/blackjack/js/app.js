


(() => {
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'];
    const especiales = ['J','Q','K','A'];
    let puntosJugador = 0, puntosComputadora = 0;
    let dinero = 100;
    let apuesta = 0;

    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const small = document.querySelectorAll('small');
    const mas5 = document.querySelector('#mas5');
    const mas10 = document.querySelector('#mas10');
    const mas20 = document.querySelector('#mas20');
    const por2 = document.querySelector('#por2');
    const menos5 = document.querySelector('#menos5');
    const menos10 = document.querySelector('#menos10');
    const menos20 = document.querySelector('#menos20');
    const entre2 = document.querySelector('#entre2');
    const reiniciar = document.querySelector('#reiniciar');
    const allin = document.querySelector('#allin');
    

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    small[1].innerText = dinero;
    small[0].innerText = apuesta;

    
    const crearDeck = () => {

        for(let i = 2; i <= 10; i++){
            for (let tipo of tipos){
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos){
            for (let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        deck = _.shuffle(deck);

    }

    crearDeck();

    const pedirCarta = () => {
        if (deck.length === 0){
            throw 'No hay mas cartas en el deck';
        }
        const carta = deck.pop()
        return carta;
    }
    pedirCarta();

    const valorCarta = (carta ) => {

        const valor = carta.substring(0, carta.length - 1);
        return(isNaN(valor)) ? 
                (valor === 'A') ? 11 : 10 
                : valor * 1;
    }

    // turno de la computadora 

    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            small[3].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');

            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21){
                console.warn('Perdiste');
                dinero = dinero - apuesta;
                small[1].innerText = dinero;
                break;
            }
            if (puntosComputadora > 21){
                console.warn('Ganaste!');
                dinero = dinero + apuesta;
                small[1].innerText = dinero;
            }else if(puntosComputadora > puntosJugador){
                console.warn('Perdiste');
                dinero = dinero - apuesta;
                small[1].innerText = dinero;
            }else if(puntosComputadora === puntosJugador){
                console.warn('Empate');
            }

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    }


    const valor = valorCarta(pedirCarta());

    //valorCarta('KD');
    //console.log(valor);
    //    let puntos = 0;
    //    if (isNaN(valor)){
    //        puntos = (valor === 'A') ? 11 : 10;
    //    }else{
    //        puntos = valor * 1;
    //    }
    //    console.log(puntos);

    //pedir carta

    btnPedir.addEventListener('click', () => {
        if (dinero <= 0 ){
            alert('Estas en bancarrota bro, no puedes jugar mas');
            return false;
        }
        if (apuesta > dinero){
            alert('No puedes apostar mas de lo que tienes');
            return false;
        }
        if (apuesta === 0 && dinero > 0){
            alert('Debes hacer una apuesta');
            return false;
        }
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        small[2].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if (puntosJugador === 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    //detener juego

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        if (puntosJugador === 0){
            console.warn('No pediste ninguna carta');
            return false;
        }
        turnoComputadora(puntosJugador);
    });

    //nueva partida

    btnNuevo.addEventListener('click', () => {
        deck = [];
        crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        small[2].innerText = puntosJugador;
        small[3].innerText = puntosComputadora;
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        small[1].innerText = dinero;
        apuesta = 0;
        small[0].innerText = apuesta;
    });

    //apuesta

    mas5.addEventListener('click', () => {
        apuesta = apuesta + 5;
        small[0].innerText = apuesta;
    });
    mas10.addEventListener('click', () => {
        apuesta = apuesta + 10;
        small[0].innerText = apuesta;
    });
    mas20.addEventListener('click', () => {
        apuesta = apuesta + 20;
        small[0].innerText = apuesta;
    });
    por2.addEventListener('click', () => {
        apuesta = apuesta * 2;
        small[0].innerText = apuesta;
    });
    menos5.addEventListener('click', () => {
        apuesta = apuesta - 5;
        small[0].innerText = apuesta;
    });
    menos10.addEventListener('click', () => {
        apuesta = apuesta - 10;
        small[0].innerText = apuesta;
    });
    menos20.addEventListener('click', () => {
        apuesta = apuesta - 20;
        small[0].innerText = apuesta;
    });
    entre2.addEventListener('click', () => {
        apuesta = apuesta / 2;
        small[0].innerText = apuesta;
    });
    reiniciar.addEventListener('click', () => {
        apuesta = 0;
        small[0].innerText = apuesta;
    });
    allin.addEventListener('click', () => {
        apuesta = dinero;
        small[0].innerText = apuesta;
    });




})();





