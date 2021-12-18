let palabras_posibles=["ricardo","pablo","miguel","celso","javi","mateo","esteso","richard","manu","dani","paula","antonio","guillermo","hicham","pedro","noelia"];
let palabra_oculta=palabras_posibles[Math.trunc(Math.random()*palabras_posibles.length)];
let intentos=1; // El valor controla el muñeco
let letras_usadas=[];
let botón=document.getElementsByTagName('button');
let muñeco=document.getElementById('muñeco');
console.log(palabra_oculta);
pintarCuadros(palabra_oculta);
let cuadros_letras=document.getElementsByClassName('letra');

botón[0].addEventListener('click', ()=> {
    let letra=document.getElementById('letra').value;
    if(!validarLetra(letra)){ // Comprueba si la letra es válida
        pintarMensaje("Introduce una letra válida","error");
    }
    else{
        if (esRepetida(letra,letras_usadas)){ // Comprueba si había usado esa letra antes
            pintarMensaje("Ya has dicho esa letra antes","error");
        }
        else{
            letras_usadas.push(letra);

            let indice=0;
            while (indice<palabra_oculta.indexOf(letra)){ // Busca si está la letra en la palabra
                indice++;
            }
            if (palabra_oculta.indexOf(letra)<0){ // Si no está
                pintarMensaje(`La letra ${letra} no está en la palabra`,"error");
                intentos++;
                document.getElementById('muñeco').innerHTML=`<img src='images/muñeco${intentos}.png'>`;
            }
            else{ // Si está
                let ocurrencias=ocurrenciasLetra(palabra_oculta,letra);
                //console.log(contador);
                pintarLetrasCuadros(ocurrencias,indice,letra);
            }
            estadoPartida(intentos); // Función que comprueba si hemos ganado o perdido
        }
    }  
})

// Funciones
function pintarCuadros(palabra){
    let cuadros_letras="<span class='letra'></span>".repeat(palabra.length);
    document.getElementById('letras').innerHTML=cuadros_letras;
}

function validarLetra(letra){
    if(letra=="" || letra.length>1){
        return false;
    }
    else{
        return true;
    }
}

function pintarMensaje(mensaje,tipo){ // El tipo indica si el mensaje es de error o no
    if(tipo=="error"){
        document.getElementById('mensaje').innerHTML=null; // Borra el mensaje que hubiera antes para que no salgan los dos
        document.getElementById('error').innerHTML=mensaje;
    }
    if(tipo=="ok"){
        document.getElementById('error').innerHTML=null; // Borra el mensaje que hubiera antes para que no salgan los dos
        document.getElementById('mensaje').innerHTML=mensaje;
    }
}

function esRepetida(letra,letras_usadas){
    let repetida=false;
    letras_usadas.forEach(letra_usada => {
        if(letra==letra_usada){
            repetida=true;
        }
    });
    return repetida;
}

function estadoPartida(intentos){
    let victoria=true;
    for(cuadro of cuadros_letras){
        if(cuadro.innerHTML==""){
            victoria=false;
        }
    }   
    if(intentos<7 && victoria){
        document.getElementById('muñeco').innerHTML=`<img src='images/ganaste.jpg'>`;
        pintarMensaje("Averiguaste la palabra, ganaste el juego :)",'ok');
        botón[0].setAttribute("disabled",'');
    }
    if(intentos==7){
        pintarMensaje("Perdiste el juego :(",'error');
        botón[0].setAttribute("disabled",'');
    }
}

function ocurrenciasLetra(palabra,letra){
    let contador=0;
    let posición=palabra.indexOf(letra); // La posición de la primera ocurrencia de la letra
    while(posición!= -1){ // Mientras se encuentre la letra
        contador++; // Cuenta las repeticiones de la letra
        posición=palabra.indexOf(letra,posición+1); // Busca la siguiente ocurrencia de la letra
    }
    return contador;
}

function pintarLetrasCuadros(ocurrencias,indice,letra){
    if(ocurrencias>1){ // Si la letra se repite más de una vez
        while(indice<=palabra_oculta.length-1){ // Recorre la palabra buscando las posiciones de las letras
            //console.log(`indice ${indice}`);
            let pos=palabra_oculta.indexOf(letra,indice);
            //console.log(`pos ${pos}`);
            indice=pos;
            if(pos<0) break; // Si pos es negativo ya no hay más ocurrencias de la letra, por lo que se deja de recorrer la palabra
            cuadros_letras[indice].innerHTML=letra; // Pone la letra en las posiciones correspondientes
            indice++;
        }
    }
    else{ // Si la letra solo se repite una vez
        cuadros_letras[indice].innerHTML=letra; // Pone la letra en su posición correspondiente de los cuadros
    }
    pintarMensaje(`Letra correcta`,"ok");
}