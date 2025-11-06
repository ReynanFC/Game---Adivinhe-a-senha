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
  verificarNumero();

  let acertos = verificarAcerto();
  verificarGanhou(acertos);
});


function numeroSorteado() {
  const numero = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  return String(numero).split('').map(Number);
}

function verificarNumero() {
  const numero = [...inputs].map(i => i.value).join('');
  if (numero < 100 || numero > 999) {
    mensagem.classList.add('errou');
    mensagem.innerText = 'O número deve ser entre 100 e 999.';
  }
}

function limparInputs() {
  
  inputs.forEach(input =>  {
    input.value = '';
    input.classList.remove('acertou');
    input.classList.remove('errou');
});

  inputs[0].focus();
}

function verificarAcerto() {
  let qtdAcertos = 0;

  inputs.forEach((input, index) => {
    if (Number(input.value) === numeroGerado[index]) {
      input.classList.add('acertou');
      qtdAcertos++;
    } else {
      input.classList.add('errou');
    }
  });

  if (qtdAcertos > 0) {
    mensagem.classList.add('acertou');
    mensagem.innerText = `${qtdAcertos} acerto(s)`;
  } else {
    mensagem.innerText = `Você não acertou nenhum número :/`;
  }

  tentativas++;
  mostrarTentativas.innerText = tentativas;

  return qtdAcertos;
}

function verificarGanhou(qtdAcertos) {
  if (qtdAcertos === 3) {
    mensagem.classList.add('acertou');
    mensagem.innerText = `Parabéns, você ganhou!`;
    inputs.forEach(input => input.disabled = true);
    mostrarTrofeu();
    butaoEnviar.innerText = `Reniciar`;
    reniciar();
  } else {
    setTimeout(() => limparInputs(), 1000);
  }
}

function reniciar() {
    butaoEnviar.addEventListener('click', () => location.reload());
}

function esconderTrofeu () {
    imagemTrofeu.forEach((imagem) => imagem.style.display = 'none');
}

function mostrarTrofeu () {
    imagemTrofeu.forEach((imagem) => imagem.style.display = 'block');
}

console.log(numeroGerado);