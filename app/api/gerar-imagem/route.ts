// Tradução automática removida devido a instabilidade do serviço gratuito.
// Se não funcionar, tente descrever seu prompt em inglês para melhores resultados.

import { NextRequest, NextResponse } from 'next/server';

const STABILITY_KEY = process.env.STABILITY_API_KEY;

function enrichPrompt(prompt: string) {
  return `fantasy RPG character, ${prompt}, highly detailed, digital painting, epic lighting, trending on artstation, by Greg Rutkowski, dark fantasy, mystical, 4k, sharp focus, masterpiece, ultra detailed, volumetric light, dramatic, fantasy art`;
}

async function tryStabilityAI(prompt: string) {
  if (!STABILITY_KEY) {
    throw new Error('A chave da API da Stability.ai não está definida. Defina a variável de ambiente STABILITY_API_KEY.');
  }
  try {
    const res = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STABILITY_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 512,
        width: 512,
        samples: 1,
        steps: 30,
      }),
    });
    const data = await res.json();
    if (data.artifacts && data.artifacts[0] && data.artifacts[0].base64) {
      return `data:image/png;base64,${data.artifacts[0].base64}`;
    }
    throw new Error(data.message || 'StabilityAI: no image');
  } catch (e) {
    throw e;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt é obrigatório.' }, { status: 400 });
    }
    const enrichedPrompt = enrichPrompt(prompt);
    try {
      const image = await tryStabilityAI(enrichedPrompt);
      return NextResponse.json({ image, provider: 'StabilityAI' });
    } catch (err: any) {
      return NextResponse.json({ error: err.message || 'Erro ao gerar imagem com StabilityAI.' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro interno.' }, { status: 500 });
  }
} 