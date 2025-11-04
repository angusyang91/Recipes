import React, { useState, useEffect } from 'react';
import { LinkIcon, SearchIcon } from './icons';

interface InputFormProps {
  onSubmit: (value: string) => void;
  isLoading: boolean;
  mode: 'url' | 'search';
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, mode }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    // Clear input when mode changes
    setValue('');
  }, [mode]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
    }
  };

  const isUrlMode = mode === 'url';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {isUrlMode ? <LinkIcon /> : <SearchIcon />}
        </div>
        <input
          type={isUrlMode ? "url" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={isUrlMode ? "https://www.yourfavoriterecipe.com/..." : "e.g., 'chicken congee'"}
          required
          disabled={isLoading}
          className="w-full pl-12 pr-36 py-4 text-base sm:text-lg text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 shadow-sm"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute inset-y-0 right-0 m-2 flex items-center justify-center px-6 sm:px-8 py-2 text-base sm:text-lg font-semibold text-white bg-amber-600 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:bg-amber-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? 'Working...' : (isUrlMode ? 'Get Recipe' : 'Search')}
        </button>
      </div>
    </form>
  );
};

export default InputForm;