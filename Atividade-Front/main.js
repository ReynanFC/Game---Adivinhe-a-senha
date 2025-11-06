const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const mensagem = document.getElementById('mensagem');
const mostrarTentativas = document.getElementById('qtdTentativas'); 
const butaoEnviar = document.querySelector('button');
const imagemTrofeu = document.querySelectorAll('.imagemTrofeu');
let tentativas = 0;

esconderTrofeu();
const numeroGerado = numeroSorteado(); 
limparInputs();

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  processarTentativa();
});

butaoEnviar.addEventListener('click', () => {
  if (butaoEnviar.innerText === 'Reiniciar') {
    location.reload();
  }
});

function processarTentativa() {
  const numero = obterNumeroDigitado();
  if (!numeroEhValido(numero)) {
    mostrarMensagem('O número deve ser acima de 100', 'errou');
    setTimeout(() => limparInputs(), 2000);
    return;
  }

  const acertos = verificarAcerto(numero);
  if (acertos === 3) {
    encerrarJogo();
  } else {
    setTimeout(() => limparInputs(), 1000);
  }

  tentativas++;
  mostrarTentativas.innerText = tentativas;

}

function obterNumeroDigitado() {
  return Number([...inputs].map(i => i.value).join(''));
}

function numeroSorteado() {
  const numero = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  return String(numero).split('').map(Number);
}

function numeroEhValido(numero) {
  return numero >= 100;
}

function limparInputs() {
  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('acertou', 'errou');
  });
  mensagem.innerText = '';
  mensagem.classList.remove('acertou', 'errou', 'dica');
  inputs[0].focus();
}

function dica(numero) {
  if (numero > Number(numeroGerado.join(''))) {
    mostrarMensagem('O número sorteado é menor', 'dica');
  } else if (numero < Number(numeroGerado.join(''))) {
    mostrarMensagem('O número sorteado é maior', 'dica');
  }
}

function verificarAcerto(numero) {
  let qtdAcertos = 0;

  inputs.forEach((input, index) => {
    const acertou = Number(input.value) === numeroGerado[index];
    marcaInput(input, acertou);
    if (acertou) qtdAcertos++;
  });

  if (qtdAcertos < 3) dica(numero);
  return qtdAcertos;
}

function encerrarJogo() {
  mostrarMensagem('Parabéns, você ganhou!', 'acertou');
  inputs.forEach(input => input.disabled = true);
  mostrarTrofeu();
  butaoEnviar.innerText = 'Reiniciar';
}

function esconderTrofeu() {
  imagemTrofeu.forEach(imagem => imagem.style.display = 'none');
}

function mostrarTrofeu() {
  imagemTrofeu.forEach(imagem => imagem.style.display = 'block');
}

function mostrarMensagem(texto, tipo) {
  mensagem.className = '';
  mensagem.innerText = texto;
  mensagem.classList.add(tipo);
}

function marcaInput(input, acertou) {
  input.classList.remove('acertou', 'errou');
  input.classList.add(acertou ? 'acertou' : 'errou');
}

console.log(numeroGerado);
