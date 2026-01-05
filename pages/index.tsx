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

        // Wait for ChatKit to be ready
        const chatkit = document.querySelector('openai-chatkit') as any;
        if (chatkit) {
          // Wait for the ready event
          chatkit.addEventListener('chatkit.ready', () => {
            console.log('ChatKit is ready');
            chatkit.setOptions({
              api: {
                getClientSecret: async () => client_secret,
              },
            });
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
