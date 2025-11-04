import React from 'react';

interface SearchToggleProps {
  mode: 'url' | 'search';
  setMode: (mode: 'url' | 'search') => void;
}

const SearchToggle: React.FC<SearchToggleProps> = ({ mode, setMode }) => {
  const baseClasses = "w-1/2 py-2.5 text-sm font-semibold text-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1";
  const activeClasses = "bg-white text-amber-700 shadow-md";
  const inactiveClasses = "bg-transparent text-amber-600/80";

  return (
    <div className="w-full max-w-sm mx-auto bg-amber-200/50 rounded-full p-1 flex">
      <button 
        onClick={() => setMode('url')}
        className={`${baseClasses} rounded-l-full ${mode === 'url' ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === 'url'}
      >
        Search by URL
      </button>
      <button
        onClick={() => setMode('search')}
        className={`${baseClasses} rounded-r-full ${mode === 'search' ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === 'search'}
      >
        Search by Name
      </button>
    </div>
  );
};

export default SearchToggle;