import { salvarDados, DBMASTER, torneios, Torneiospepino, carregarDados} from "./salvar.js"
import { exibirMenu, prompt, LimparTela} from "../Torneio.js";

export function deletarTorneios() {
    LimparTela();
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
    console.log("Digite o timestamp (ID) do TORNEIO que deseja deletar")
    const INPIDDelete = prompt()
    const idParaDeletar = parseInt(INPIDDelete, 10);
    if (isNaN(idParaDeletar)) {
      console.log("Por favor, digite um ID válido.");
      exibirMenu();
      return;
    }
    const initialLength = torneios.length;
    const novosTorneios = torneios.filter((torneio) => torneio.id !== idParaDeletar);
    Torneiospepino(novosTorneios);
    if (torneios.length < initialLength) {
      LimparTela();
      console.log(`Torneio com ID ${idParaDeletar} deletado com sucesso!`);
    } else {
      LimparTela();
      console.log(`Torneio com ID ${idParaDeletar} não encontrado.`);
    }
    salvarDados(DBMASTER, torneios, () => {
      prompt("Pressione ENTER para Retornar");
      LimparTela()
      exibirMenu()
    });
  }