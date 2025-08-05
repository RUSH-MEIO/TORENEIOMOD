import { exibirMenu, prompt } from "../Torneio.js";
import { torneios, salvarDados, DBMASTER, Torneiospepino } from "./salvar.js";

export function registrarPartidas() {
    console.clear();
    if (torneios.length === 0) {
        console.log("Não há torneios registrados para registrar partidas.");
        prompt("Pressione Enter para retornar ao menu...");
        exibirMenu();
        return;
    }

    console.log("======== REGISTRAR PARTIDA ========");
    torneios.forEach((torneio) => {
        console.log(`${torneio.id} - ${torneio.nome}`);
    });
    console.log("===================================\n");

    console.log("Insira qual torneio deseja registrar uma partida (ID):");
    let idTorneio = prompt("> ");
    const idTorneioNUM = parseInt(idTorneio, 10);
    const torneioSelecionado = torneios.find((t) => t.id === idTorneioNUM);

    if (!torneioSelecionado) {
        console.log("ID de torneio inválido!");
        prompt("Pressione Enter para retornar ao menu...");
        exibirMenu();
        return;
    }

    if (!torneioSelecionado.participantes || torneioSelecionado.participantes.length < 2) {
        console.log(`O torneio "${torneioSelecionado.nome}" precisa de pelo menos 2 participantes para registrar uma partida.`);
        prompt("Pressione Enter para retornar ao menu...");
        exibirMenu();
        return;
    }

    const IDTORNEIOTIME = Date.now();
    const IDTORNEIO = Math.floor(IDTORNEIOTIME / 60000)

    let novaPartida = {
        partidaId: IDTORNEIO,
        torneioId: torneioSelecionado.id,
        torneioNome: torneioSelecionado.nome,
        jogador1: null,
        jogador2: null,
        vencedor: null,
    };
    adicionarJogador1(novaPartida, torneioSelecionado);
}

export function adicionarJogador1(partida, torneio) {
    console.log("\n--- Escolha do Jogador 1 ---");
    console.log("Participantes: ");
    torneio.participantes.forEach((nomeJogador, indice) => {
        console.log(`${indice + 1} - ${nomeJogador}`);
    });

    console.log(`Escolha o jogador 1 (pelo número): `);
    let jogadorUm = prompt("> ");
    jogadorUm = parseInt(jogadorUm);

    if (isNaN(jogadorUm) || jogadorUm < 1 || jogadorUm > torneio.participantes.length) {
        console.log("Número de jogador inválido. Tente novamente.");
        adicionarJogador1(partida, torneio);
        return;
    }

    const jogador1Selecionado = torneio.participantes[jogadorUm - 1];
    partida.jogador1 = jogador1Selecionado;

    adicionarJogador2(partida, torneio);
}

export function adicionarJogador2(partida, torneio) {
    const oponentes = torneio.participantes.filter((p) => p !== partida.jogador1);

    if (oponentes.length === 0) {
        console.log("Não há outros jogadores disponíveis para serem o Jogador 2.");
        prompt("Pressione Enter para retornar ao menu...");
        exibirMenu();
        return;
    }

    console.log("\n--- Escolha do Jogador 2 ---");
    oponentes.forEach((nomeJogador, indice) => {
        console.log(`${indice + 1} - ${nomeJogador}`);
    });
    console.log(`Escolha o jogador 2 (pelo número): `);
    let jogadorDois = prompt("> ");
    jogadorDois = parseInt(jogadorDois);

    if (isNaN(jogadorDois) || jogadorDois < 1 || jogadorDois > oponentes.length) {
        console.log("Número de jogador inválido. Tente novamente.");
        adicionarJogador2(partida, torneio);
        return;
    }

    const jogador2Selecionado = oponentes[jogadorDois - 1];
    partida.jogador2 = jogador2Selecionado;

    escolherVencedor(partida, torneio);
}

export function escolherVencedor(novaPartida, torneio) {
    console.log("\n--- Escolha do Vencedor ---");
    console.log(`1- ${novaPartida.jogador1}`);
    console.log(`2- ${novaPartida.jogador2}`);
    console.log("Insira quem venceu essa partida (pelo número):");
    let definirVencedor = prompt("> ");
    definirVencedor = parseInt(definirVencedor);

    switch (definirVencedor) {
        case 1:
            novaPartida.vencedor = novaPartida.jogador1;
            final(novaPartida, torneio);
            break;
        case 2:
            novaPartida.vencedor = novaPartida.jogador2;
            final(novaPartida, torneio);
            break;
        default:
            console.log("Insira um número válido (1 ou 2).");
            escolherVencedor(novaPartida, torneio);
    }
}

export function final(novaPartida, torneio) {
    if (!torneio.partidas) {
        torneio.partidas = [];
    }
    torneio.partidas.push(novaPartida);

    const indexTorneio = torneios.findIndex(t => t.id === torneio.id);
    if (indexTorneio !== -1) {
        torneios[indexTorneio] = torneio;
        Torneiospepino([...torneios]);
    }

    console.log(
        `\nPartida registrada! O vencedor da partida entre '${novaPartida.jogador1}' x '${novaPartida.jogador2}' foi: ${novaPartida.vencedor}`
    );

    salvarDados(DBMASTER, torneios, () => {
        prompt("Pressione ENTER para Retornar ao menu principal...");
        exibirMenu();
    });
}