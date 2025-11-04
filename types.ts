export interface ApplianceInstruction {
  applianceName: string;
  instructions: string[];
}

export interface Recipe {
  recipeName: string;
  ingredients: string[];
  instructions: string[];
  applianceInstructions?: ApplianceInstruction[];
}

export interface SearchResult {
  title: string;
  link: string;
}