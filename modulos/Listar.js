import { exibirMenu, prompt, LimparTela } from "../Torneio.js";
import { torneios } from "./salvar.js";

export function listarTorneios() {
  if (torneios.length === 0) {
    LimparTela();
    console.log("Não há torneios registrados!!");
  } else {
    LimparTela();
    console.log("======================== TORNEIOS REGISTRADOS: ========================");
    torneios.forEach((torneio) => {
      console.log(
        `ID: ${torneio.id} | Nome: ${torneio.nome} | Jogo: ${torneio.jogo}  | Data: ${torneio.data}`
      );
      if (
        torneio.participantes &&
        Array.isArray(torneio.participantes) &&
        torneio.participantes.length > 0
      ) {
        console.log("  --- Participante(s) deste Torneio:");
        torneio.participantes.forEach((participante) => {
          console.log(`   - ${participante}`);
        });
      } else {
        console.log("-- Nenhum participante registrado nesse torneio --");
      }
      console.log("-".repeat(71) + "\n");
    });
  }
  prompt("Pressione ENTER para Retornar");
  LimparTela();
  exibirMenu();
}