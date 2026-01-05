import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
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

    const { client_secret } = await response.json();
    return NextResponse.json({ client_secret });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
