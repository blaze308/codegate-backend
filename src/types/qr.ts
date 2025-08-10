export interface QRCodeOptions {
  type?: "png" | "svg" | "pdf";
  quality?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  width?: number;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

export interface QRRequestOptions {
  format?: "png" | "svg" | "pdf";
  width?: number;
  quality?: number;
  margin?: number;
  darkColor?: string;
  lightColor?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

export interface QRRequest {
  text: string;
  options?: QRRequestOptions;
}

export interface BatchQRItem {
  id?: string;
  text: string;
}

export interface BatchQRRequest {
  items: BatchQRItem[];
  options?: QRRequestOptions;
}

export interface QRResponse {
  success: boolean;
  data?: {
    qrCode: string;
    text: string;
    format: string;
    options: QRCodeOptions;
    generatedAt: string;
  };
  error?: string;
  message?: string;
}

export interface BatchQRResponse {
  success: boolean;
  data?: {
    results: Array<{
      id: string;
      text: string;
      qrCode: string | null;
      success: boolean;
      error?: string;
    }>;
    summary: {
      total: number;
      successful: number;
      failed: number;
    };
    options: QRCodeOptions;
    generatedAt: string;
  };
  error?: string;
  message?: string;
}
