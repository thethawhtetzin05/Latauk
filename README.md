# Latauk (လက်ထောက်) - AI Multi-Agent System

**Latauk** သည် ဆရာတစ်ယောက်တည်းအတွက် Leverage ယူရန် တည်ဆောက်ထားသော AI Agent Orchestration System ဖြစ်ပါသည်။

## Agents
- **Zin Lay (Master Agent):** အလုပ်များကို စီမံခန့်ခွဲသူနှင့် အစီရင်ခံသူ။
- **Maung Pyan (Translator):** ဘာသာပြန်နှင့် တည်းဖြတ်သူ။
- **Maung Sit (Auditor):** ဇာတ်လမ်းရှေ့နောက် ညီညွတ်မှုကို စစ်ဆေးသူ။

## Tech Stack
- **Backend:** Node.js, Hono, Cloudflare Workers
- **Database:** Drizzle ORM, Cloudflare D1
- **AI Memory:** Cloudflare Vectorize
- **LLM:** Google Gemini 3.1 Pro / 3.0 Flash
- **Interface:** Telegram Bot API

## How to Run
1. `npm install`
2. Configure `wrangler.toml` with your D1 and Vectorize IDs.
3. Set secrets for `GEMINI_API_KEY` and `TELEGRAM_BOT_TOKEN`.
4. Deploy using `npm run deploy`.
