// Vercel serverless proxy for the AI chat assistant.
// Set ANTHROPIC_API_KEY in Vercel > Project > Settings > Environment Variables.
// Hardened: the client may only send {messages}; model and max_tokens are pinned here.
const MODEL = 'claude-sonnet-5';
const MAX_TOKENS = 800;
const MAX_TURNS = 24;      // keep only the most recent turns
const MAX_CHARS = 4000;    // per-message content cap

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }
  const trimmed = messages.slice(-MAX_TURNS).map(m => ({
    role: m && m.role === 'assistant' ? 'assistant' : 'user',
    content: String((m && m.content) || '').slice(0, MAX_CHARS)
  }));

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, messages: trimmed })
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
