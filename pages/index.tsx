import { ChatKit, useChatKit } from '@openai/chatkit-react';

export default function Home() {
  const { control } = useChatKit({
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

  return (
    <div>
      <h1>ChatKit Agent</h1>
      <ChatKit control={control} />
    </div>
  );
}
