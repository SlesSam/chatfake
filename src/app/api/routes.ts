export async function POST(req: Request) {
    const { message } = await req.json();

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}', {
        headers: {
            Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            model: 'openai/gpt-3.5-turbo', // o mistralai/mixtral-8x7b, etc.
            messages: [{ role: 'user', content: message }],
        }),
    });

    const data = await response.json();
    return Response.json({ reply: data.choices[0].message.content });
}
