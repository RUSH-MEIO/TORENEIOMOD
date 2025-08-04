import { exibirMenu, torneios } from "./Torneio.js";

export function listarTorneios() {
  if (torneios.length === 0) {
    console.clear();
    console.log("Não há torneios registrados!!");
  } else {
    console.clear();
    console.log("========TORNEIOS========");
    torneios.forEach((torneio) => {
      console.log(
        `ID: ${torneio.id} | Nome: ${torneio.nome} | Jogo: ${torneio.jogo}  | Data: ${torneio.data}`
      );
      if (
        torneio.participantes &&
        Array.isArray(torneio.participantes) &&
        torneio.participantes.length > 0
      ) {
        console.log("  --- Participante(s) deste Torneio ---");
        torneio.participantes.forEach((participante) => {
          console.log(`  - ${participante}`);
        });
      } else {
        console.log("-- Nenhum participante registrado nesse torneio --");
      }
      console.log("------------------------------------\n");
    });
  }
  exibirMenu();
}
