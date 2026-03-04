import { Hono } from 'hono';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendTelegramMessage } from './telegram';

type Bindings = {
  DB: D1Database;
  VECTOR_INDEX: VectorizeIndex;
  GEMINI_API_KEY: string;
  TELEGRAM_BOT_TOKEN: string;
  MY_CHAT_ID: string; // ဆရာ့ရဲ့ Telegram Chat ID
};

const app = new Hono<{ Bindings: Bindings }>();

app.post('/telegram-webhook', async (c) => {
  const payload = await c.req.json();
  const chatId = payload.message?.chat?.id;
  const userText = payload.message?.text;

  if (userText && chatId.toString() === c.env.MY_CHAT_ID) {
    const genAI = new GoogleGenerativeAI(c.env.GEMINI_API_KEY);
    const zinLay = genAI.getGenerativeModel({ model: "gemini-3.1-pro-preview" });

    // Zin Lay က ဆရာ့အမိန့်ကို စဉ်းစားခြင်း
    const prompt = `မင်းက Master Agent "Zin Lay" ဖြစ်တယ်။ ဆရာက အခုလို ခိုင်းလိုက်ပါတယ် - "${userText}". 
      လက်အောက်ခံ အေးဂျင့်တွေကို ခိုင်းစေပြီး ဆရာ့ကို အစီရင်ခံပါ။`;

    const result = await zinLay.generateContent(prompt);
    const zinLayResponse = result.response.text();

    // Telegram ဆီ ပြန်ပို့ခြင်း
    await sendTelegramMessage(c.env.TELEGRAM_BOT_TOKEN, chatId, `*Zin Lay အစီရင်ခံစာ:*\n\n${zinLayResponse}`);
  }

  return c.text('OK');
});

export default app;
