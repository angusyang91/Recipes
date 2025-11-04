import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe, SearchResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        recipeName: { type: Type.STRING },
        ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        },
        instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        },
        applianceInstructions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    applianceName: { type: Type.STRING },
                    instructions: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ['applianceName', 'instructions']
            }
        }
    },
    required: ['recipeName', 'ingredients', 'instructions', 'applianceInstructions']
};

const searchSchema = {
    type: Type.OBJECT,
    properties: {
        recipes: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the recipe found."},
                    link: { type: Type.STRING, description: "The direct URL to the recipe."}
                },
                required: ['title', 'link']
            }
        }
    },
    required: ['recipes']
};

const callGemini = async (prompt: string, schema: object) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
            tools: [{ googleSearch: {} }],
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            if (error.message.includes("400")) {
                throw new Error("The request was invalid. Please check your input (e.g., URL) and try again.");
            }
             if (error.message.includes("JSON")) {
                throw new Error("The AI returned an unexpected format. The website may be too complex or unsupported.");
            }
        }
        throw new Error("An unexpected error occurred while communicating with the AI.");
    }
}

export const extractRecipeFromUrl = async (url: string): Promise<Recipe> => {
    const appliancePromptSection = `
    After extracting the main instructions, please analyze them.
    1. If the recipe involves using a pressure cooker, add a set of specific, alternative instructions under the appliance name "Instant Pot" in the "applianceInstructions" field.
    2. If the recipe involves baking or air frying, add a set of specific, alternative instructions under the appliance name "Breville Smart Oven Toaster Pro" in the "applianceInstructions" field.
    
    If neither of these conditions are met, the "applianceInstructions" field MUST be an empty array [].
    `;

    const prompt = `From the URL: ${url}, extract the recipe name, the ingredients, and the primary cooking instructions.
    ${appliancePromptSection}
    Ignore all non-recipe content like stories, ads, and comments.`;

    return await callGemini(prompt, recipeSchema) as Recipe;
};

export const searchForRecipes = async (query: string): Promise<SearchResult[]> => {
    const prompt = `Find 3 popular and highly-rated recipes for "${query}". For each recipe, provide the title and the direct URL.`;
    const result = await callGemini(prompt, searchSchema);
    if (!result.recipes || !Array.isArray(result.recipes)) {
        throw new Error("AI did not return a valid list of recipes.");
    }
    return result.recipes as SearchResult[];
}