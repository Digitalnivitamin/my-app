'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Load ChatKit script from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@openai/chatkit@latest';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const initChatKit = async () => {
        try {
          const res = await fetch('/api/chatkit/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const { client_secret } = await res.json();

          if (window.OpenAI?.chatkit) {
            window.OpenAI.chatkit.mount({
              apiKey: client_secret,
              containerId: 'chatkit-root',
            });
          }
        } catch (error) {
          console.error('Failed to initialize ChatKit:', error);
        }
      };

      initChatKit();
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>ChatKit Agent</h1>
      <div id="chatkit-root" style={{ height: '600px', width: '100%', border: '1px solid #ccc' }}></div>
    </div>
  );
}
