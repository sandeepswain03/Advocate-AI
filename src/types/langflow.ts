export type LangflowTweaks = Record<string, any>;

export interface LangflowResponse {
  outputs: Array<{
    outputs: Array<{
      outputs: {
        message: {
          text: string;
        };
      };
      artifacts?: {
        stream_url?: string;
      };
    }>;
  }>;
}

export type UpdateCallback = (data: any) => void;
export type CloseCallback = (reason: string) => void;
export type ErrorCallback = (event: Event | string) => void;
