// src/components/BalaoMensagem.tsx
import { View, Text, Image, StyleSheet } from "react-native";
import Mensagem from "../../model/Mensagem";
import ConteudoMD from "../../shared/ConteudoMD";

export interface BalaoMensagemProps {
  mensagem: Mensagem;
  omitirAutor?: boolean;
}

export default function BalaoMensagem({
  mensagem,
  omitirAutor,
}: BalaoMensagemProps) {
  return mensagem.lado === "esquerdo" ? (
    <BalaoEsquerdo mensagem={mensagem} omitirAutor={omitirAutor} />
  ) : (
    <BalaoDireito mensagem={mensagem} omitirAutor={omitirAutor} />
  );
}

function BalaoEsquerdo({ mensagem, omitirAutor }: BalaoMensagemProps) {
  return (
    <View style={styles.containerLeft}>
      {!omitirAutor && (
        <Image
          source={require("../../assets/chat.svg")}
          style={styles.avatar}
        />
      )}
      <View style={[styles.contentLeft, omitirAutor && { paddingLeft: 48 }]}>
        {!omitirAutor && <Text style={styles.autor}>{mensagem.autor}</Text>}
        <View style={styles.balaoLeft}>
          <ConteudoMD markdown={mensagem.texto} />
        </View>
      </View>
    </View>
  );
}

function BalaoDireito({ mensagem, omitirAutor }: BalaoMensagemProps) {
  return (
    <View style={[styles.contentRight, omitirAutor && { paddingRight: 8 }]}>
      {!omitirAutor && <Text style={styles.autor}>{mensagem.autor}</Text>}
      <View style={styles.balaoRight}>
        <ConteudoMD markdown={mensagem.texto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLeft: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  contentLeft: {
    flexDirection: "column",
    maxWidth: "80%",
  },
  contentRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: "80%",
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  autor: {
    fontSize: 12,
    color: "#52525b",
    marginBottom: 4,
  },
  balaoLeft: {
    backgroundColor: "#2F4172",
    padding: 12,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    marginTop: 2,
    marginBottom: 2,
    minWidth: 60,
  },
  balaoRight: {
    backgroundColor: "#b91c1c",
    padding: 12,
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 2,
    marginBottom: 2,
    minWidth: 60,
  },
  balaoText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
  },
});
