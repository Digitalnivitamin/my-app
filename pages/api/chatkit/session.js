export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
        'Authorization': `Bearer ${process.env.OPENAI_API_SECRET_KEY}`,
      },
      body: JSON.stringify({
        workflow: { id: process.env.OPENAI_WORKFLOW_ID },
        user: 'user-' + Math.random().toString(36).substr(2, 9),
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return res.status(response.status).json({ error: 'Failed to create session' });
    }

    const data = await response.json();
    return res.status(200).json({ client_secret: data.client_secret });
  } catch (error) {
    console.error('ChatKit session error:', error);
    return res.status(500).json({ error: 'Failed to create session' });
  }
}
