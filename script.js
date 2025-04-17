let jogadorAtual = "X";   //aqui é o jogador que vai começar
const quadrados = document.querySelectorAll(".quadrado"); //pega todos os quadrados
const mensagem = document.getElementById("mensagem");  

function clicarQuadrado(evento) {
    const quadrado = evento.target;

    if (quadrado.textContent) {   
        return;     
    }

    quadrado.textContent = jogadorAtual;     // vai fzr aparecer o jogador atual qnd clicar no quadrado

    if (checarVitoria()) return;

    if (jogadorAtual === "X") {
        jogadorAtual = "O";
    } else {
        jogadorAtual = "X";       //verifica que jogador é o atual
    }
}

function checarVitoria() {
    const combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],      // mostra as possibilidade de vitoria
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (quadrados[a].textContent &&
            quadrados[a].textContent === quadrados[b].textContent &&        // se A, B e C forem iguais alguem ganhou
            quadrados[a].textContent === quadrados[c].textContent) {
            mensagem.textContent = `${quadrados[a].textContent} venceu!`;
            return true;
        }
    }

    if (Array.from(quadrados).every(quadrado => quadrado.textContent !== "")) {
        mensagem.textContent = "Empate!";
        return true;
    }

    return false;
}

const botaoReiniciar = document.getElementById("reiniciar");

function reiniciarJogo() {
    quadrados.forEach(quadrado => quadrado.textContent = "");
    jogadorAtual = "X";
    mensagem.textContent = "";
}

quadrados.forEach(quadrado => quadrado.addEventListener("click", clicarQuadrado));

botaoReiniciar.addEventListener("click", reiniciarJogo);
