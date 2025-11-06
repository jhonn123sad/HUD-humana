// FIX: Import React to use React types like React.FC and React.SVGProps.
import React from 'react';
import { Scores } from "./types";
import { BodyIcon, BrainIcon, HeartIcon, PowerIcon, WalletIcon } from "./components/Icons";

export const DIMENSIONS: {
  key: keyof Scores;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  { key: 'corpo', label: 'Corpo', icon: BodyIcon },
  { key: 'mente', label: 'Mente', icon: BrainIcon },
  { key: 'dinheiro', label: 'Dinheiro', icon: WalletIcon },
  { key: 'relacoes', label: 'Relações', icon: HeartIcon },
  { key: 'poder', label: 'Poder', icon: PowerIcon },
];

export const CLASSIFICATION_COLORS: { [key: string]: string } = {
    'Crítico': 'text-red-400',
    'Instável': 'text-yellow-400',
    'Funcional': 'text-green-400',
    'Mestre': 'text-hud-accent',
};
