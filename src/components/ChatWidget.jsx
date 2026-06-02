import React, { useState, useEffect, useRef } from 'react';

// ─── SheetDB API ──────────────────────────────────────────────────────────────
const SHEETDB_URL = 'https://sheetdb.io/api/v1/k5ohu0497ek0x';
const WHATSAPP_URL = 'https://wa.me/601118648860';

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
  GREETING: 'greeting',
  LANGUAGE: 'language',
  LEVEL:    'level',
  NAME:     'name',
  EMAIL:    'email',
  PHONE:    'phone',
  CONFIRM:  'confirm',
  DONE:     'done',
};

// ─── FAQ Knowledge Base ───────────────────────────────────────────────────────
const FAQ = [
  {
    keywords: ['where', 'location', 'address', 'campus', 'located', 'kl', 'place'],
    reply: "📍 We are located at **No 112 & 114, 5th Floor, Wisma Hainan, Jalan Pudu 55100, Kuala Lumpur**. Easy to reach by public transport! 🚇"
  },
  {
    keywords: ['price', 'fee', 'cost', 'how much', 'rm', 'payment', 'expensive', 'harga', 'bayaran'],
    reply: "💰 Our course fees:\n\n📚 General English & IELTS — **RM 2,200/mo**\n🇯🇵 Japanese — **RM 1,875/mo**\n🇨🇳 Mandarin — **RM 1,250/mo**\n🇰🇷 Korean — **RM 1,120/mo**\n🇩🇪 German — **RM 590/mo**\n🇲🇾 Bahasa Malaysia — **RM 520/mo**"
  },
  {
    keywords: ['schedule', 'time', 'when', 'weekend', 'evening', 'morning', 'night', 'duration', 'jadual', 'masa'],
    reply: "🗓️ We offer flexible timetables — **weekday mornings, evenings** for working professionals, and **weekend intensive** classes. Once your group is formed, we arrange a schedule that works for everyone!"
  },
  {
    keywords: ['teacher', 'lecturer', 'instructor', 'native', 'staff', 'guru', 'cikgu'],
    reply: "👨‍🏫 All our trainers are **certified native speakers** or highly qualified bilingual specialists with years of international teaching experience!"
  },
  {
    keywords: ['ielts', 'band', 'exam', 'test', 'score'],
    reply: "🎯 Our **IELTS Preparation** course targets **Band 7.0+**! We run 5x per week, 4 hours per session with mock tests and personalized feedback. RM 2,200/month."
  },
  {
    keywords: ['why', 'benefit', 'advantage', 'special', 'different', 'kenapa', 'sebab'],
    reply: "🌟 Why choose Stanton Academy?\n\n✅ **Free second teacher** if you don't understand\n✅ **Free Events** — cinema, trips, activities\n✅ **Co-working zones** for students\n✅ **Small class sizes** for personal attention\n✅ Teaching languages since **2014**!"
  },
  {
    keywords: ['register', 'sign up', 'enroll', 'join', 'start', 'daftar', 'mula'],
    reply: "🎉 Great that you want to join! We are currently forming groups. Once we have **5-10 students**, we arrange the schedule together. Let me get your details so we can contact you!"
  },
  {
    keywords: ['trial', 'free', 'demo', 'percuma', 'cuba'],
    reply: "😊 We don't have free trial classes yet as we are forming new groups. But once we have enough students, we will contact you to arrange everything together! Would you like to register your interest?"
  },
  {
    keywords: ['contact', 'whatsapp', 'call', 'email', 'hubungi'],
    reply: "📞 You can reach us at:\n\n📱 **WhatsApp:** +60 1118648860\n📧 **Email:** info@stanton-academy.com\n💬 **Telegram:** @stantonacademykl"
  },
  {
    keywords: ['bahasa', 'malay', 'melayu', 'malaysia'],
    reply: "🇲🇾 Ya! Kami ada kelas **Bahasa Malaysia** — **RM 520/bulan**, 1x seminggu, 2 jam setiap sesi. Sesuai untuk ekspatriat dan pelajar antarabangsa yang ingin belajar Bahasa Malaysia!"
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 'bot',
    text: "👋 Hi there! Welcome to **Stanton Academy**!\n\nI can answer your questions about our courses, fees, schedule and more — in English or Bahasa Malaysia! 😊\n\nWhich language are you interested in learning?",
  },
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

export default function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState(INITIAL_MESSAGES);
  const [step, setStep]           = useState(STEPS.GREETING);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [showWA, setShowWA]       = useState(false);
  const [lead, setLead]           = useState({ course: '', level: '', name: '', email: '', phone: '', question: '' });

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

  function botReply(text, delay = 800) {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), from: 'bot', text }]);
    }, delay);
  }

  function userMsg(text) {
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text }]);
  }

  function getReminder(currentStep, currentLead) {
    switch (currentStep) {
      case STEPS.GREETING: return "\n\n👇 Which **language** would you like to learn?";
      case STEPS.LANGUAGE: return "\n\n👇 What is your **current level**?";
      case STEPS.LEVEL:    return "\n\nMay I get your **full name**?";
      case STEPS.NAME:     return `\n\nWhat is your **email address**, **${currentLead.name || 'there'}**?`;
      case STEPS.EMAIL:    return "\n\nAnd your **phone number**?";
      case STEPS.CONFIRM:  return "\n\nPlease reply **Yes** to confirm or **No** to start over.";
      default:             return "";
    }
  }

  // ── Save to Google Sheets ──────────────────────────────────────────────────
  async function saveToSheet(finalLead) {
    const res = await fetch(SHEETDB_URL, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          Name:        finalLead.name,
          Nationality: 'N/A',
          Age:         'N/A',
          Phone:       `(${finalLead.phone})`,
          Email:       finalLead.email,
          Course:      `${finalLead.course} (${finalLead.level})`,
          HearAbout:   'AI Chat Widget',
          Message:     finalLead.question ? `Asked: "${finalLead.question}"` : 'Lead from AI Chat Widget',
          Date:        new Date().toLocaleString(),
        }],
      }),
    });
    if (!res.ok) throw new Error('SheetDB error');
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
        event_category: 'Lead Form',
        event_label: finalLead.course,
      });
    }
  }

  // ── Handle chip & text input ───────────────────────────────────────────────
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
    botReply(`Perfect! We have a **${level}** group forming for **${lead.course}**.\n\nWe will contact you once we have enough students to arrange the schedule together! 🗓️\n\nMay I get your **full name**?`, 1000);
  }

  async function handleSend(overrideText) {
    const value = (overrideText || input).trim();
    if (!value || isTyping || isSending) return;
    setInput('');

    const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isPhone = v => /^[\d\s\+\-\(\)]{7,}$/.test(v);
    const lower   = value.toLowerCase();

    // ── FAQ Interceptor ──────────────────────────────────────────────────────
    if (step !== STEPS.CONFIRM && step !== STEPS.DONE) {
      const faq = FAQ.find(f => f.keywords.some(k => lower.includes(k)));
      const isQuestion = lower.includes('?') || lower.startsWith('how') || lower.startsWith('what') || lower.startsWith('where') || lower.startsWith('why') || lower.startsWith('when') || lower.startsWith('ada') || lower.startsWith('berapa');

      if (faq) {
        userMsg(value);
        botReply(faq.reply + getReminder(step, lead), 1000);
        return;
      }

      if (isQuestion && step === STEPS.GREETING) {
        userMsg(value);
        setLead(prev => ({ ...prev, question: value }));
        botReply(`💡 Great question! I've noted that for our admissions team to answer personally.\n\nMeanwhile, which **language** would you like to learn? 👇`, 1000);
        return;
      }
    }

    // ── Step: Greeting (course selection by text) ────────────────────────────
    if (step === STEPS.GREETING) {
      userMsg(value);
      setLead(prev => ({ ...prev, course: value }));
      setStep(STEPS.LANGUAGE);
      botReply(`Got it! We'll look at **${value}** options for you.\n\nWhat is your current level?`, 900);
      return;
    }

    // ── Step: Language (level selection by text) ─────────────────────────────
    if (step === STEPS.LANGUAGE) {
      userMsg(value);
      setLead(prev => ({ ...prev, level: value }));
      setStep(STEPS.LEVEL);
      botReply(`Got it! **${value}** level noted.\n\nMay I get your **full name**?`, 900);
      return;
    }

    // ── Step: Name ───────────────────────────────────────────────────────────
    if (step === STEPS.LEVEL) {
      userMsg(value);
      setLead(prev => ({ ...prev, name: value }));
      setStep(STEPS.NAME);
      botReply(`Nice to meet you, **${value}**! 😊\n\nWhat is your **email address**?`);
      return;
    }

    // ── Step: Email ──────────────────────────────────────────────────────────
    if (step === STEPS.NAME) {
      if (!isEmail(value)) {
        userMsg(value);
        botReply(`Hmm, that doesn't look like a valid email. Could you double-check it? 😊`);
        return;
      }
      userMsg(value);
      setLead(prev => ({ ...prev, email: value }));
      setStep(STEPS.EMAIL);
      botReply(`Got it! And your **phone number**? (So our team can reach you via call or WhatsApp)`);
      return;
    }

    // ── Step: Phone ──────────────────────────────────────────────────────────
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

    // ── Step: Confirm ────────────────────────────────────────────────────────
    if (step === STEPS.CONFIRM) {
      const answer = value.toLowerCase();
      if (['no', 'nope', 'wrong', 'tidak', 'salah'].includes(answer)) {
        userMsg(value);
        setLead({ course: '', level: '', name: '', email: '', phone: '', question: '' });
        setMessages(INITIAL_MESSAGES);
        setStep(STEPS.GREETING);
        return;
      }
      if (['yes', 'yeah', 'yep', 'correct', 'ok', 'ya', 'betul', 'confirm'].includes(answer)) {
        userMsg(value);
        setIsSending(true);
        setIsTyping(true);
        try {
          await saveToSheet(lead);
          setIsTyping(false);
          setIsSending(false);
          setStep(STEPS.DONE);
          setShowWA(true);
          setMessages(prev => [...prev, {
            id: Date.now(), from: 'bot',
            text: `🎉 **You're all set, ${lead.name}!**\n\nWe've received your registration for **${lead.course}**.\n\nWe are forming your group now and will contact you personally once we have enough students to arrange the schedule together! 🗓️\n\nWe're excited to have you join Stanton Academy! 🌟`,
          }]);
        } catch {
          setIsTyping(false);
          setIsSending(false);
          botReply(`Sorry, something went wrong 😔 Please contact us directly on WhatsApp at **+60 1118648860**!`);
        }
        return;
      }
      userMsg(value);
      botReply(`Please reply **Yes** to confirm or **No** to start over. 😊`);
      return;
    }

    // ── Step: Done ───────────────────────────────────────────────────────────
    if (step === STEPS.DONE) {
      userMsg(value);
      botReply(`Thank you! For further questions reach us on WhatsApp: **+60 1118648860** or email **info@stanton-academy.com** 😊`);
      return;
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function handleReset() {
    setMessages(INITIAL_MESSAGES);
    setStep(STEPS.GREETING);
    setLead({ course: '', level: '', name: '', email: '', phone: '', question: '' });
    setInput('');
    setShowWA(false);
  }

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
        .sa-header-name { color: white; font-weight: 600; font-size: 0.92rem; line-height: 1.2; }
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
        .sa-typing { display: flex; align-items: center; gap: 5px; padding: 12px 16px; }
        .sa-typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--sa-gray-400); animation: sa-dot 1.2s ease-in-out infinite; }
        .sa-typing span:nth-child(2) { animation-delay: 0.2s; }
        .sa-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes sa-dot { 0%,60%,100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-6px); opacity: 1; } }
        .sa-chips { display: flex; flex-wrap: wrap; gap: 7px; padding: 6px 14px 8px; background: var(--sa-gray-50); flex-shrink: 0; border-top: 1px solid var(--sa-gray-200); }
        .sa-chip { background: white; border: 1.5px solid var(--sa-green); color: var(--sa-green); padding: 6px 13px; border-radius: 20px; font-size: 0.76rem; font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .sa-chip:hover { background: var(--sa-green); color: white; transform: translateY(-1px); box-shadow: 0 3px 10px rgba(0,107,63,0.25); }
        .sa-chip--gold { border-color: var(--sa-gold-dark); color: #7a5800; background: #fffbec; }
        .sa-chip--gold:hover { background: var(--sa-gold); color: var(--sa-green); border-color: var(--sa-gold); }
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

      {!open && showPulse && <div className="sa-pulse" />}
      {!open && showPulse && <div className="sa-tooltip">💬 Ask me anything!</div>}

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
              <div className="sa-header-status">
                <span className="sa-online-dot" /> Online · English & Bahasa Malaysia
              </div>
            </div>
            <div className="sa-header-actions">
              <button className="sa-header-btn" onClick={handleReset} title="Restart">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>
              </button>
              <button className="sa-header-btn" onClick={() => setOpen(false)} title="Close">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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

          {/* Course chips */}
          {step === STEPS.GREETING && (
            <div className="sa-chips">
              {COURSES.map(c => <button key={c} className="sa-chip" onClick={() => handleCourseSelect(c)}>{c}</button>)}
            </div>
          )}

          {/* Level chips */}
          {step === STEPS.LANGUAGE && (
            <div className="sa-chips">
              {LEVELS.map(l => <button key={l} className="sa-chip sa-chip--gold" onClick={() => handleLevelSelect(l)}>{l}</button>)}
            </div>
          )}

          {/* Confirm chips */}
          {step === STEPS.CONFIRM && (
            <div className="sa-chips">
              <button className="sa-chip" onClick={() => handleSend('Yes')}>✅ Yes, confirm</button>
              <button className="sa-chip" onClick={() => handleSend('No')}>❌ No, start over</button>
            </div>
          )}

          {/* WhatsApp button after registration */}
          {showWA && (
            <div className="sa-whatsapp-bar">
              <WhatsAppButton />
            </div>
          )}

          <div className="sa-input-bar">
            <input
              ref={inputRef} className="sa-input" type="text"
              placeholder={
                step === STEPS.GREETING ? 'Ask anything or select a course above...' :
                step === STEPS.LANGUAGE ? 'Select your level above or type it...' :
                step === STEPS.LEVEL    ? 'Type your full name...' :
                step === STEPS.NAME     ? 'Type your email address...' :
                step === STEPS.EMAIL    ? 'Type your phone number...' :
                step === STEPS.CONFIRM  ? 'Type Yes or No...' :
                'Type a message...'
              }
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
            />
            <button className="sa-send-btn" onClick={() => handleSend()} disabled={!input.trim() || isSending}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <div className="sa-footer">Powered by <a href="https://stanton-academy.com">Stanton Academy</a> AI Assistant</div>
        </div>
      )}
    </>
  );
}