'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Declare the window type
    declare global {
      interface Window {
        chatkit: any;
      }
    }

    // Load ChatKit script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@openai/chatkit-js@latest/dist/index.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const initChatKit = async () => {
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { client_secret } = await res.json();

        if (window.chatkit) {
          window.chatkit.render({
            clientSecret: client_secret,
            containerId: 'chatkit-root',
          });
        }
      };

      initChatKit();
    };
  }, []);

  return (
    <div>
      <h1>ChatKit Agent</h1>
      <div id="chatkit-root" style={{ height: '600px', width: '100%' }}></div>
    </div>
  );
}
