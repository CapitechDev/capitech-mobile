import Mensagem from "../model/Mensagem";

export default async function conversar(
  chatId: string,
  mensagem: Mensagem
): Promise<string | null> {
  const webhookUrl = "https://capitech.app.n8n.cloud/webhook/chat";
  if (!webhookUrl) return null;

  const resposta = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId,
      mensagem: mensagem.texto,
    }),
  });

  let msg = await resposta.json();

  // 1. Tenta pegar resposta direta
  if (msg && typeof msg.resposta === "string" && msg.resposta.trim() !== "") {
    return msg.resposta;
  }
  // 2. Tenta pegar output direto
  if (msg && typeof msg.output === "string" && msg.output.trim() !== "") {
    return msg.output;
  }
  // 3. Tenta buscar resposta em string JSON aninhada
  const keys = Object.keys(msg);
  if (keys.length === 1 && typeof keys[0] === "string") {
    try {
      const inner = JSON.parse(keys[0]);
      if (
        inner &&
        typeof inner.resposta === "string" &&
        inner.resposta.trim() !== ""
      ) {
        return inner.resposta;
      }
      if (
        inner &&
        typeof inner.output === "string" &&
        inner.output.trim() !== ""
      ) {
        return inner.output;
      }
    } catch {}
  }
  // 4. Busca recursiva por output
  function findOutput(obj: any): string | null {
    if (!obj || typeof obj !== "object") return null;
    if (typeof obj.output === "string" && obj.output.trim() !== "")
      return obj.output;
    for (const key of Object.keys(obj)) {
      const found = findOutput(obj[key]);
      if (found) return found;
    }
    return null;
  }
  const found = findOutput(msg);
  if (found) return found;
  return null;
}
