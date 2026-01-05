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

        // Get the ChatKit element and cast to any
        const chatkit = document.querySelector('openai-chatkit') as any;
        if (chatkit) {
          chatkit.setOptions({
            api: {
              getClientSecret: async () => client_secret,
            },
          });
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
      <div style={{ height: '600px' }}>
        <openai-chatkit></openai-chatkit>
      </div>
    </div>
  );
}
