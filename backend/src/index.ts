import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as schema from './db/schema';
import { cors } from 'hono/cors';

type Bindings = {
  DB: D1Database;
  GEMINI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Mobile App မှ လှမ်းခေါ်နိုင်ရန် CORS ဖွင့်ပေးခြင်း
app.use('*', cors());

app.post('/api/orchestrate', async (c) => {
  const { text, projectId, instructions } = await c.req.json();
  const db = drizzle(c.env.DB, { schema });
  const genAI = new GoogleGenerativeAI(c.env.GEMINI_API_KEY);
  
  // Zin Lay Logic
  const model = genAI.getGenerativeModel({ model: "gemini-3.0-flash-preview" });
  const result = await model.generateContent(`မင်းက Zin Lay ဖြစ်တယ်။ ဆရာ့အတွက် ဒီစာသားကို ဘာသာပြန်/တည်းဖြတ်ပေးပါ။\n\nစာသား: ${text}\nညွှန်ကြားချက်: ${instructions}`);

  return c.json({
    success: true,
    result: result.response.text(),
    audit: "Zin Lay: Processed successfully."
  });
});

export default app;
