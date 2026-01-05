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
        console.log('Client secret received');

        // Load ChatKit script
        const script = document.createElement('script');
        script.src = 'https://cdn.platform.openai.com/deployments/chatkit/chatkit.js';
        script.async = true;

        script.onload = () => {
          console.log('ChatKit script loaded');
          
          // Wait for ChatKit to be available
          setTimeout(() => {
            // Check multiple possible object locations
            const chatkit = (window as any).chatkit 
              || (window as any).OpenAI?.chatkit 
              || (window as any).ChatKit
              || (window as any).OpenAIChatKit;
            
            console.log('Window keys:', Object.keys(window).filter(k => 
              k.toLowerCase().includes('chat') || k.toLowerCase().includes('openai')
            ));

            if (chatkit && chatkit.render) {
              console.log('ChatKit render found');
              chatkit.render({
                clientSecret: client_secret,
                containerId: 'chatkit-root',
              });
            } else {
              console.log('Available chatkit object:', chatkit);
              console.log('Full window object sample:', {
                hasOpenAI: !!(window as any).OpenAI,
                hasChatkit: !!(window as any).chatkit,
                keys: Object.keys(window).slice(0, 20)
              });
            }
          }, 1000);
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
