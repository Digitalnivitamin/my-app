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
        console.log('Client secret received:', client_secret ? 'yes' : 'no');

        // Load ChatKit script
        const script = document.createElement('script');
        script.src = 'https://cdn.platform.openai.com/deployments/chatkit/chatkit.js';
        script.async = true;

        script.onload = () => {
          console.log('ChatKit script loaded');
          
          // Wait a moment for ChatKit to be available
          setTimeout(() => {
            if ((window as any).chatkit) {
              console.log('ChatKit object found, initializing...');
              try {
                (window as any).chatkit.render({
                  clientSecret: client_secret,
                  containerId: 'chatkit-root',
                });
                console.log('ChatKit rendered successfully');
              } catch (err) {
                console.error('ChatKit render error:', err);
              }
            } else {
              console.error('ChatKit object not found on window');
            }
          }, 500);
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
      <h1>Superko Agent</h1>
      <div id="chatkit-root" style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}></div>
    </div>
  );
}
