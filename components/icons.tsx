import React from 'react';

export const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

export const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);


export const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LoadingSpinner = () => (
  <svg className="animate-spin h-10 w-10 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.25a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM18.75 6a.75.75 0 000-1.5h-3.5a.75.75 0 000 1.5h3.5zM12 21.75a.75.75 0 00-.75-.75v-3.5a.75.75 0 001.5 0v3.5a.75.75 0 00-.75.75zM5.25 18a.75.75 0 010 1.5h3.5a.75.75 0 010-1.5h-3.5zM18.41 8.59a.75.75 0 00-1.06-1.06l-2.47 2.47a.75.75 0 001.06 1.06l2.47-2.47zM8.03 17.47a.75.75 0 01-1.06-1.06l2.47-2.47a.75.75 0 011.06 1.06l-2.47 2.47zM5.59 8.59a.75.75 0 011.06-1.06l2.47 2.47a.75.75 0 11-1.06 1.06L5.59 8.59zM15.97 17.47a.75.75 0 001.06-1.06l-2.47-2.47a.75.75 0 00-1.06 1.06l2.47 2.47z" />
    </svg>
);

export const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

export const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
);

export const ChefIcon = () => (
    <svg className="h-24 w-24 mx-auto text-amber-400" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M51 32.2C51 35.5 49.3333 42 43 42C36.6667 42 35 35.5 35 32.2C35 28.9 36.6667 23 43 23C49.3333 23 51 28.9 51 32.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M43 23V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M43 15C44.6667 13.6667 48.5 11.5 49 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M43 15C41.3333 13.6667 37.5 11.5 37 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M43 15C43 12.3333 43 9.5 43 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 48C12 53.5228 17.4772 58 24 58C30.5228 58 36 53.5228 36 48H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M37.9201 44C39.2291 41.5165 40.0001 38.7401 40.0001 35.8C40.0001 27.072 32.9281 20 24.0001 20C15.0721 20 8.00006 27.072 8.00006 35.8C8.00006 38.7401 8.77103 41.5165 10.0801 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);