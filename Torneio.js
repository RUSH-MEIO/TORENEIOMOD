import PromptSync from "prompt-sync";
export const prompt = PromptSync({ sigint: true });
import { DBMASTER, carregarDados, Torneiospepino } from "./modulos/salvar.js";
import { adicionarTorneios } from "./modulos/adicionar.js"
import { deletarTorneios } from "./modulos/deletar.js";
import { listarTorneios } from "./modulos/Listar.js";
import { FiltrarPorJogo } from "./modulos/FiltrarPorJogo.js";
import { registrarPartidas } from "./modulos/RegistarPartida.js";
import { ListarPartidasDoTorneio } from "./modulos/ListarPartidas.js";

export function LimparTela() {
  console.clear();
}

export function exibirMenu() {
  console.clear()
  console.log(
    "=========MENU=========\n1-Adicionar Torneio\n2-Listar Torneios\n3-Filtrar por Jogo\n4-Deletar Torneios\n5-Registrar Partidas\n6-Listar Partidas de um Torneio\n0-Sair do programa"
  );
    let opcaoMenu = prompt("Insira a opção desejada: ")
    opcaoMenu = parseInt(opcaoMenu, 10);
    switch (opcaoMenu) {
      case 1:
        adicionarTorneios(); //
        break;
      case 2:
        listarTorneios(); //
        break;
      case 3:
        FiltrarPorJogo(); //
        break;
      case 4:
        deletarTorneios(); //
        break;
      case 5:
        registrarPartidas();
        break;
      case 6:
        ListarPartidasDoTorneio()
        break;
      case 0:
        process.exit();
      default:
        console.log("Insira uma opção válida!\n");
        exibirMenu();
    }
  };


export function pepino(){
    console.log("Iniciando o sistema...");
  carregarDados(DBMASTER, (dadostorneio) => {
  Torneiospepino(dadostorneio);
  exibirMenu();
  });
}

pepino()
