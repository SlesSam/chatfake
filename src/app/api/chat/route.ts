import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, //  pon tu API KEY de OpenRouter
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: `${process.env.MODELS_AI}`, // pon el modelo que quieras usar
      messages: [{ role: 'user', content: message }],
    }),
  });

 
  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || 'Lo siento, no pude responder.';

  return NextResponse.json({ reply });
}
