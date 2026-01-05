'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const initChatKit = async () => {
      try {
        // Get the client secret from your backend
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { client_secret } = await res.json();
        console.log('Client secret received:', client_secret);

        // Load ChatKit script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@openai/chatkit-js@latest/dist/index.min.js';
        script.async = true;

        script.onload = () => {
          console.log('ChatKit script loaded');
          
          if (window.chatkit) {
            console.log('ChatKit object found, rendering...');
            window.chatkit.render({
              clientSecret: client_secret,
              containerId: 'chatkit-root',
            });
          } else {
            console.error('ChatKit object not found on window');
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
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>ChatKit Agent</h1>
      <div id="chatkit-root" style={{ height: '600px', width: '100%', border: '1px solid #ccc' }}></div>
    </div>
  );
}
