import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
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
      return NextResponse.json(
        { error: 'Failed to create session', details: errorData },
        { status: response.status }
      );
    }

    const { client_secret } = await response.json();
    return NextResponse.json({ client_secret });
  } catch (error) {
    console.error('ChatKit session error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
