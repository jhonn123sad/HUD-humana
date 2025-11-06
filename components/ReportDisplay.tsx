
import React from 'react';
import { HudReport, Scores } from '../types';
import { CLASSIFICATION_COLORS, DIMENSIONS } from '../constants';
import RadarChartComponent from './RadarChartComponent';
import { CheckIcon } from './Icons';

interface ReportDisplayProps {
  report: HudReport;
  scores: Scores;
  onReset: () => void;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, scores, onReset }) => {
  const classificationColor = CLASSIFICATION_COLORS[report.classificacao] || 'text-white';

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-hud-text-secondary">Seu Relatório de Sistema</h2>
        <p className="text-5xl font-bold mt-2" style={{fontFamily: "'Orbitron', sans-serif"}}>
          <span className="text-white">{report.indice_HUD.toFixed(1)}</span>
          <span className={`ml-4 ${classificationColor}`}>{report.classificacao}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="h-80 md:h-96 w-full">
            <RadarChartComponent data={scores} />
        </div>
        <div className="flex flex-col space-y-4">
            {DIMENSIONS.map(dim => (
                <div key={dim.key} className="bg-hud-bg p-4 rounded-lg border border-hud-border">
                    <h3 className="text-lg font-bold text-hud-accent flex items-center mb-1">
                        <dim.icon className="w-5 h-5 mr-2" />
                        {dim.label}
                        <span className="ml-auto font-mono text-white">{scores[dim.key]}/10</span>
                    </h3>
                    <p className="text-hud-text-secondary">{report.analise[dim.key]}</p>
                </div>
            ))}
        </div>
      </div>
      
      <div className="mt-10 bg-hud-bg p-6 rounded-lg border border-hud-border">
          <h3 className="text-xl font-bold text-hud-accent mb-2">Síntese Integrada</h3>
          <p className="text-hud-text-secondary">{report.sintese}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-hud-accent mb-4">Ações Recomendadas</h3>
        <ul className="space-y-3">
          {report.acoes_recomendadas.map((action, index) => (
            <li key={index} className="flex items-start bg-hud-bg p-4 rounded-lg border border-hud-border">
              <CheckIcon className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
              <span className="text-hud-text">{action}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onReset}
          className="bg-hud-accent-secondary hover:bg-opacity-80 text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Analisar Novamente
        </button>
      </div>
    </div>
  );
};

export default ReportDisplay;
