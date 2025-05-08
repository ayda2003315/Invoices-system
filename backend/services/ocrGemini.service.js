const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function processInvoice(imagePath) {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: "Extract all possible invoice fields: Invoice Number, Date, Supplier, Client, Total, TVA, Currency, etc. Return ONLY raw JSON. No explanation, no Markdown."
                        },
                        {
                            inlineData: { mimeType: "image/png", data: base64Image }
                        }
                    ]
                }
            ]
        };

        const response = await axios.post(GEMINI_ENDPOINT, requestBody, {
            headers: { "Content-Type": "application/json" }
        });

        let result = response.data.candidates[0].content.parts[0].text;
        let cleaned = result.replace(/```json|```/g, '').replace(/\n/g, ' ').trim();

        try {
            return JSON.parse(cleaned);
        } catch (err) {
            return { rawText: cleaned };
        }
    } catch (error) {
        console.error("❌ Erreur Gemini : ", error.response?.data || error.message);
        throw new Error("Erreur traitement avec Gemini");
    }
}

module.exports = { processInvoice };
