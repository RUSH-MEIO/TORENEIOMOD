import { salvarDados, DBMASTER, torneios} from "./salvar.js"
import { exibirMenu, prompt } from "../Torneio.js";

export async function deletarTorneios() {
    console.clear();
    if (torneios.length <= 0) {
      console.log(
        "----------------------------\nNão há torneios registrados para serem deletados."
      );
      prompt("Pressione Enter para retornar ao menu...");
      exibirMenu()
      return;
    }
    console.log("========TORNEIOS A SEREM DELETADOS========");
    torneios.forEach((torneio) => {
      console.log(
        `ID: ${torneio.id} || NOME: ${torneio.nome} | JOGO: ${torneio.jogo} | DATA: ${torneio.data} | JOGADORES: ${torneio.participantes}`
      );
    });
    console.log("==========================================\n");
    const INPIDDelete = await pergunta(
      "Digite o timestamp (ID) do TORNEIO que deseja deletar\n"
    );
    const idParaDeletar = parseInt(INPIDDelete, 10);
    if (isNaN(idParaDeletar)) {
      console.log("Por favor, digite um ID válido.");
      exibirMenu();
      return;
    }
    const initialLength = torneios.length;
    torneios = torneios.filter((torneio) => torneio.id !== idParaDeletar);
    if (torneios.length < initialLength) {
      console.clear();
      console.log(`Torneio com ID ${idParaDeletar} deletado com sucesso!`);
    } else {
      console.clear();
      console.log(`Torneio com ID ${idParaDeletar} não encontrado.`);
    }
    salvarDados(DBMASTER, torneios, () => {
      prompt("Pressione ENTER para Retornar");
      exibirMenu()
    });
  }