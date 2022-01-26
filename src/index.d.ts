import { IPCChannels, OrganiseFilesArg } from "./types";

interface On {
  (channel: string, func: (args?: any) => void): void
}

interface Send {
  (channel: IPCChannels.OrganiseFiles, arg: OrganiseFilesArg): void
  (channel: string, arg?: any): void
}

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing: () => void
        send: Send
        on: On
        once: On
        sendSync: (channel: string, arg?: any) => any
        removeAllListeners: (channel: string) => void
      };
    };
  }
}