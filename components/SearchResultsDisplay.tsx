import React from 'react';
import type { SearchResult } from '../types';

interface SearchResultsDisplayProps {
  results: SearchResult[];
  onSelect: (url: string) => void;
}

const SearchResultsDisplay: React.FC<SearchResultsDisplayProps> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return (
        <div className="w-full max-w-2xl text-center bg-white/80 p-6 rounded-lg my-8 animate-fade-in-up">
            <h2 className="text-xl font-semibold text-gray-700">No Recipes Found</h2>
            <p className="text-gray-500 mt-2">Try a different search term.</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white/50 p-6 rounded-2xl shadow-lg my-8 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-amber-800 text-center mb-6">Select a Recipe</h2>
      <div className="space-y-4">
        {results.map((result, index) => (
          <button
            key={index}
            onClick={() => onSelect(result.link)}
            className="w-full text-left p-4 bg-white rounded-lg shadow-sm border-2 border-transparent hover:border-amber-500 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label={`Select recipe: ${result.title}`}
          >
            <p className="font-semibold text-lg text-amber-900">{result.title}</p>
            <p className="text-sm text-gray-500 truncate">{result.link}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsDisplay;