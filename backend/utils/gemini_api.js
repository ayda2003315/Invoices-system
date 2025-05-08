const axios = require('axios');

const GeminiAPI = {
  query: async (prompt, options = {}) => {
    const response = await axios.post('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent', {
      contents: [{ parts: [{ text: prompt }] }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      }
    });
    return { data: JSON.parse(response.data.candidates[0].content.parts[0].text) };
  }
};

module.exports = { GeminiAPI };

