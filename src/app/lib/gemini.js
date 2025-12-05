import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateAIOutputs(rating, review) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an assistant that processes customer reviews.
Return ONLY valid JSON. No backticks, no code fences, no commentary.

Expected JSON format:
{
  "userResponse": "...",
  "summary": "...",
  "recommendedActions": ["...", "..."]
}

Rating: ${rating}
Review: ${review}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // 🚫 Remove ```json and ``` if the model still adds them
    text = text.replace(/```json/i, "");
    text = text.replace(/```/g, "");

    return JSON.parse(text);
}
