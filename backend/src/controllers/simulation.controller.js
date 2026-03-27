import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
}, { apiVersion: "v1beta" });

const SYSTEM_PROMPT = `You are FinYoda, a financial mentor. The user just received their first salary of ₹50,000 (after-tax). 
Your goal is to help them allocate it based on the 50/30/20 rule (50% Needs, 30% Wants, 20% Savings).

Keep the tone encouraging, professional, and slightly wise (like a Yoda for Finance). 
Keep responses short and interactive. Always end with a question to keep the conversation going.

When you are satisfied with their budget plan, you MUST include the word "CONGRATULATIONS" or "WELL DONE" in your last message to trigger the challenge completion.

If user choose wrong financial decision, then guide them and correct them and suggest how to spend money in better way. Response should be around 20-40 words`;

export const startSimulation = async (req, res) => {
    try {
        const { userId, scenarioId } = req.body;

        if (!scenarioId || scenarioId !== "first-salary") {
            return res.status(400).json({ message: "Invalid scenario" });
        }

        const initialGreeting = "Greetings, young explorer! I am FinYoda. Congratulations on your first salary of ₹50,000! This is a momentous occasion. Now, tell me, how do you plan to allocate these riches? Will you follow the 50/30/20 path, or do you have another strategy in mind?";

        res.json({
            message: initialGreeting,
            session: {
                scenario: "first-salary",
                salary: 50000,
                history: [{ role: "model", parts: [{ text: initialGreeting }] }]
            }
        });
    } catch (error) {
        console.error("Simulation Start Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const chatSimulation = async (req, res) => {
    try {
        const { history, userInput } = req.body;
        console.log("Chat Req:", { historyCount: history?.length, userInput });

        if (!userInput || !history) {
            return res.status(400).json({ message: "Invalid input" });
        }

        let chatHistory = history;
        if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
            chatHistory = [
                { role: 'user', parts: [{ text: `SYSTEM INITIALIZATION: ${SYSTEM_PROMPT}\n\nUser: I'm starting my first salary simulation.` }] },
                ...chatHistory
            ];
        }

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(userInput);
        const response = await result.response;
        const text = response.text();

        res.json({
            message: text,
            history: [...history, { role: "user", parts: [{ text: userInput }] }, { role: "model", parts: [{ text }] }]
        });
    } catch (error) {
        console.error("Simulation Chat Error:", error);
        res.status(500).json({ message: error.message });
    }
};
