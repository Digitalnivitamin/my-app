declare global {
  interface Window {
    chatkit?: {
      render: (config: {
        clientSecret: string;
        containerId: string;
      }) => void;
    };
  }
}

export {};
