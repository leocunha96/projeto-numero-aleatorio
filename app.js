/*let title = document.querySelector("h1"); //para acessar o objeto do html é necessário usar o document.querySelector
title.innerHTML = "Jogo do Número Secreto";

let paragrafo = document.querySelector("p");
paragrafo.innerHTML = "Escolha um número entre 1 e 100.";
*/
let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroAleatorio = gerarNumeroAleatorio(); //retorno da função será o numero aleatório
let tentativas = 1;
exibirMensagemInicial();
//let reset = false;

function verificarChute(){ //precisa escrever function antes. Funções tem apenas uma responsabilidade por boas práticas
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativa = `Você adivinhou o número secreto com ${tentativas} ${palavraTentativa}`;
    let chute = document.querySelector("input").value;
    if (chute == numeroAleatorio){
        exibirTextoNaTela("h1", "Parabéns!");
        exibirTextoNaTela("p", mensagemTentativa);
        document.getElementById("reiniciar").removeAttribute("disabled"); //aqui através do id estamos dando "enabled" no botão de new game
        }
    else if (chute < numeroAleatorio){
        exibirTextoNaTela("p", `O número ${chute} é menor que o número secreto.`);
        //alert(`O número ${numeroEscolhido} é menor que o número secreto.`);
    }
    else {
        exibirTextoNaTela("p", `O número ${chute} é maior que o número secreto.`);
        //alert(`O número ${numeroEscolhido} é maior que o número secreto.`);
    }
    limparCampo();
    tentativas++;
}   

//vamos refatorar o conteudo de cima
function exibirMensagemInicial(){
    exibirTextoNaTela("h1","Jogo do Número Secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 100.");
}

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak = (texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function gerarNumeroAleatorio(){
    let numeroEscolhido =  parseInt((Math.random() * numeroLimite) + 1);
    let quantidadeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido);  
        return numeroEscolhido;
    }
}

function limparCampo(){
    let chute = document.querySelector("input");
    chute.value = "";
}
function reiniciar(){
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true);
}

