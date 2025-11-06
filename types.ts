
export interface Scores {
  corpo: number;
  mente: number;
  dinheiro: number;
  relacoes: number;
  poder: number;
}

export interface HudReport {
  indice_HUD: number;
  classificacao: 'Crítico' | 'Instável' | 'Funcional' | 'Mestre';
  analise: {
    corpo: string;
    mente: string;
    dinheiro: string;
    relacoes: string;
    poder: string;
  };
  sintese: string;
  acoes_recomendadas: string[];
}
