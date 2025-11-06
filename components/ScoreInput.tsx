
import React from 'react';

interface ScoreInputProps {
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  value: number;
  onChange: (value: number) => void;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ label, Icon, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center text-lg font-medium text-hud-text">
          <Icon className="w-6 h-6 mr-3 text-hud-accent" />
          {label}
        </label>
        <span className="text-xl font-bold text-white bg-hud-bg px-3 py-1 rounded-md border border-hud-border">
          {value}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-hud-border rounded-lg appearance-none cursor-pointer range-lg accent-hud-accent"
      />
    </div>
  );
};

export default ScoreInput;
