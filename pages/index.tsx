'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const initChatKit = async () => {
      try {
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
        });
        const { client_secret } = await res.json();
        console.log('Client secret received');

        // Load ChatKit script
        const script = document.createElement('script');
        script.src = 'https://cdn.openai.com/chatkit/chatkit.js';
        script.async = true;

        script.onload = () => {
          console.log('ChatKit loaded');
          if ((window as any).chatkit) {
            (window as any).chatkit.render({
              clientSecret: client_secret,
              containerId: 'chatkit-root',
            });
          }
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    initChatKit();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Superko Agent</h1>
      <div id="chatkit-root" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
}
