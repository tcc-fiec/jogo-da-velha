// Variáveis gerais
let jogadorAtual = "X";   // Jogador inicial
let jogoAtivo = true; //Vai nos ajudar a definir se o jogo está ativo ou não
let vitoriasX = 0;
let vitoriasO = 0;
let empates = 0; 

const quadrados = document.querySelectorAll(".quadrado");
const mensagem = document.getElementById("mensagem");
const botaoReiniciar = document.getElementById("reiniciar");
const botaoZerarPlacar = document.getElementById("zerar-placar");


// URLs das imagens para os jogadores
const imagemX = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/2048px-Red_X.svg.png';  // Imagem do X
const imagemO = 'https://cdn-icons-png.flaticon.com/512/6156/6156308.png';  // Imagem do O

function clicarQuadrado(evento) {

    if (!jogoAtivo) return; //Caso o jogo não esteja ativo, ele não segue os proximos passos.

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
            
            jogoAtivo = false; //"Bloqueia" o tabuleiro até alguém clicar no Reiniciar
            document.getElementById("game").classList.add("bloqueado");

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
            
            
            if(imgA.getAttribute("data-jogador") === "X"){
                vitoriasX++;
                document.getElementById("contador-x").textContent = vitoriasX;
            }else if(imgB.getAttribute      ("data-jogador") === "O"){
                vitoriasO++;
                document.getElementById("contador-o").textContent = vitoriasO;
            }
        
            return true;
        }
    }

    //EMPATES
    if (Array.from(quadrados).every(quadrado => quadrado.querySelector("img"))) {
        mensagem.textContent = "Empate!";
        empates++;
        document.getElementById("empates").textContent = empates;
        jogoAtivo = false; //"Bloqueia" o tabuleiro até alguém clicar no Reiniciar
        document.getElementById("game").classList.add("bloqueado");
        return true;
    }
    

    return false;
}



function reiniciarJogo() {
    quadrados.forEach(quadrado => {
        quadrado.innerHTML = '';  // Limpar as imagens
    });
    mensagem.textContent = "";
    jogadorAtual = "X";
    jogoAtivo = true; //"Habilita o tabuleiro pra um novo jogo"
    document.getElementById("game").classList.remove("bloqueado");

}


botaoZerarPlacar.addEventListener("click", () => {
    vitoriasX = 0;
    vitoriasO = 0;
    empates = 0;
    document.getElementById("contador-x").textContent = vitoriasX;
    document.getElementById("contador-o").textContent = vitoriasO;
    document.getElementById("empates").textContent = empates;
})


quadrados.forEach(quadrado => quadrado.addEventListener("click", clicarQuadrado));
botaoReiniciar.addEventListener("click", reiniciarJogo);