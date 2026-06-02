import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ── Debug: Check API key is loaded ─────────────────────────────────────────
console.log('🔑 Gemini API Key loaded:', process.env.GEMINI_API_KEY ? 'YES ✅' : 'NO ❌ — check your .env file!');

// ── Stanton Academy System Prompt ──────────────────────────────────────────
const SYSTEM_PROMPT = `You are a friendly and professional AI assistant for Stanton Academy, a modern language school in Kuala Lumpur, Malaysia.

LANGUAGE RULE: Always match the language the visitor uses. If they write in Malay/Bahasa Malaysia, reply in Malay. If English, reply in English.

== ABOUT STANTON ACADEMY ==
- Name: Stanton Academy
- Location: No 112 & 114, 5th Floor, Wisma Hainan, Jalan Pudu 55100, Kuala Lumpur
- Phone: +60 1118648860
- Email: info@stanton-academy.com
- WhatsApp: https://wa.me/601118648860
- Founded: 2014

== COURSES & PRICING ==
1. General English — RM 2,200/month | 5x per week | 4.5 hours per session
2. IELTS Preparation — RM 2,200/month | 5x per week | 4 hours per session (Target Band 7.0+)
3. Mandarin — RM 1,250/month | 4x per week | 2 hours per session
4. Japanese — RM 1,875/month | 5x per week | 4 hours per session (JLPT N5 foundation)
5. Korean — RM 1,120/month | 5x per week | 2 hours per session
6. Bahasa Malaysia — RM 520/month | 1x per week | 2 hours per session
7. German — RM 590/month | 2x per week | 2 hours per session

== WHY CHOOSE STANTON ACADEMY ==
- Free second teacher if student doesn't understand a topic
- Free Events: Tennis, golf, cinema, celebrity chats, trips
- Co-working zones in each branch
- Small class sizes for personalized attention
- Certified native speakers and qualified bilingual instructors
- Teaching languages since 2014

== ENROLLMENT SITUATION ==
- School just opened a new branch in KL
- NO free trial classes yet — collecting 5-10 students per group first
- Once group is formed, owner contacts ALL students to arrange schedule together
- Interested students should register and we will contact them personally

== LEVELS AVAILABLE ==
Beginner, Elementary, Intermediate, Upper Intermediate, Advanced

== HANDLING COMPLAINTS ==
- Always be empathetic and apologetic
- Never argue or be defensive
- Acknowledge concern, apologize sincerely, offer to connect with team

== YOUR PRIMARY GOAL — LEAD COLLECTION ==
Answer questions helpfully AND collect visitor contact information naturally.
After answering 1-2 questions, guide toward registration.
Collect: Full Name, Email Address, Phone Number, Course Interest, Level.

IMPORTANT: Once you have collected ALL 5 pieces of info (name, email, phone, course, level),
output this special JSON block at the very END of your message, nothing after it:
%%LEAD%%{"name":"...","email":"...","phone":"...","course":"...","level":"..."}%%END%%

== CONVERSATION STYLE ==
- Warm, friendly, encouraging
- Keep replies SHORT (2-4 sentences) unless explaining course details
- Use emojis occasionally 😊
- Never make up information not listed above
- If unsure say: "Please reach us at info@stanton-academy.com or WhatsApp +60 1118648860"
- Always end with a gentle question to keep conversation going`;

// ── Gemini API Proxy Route ──────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  console.log('📨 Received request from ChatWidget');

  try {
    const { messages } = req.body;

    // Convert messages history to Gemini format
    const geminiHistory = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Latest user message
    const latestMessage = messages[messages.length - 1].content;

    console.log('🚀 Calling Gemini API...');

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const geminiBody = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: [
        ...geminiHistory,
        {
          role: 'user',
          parts: [{ text: latestMessage }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      }
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Gemini API Error:', JSON.stringify(data, null, 2));
      return res.status(response.status).json({ error: data.error?.message || 'Gemini API error' });
    }

    // Extract text from Gemini response
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      console.error('❌ No text in Gemini response:', JSON.stringify(data, null, 2));
      return res.status(500).json({ error: 'No response from Gemini' });
    }

    console.log('✅ Gemini replied successfully!');

    // Return in same format as Claude so ChatWidget works without changes
    res.json({
      content: [{ type: 'text', text: replyText }]
    });

  } catch (error) {
    console.error('❌ Server Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ── Start Server ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 Proxy ready at http://localhost:${PORT}/api/chat`);
});