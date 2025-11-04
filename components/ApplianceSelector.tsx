
import React from 'react';

const APPLIANCES = [
  'Stainless Steel Pan',
  'Non-Stick Pan',
  'Breville Smart Oven Toaster Pro',
  'Instant Pot',
];

interface ApplianceSelectorProps {
  selectedAppliances: string[];
  onToggleAppliance: (appliance: string) => void;
}

const ApplianceSelector: React.FC<ApplianceSelectorProps> = ({ selectedAppliances, onToggleAppliance }) => {
  return (
    <div className="w-full max-w-2xl my-6 animate-fade-in-up">
      <h3 className="text-lg font-semibold text-amber-800 mb-3 text-center">My Appliances (Optional)</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {APPLIANCES.map((appliance) => {
          const isSelected = selectedAppliances.includes(appliance);
          return (
            <button
              key={appliance}
              type="button"
              onClick={() => onToggleAppliance(appliance)}
              className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-200 ease-in-out transform hover:scale-105
                ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                    : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-100'
                }
              `}
              aria-pressed={isSelected}
            >
              {appliance}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ApplianceSelector;
