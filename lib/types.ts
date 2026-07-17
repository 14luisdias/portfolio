export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  error?: string;
}
