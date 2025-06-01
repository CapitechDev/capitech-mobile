import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Trail } from "../../types/Trails";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const TrailDescription = () => {
  const params = useLocalSearchParams();
  const [trail, setTrail] = useState<Trail | null>(null);

  useEffect(() => {
    if (params.trail) {
      try {
        setTrail(JSON.parse(params.trail as string));
      } catch (error) {
        console.error("Failed to parse trail:", error);
      }
    }
  }, [params.trail]);

  if (!trail) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando artigo...</Text>
      </View>
    );
  }

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="pb-4 bg-white text-gray-900">
        <section class="bg-[#5190bd] text-white text-center gap-8 p-2">
            <h2 class="font-semibold text-2xl">
              ${trail.name}
            </h2>
        </section>
        <section class="container mx-auto max-w-5xl p-10 px-4 text-black">
            <h2 class="text-center font-headline text-xl font-semibold text-black mb-5">
                ${trail.subtitle}
            </h2>

            <div className="w-full">
                ${trail.description}
            </div>

            <h3 class="text-center text-xl font-semibold mb-7">
                Para se aprofundar no assunto, temos alguns vídeos como
                recomendação:
            </h3>

            <p class="text-lg mb-8">
                <b>Descrição: </b>
                ${trail.video_description}
            </p>

            <a href="${trail.references}" rel="noreferrer" target="_blank">
                <p class="text-center underline text-blue-700 font-bold transition duration-300 hover:text-blue-800 mb-10">
                  - ${trail.video_title}
                </p>
            </a>

            ${
              trail.iframe_references
                ? 
                `<div class="relative pb-[56.25%] h-0" style="position:relative;padding-bottom:56.25%;height:0;">
                  <iframe
                    allowfullscreen
                    class="absolute top-0 left-0 w-full h-full"
                    src="${trail.iframe_references}"
                    title="YouTube Video"
                    frameborder="0"
                  ></iframe>
                </div>
              `
                : ""
            }
        </section>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
      // Opcional: para desabilitar scroll interno do webview
      // nestedScrollEnabled={true}
    />
  );
};

export default TrailDescription;
