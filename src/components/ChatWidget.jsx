import React, { useState, useEffect, useRef } from 'react';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/k5ohu0497ek0x';

const COURSES = [
  'General English',
  'IELTS Preparation',
  'Mandarin',
  'Japanese',
  'Korean',
  'Bahasa Malaysia',
  'German',
];

const LEVELS = ['Beginner', 'Elementary', 'Intermediate', 'Upper Intermediate', 'Advanced'];

const STEPS = {
  GREETING:   'greeting',
  LANGUAGE:   'language',
  LEVEL:      'level',
  NAME:       'name',
  EMAIL:      'email',
  PHONE:      'phone',
  CONFIRM:    'confirm',
  DONE:       'done',
};

const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ['where', 'location', 'place', 'address', 'campus', 'located', 'kl'],
    reply: "📍 **Stanton Academy** is located in the heart of Kuala Lumpur, Malaysia! We have premium, comfortable facilities designed for modern language learning."
  },
  {
    keywords: ['price', 'fee', 'cost', 'how much', 'payment', 'expensive', 'rm'],
    reply: "💰 Our course fees vary depending on the language track, group size, and course intensity. Once you finish dropping your contact info here, our admissions team will instantly email you the full corporate price structure!"
  },
  {
    keywords: ['time', 'schedule', 'weekend', 'night', 'evening', 'duration', 'when'],
    reply: "🗓️ We offer highly flexible class timetables! We have weekday morning sessions, evening tracks for working professionals, and dedicated intensive weekend classes."
  },
  {
    keywords: ['native', 'teacher', 'lecturer', 'staff'],
    reply: "👨‍🏫 All our language trainers are certified native speakers or highly qualified bilingual specialists with years of international teaching experience!"
  }
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 'bot',
    text: "👋 Hi there! Welcome to **Stanton Academy**!\n\nI'm here to help you find the perfect language course. Which language are you interested in learning? 😊",
    step: STEPS.GREETING,
  },
];

function parseMarkdown(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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

export default function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState(INITIAL_MESSAGES);
  const [step, setStep]           = useState(STEPS.GREETING);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [lead, setLead] = useState({ course: '', level: '', name: '', email: '', phone: '', customQuestion: '' });

  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);

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

  function botReply(text, delayMs = 800) {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), from: 'bot', text }]);
    }, delayMs);
  }

  function userMsg(text) {
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text }]);
  }

  function getStepReminder(currentStep, currentLead) {
    switch (currentStep) {
      case STEPS.GREETING: return "\n\nWhenever you're ready, select or type the **language** you wish to learn below! 👇";
      case STEPS.LANGUAGE: return "\n\nCould you tell me what your **current proficiency level** is? 👇";
      case STEPS.LEVEL:    return "\n\nLet's keep going! May I get your **full name**?";
      case STEPS.NAME:     return `\n\nWhat is your **email address**, **${currentLead.name || 'there'}**?`;
      case STEPS.EMAIL:    return "\n\nAnd what is a good **phone number** to reach you on?";
      case STEPS.CONFIRM:  return "\n\nIs your confirmation summary above correct? Please type **Yes** or **No**.";
      default:             return "";
    }
  }

  function handleCourseSelect(course) {
    if (step !== STEPS.GREETING) return;
    userMsg(course);
    setLead(prev => ({ ...prev, course }));
    setStep(STEPS.LANGUAGE);
    botReply(`Great choice! 🎉 **${course}** is one of our most popular courses.\n\nWhat is your current level?`, 900);
  }

  function handleLevelSelect(level) {
    if (step !== STEPS.LANGUAGE) return;
    userMsg(level);
    setLead(prev => ({ ...prev, level }));
    setStep(STEPS.LEVEL);
    botReply(`Perfect! We have a **${level}** group forming for **${lead.course}**.\n\nWe're currently collecting students and will contact you to arrange a schedule once the group is ready! 🗓️\n\nMay I get your **full name**?`, 1000);
  }

  async function saveToSheet(finalLead) {
    const sheetData = {
      data: [{
        Name:        finalLead.name,
        Nationality: 'N/A',
        Age:         'N/A',
        Phone:       `(${finalLead.phone})`,
        Email:       finalLead.email,
        Course:      `${finalLead.course} (${finalLead.level})`,
        HearAbout:   'AI Chat Widget',
        Message:     finalLead.customQuestion ? `Asked: "${finalLead.customQuestion}"` : 'Lead from AI Chat Widget',
        Date:        new Date().toLocaleString(),
      }],
    };
    const res = await fetch(SHEETDB_URL, {
      method:  'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body:    JSON.stringify(sheetData),
    });
    if (!res.ok) throw new Error('SheetDB error');
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
        event_category: 'Lead Form',
        event_label:    finalLead.course,
      });
    }
  }

  async function handleSend() {
    const value = input.trim();
    if (!value || isTyping || isSending) return;
    setInput('');

    const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isPhone = v => /^[\d\s\+\-\(\)]{7,}$/.test(v);
    const lowerValue = value.toLowerCase();

    const matchedFAQ = FAQ_KNOWLEDGE_BASE.find(item =>
      item.keywords.some(keyword => lowerValue.includes(keyword))
    );
    const looksLikeStrayQuestion = lowerValue.includes('?') || lowerValue.startsWith('how') || lowerValue.startsWith('what') || lowerValue.startsWith('where') || lowerValue.startsWith('why');

    if ((matchedFAQ || looksLikeStrayQuestion) && step !== STEPS.CONFIRM && step !== STEPS.DONE) {
      userMsg(value);
      if (matchedFAQ) {
        botReply(matchedFAQ.reply + getStepReminder(step, lead), 1000);
      } else {
        setLead(prev => ({ ...prev, customQuestion: value }));
        botReply(`💡 That's an excellent question! I've flagged that for our admissions advisor to answer personally when they reach out to you.\n\nLet's get back to your setup so we can secure your contact info: ${getStepReminder(step, lead)}`, 1100);
      }
      return;
    }

    if (step === STEPS.GREETING) {
      userMsg(value);
      setLead(prev => ({ ...prev, course: value }));
      setStep(STEPS.LANGUAGE);
      botReply(`Understood! We'll track options for **${value}**.\n\nWhat is your current level?`, 900);
      return;
    }

    if (step === STEPS.LANGUAGE) {
      userMsg(value);
      setLead(prev => ({ ...prev, level: value }));
      setStep(STEPS.LEVEL);
      botReply(`Got it! Profiling track for level **${value}**.\n\nMay I get your **full name**?`, 900);
      return;
    }

    if (step === STEPS.LEVEL) {
      userMsg(value);
      setLead(prev => ({ ...prev, name: value }));
      setStep(STEPS.NAME);
      botReply(`Nice to meet you, **${value}**! 😊\n\nWhat's your **email address**? We'll send you class details.`);
      return;
    }

    if (step === STEPS.NAME) {
      if (!isEmail(value)) {
        userMsg(value);
        botReply(`Hmm, that doesn't look like a valid email. Could you double-check it? 😊`);
        return;
      }
      userMsg(value);
      setLead(prev => ({ ...prev, email: value }));
      setStep(STEPS.EMAIL);
      botReply(`Got it! And your **phone number**? (So our team can reach you easily via call or WhatsApp)`);
      return;
    }

    if (step === STEPS.EMAIL) {
      if (!isPhone(value)) {
        userMsg(value);
        botReply(`Hmm, that doesn't look like a valid phone number. Please try again! 😊`);
        return;
      }
      userMsg(value);
      const finalLead = { ...lead, phone: value };
      setLead(finalLead);
      setStep(STEPS.CONFIRM);
      botReply(
        `Almost done! Let me confirm your details:\n\n📚 **Course:** ${finalLead.course} (${finalLead.level})\n👤 **Name:** ${finalLead.name}\n📧 **Email:** ${finalLead.email}\n📱 **Phone:** ${value}\n\nIs everything correct? Reply **Yes** to confirm or **No** to start over.`,
        1000
      );
      return;
    }

    if (step === STEPS.CONFIRM) {
      const answer = value.toLowerCase();
      if (answer === 'no' || answer === 'nope' || answer === 'wrong') {
        userMsg(value);
        setLead({ course: '', level: '', name: '', email: '', phone: '', customQuestion: '' });
        setMessages(INITIAL_MESSAGES);
        setStep(STEPS.GREETING);
        return;
      }
      if (answer === 'yes' || answer === 'yeah' || answer === 'yep' || answer === 'correct' || answer === 'ok') {
        userMsg(value);
        setIsSending(true);
        setIsTyping(true);
        try {
          await saveToSheet(lead);
          setIsTyping(false);
          setIsSending(false);
          setStep(STEPS.DONE);
          setMessages(prev => [...prev, {
            id: Date.now(), from: 'bot',
            text: `🎉 **You're all set, ${lead.name}!**\n\nWe've received your registration for **${lead.course}**.\n\nWe're forming your group now and will contact you personally once we have enough students to arrange the schedule together! 🗓️\n\nIn the meantime, feel free to reach us on WhatsApp anytime. We're excited to have you! 🌟`,
          }]);
        } catch {
          setIsTyping(false);
          setIsSending(false);
          botReply(`Sorry, something went wrong 😔 Please contact us directly on WhatsApp at **+60 1118648860** and we'll get you registered!`);
        }
        return;
      }
      userMsg(value);
      botReply(`I didn't quite get that. Please reply **Yes** to confirm or **No** to start over. 😊`);
      return;
    }

    if (step === STEPS.DONE) {
      userMsg(value);
      botReply(`Thank you for your message! For any further questions, please reach us on WhatsApp: **+60 1118648860** or email **info@stanton-academy.com** 😊`);
      return;
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function handleReset() {
    setMessages(INITIAL_MESSAGES);
    setStep(STEPS.GREETING);
    setLead({ course: '', level: '', name: '', email: '', phone: '', customQuestion: '' });
    setInput('');
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .sa-widget * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        :root {
          --sa-green: #006B3F; --sa-green-dark: #00502f; --sa-green-light: #e6f4ed;
          --sa-gold: #FFC72C; --sa-gold-dark: #e6b000; --sa-white: #ffffff;
          --sa-gray-50: #f9fafb; --sa-gray-100: #f3f4f6; --sa-gray-200: #e5e7eb;
          --sa-gray-400: #9ca3af; --sa-gray-600: #4b5563; --sa-gray-800: #1f2937;
          --sa-shadow-lg: 0 20px 60px rgba(0,0,0,0.18);
          --sa-shadow-btn: 0 4px 20px rgba(0,107,63,0.4); --sa-radius: 16px;
        }
        .sa-fab { position: fixed; bottom: 28px; right: 28px; z-index: 10000; width: 60px; height: 60px; border-radius: 50%; background: var(--sa-green); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: var(--sa-shadow-btn); transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s; outline: none; }
        .sa-fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(0,107,63,0.55); }
        .sa-fab svg { transition: transform 0.3s ease, opacity 0.3s ease; }
        .sa-fab--open svg.sa-icon-chat { transform: scale(0) rotate(-90deg); opacity: 0; position: absolute; }
        .sa-fab--open svg.sa-icon-close { transform: scale(1) rotate(0deg); opacity: 1; }
        .sa-fab:not(.sa-fab--open) svg.sa-icon-close { transform: scale(0) rotate(90deg); opacity: 0; position: absolute; }
        .sa-fab:not(.sa-fab--open) svg.sa-icon-chat { transform: scale(1); opacity: 1; }
        .sa-pulse { position: fixed; bottom: 28px; right: 28px; z-index: 9999; width: 60px; height: 60px; border-radius: 50%; animation: sa-pulse-anim 2s ease-out infinite; pointer-events: none; }
        @keyframes sa-pulse-anim { 0% { box-shadow: 0 0 0 0 rgba(0,107,63,0.5); } 70% { box-shadow: 0 0 0 20px rgba(0,107,63,0); } 100% { box-shadow: 0 0 0 0 rgba(0,107,63,0); } }
        .sa-tooltip { position: fixed; bottom: 40px; right: 100px; z-index: 10001; background: var(--sa-green); color: var(--sa-white); padding: 10px 16px; border-radius: 20px 20px 4px 20px; font-size: 0.82rem; font-weight: 500; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.15); animation: sa-tooltip-in 0.4s cubic-bezier(0.34,1.56,0.64,1); pointer-events: none; }
        @keyframes sa-tooltip-in { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        .sa-panel { position: fixed; bottom: 100px; right: 28px; z-index: 9999; width: 370px; max-height: 560px; border-radius: var(--sa-radius); background: var(--sa-white); box-shadow: var(--sa-shadow-lg); display: flex; flex-direction: column; overflow: hidden; transform-origin: bottom right; animation: sa-panel-in 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes sa-panel-in { from { opacity: 0; transform: scale(0.85) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @media (max-width: 480px) { .sa-panel { width: calc(100vw - 24px); right: 12px; bottom: 90px; max-height: 70vh; } .sa-fab, .sa-pulse { right: 16px; bottom: 16px; } .sa-tooltip { right: 80px; } }
        .sa-header { background: linear-gradient(135deg, var(--sa-green) 0%, #005535 100%); padding: 16px 18px; display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .sa-header-avatar { width: 42px; height: 42px; border-radius: 50%; background: var(--sa-gold); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; color: var(--sa-green); flex-shrink: 0; }
        .sa-header-info { flex: 1; }
        .sa-header-name { color: var(--sa-white); font-weight: 600; font-size: 0.92rem; line-height: 1.2; }
        .sa-header-status { color: rgba(255,255,255,0.75); font-size: 0.72rem; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
        .sa-online-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; display: inline-block; animation: sa-blink 2s ease-in-out infinite; }
        @keyframes sa-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .sa-header-actions { display: flex; gap: 6px; }
        .sa-header-btn { background: rgba(255,255,255,0.15); border: none; border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; transition: background 0.2s; }
        .sa-header-btn:hover { background: rgba(255,255,255,0.25); }
        .sa-messages { flex: 1; overflow-y: auto; padding: 16px 14px; display: flex; flex-direction: column; gap: 12px; background: var(--sa-gray-50); scroll-behavior: smooth; }
        .sa-messages::-webkit-scrollbar { width: 4px; }
        .sa-messages::-webkit-scrollbar-thumb { background: var(--sa-gray-200); border-radius: 4px; }
        .sa-msg { display: flex; align-items: flex-end; gap: 8px; animation: sa-msg-in 0.3s ease-out; }
        @keyframes sa-msg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .sa-msg--user { flex-direction: row-reverse; }
        .sa-avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--sa-gold); color: var(--sa-green); font-size: 0.65rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sa-bubble { max-width: 80%; padding: 10px 14px; border-radius: 18px; font-size: 0.83rem; line-height: 1.55; word-break: break-word; }
        .sa-bubble--bot { background: var(--sa-white); color: var(--sa-gray-800); border-bottom-left-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); }
        .sa-bubble--user { background: var(--sa-green); color: var(--sa-white); border-bottom-right-radius: 4px; }
        .sa-bubble strong { font-weight: 600; }
        .sa-typing { display: flex; align-items: center; gap: 5px; padding: 12px 16px; }
        .sa-typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--sa-gray-400); animation: sa-dot 1.2s ease-in-out infinite; }
        .sa-typing span:nth-child(2) { animation-delay: 0.2s; }
        .sa-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes sa-dot { 0%,60%,100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-6px); opacity: 1; } }
        .sa-chips { display: flex; flex-wrap: wrap; gap: 7px; padding: 4px 14px 8px; background: var(--sa-gray-50); flex-shrink: 0; }
        .sa-chip { background: var(--sa-white); border: 1.5px solid var(--sa-green); color: var(--sa-green); padding: 6px 13px; border-radius: 20px; font-size: 0.76rem; font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .sa-chip:hover { background: var(--sa-green); color: var(--sa-white); transform: translateY(-1px); box-shadow: 0 3px 10px rgba(0,107,63,0.25); }
        .sa-chip--gold { border-color: var(--sa-gold-dark); color: #7a5800; background: #fffbec; }
        .sa-chip--gold:hover { background: var(--sa-gold); color: var(--sa-green); border-color: var(--sa-gold); }
        .sa-input-bar { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: var(--sa-white); border-top: 1px solid var(--sa-gray-200); flex-shrink: 0; }
        .sa-input { flex: 1; border: 1.5px solid var(--sa-gray-200); border-radius: 24px; padding: 9px 16px; font-size: 0.82rem; color: var(--sa-gray-800); background: var(--sa-gray-50); outline: none; font-family: 'Poppins', sans-serif; }
        .sa-input:focus { border-color: var(--sa-green); background: var(--sa-white); }
        .sa-input::placeholder { color: var(--sa-gray-400); }
        .sa-send-btn { width: 38px; height: 38px; border-radius: 50%; background: var(--sa-green); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; }
        .sa-send-btn:hover:not(:disabled) { background: var(--sa-green-dark); transform: scale(1.08); }
        .sa-send-btn:disabled { background: var(--sa-gray-200); cursor: not-allowed; }
        .sa-footer { text-align: center; padding: 6px; font-size: 0.67rem; color: var(--sa-gray-400); background: var(--sa-white); border-top: 1px solid var(--sa-gray-100); flex-shrink: 0; }
        .sa-footer a { color: var(--sa-green); text-decoration: none; }
      `}</style>

      {!open && showPulse && <div className="sa-pulse" />}
      {!open && showPulse && <div className="sa-tooltip">💬 Chat with us!</div>}

      <button className={`sa-fab${open ? ' sa-fab--open' : ''}`} onClick={() => setOpen(o => !o)} aria-label={open ? 'Close chat' : 'Open chat'}>
        <svg className="sa-icon-chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <svg className="sa-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {open && (
        <div className="sa-panel sa-widget">
          <div className="sa-header">
            <div className="sa-header-avatar">SA</div>
            <div className="sa-header-info">
              <div className="sa-header-name">Stanton Academy</div>
              <div className="sa-header-status"><span className="sa-online-dot" /> Online — replies instantly</div>
            </div>
            <div className="sa-header-actions">
              <button className="sa-header-btn" onClick={handleReset} title="Restart">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>
              </button>
              <button className="sa-header-btn" onClick={() => setOpen(false)} title="Close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          <div className="sa-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`sa-msg sa-msg--${msg.from}`}>
                {msg.from === 'bot' && <div className="sa-avatar">SA</div>}
                <div className={`sa-bubble sa-bubble--${msg.from}`} dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text).replace(/\n/g, '<br/>') }} />
              </div>
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {step === STEPS.GREETING && (
            <div className="sa-chips">{COURSES.map(c => <button key={c} className="sa-chip" onClick={() => handleCourseSelect(c)}>{c}</button>)}</div>
          )}
          {step === STEPS.LANGUAGE && (
            <div className="sa-chips">{LEVELS.map(l => <button key={l} className="sa-chip sa-chip--gold" onClick={() => handleLevelSelect(l)}>{l}</button>)}</div>
          )}
          {step === STEPS.CONFIRM && (
            <div className="sa-chips">
              <button className="sa-chip" onClick={() => { setInput('Yes'); setTimeout(handleSend, 50); }}>✅ Yes, confirm</button>
              <button className="sa-chip" onClick={() => { setInput('No'); setTimeout(handleSend, 50); }}>❌ No, start over</button>
            </div>
          )}

          <div className="sa-input-bar">
            <input
              ref={inputRef} className="sa-input" type="text"
              placeholder={step === STEPS.GREETING ? 'Type your question or select above...' : step === STEPS.LANGUAGE ? 'Type your level here...' : step === STEPS.LEVEL ? 'Type your full name...' : step === STEPS.NAME ? 'Type your email...' : step === STEPS.EMAIL ? 'Type your phone number...' : step === STEPS.CONFIRM ? 'Type Yes or No...' : 'Type a message...'}
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} disabled={isSending}
            />
            <button className="sa-send-btn" onClick={handleSend} disabled={!input.trim() || isSending}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
          <div className="sa-footer">Powered by <a href="https://stanton-academy.com">Stanton Academy</a> AI Assistant</div>
        </div>
      )}
    </>
  );
}