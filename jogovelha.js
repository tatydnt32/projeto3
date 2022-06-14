const prompt=require('prompt-sync')();
console.log();
console.log("'Jogo da Velha' em JavaScript");
prompt('Aperte ENTRER para Jogar : ');
console.clear();

let jogar = true;
let vencedor;
let jogadorX = 0;
let jogadorO = 0;

function limparTabueliro() {
    tabuleiro = [
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0],
    ];
}

function novoJogo(){
    jogar = prompt('Vamos jogar Novamente ? [S/N] ').toUpperCase();
    while (jogar != 'S' && jogar != 'N'){
        console.log('Responda S para SIM');
        console.log('Responda N para NÃO');
        jogar = prompt('Vamos jogar Novamente ? [S/N] ').toUpperCase();
    }
    if (jogar == 'S'){
        console.clear();
        return true;
    } else {
        console.clear();
        console.log('Foi uma bela partida !');
        console.log('Vamos ver o Resultado ...');
        prompt();
        return false;
    }
}

function placarFinal(){
    if (jogadorX > jogadorO){
        console.log("O player 'X' foi o campeão !");
    } else if (jogadorO > jogadorX){ 
        console.log("O player 'O' foi o campeão !");
    } else {
        console.log('Foi bem disputados , tivemos um empate');
    }
}

function contagemVencedores (a){
    switch (a){
        case 'X':
            jogadorX++;
            break;
        case 'O':
            jogadorO++;
            break;
    }
}

while (jogar) {
    limparTabueliro();
    let resultado = false;
    let player = 'X';

    while (!resultado) {
        console.log("'jogo da velha ' em JavaScript");
        console.table(tabuleiro);
        console.log(`É a vez do ${player}: `);

        let jogadaLinha = +prompt('Escolha uma linha : ');
        while (jogadaLinha > 2) {
            jogadaLinha = +prompt('Escolha uma linha : ');
        }
        let jogadaColuna = +prompt('Escolha uma coluna : ');
        while (jogadaColuna > 2) {
            jogadaColuna = +prompt('Escolha uma coluna : ');
        }

        while (tabuleiro[jogadaLinha][jogadaColuna]) {
            console.log('Espaço já preenchido. Faça sua jogada em outra linha ou coluna: ');
            jogadaLinha = +prompt('Escolha uma linha : ');
            while (jogadaLinha > 2) {
                jogadaLinha = +prompt('Escolha uma linha : ');
            }
            jogadaColuna = +prompt('Escolha uma coluna : ');
            while (jogadaColuna > 2) {
                jogadaColuna = +prompt('Escolha uma coluna : ');
            }
        }

        tabuleiro[jogadaLinha][jogadaColuna] = player;

        if (player === 'X') {
            player = 'O';
        } else {
            player = 'X';
        }

        let selecionaveis = 0;

        for (let i = 0; i < tabuleiro.length; i++){
            let linha = tabuleiro[i];
            for (let b = 0; b < linha.length; b++){
                let novaJogada = linha[b];
                if (!novaJogada) {
                    selecionaveis++;
                }
            }
        }

        if (selecionaveis === 0){
            break;
        }
        
        let vitorias = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [2, 4, 6],
            [0, 4, 8]
        ]

        for (let vitoria of vitorias){
            let coordenadasIguais = 0;
            let ultimaJogada;

            for (let coordenada of vitoria){
                let linha = parseInt(coordenada / 3);
                let coluna = coordenada % 3;
                let jogada = tabuleiro[linha][coluna];

                if (jogada && (!ultimaJogada || jogada === ultimaJogada)){
                    coordenadasIguais++;
                }
                ultimaJogada = jogada;
            }
            if (coordenadasIguais === 3){
                resultado = true;
                vencedor = ultimaJogada;
                break;
            }
        }
        console.clear();
    }
    console.clear();
    console.log('Temos um resultado:');
    console.table(tabuleiro);
    
    if (resultado) {
        contagemVencedores(vencedor);
        console.log(`O ${vencedor} venceu!`);
        prompt('Pressione Enter');
        jogarNovamente = novoJogo();
    } else {
        console.log("Empatou!");
        prompt('Pressione Enter');
        jogar = novoJogo();
    }
}

console.clear();
if (jogadorX > 0 ||jogadorO > 0){
    if (jogadorX >= 1) {
        if (jogadorX > 1){
            console.log(`O player 'X' venceu ${jogadorX} vezes.`);
        } else {
            console.log(`O player 'X' venceu 1 vez.`);
        }
    }
    if (jogadorO >= 1) {
        if (jogadorO > 1){
            console.log(`O player 'O' venceu ${jogadorO} vezes.`);
        } else {
            console.log(`O player 'O' venceu 1 vez.`);
        }
    }
    placarFinal();
} else {
    console.log('Não tivemos vencedores nas partidas.');
}