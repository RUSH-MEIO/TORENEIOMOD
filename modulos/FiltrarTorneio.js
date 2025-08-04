import { exibirMenu, prompt } from "../Torneio.js";
import { torneios } from "./salvar.js";

export function filtrarTorneios() {
  console.clear();
  console.log("Por qual jogo você deseja filtrar?\n");
  const jogos = torneios.map((torneio) => torneio.jogo);
  const jogosUnicos = [...new Set(jogos)];
  console.log(`Jogos atuais: ${jogosUnicos.join(", ")}`)
  let resposta = prompt("> ");
  const jogosFiltrados = torneios.filter((torneio) => torneio.jogo == resposta);
  if (jogosFiltrados.length > 0) {
    console.clear();
    resposta = resposta.toUpperCase();
    console.log(`===TORNEIOS COM O JOGO ${resposta}===`);
    jogosFiltrados.forEach((torneio, index) => {
      console.log(
        `ID: ${torneio.id} || Nome: ${torneio.nome} || Jogo: ${torneio.jogo} || Data: ${torneio.data} || Participantes: ${torneio.participantes}`
      );
    });
  } else {
    console.clear();
    console.log("Nenhum torneio com este jogo encontrado.");
  }
  exibirMenu();
}