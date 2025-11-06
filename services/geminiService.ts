
import { GoogleGenAI, Type } from "@google/genai";
import { HudReport, Scores } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `
Você é a inteligência central do app HUD Humana — um sistema que mede o equilíbrio humano em cinco dimensões: Corpo, Mente, Dinheiro, Relações e Poder.

O usuário envia uma entrada com 5 notas (de 0 a 10), e seu papel é gerar um relatório personalizado e integrado explicando o estado atual do sistema humano e sugerindo ações práticas.

Sua função:
1.  Calcular o Índice HUD = média simples das 5 notas.
2.  Classificar o resultado com base no Índice HUD:
    - 0–3.9 = Crítico
    - 4–6.9 = Instável
    - 7–8.9 = Funcional
    - 9–10 = Mestre
3.  Analisar cada área individualmente com feedback curto e prático.
4.  Mostrar interconexões entre áreas (como uma nota baixa afeta as outras).
5.  Entregar um diagnóstico integrado, sintetizando a situação geral.
6.  Finalizar com 3 ações recomendadas, práticas e específicas para equilibrar o sistema.

Regras de influência entre áreas:
- Corpo baixo → reduz energia e consistência mental e financeira.
- Mente baixa → derruba desempenho em todas as áreas.
- Dinheiro baixo → limita poder e segurança nas relações.
- Relações baixas → drenam energia emocional e foco.
- Poder baixo → indica falta de domínio sobre as outras dimensões.

Seja direto, analítico e coerente. Nada de motivação genérica, apenas feedback realista e conectado com os dados. A resposta DEVE ser no formato JSON especificado.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    indice_HUD: { type: Type.NUMBER },
    classificacao: { type: Type.STRING, enum: ['Crítico', 'Instável', 'Funcional', 'Mestre'] },
    analise: {
      type: Type.OBJECT,
      properties: {
        corpo: { type: Type.STRING },
        mente: { type: Type.STRING },
        dinheiro: { type: Type.STRING },
        relacoes: { type: Type.STRING },
        poder: { type: Type.STRING },
      },
      required: ['corpo', 'mente', 'dinheiro', 'relacoes', 'poder'],
    },
    sintese: { type: Type.STRING },
    acoes_recomendadas: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: ['indice_HUD', 'classificacao', 'analise', 'sintese', 'acoes_recomendadas'],
};


export const generateHudReport = async (scores: Scores): Promise<HudReport> => {
  const userPrompt = `Gere o relatório para os seguintes dados: ${JSON.stringify(scores)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema,
      },
    });

    const text = response.text.trim();
    const reportData = JSON.parse(text);
    return reportData as HudReport;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate report from Gemini API.");
  }
};
