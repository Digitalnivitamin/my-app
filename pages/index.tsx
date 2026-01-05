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

        const chatkit = document.querySelector('openai-chatkit') as any;
        console.log('ChatKit element found:', !!chatkit);

        if (chatkit) {
          // Wait for setOptions to be available
          let attempts = 0;
          const waitForSetOptions = setInterval(() => {
            attempts++;
            if (typeof chatkit.setOptions === 'function') {
              clearInterval(waitForSetOptions);
              console.log('setOptions is now available');
              chatkit.setOptions({
                api: {
                  getClientSecret: async () => client_secret,
                },
              });
              console.log('ChatKit options set');
            } else if (attempts > 20) {
              clearInterval(waitForSetOptions);
              console.error('Timeout waiting for setOptions');
            }
          }, 100);
        } else {
          console.error('ChatKit element not found');
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
