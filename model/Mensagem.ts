import Id from "../functions/Id";

export default class Mensagem {
  constructor(
    readonly id: string,
    readonly autor: string,
    readonly texto: string,
    readonly lado: "esquerdo" | "direito"
  ) {}

  static nova(texto: string, autor: "Visitante" | "Assistente", lado: "esquerdo" | "direito") {
    return new Mensagem(Id.gerar(), autor, texto, lado)
  }

  static criarDeObjeto(obj: any): Mensagem {
    return new Mensagem(obj.id, obj.autor, obj.texto, obj.lado)
  }
}
