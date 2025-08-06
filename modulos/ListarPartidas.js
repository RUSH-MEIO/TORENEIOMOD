import { torneios } from "./salvar.js"
import { exibirMenu, prompt } from "../Torneio.js";

export function ListarPartidasDoTorneio() {
    console.clear();
    console.log("======================== TORNEIOS REGISTRADOS: ========================");
    
    torneios.forEach((torneio) => {
        console.log("--------------------------------------------");
        console.log(`ID: ${torneio.id} | Nome: ${torneio.nome} | Jogo: ${torneio.jogo} | Data: ${torneio.data}`);

        if (torneio.partidas && Array.isArray(torneio.partidas) && torneio.partidas.length > 0) {
            console.log("  --- Partidas deste Torneio ---");
            torneio.partidas.forEach((partida) => {
                console.log(`  - ${partida.jogador1} vs ${partida.jogador2} | Vencedor: ${partida.vencedor}`);
            });
        } else {
            console.log("  Nenhuma partida registrada para este torneio.");
        }
    });

    console.log("====================================================\n");
    prompt("Pressione ENTER para voltar ao menu...");
    exibirMenu();
}