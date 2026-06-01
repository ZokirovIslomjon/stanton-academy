import React, { useState, useEffect, useRef } from 'react';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SHEETDB_URL = 'https://sheetdb.io/api/v1/k5ohu0497ek0x';
const WHATSAPP_URL = 'https://wa.me/601118648860';

// ─── Stanton Academy full knowledge base for Claude AI ───────────────────────
const SYSTEM_PROMPT = `You are a friendly and professional AI assistant for Stanton Academy, a modern language school in Kuala Lumpur, Malaysia.

LANGUAGE RULE: Always match the language the visitor uses. If they write in Malay/Bahasa Malaysia, reply in Malay. If English, reply in English. You can mix if they mix.

== ABOUT STANTON ACADEMY ==
- Name: Stanton Academy
- Location: No 112 & 114, 5th Floor, Wisma Hainan, Jalan Pudu 55100, Kuala Lumpur
- Phone: +60 1118648860
- Email: info@stanton-academy.com
- WhatsApp: https://wa.me/601118648860
- Instagram: https://www.instagram.com/stantonacademy_kl
- Facebook: https://www.facebook.com/share/1Cmmp4ahQV/
- Telegram: https://t.me/stantonacademykl
- Founded: 2014

== COURSES & PRICING ==
1. General English — RM 2,200/month | 5x per week | 4.5 hours per session
2. IELTS Preparation — RM 2,200/month | 5x per week | 4 hours per session (Target Band 7.0+)
3. Mandarin — RM 1,250/month | 4x per week | 2 hours per session
4. Japanese — RM 1,875/month | 5x per week | 4 hours per session (JLPT N5 foundation)
5. Korean — RM 1,120/month | 5x per week | 2 hours per session
6. Bahasa Malaysia — RM 520/month | 1x per week | 2 hours per session
7. German — RM 590/month | 2x per week | 2 hours per session (Goethe-Institut foundation)

== WHY CHOOSE STANTON ACADEMY ==
- Free second teacher if student doesn't understand a topic
- Free Events: Tennis, golf, cinema, celebrity chats, trips
- Co-working zones in each branch
- Small class sizes for personalized attention
- Certified native speakers and qualified bilingual instructors
- Teaching languages since 2014

== ENROLLMENT SITUATION ==
- The school just opened a new branch in KL
- NO free trial classes yet — collecting 5-10 students per group first
- Once group is formed, owner contacts ALL students to arrange schedule together
- Students get to choose a time that works for everyone
- Interested students should register and we will contact them personally

== LEVELS AVAILABLE ==
Beginner, Elementary, Intermediate, Upper Intermediate, Advanced

== HANDLING COMPLAINTS ==
- Always be empathetic and apologetic
- Never argue or be defensive
- Acknowledge concern, apologize sincerely, offer to connect with team
- Example reply: "I'm really sorry to hear that. Please reach us at info@stanton-academy.com or WhatsApp +60 1118648860 so our team can resolve this personally."

== YOUR PRIMARY GOAL — LEAD COLLECTION ==
Answer questions helpfully AND collect visitor contact information naturally.
After answering 1-2 questions, guide toward registration.
Collect: Full Name, Email Address, Phone Number, Course Interest, Level.

IMPORTANT: Once you have collected ALL 5 pieces of info (name, email, phone, course, level), 
you MUST output this special JSON block at the very END of your message, with nothing after it:
%%LEAD%%{"name":"...","email":"...","phone":"...","course":"...","level":"..."}%%END%%

== CONVERSATION STYLE ==
- Warm, friendly, encouraging — like a helpful school counselor
- Keep replies SHORT (2-4 sentences) unless explaining course details
- Use emojis occasionally 😊
- Never make up information not listed above
- If unsure, say: "Great question! Please reach us at info@stanton-academy.com or WhatsApp +60 1118648860"
- Always end with a gentle question to keep conversation going`;

// ─── Initial greeting message ─────────────────────────────────────────────────
const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 'bot',
    text: "👋 Hi there! Welcome to **Stanton Academy**!\n\nI'm your AI assistant. I can answer any questions about our courses, fees, schedule and more — in English or Bahasa Malaysia! 😊\n\nWhat would you like to know?",
  },
];

// ─── Suggestion chips shown on first open ────────────────────────────────────
const SUGGESTIONS = [
  '📚 Course prices?',
  '📍 Where are you?',
  '🗓️ Class schedule?',
  '👨‍🏫 About teachers?',
  '🇲🇾 Ada kelas Bahasa?',
];

function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function TypingIndicator() {
  return (
    <div className="sa-msg sa-msg--bot">
      <div className="sa-avatar">SA</div>
      <div className="sa-bubble sa-bubble--bot sa-typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

function WhatsAppButton() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="sa-whatsapp-btn">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Continue on WhatsApp
    </a>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState(INITIAL_MESSAGES);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [leadSaved, setLeadSaved] = useState(false);
  const [showWA, setShowWA]       = useState(false);
  const [history, setHistory]     = useState([]);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // ── Save lead to Google Sheets ────────────────────────────────────────────
  async function saveToSheet(lead) {
    if (leadSaved) return;
    try {
      const res = await fetch(SHEETDB_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            Name:        lead.name,
            Nationality: 'N/A',
            Age:         'N/A',
            Phone:       `(${lead.phone})`,
            Email:       lead.email,
            Course:      `${lead.course} (${lead.level})`,
            HearAbout:   'AI Chat Widget',
            Message:     'Lead collected via Claude AI Chat Widget',
            Date:        new Date().toLocaleString(),
          }],
        }),
      });
      if (res.ok) {
        setLeadSaved(true);
        setShowWA(true);
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
            event_category: 'Lead Form',
            event_label: lead.course,
          });
        }
      }
    } catch (err) {
      console.error('SheetDB error:', err);
    }
  }

  // ── Extract lead JSON from Claude response ────────────────────────────────
  function extractLead(text) {
    const match = text.match(/%%LEAD%%({.*?})%%END%%/s);
    if (!match) return null;
    try { return JSON.parse(match[1]); } catch { return null; }
  }

  // ── Remove the JSON block from display text ───────────────────────────────
  function cleanText(text) {
    return text.replace(/%%LEAD%%.*?%%END%%/s, '').trim();
  }

  // ── Call Claude API via your backend proxy ────────────────────────────────
  async function callClaude(userText) {
    const newHistory = [...history, { role: 'user', content: userText }];
    setHistory(newHistory);

    const response = await fetch('/api/chat', {        // ← goes to your server/index.js
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system:     SYSTEM_PROMPT,
        messages:   newHistory,
      }),
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    const rawText = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again!";

    // Check if Claude collected all lead info
    const lead = extractLead(rawText);
    if (lead && !leadSaved) {
      await saveToSheet(lead);
    }

    // Update conversation history with Claude's reply
    setHistory(prev => [...prev, { role: 'assistant', content: rawText }]);

    return cleanText(rawText);
  }

  // ── Handle send ───────────────────────────────────────────────────────────
  async function handleSend(overrideText) {
    const value = (overrideText || input).trim();
    if (!value || isTyping) return;
    setInput('');

    // Add user message to chat
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text: value }]);
    setIsTyping(true);

    try {
      const reply = await callClaude(value);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), from: 'bot', text: reply }]);
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(), from: 'bot',
        text: "Sorry, I'm having trouble connecting right now 😔 Please reach us on WhatsApp at **+60 1118648860** and we'll be happy to help!",
      }]);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function handleReset() {
    setMessages(INITIAL_MESSAGES);
    setHistory([]);
    setInput('');
    setLeadSaved(false);
    setShowWA(false);
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .sa-widget * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        :root {
          --sa-green: #006B3F; --sa-green-dark: #00502f;
          --sa-gold: #FFC72C; --sa-gold-dark: #e6b000;
          --sa-white: #ffffff; --sa-gray-50: #f9fafb;
          --sa-gray-200: #e5e7eb; --sa-gray-400: #9ca3af; --sa-gray-800: #1f2937;
          --sa-shadow-lg: 0 20px 60px rgba(0,0,0,0.18);
          --sa-shadow-btn: 0 4px 20px rgba(0,107,63,0.4);
          --sa-radius: 16px;
        }
        .sa-fab { position: fixed; bottom: 28px; right: 28px; z-index: 10000; width: 60px; height: 60px; border-radius: 50%; background: var(--sa-green); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: var(--sa-shadow-btn); transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s; outline: none; }
        .sa-fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(0,107,63,0.55); }
        .sa-fab svg { transition: transform 0.3s ease, opacity 0.3s ease; }
        .sa-fab--open svg.sa-icon-chat { transform: scale(0) rotate(-90deg); opacity: 0; position: absolute; }
        .sa-fab--open svg.sa-icon-close { transform: scale(1); opacity: 1; }
        .sa-fab:not(.sa-fab--open) svg.sa-icon-close { transform: scale(0) rotate(90deg); opacity: 0; position: absolute; }
        .sa-fab:not(.sa-fab--open) svg.sa-icon-chat { transform: scale(1); opacity: 1; }
        .sa-pulse { position: fixed; bottom: 28px; right: 28px; z-index: 9999; width: 60px; height: 60px; border-radius: 50%; animation: sa-pulse-anim 2s ease-out infinite; pointer-events: none; }
        @keyframes sa-pulse-anim { 0% { box-shadow: 0 0 0 0 rgba(0,107,63,0.5); } 70% { box-shadow: 0 0 0 20px rgba(0,107,63,0); } 100% { box-shadow: 0 0 0 0 rgba(0,107,63,0); } }
        .sa-tooltip { position: fixed; bottom: 40px; right: 100px; z-index: 10001; background: var(--sa-green); color: white; padding: 10px 16px; border-radius: 20px 20px 4px 20px; font-size: 0.82rem; font-weight: 500; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.15); animation: sa-tooltip-in 0.4s cubic-bezier(0.34,1.56,0.64,1); pointer-events: none; }
        @keyframes sa-tooltip-in { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        .sa-panel { position: fixed; bottom: 100px; right: 28px; z-index: 9999; width: 375px; max-height: 580px; border-radius: var(--sa-radius); background: var(--sa-white); box-shadow: var(--sa-shadow-lg); display: flex; flex-direction: column; overflow: hidden; transform-origin: bottom right; animation: sa-panel-in 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes sa-panel-in { from { opacity: 0; transform: scale(0.85) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @media (max-width: 480px) { .sa-panel { width: calc(100vw - 24px); right: 12px; bottom: 90px; max-height: 72vh; } .sa-fab, .sa-pulse { right: 16px; bottom: 16px; } .sa-tooltip { right: 80px; } }
        .sa-header { background: linear-gradient(135deg, #006B3F 0%, #004d2c 100%); padding: 15px 18px; display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .sa-header-avatar { width: 42px; height: 42px; border-radius: 50%; background: var(--sa-gold); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; color: var(--sa-green); flex-shrink: 0; }
        .sa-header-info { flex: 1; }
        .sa-header-name { color: white; font-weight: 600; font-size: 0.92rem; line-height: 1.2; display: flex; align-items: center; gap: 8px; }
        .sa-ai-badge { background: rgba(255,199,44,0.2); border: 1px solid rgba(255,199,44,0.5); color: var(--sa-gold); font-size: 0.6rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; letter-spacing: 0.05em; }
        .sa-header-status { color: rgba(255,255,255,0.75); font-size: 0.72rem; display: flex; align-items: center; gap: 4px; margin-top: 3px; }
        .sa-online-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; display: inline-block; animation: sa-blink 2s ease-in-out infinite; }
        @keyframes sa-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .sa-header-actions { display: flex; gap: 6px; }
        .sa-header-btn { background: rgba(255,255,255,0.15); border: none; border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; transition: background 0.2s; }
        .sa-header-btn:hover { background: rgba(255,255,255,0.28); }
        .sa-messages { flex: 1; overflow-y: auto; padding: 16px 14px; display: flex; flex-direction: column; gap: 12px; background: var(--sa-gray-50); }
        .sa-messages::-webkit-scrollbar { width: 4px; }
        .sa-messages::-webkit-scrollbar-thumb { background: var(--sa-gray-200); border-radius: 4px; }
        .sa-msg { display: flex; align-items: flex-end; gap: 8px; animation: sa-msg-in 0.3s ease-out; }
        @keyframes sa-msg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .sa-msg--user { flex-direction: row-reverse; }
        .sa-avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--sa-gold); color: var(--sa-green); font-size: 0.62rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sa-bubble { max-width: 82%; padding: 10px 14px; border-radius: 18px; font-size: 0.83rem; line-height: 1.6; word-break: break-word; }
        .sa-bubble--bot { background: white; color: var(--sa-gray-800); border-bottom-left-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); }
        .sa-bubble--user { background: var(--sa-green); color: white; border-bottom-right-radius: 4px; }
        .sa-bubble strong { font-weight: 600; }
        .sa-bubble em { font-style: italic; }
        .sa-typing { display: flex; align-items: center; gap: 5px; padding: 12px 16px; }
        .sa-typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--sa-gray-400); animation: sa-dot 1.2s ease-in-out infinite; }
        .sa-typing span:nth-child(2) { animation-delay: 0.2s; }
        .sa-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes sa-dot { 0%,60%,100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-6px); opacity: 1; } }
        .sa-suggestions { display: flex; flex-wrap: wrap; gap: 6px; padding: 6px 14px 8px; background: var(--sa-gray-50); flex-shrink: 0; border-top: 1px solid var(--sa-gray-200); }
        .sa-suggestion { background: white; border: 1.5px solid var(--sa-green); color: var(--sa-green); padding: 5px 12px; border-radius: 20px; font-size: 0.73rem; font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .sa-suggestion:hover { background: var(--sa-green); color: white; transform: translateY(-1px); box-shadow: 0 3px 10px rgba(0,107,63,0.25); }
        .sa-whatsapp-bar { padding: 8px 12px; background: var(--sa-gray-50); border-top: 1px solid var(--sa-gray-200); flex-shrink: 0; }
        .sa-whatsapp-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px; background: #25D366; color: white; border-radius: 12px; text-decoration: none; font-size: 0.82rem; font-weight: 600; transition: all 0.2s; }
        .sa-whatsapp-btn:hover { background: #1ebe5d; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(37,211,102,0.35); }
        .sa-input-bar { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: white; border-top: 1px solid var(--sa-gray-200); flex-shrink: 0; }
        .sa-input { flex: 1; border: 1.5px solid var(--sa-gray-200); border-radius: 24px; padding: 9px 16px; font-size: 0.82rem; color: var(--sa-gray-800); background: var(--sa-gray-50); outline: none; font-family: 'Poppins', sans-serif; transition: border 0.2s; }
        .sa-input:focus { border-color: var(--sa-green); background: white; }
        .sa-input::placeholder { color: var(--sa-gray-400); }
        .sa-send-btn { width: 38px; height: 38px; border-radius: 50%; background: var(--sa-green); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; }
        .sa-send-btn:hover:not(:disabled) { background: var(--sa-green-dark); transform: scale(1.08); }
        .sa-send-btn:disabled { background: var(--sa-gray-200); cursor: not-allowed; }
        .sa-footer { text-align: center; padding: 5px; font-size: 0.63rem; color: var(--sa-gray-400); background: white; border-top: 1px solid #f3f4f6; flex-shrink: 0; }
        .sa-footer a { color: var(--sa-green); text-decoration: none; }
      `}</style>

      {/* Pulse ring */}
      {!open && showPulse && <div className="sa-pulse" />}
      {!open && showPulse && <div className="sa-tooltip">💬 Ask me anything!</div>}

      {/* FAB toggle button */}
      <button className={`sa-fab${open ? ' sa-fab--open' : ''}`} onClick={() => setOpen(o => !o)} aria-label={open ? 'Close chat' : 'Open chat'}>
        <svg className="sa-icon-chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <svg className="sa-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="sa-panel sa-widget">

          {/* Header */}
          <div className="sa-header">
            <div className="sa-header-avatar">SA</div>
            <div className="sa-header-info">
              <div className="sa-header-name">
                Stanton Academy <span className="sa-ai-badge">AI</span>
              </div>
              <div className="sa-header-status">
                <span className="sa-online-dot" /> Online · English & Bahasa Malaysia
              </div>
            </div>
            <div className="sa-header-actions">
              <button className="sa-header-btn" onClick={handleReset} title="Restart conversation">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>
              </button>
              <button className="sa-header-btn" onClick={() => setOpen(false)} title="Close">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="sa-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`sa-msg sa-msg--${msg.from}`}>
                {msg.from === 'bot' && <div className="sa-avatar">SA</div>}
                <div
                  className={`sa-bubble sa-bubble--${msg.from}`}
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text).replace(/\n/g, '<br/>') }}
                />
              </div>
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips — only shown on first message */}
          {messages.length === 1 && !isTyping && (
            <div className="sa-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="sa-suggestion" onClick={() => handleSend(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* WhatsApp button — appears after lead is saved */}
          {showWA && (
            <div className="sa-whatsapp-bar">
              <WhatsAppButton />
            </div>
          )}

          {/* Input bar */}
          <div className="sa-input-bar">
            <input
              ref={inputRef}
              className="sa-input"
              type="text"
              placeholder="Ask anything about Stanton Academy..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button className="sa-send-btn" onClick={() => handleSend()} disabled={!input.trim() || isTyping} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          <div className="sa-footer">Powered by <a href="https://stanton-academy.com">Stanton Academy</a> · Claude AI</div>
        </div>
      )}
    </>
  );
}