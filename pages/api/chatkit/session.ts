import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export async function POST(request: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_SECRET_KEY,
    });

    const session = await openai.chatkit.sessions.create({
      workflow: { id: process.env.OPENAI_WORKFLOW_ID },
      user: 'user-' + Math.random().toString(36).substr(2, 9),
    });

    return NextResponse.json({ client_secret: session.client_secret });
  } catch (error) {
    console.error('ChatKit session error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
