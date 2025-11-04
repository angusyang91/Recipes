import React, { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import RecipeDisplay from './components/RecipeDisplay';
import ErrorMessage from './components/ErrorMessage';
import SearchToggle from './components/SearchToggle';
import SearchResultsDisplay from './components/SearchResultsDisplay';
import { LoadingSpinner, ChefIcon } from './components/icons';
import { extractRecipeFromUrl, searchForRecipes } from './services/geminiService';
import type { Recipe, SearchResult } from './types';

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'url' | 'search'>('url');

  const clearState = () => {
    setError(null);
    setRecipe(null);
    setSearchResults(null);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    clearState();
    try {
      const results = await searchForRecipes(query);
      setSearchResults(results);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while searching.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleExtract = async (url: string) => {
    setIsLoading(true);
    clearState();
    try {
      const extractedRecipe = await extractRecipeFromUrl(url);
      setRecipe(extractedRecipe);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while extracting the recipe.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectSearchResult = useCallback((url: string) => {
    setSearchResults(null);
    handleExtract(url);
  }, []);


  const handleSubmit = useCallback((value: string) => {
    if (inputMode === 'search') {
      handleSearch(value);
    } else {
      handleExtract(value);
    }
  }, [inputMode]);

  return (
    <div className="min-h-screen bg-amber-50/80 text-gray-800 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      <header className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-800">Recipe AI</h1>
        <p className="mt-2 text-lg md:text-xl text-amber-700">Your AI-powered sous-chef.</p>
      </header>
      
      <main className="w-full flex flex-col items-center flex-grow">
        <div className="w-full max-w-2xl px-2">
            <SearchToggle mode={inputMode} setMode={setInputMode} />
            <InputForm onSubmit={handleSubmit} isLoading={isLoading || isSearching} mode={inputMode} />
        </div>
        
        {(isLoading || isSearching) && (
            <div className="flex flex-col items-center justify-center text-amber-700 p-8 rounded-lg mt-8">
                <LoadingSpinner />
                <p className="mt-4 text-lg">
                  {isSearching ? 'Searching for the best recipes...' : 'Analyzing the recipe...'}
                </p>
            </div>
        )}

        {error && <ErrorMessage message={error} />}

        {searchResults && !isSearching && (
          <SearchResultsDisplay 
            results={searchResults} 
            onSelect={handleSelectSearchResult} 
          />
        )}

        {recipe && !isLoading && <RecipeDisplay recipe={recipe} />}
        
        {!recipe && !isLoading && !isSearching && !error && !searchResults && (
            <div className="text-center text-amber-600/80 mt-16 max-w-lg animate-fade-in-up">
                <ChefIcon />
                <p className="text-lg mt-4">Tired of scrolling? Search for a recipe by name or paste a URL to let AI do the heavy lifting!</p>
            </div>
        )}
      </main>

      <footer className="w-full text-center text-amber-700/70 mt-12 pb-4">
        <p>Powered by Gemini</p>
      </footer>
      <style>
        {`
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default App;