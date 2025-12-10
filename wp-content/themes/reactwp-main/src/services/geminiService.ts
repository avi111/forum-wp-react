import { GoogleGenAI } from "@google/genai";

// Safeguard against ReferenceError if process is not defined in the environment
const apiKey = (typeof process !== "undefined" && process.env?.API_KEY) || "";
const ai = new GoogleGenAI({ apiKey });

export const enhanceBio = async (
  currentBio: string,
  name: string,
  specialization: string,
): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key provided");
    return "שגיאה: חסר מפתח API. אנא וודא שהגדרת את המפתח.";
  }

  try {
    const prompt = `
      You are a professional editor for an academic website.
      Rewrite the following biography for a researcher named "${name}" who specializes in "${specialization}".
      Make it sound professional, academic, yet accessible. Keep it in Hebrew.
      Limit the response to approx 100 words.
      
      Current Bio Draft:
      ${currentBio}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || currentBio;
  } catch (error) {
    console.error("Error generating bio:", error);
    return "אירעה שגיאה בעת יצירת הביוגרפיה. אנא נסה שנית.";
  }
};