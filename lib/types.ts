// Tipos para a API de Leads
export interface CreateLeadDto {
  nome: string;
  email: string;
  telefone: string;
}

export interface LeadCaptureResponse {
  success: boolean;
  message?: string;
}

// Tipos para o modal de captura
export interface LeadFormData {
  nome: string;
  email: string;
  telefone: string;
}

export interface LeadFormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
}
