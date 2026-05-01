const axios = require('axios');

class ChatController {
  async chatWithAI(req, res) {
    try {
      const { message } = req.body;

      if (!message || message.trim() === "") {
        return res.status(400).json({
          reply: "Please enter a valid message."
        });
      }

      const msg = message.toLowerCase().trim();

      console.log("📩 User message:", message);

      // ✅ Smart greeting detection
      const greetings = ["hi", "hello", "hey"];
      const isGreeting = greetings.includes(msg);

      let finalPrompt;

      if (isGreeting) {
        // 🔹 Short human reply
        finalPrompt = `Reply very shortly (max 1 line) to this greeting: "${message}"`;
      } else {
        // 🔹 Smart AI behavior
        finalPrompt = `
You are a smart AI assistant for an Open Source Matchmaker platform.

Guidelines:
- Be concise and helpful
- Do NOT repeat introductions
- Use simple language (beginner friendly)
- Give practical suggestions
- Avoid long paragraphs unless needed

You help with:
- Finding beginner-friendly GitHub projects
- Explaining repositories simply
- Suggesting tech stacks
- Guiding open-source contributions

User: ${message}
`;
      }

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent`,
        {
          contents: [
            {
              parts: [{ text: finalPrompt }]
            }
          ]
        },
        {
          params: {
            key: process.env.GEMINI_API_KEY
          }
        }
      );

      const reply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      res.json({ reply });

    } catch (err) {
      console.error("❌ Gemini Error:", err.response?.data || err.message);

      res.status(500).json({
        reply: "AI is temporarily unavailable. Try again."
      });
    }
  }
}

module.exports = new ChatController();