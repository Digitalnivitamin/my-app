'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const initChatKit = async () => {
      try {
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { client_secret } = await res.json();
        console.log('Client secret received:', client_secret);

        // Wait a bit for script to load
        setTimeout(() => {
          if (window.chatkit) {
            console.log('ChatKit found, rendering...');
            window.chatkit.render({
              clientSecret: client_secret,
              containerId: 'chatkit-root',
            });
          } else {
            console.error('ChatKit still not available');
          }
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    initChatKit();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>ChatKit Agent</h1>
      <div id="chatkit-root" style={{ height: '600px', width: '100%', border: '1px solid #ccc' }}></div>
    </div>
  );
}
