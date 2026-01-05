import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Load the ChatKit script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@openai/chatkit-js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize ChatKit after script loads
      if (window.OpenAI?.ChatKit) {
        window.OpenAI.ChatKit.init({
          api: {
            async getClientSecret(existing) {
              if (existing) {
                return existing;
              }

              const res = await fetch('/api/chatkit/session', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const { client_secret } = await res.json();
              return client_secret;
            },
          },
        });
      }
    };
  }, []);

  return (
    <div>
      <h1>ChatKit Agent</h1>
      <div id="chatkit-root"></div>
    </div>
  );
}
