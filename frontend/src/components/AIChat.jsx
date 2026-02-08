import { useState } from "react";
import axios from "axios";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: input });
      const aiMsg = { sender: "ai", text: res.data.reply };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: "ai", text: "AI error 😢" }]);
    }

    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg"
      >
        AI Help
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-gray-900 text-white rounded-lg shadow-lg flex flex-col">
          <div className="p-3 border-b border-gray-700 font-bold">AI Support</div>
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.sender === "user" ? "text-right" : ""}`}>
                <span className={m.sender === "user" ? "bg-blue-500 px-2 py-1 rounded" : "bg-gray-700 px-2 py-1 rounded"}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 flex">
            <input
              className="flex-1 bg-gray-800 p-2 rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage} className="ml-2 bg-green-600 px-3 rounded">Send</button>
          </div>
        </div>
      )}
    </>
  );
}
