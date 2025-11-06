
import React, { useState, useCallback } from 'react';
import { HudReport, Scores } from './types';
import { DIMENSIONS } from './constants';
import { generateHudReport } from './services/geminiService';
import ScoreInput from './components/ScoreInput';
import ReportDisplay from './components/ReportDisplay';

const App: React.FC = () => {
  const [scores, setScores] = useState<Scores>({
    corpo: 5,
    mente: 5,
    dinheiro: 5,
    relacoes: 5,
    poder: 5,
  });
  const [report, setReport] = useState<HudReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleScoreChange = useCallback((dimension: keyof Scores, value: number) => {
    setScores(prevScores => ({
      ...prevScores,
      [dimension]: value,
    }));
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const result = await generateHudReport(scores);
      setReport(result);
    } catch (e) {
      setError('Falha ao gerar o relatório. Verifique sua conexão ou a chave de API e tente novamente.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hud-bg font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-hud-accent" style={{fontFamily: "'Orbitron', sans-serif"}}>
          HUMAN <span className="text-white">HUD</span>
        </h1>
        <p className="text-hud-text-secondary mt-2">Seu painel de controle para o equilíbrio humano.</p>
      </header>
      
      <main className="w-full max-w-5xl flex-grow">
        <div className="bg-hud-card border border-hud-border rounded-lg shadow-2xl shadow-hud-accent/10 p-6 sm:p-8">
          {!report && !isLoading && (
            <>
              <h2 className="text-2xl font-semibold text-white mb-6">Avalie suas 5 Dimensões</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DIMENSIONS.map((dim) => (
                  <ScoreInput
                    key={dim.key}
                    label={dim.label}
                    Icon={dim.icon}
                    value={scores[dim.key]}
                    onChange={(value) => handleScoreChange(dim.key, value)}
                  />
                ))}
              </div>
              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-hud-accent hover:bg-opacity-80 text-hud-bg font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-hud-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Analisando...' : 'Gerar Relatório'}
                </button>
              </div>
            </>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-hud-accent"></div>
                <p className="mt-4 text-hud-text-secondary">A I.A. está processando seu sistema...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-400 bg-red-900/20 border border-red-500 rounded-lg p-4">
              <p className="font-semibold">Erro</p>
              <p>{error}</p>
            </div>
          )}

          {report && (
            <ReportDisplay report={report} onReset={() => setReport(null)} scores={scores} />
          )}
        </div>
      </main>
      <footer className="w-full max-w-5xl text-center mt-8 text-sm text-hud-text-secondary">
        <p>Powered by Gemini API. As análises são geradas por IA e devem ser consideradas como ponto de partida para auto-reflexão.</p>
      </footer>
    </div>
  );
};

export default App;
