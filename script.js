let jogadorAtual = "X";
function clicarQuadrado(evento){
    const quadrado = evento.target;
}
    if (quadrado.texContent){
        return;
}
    quadrado.texContent = jogadorAtual // vai fazeer aparecer o nome X ou O no quadrado
     if (jogadorAtual === ("X")){
        jogadorAtual = "O";
    }else{
        jogadorAtual = "X";
}