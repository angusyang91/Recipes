
import React from 'react';
import { ErrorIcon } from './icons';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full max-w-2xl bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg my-8 flex items-center animate-fade-in-up" role="alert">
      <div className="flex-shrink-0">
        <ErrorIcon />
      </div>
      <div className="ml-3">
        <p className="font-bold">An error occurred</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
