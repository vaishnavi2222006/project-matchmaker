const axios = require('axios');

class ChatController {
  async chatWithAI(req, res) {
    try {
      const { message } = req.body;

      console.log("📩 User message:", message);
      console.log("🔑 Gemini Key exists:", !!process.env.GEMINI_API_KEY);

      const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [
      {
        parts: [{ text: message }]
      }
    ]
  },
  {
    headers: { "Content-Type": "application/json" }
  }
);


      console.log("✅ Gemini response received");

      const reply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No AI reply";

      res.json({ reply });

    } catch (err) {
  setMessages(prev => [
    ...prev,
    { sender: "ai", text: "AI support is temporarily unavailable. Try later." }
  ]);
}

  }
}

module.exports = new ChatController();
