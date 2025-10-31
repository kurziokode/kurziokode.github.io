import { GoogleGenAI, GenerateContentResponse, Chat, Type, Modality } from "@google/genai";
import { SkillCategory } from '../types';

const getGenAI = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey });
}

export const generateActivityIdeas = async (ageGroup: string, equipment: string[], goal: SkillCategory[]): Promise<any> => {
    const ai = getGenAI();
    const prompt = `Generate 3 creative and fun physical education activity ideas for children aged ${ageGroup}. 
    Available equipment: ${equipment.join(', ') || 'none'}. 
    The primary goal is to improve: ${goal.join(', ')}.
    Provide the response as a JSON array.`;

    // FIX: Removed the googleSearch tool as it is not allowed to be used with responseMimeType and responseSchema.
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        ageGroup: { type: Type.STRING },
                        equipment: { type: Type.ARRAY, items: { type: Type.STRING } },
                        goal: { type: Type.ARRAY, items: { type: Type.STRING } },
                    }
                }
            },
        }
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse Gemini response:", e);
        throw new Error("Could not get valid activity ideas from AI.");
    }
};

export const createChat = (): Chat => {
    const ai = getGenAI();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a helpful assistant for a physical education teacher. Provide concise, practical advice.'
        }
    });
};


export const generateInDepthReport = async (studentData: any): Promise<string> => {
    const ai = getGenAI();
    const prompt = `
    Analyze the following student performance and behavior data for a physical education class.
    Provide a detailed report summarizing the student's progress, highlighting strengths, identifying areas for improvement, and suggesting 2-3 specific activities to help them.
    Format the response in Markdown.
    
    Data:
    ${JSON.stringify(studentData, null, 2)}
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 }
        }
    });

    return response.text;
};

export const getQuickTip = async (): Promise<string> => {
    const ai = getGenAI();
    // FIX: Updated model name to 'gemini-flash-lite-latest' as per the guidelines.
    const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: "Give me one quick, actionable tip for a PE teacher to increase student engagement today."
    });
    return response.text;
};

export const generateTextToSpeech = async (text: string): Promise<string | undefined> => {
    const ai = getGenAI();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say this in a friendly and encouraging tone: ${text}` }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio;
};