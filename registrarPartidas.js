import { exibirMenu, torneios, prompt } from "./Torneio.js";

export function registrarPartidas() {
  console.clear();
  torneios.forEach((torneio) => {
    console.log(`${torneio.id} - ${torneio.nome}`);
  });
  console.log("Insira qual torneio deseja registrar uma partida (ID):\n");
  let idTorneio = prompt("> ");
  const idTorneioNUM = parseInt(idTorneio, 10);
  const torneioSelecionado = torneios.find((t) => t.id == idTorneioNUM);

  if (!torneioSelecionado) {
    console.log("ID de torneio inválido!");
    exibirMenu();
    return;
  }
  let novaPartida = {
    // partidaId: Date.now(),
    torneioId: torneioSelecionado.id,
    torneioNome: torneioSelecionado.nome,
    jogador1: null,
    jogador2: null,
    vencedor: null,
  };
  adicionarJogador1(novaPartida, torneioSelecionado);
}

export function adicionarJogador1(partida, torneio) {
  console.log("Participantes: ");
  torneio.participantes.forEach((nomeJogador, indice) => {
    console.log(`${indice + 1} - ${nomeJogador}`);
  });

  console.log(`Escolha o jogador 1 (pelo numero): `);
  let jogadorUm = prompt("> ");
  jogadorUm = parseInt(jogadorUm);
  const jogador1Selecionado = torneio.participantes[jogadorUm - 1];
  partida.jogador1 = jogador1Selecionado;

  adicionarJogador2(partida, torneio);
}

export function adicionarJogador2(partida, torneio) {
  const oponentes = torneio.participantes.filter((p) => p !== partida.jogador1);
  oponentes.forEach((nomeJogador, indice) => {
    console.log(`${indice + 1} - ${nomeJogador}`);
  });
  console.log(`Escolha o jogador 2 (pelo numero): `);
  let jogadorDois = prompt("> ");
  jogadorDois = parseInt(jogadorDois);
  const jogador2Selecionado = oponentes[jogadorDois - 1];
  partida.jogador2 = jogador2Selecionado;

  escolherVencedor(partida);
}

export function escolherVencedor(novaPartida) {
  console.log(`1- ${novaPartida.jogador1}`);
  console.log(`2- ${novaPartida.jogador2}`);
  console.log("Insira quem venceu essa partida: \n");
  let definirVencedor = prompt("> ");
  definirVencedor = parseInt(definirVencedor);
  switch (definirVencedor) {
    case 1:
      novaPartida.vencedor = novaPartida.jogador1;
      final(novaPartida);
      break;
    case 2:
      novaPartida.vencedor = novaPartida.jogador2;
      final(novaPartida);
      break;
    default:
      console.log("Insira um jogador valido");
      escolherVencedor(novaPartida);
  }
}

export function final(novaPartida) {
  partidas.push(novaPartida);
  console.log(
    `O vencedo da partida entre '${novaPartida.jogador1}' x '${novaPartida.jogador2}' foi : ${novaPartida.vencedor} }`
  );
  exibirMenu();
}
