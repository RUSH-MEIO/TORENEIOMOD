import { salvarDados, DBMASTER, torneios} from "./salvar.js"
import { exibirMenu, prompt, LimparTela} from "../Torneio.js";
  
export async function adicionarTorneios() {
    LimparTela()
    console.log("==== 🏆 TORNEIO 🏆 ===");
  
    const INPTorneioNome = await prompt(
      "📋 Qual será o nome do torneio que deseja criar?: "
    );
    const INPTorneioJogoNome = await prompt("🎮 Qual será o jogo disputado?: ");
    const INPTorneioData = await adicionarData();
    const INPTorneioPlayers = await prompt(
      "👤 Quais serão os participantes? (Separe por virgula ex player1,player2,player3): "
    );
    adicionarTorneiosArray(
      INPTorneioNome,
      INPTorneioJogoNome,
      INPTorneioData,
      INPTorneioPlayers
    );
  }
  
  async function adicionarData() {
    let dia, mes, ano;
    let dataValida = false;
    let timestamp;
  
    while (!dataValida) {
      dia = await prompt("📅 Insira o DIA do torneio (DD): ");
      mes = await prompt("📅 Insira o MES do torneio (MM): ");
      ano = await prompt("📅 Insira o ANO do torneio (AAAA): ");
  
      const numDia = parseInt(dia, 10);
      const numMes = parseInt(mes, 10);
      const numAno = parseInt(ano, 10);
      const dataObjeto = new Date(numAno, numMes - 1, numDia);
      if (
        !isNaN(dataObjeto.getTime()) &&
        dataObjeto.getDate() === numDia &&
        dataObjeto.getMonth() === numMes - 1 &&
        dataObjeto.getFullYear() === numAno
      ) {
        timestamp = dataObjeto.getTime();
        dataValida = true;
        //console.log(`Data válida! Timestamp gerado: ${timestamp}`);
      } else {
        console.log("⚠️ Data inválida. Por favor, insira uma data válida.");
      }
    }
    return timestamp;
  }
  
  function adicionarTorneiosArray(nome, jogo, timestampID, playersString) {
    const DataFormatada = new Date(timestampID).toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  
    const IDTORNEIOTIME = Date.now();
    const IDTORNEIO = Math.floor(IDTORNEIOTIME / 60000)
    const playersarray = playersString.split(",").map((player) => player.trim());
  
    const torneio = {
      id: IDTORNEIO,
      nome: nome,
      jogo: jogo,
      data: DataFormatada,
      participantes: playersarray,
    };
    torneios.push(torneio);
    salvarDados(DBMASTER, torneios, () => {
      LimparTela()
      console.log(
        `========== Torneio criado com SUCESSO! ========== \nNome do Torneio: ${nome} | Jogo: ${jogo} | Data: ${DataFormatada} | Participantes: ${playersarray}`
      );
      prompt("Pressione ENTER para Retornar");
      LimparTela()
      exibirMenu()
    });
  }