import Id from "../functions/Id";
import useAsyncStorage from "./useAsyncStorage";
import Mensagem from "../model/Mensagem";
import conversar from "../functions/chat";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useChat() {
  const [chatId] = useAsyncStorage<string>("chatId", Id.gerar());
  const [mensagensArmazenadas, setMensagensArmazenadas] = useAsyncStorage<
    any[]
  >("mensagens", []);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [pensando, setPensando] = useState(false);

  useEffect(() => {
    const mensagensInstanciadas = mensagensArmazenadas.map((obj) =>
      Mensagem.criarDeObjeto(obj)
    );
    setMensagens(mensagensInstanciadas);
  }, [mensagensArmazenadas]);

  async function adicionarMensagem(texto: string) {
    try {
      setPensando(true);

      const nova = Mensagem.nova(texto, "Visitante", "direito");
      const novasMensagens = [...mensagens, nova];

      setMensagens(novasMensagens);
      setMensagensArmazenadas(novasMensagens);

      let respostaTexto = await conversar(chatId, nova);
      if (!respostaTexto)
        respostaTexto = "Desculpe, não consegui entender. Tente novamente!";

      const resposta = Mensagem.nova(respostaTexto, "Assistente", "esquerdo");
      const atualizadas = [...novasMensagens, resposta];

      setMensagens(atualizadas);
      setMensagensArmazenadas(atualizadas);
    } finally {
      setPensando(false);
    }
  }

  function limparMensagens() {
    setMensagens([]);
    setMensagensArmazenadas([]);
    AsyncStorage.removeItem("mensagens");
  }

  return {
    chatId,
    mensagens,
    pensando,
    adicionarMensagem,
    limparMensagens,
  };
}
