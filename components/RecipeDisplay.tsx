import React, { useRef, useState } from 'react';
import type { Recipe } from '../types';
import { SparkleIcon, EmailIcon, ImageIcon } from './icons';

// Add this line to inform TypeScript about the global html2canvas function
declare const html2canvas: any;

interface RecipeDisplayProps {
  recipe: Recipe;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  const hasApplianceInstructions = recipe.applianceInstructions && recipe.applianceInstructions.length > 0;
  const recipeCardRef = useRef<HTMLDivElement>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);


  const handleSendEmail = () => {
    const subject = `Recipe: ${recipe.recipeName}`;

    let body = `<h1 style="font-family: serif; color: #78350f;">${recipe.recipeName}</h1>`;

    body += `<h2 style="font-family: serif; color: #92400e; border-bottom: 1px solid #fde68a; padding-bottom: 4px;">Ingredients</h2><ul style="list-style-type: disc; padding-left: 20px;">`;
    recipe.ingredients.forEach(ingredient => {
      body += `<li style="margin-bottom: 8px;">${ingredient}</li>`;
    });
    body += `</ul>`;

    body += `<h2 style="font-family: serif; color: #92400e; border-bottom: 1px solid #fde68a; padding-bottom: 4px; margin-top: 20px;">Instructions</h2><ol style="list-style-type: decimal; padding-left: 20px;">`;
    recipe.instructions.forEach(instruction => {
      body += `<li style="margin-bottom: 12px;">${instruction}</li>`;
    });
    body += `</ol>`;

    if (hasApplianceInstructions) {
        recipe.applianceInstructions!.forEach(appliance => {
            body += `<h3 style="font-family: serif; color: #92400e; margin-top: 20px;">${appliance.applianceName} Instructions</h3><ol style="list-style-type: decimal; padding-left: 20px;">`;
            appliance.instructions.forEach(instruction => {
                body += `<li style="margin-bottom: 12px;">${instruction}</li>`;
            });
            body += `</ol>`;
        });
    }

    const mailtoLink = `mailto:angusyang91@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };
  
  const handleSaveAsImage = async () => {
    if (!recipeCardRef.current || typeof html2canvas === 'undefined') {
      console.error("Recipe card element not found or html2canvas not loaded.");
      alert("Sorry, there was an error preparing the image.");
      return;
    }
    setIsGeneratingImage(true);
    try {
      const canvas = await html2canvas(recipeCardRef.current, {
        scale: 2, // Double the resolution for a clearer image
        backgroundColor: '#ffffff',
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${recipe.recipeName.replace(/ /g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Sorry, there was an error generating the image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };


  return (
    <div className="w-full max-w-4xl my-8 animate-fade-in-up">
      <div ref={recipeCardRef} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8 md:p-12">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-left">{recipe.recipeName}</h1>
            <div className="flex-shrink-0 ml-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleSaveAsImage}
                disabled={isGeneratingImage}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-full hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-teal-400 disabled:cursor-wait transition-all duration-300 transform hover:scale-105"
                aria-label="Save recipe as image"
              >
                <ImageIcon />
                <span className="hidden sm:inline">{isGeneratingImage ? 'Saving...' : 'Save as Image'}</span>
              </button>
              <button
                onClick={handleSendEmail}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-amber-600 rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                aria-label="Send recipe to email"
              >
                <EmailIcon />
                <span className="hidden sm:inline">Send to Email</span>
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-amber-700 border-b-2 border-amber-200 pb-2 mb-4">Ingredients</h2>
              <ul className="space-y-2 text-gray-700">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-600 mr-2 mt-1">&#10003;</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-amber-700 border-b-2 border-amber-200 pb-2 mb-4">Instructions</h2>
              <ol className="space-y-4 text-gray-800">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 bg-amber-600 text-white rounded-full h-6 w-6 text-sm flex items-center justify-center font-bold mr-3 mt-1">{index + 1}</span>
                    <p className="flex-grow">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {hasApplianceInstructions && (
            <div className="mt-12 pt-8 border-t-2 border-amber-100">
              <div className="flex items-center justify-center mb-6">
                <SparkleIcon />
                <h2 className="text-2xl font-bold text-amber-700 ml-3 text-center">Appliance-Specific Tips</h2>
              </div>
              <div className="space-y-8">
                {recipe.applianceInstructions!.map((applianceInfo, index) => (
                  <div key={index} className="bg-amber-50/50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{applianceInfo.applianceName}</h3>
                    <ol className="space-y-3 text-gray-700">
                      {applianceInfo.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex">
                            <span className="flex-shrink-0 bg-amber-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center font-bold mr-3 mt-1">{idx + 1}</span>
                            <p className="flex-grow">{instruction}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;