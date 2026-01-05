'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const initChatKit = async () => {
      try {
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
        });

        if (!res.ok) {
          console.error('Session creation failed:', res.status);
          return;
        }

        const { client_secret } = await res.json();
        console.log('Client secret received:', client_secret);

        // Wait a moment for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 500));

        const chatkit = document.querySelector('openai-chatkit') as any;
        console.log('ChatKit element found:', !!chatkit);

        if (chatkit && typeof chatkit.setOptions === 'function') {
          chatkit.setOptions({
            api: {
              getClientSecret: async () => client_secret,
            },
          });
          console.log('ChatKit options set');
        } else {
          console.error('ChatKit not ready or setOptions not available');
        }
      } catch (error) {
        console.error('Error initializing ChatKit:', error);
      }
    };

    initChatKit();
  }, []);

  return (
    <div>
      <h1>Superko Agent</h1>
      <div style={{ height: '100vh', width: '100%' }}>
        <openai-chatkit></openai-chatkit>
      </div>
    </div>
  );
}
