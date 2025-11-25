import { GoogleGenAI } from "@google/genai";
import { EventData } from "../types";

// Helper to extract JSON from markdown code blocks if present
const extractJson = (text: string): string => {
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  return match ? match[1] : text;
};

export const fetchEventsForCity = async (cityName: string): Promise<EventData[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("No API_KEY found in process.env");
      return []; // Or handle gracefully in UI
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // We use gemini-2.5-flash with googleSearch tool to get real, grounded info
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      Find 6-10 current and upcoming real events in ${cityName}, Kenya happening soon (this month or next).
      Use Google Search to find accurate information.
      
      Return the result ONLY as a valid JSON array of objects. Do not include any conversational text outside the JSON.
      
      Each object must strictly follow this schema:
      {
        "id": "unique_string_id",
        "title": "Event Name",
        "date": "YYYY-MM-DD or readable string like 'Oct 12, 2023'",
        "time": "Event time e.g. 7:00 PM",
        "location": "Specific venue name",
        "city": "${cityName}",
        "description": "A brief 2-sentence description of the event.",
        "category": "One of: Music, Business, Tech, Art, Social, Sports, Other",
        "requirements": ["List specific requirements to join, e.g. 'Ticket: 1000 KES', '18+ only', 'RSVP required', 'Smart Casual']",
        "sourceUrl": "URL to the event page if found, otherwise null"
      }

      If you cannot find real events, you may infer highly plausible recurring events for this city (e.g. weekly markets, club nights) but prefer real specific events.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseSchema is NOT allowed with googleSearch, so we rely on the prompt for JSON structure.
        temperature: 0.3, // Lower temperature for more deterministic formatting
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const cleanJson = extractJson(text);
    const events: EventData[] = JSON.parse(cleanJson);

    // Post-process to ensure IDs and image placeholders
    return events.map((evt, index) => ({
      ...evt,
      id: evt.id || `evt-${cityName}-${index}-${Date.now()}`,
      // Deterministic random image based on index/title length
      imageUrl: `https://picsum.photos/seed/${evt.title.replace(/\s/g, '')}${index}/800/600`
    }));

  } catch (error) {
    console.error("Error fetching events:", error);
    // Return empty array to let UI handle "no events found" or error state
    throw error;
  }
};
