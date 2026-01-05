declare global {
  interface Window {
    chatkit?: {
      render: (config: any) => void;
    };
  }
}

export {};
