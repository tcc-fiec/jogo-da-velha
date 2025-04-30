let jogadorAtual = "X";   // Jogador inicial
const quadrados = document.querySelectorAll(".quadrado");
const mensagem = document.getElementById("mensagem");

// URLs das imagens para os jogadores
const imagemX = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/2048px-Red_X.svg.png';  // Imagem do X
const imagemO = 'https://cdn-icons-png.flaticon.com/512/6156/6156308.png';  // Imagem do O

function clicarQuadrado(evento) {
    const quadrado = evento.target;

    // Se o quadrado já tiver uma imagem, não faz nada
    if (quadrado.querySelector("img")) {
        return;
    }

    // Adiciona a imagem correspondente ao jogador atual
    const img = document.createElement("img");
    img.src = jogadorAtual === "X" ? imagemX : imagemO; // Se for o jogador X, usa a imagemX, caso contrário usa imagemO
    img.setAttribute("data-jogador", jogadorAtual);  // Atributo personalizado para identificar o jogador
    quadrado.appendChild(img);

    // Verifica se houve vitória
    if (checarVitoria()) return;

    // Troca o jogador
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
}

function checarVitoria() {
    const combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        const imgA = quadrados[a].querySelector("img");
        const imgB = quadrados[b].querySelector("img");
        const imgC = quadrados[c].querySelector("img");

        if (imgA && imgB && imgC && imgA.getAttribute("data-jogador") === imgB.getAttribute("data-jogador") && imgB.getAttribute("data-jogador") === imgC.getAttribute("data-jogador")) {
            mensagem.textContent = `${imgA.getAttribute("data-jogador")} venceu!`;
            return true;
        }
    }

    if (Array.from(quadrados).every(quadrado => quadrado.querySelector("img"))) {
        mensagem.textContent = "Empate!";
        return true;
    }

    return false;
}

const botaoReiniciar = document.getElementById("reiniciar");

function reiniciarJogo() {
    quadrados.forEach(quadrado => {
        quadrado.innerHTML = '';  // Limpar as imagens
    });
    mensagem.textContent = "";
    jogadorAtual = "X";
}

quadrados.forEach(quadrado => quadrado.addEventListener("click", clicarQuadrado));
botaoReiniciar.addEventListener("click", reiniciarJogo);