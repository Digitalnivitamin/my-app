'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
        });
        const data = await res.json();
        console.log('Session created:', data.client_secret);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    initChat();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Superko ChatKit</h1>
      <p>ChatKit widget will appear below:</p>
      <iframe
        src={`https://chatkit.openai.com/embed?workflow_id=wf_694eaa37cbd0819082a033c03a980cda05ca5c92ab37fcea`}
        style={{ width: '100%', height: '600px', border: 'none' }}
        title="ChatKit"
      />
    </div>
  );
}
