'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const initChatKit = async () => {
      try {
        // Get session from your backend
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
        });
        const { client_secret } = await res.json();
        console.log('Session created:', client_secret);

        // Load ChatKit from OpenAI CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.openai.com/chatkit/chatkit.js';
        script.async = true;

        script.onload = () => {
          console.log('ChatKit library loaded');
          if ((window as any).OpenAIChatKit) {
            (window as any).OpenAIChatKit.render({
              clientSecret: client_secret,
              containerId: 'chatkit-root',
            });
          }
        };

        script.onerror = () => {
          console.error('Failed to load ChatKit script');
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error('Error initializing ChatKit:', error);
      }
    };

    initChatKit();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Superko ChatKit</h1>
      <div id="chatkit-root" style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}></div>
    </div>
  );
}
