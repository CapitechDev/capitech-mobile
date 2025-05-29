import Markdown from "react-native-markdown-display";
import { View, StyleSheet } from "react-native";

export interface ConteudoMDProps {
  markdown: string;
}

export default function ConteudoMD({ markdown }: ConteudoMDProps) {
  return (
    <View>
      <Markdown style={markdownStyles}>{markdown}</Markdown>
    </View>
  );
}

const markdownStyles = StyleSheet.create({
  body: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
  },
  text: {
    color: "#fff",
  },
});
