import { listarTorneios } from "./Listar.js";
import { filtrarTorneios } from "./FiltrarTorneios.js";
import PromptSync from "prompt-sync";
export const prompt = PromptSync({ sigint: true });

export let torneios = []
export let partidas = []

export function exibirMenu() {
  console.log(
    "=========MENU=========\n1-Adicionar Torneio\n2-Listar Torneios\n3-Filtrar por Jogo\n4-Deletar Torneios\n5-Registrar Partidas\n6-Listar Partidas de um Torneio\n0-Sair do programa"
  );
  console.log("Insira a opção desejada.\n");
  let opcaoMenu = prompt("> ");

  opcaoMenu = parseInt(opcaoMenu, 10);
  switch (opcaoMenu) {
    case 1:
      adicionarTorneios();
      break;
    case 2:
      listarTorneios();
      break;
    case 3:
      filtrarTorneios();
      break;
    case 4:
      deletarTorneios();
      break;
    case 5:
      registrarPartidas();
      break;
    case 6:
      ListarPartidasDoTorneio();
    case 0:
      process.exit();
    default:
      console.log("Insira uma opção válida!\n");
      exibirMenu();
  }
}
exibirMenu();
