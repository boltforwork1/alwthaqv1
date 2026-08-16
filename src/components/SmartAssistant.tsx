import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, RotateCcw, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

type ChatMessage = {
  role: 'bot' | 'user';
  text: string;
  links?: { label: string; url: string }[];
  showFaqs?: boolean;
  showWhatsApp?: boolean;
};

const WHATSAPP_URL = 'https://wa.me/971555276288';

const ease = [0.22, 1, 0.36, 1] as const;

export default function SmartAssistant() {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const knowledgeBase = t.assistant.questions;

  // Reset messages when language changes or on first mount
  useEffect(() => {
    setMessages([{ role: 'bot', text: t.assistant.welcome, showFaqs: true }]);
    setHasUserInteracted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.assistant.welcome]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-suggest: filter FAQs based on input text
  const suggestions = useMemo(() => {
    if (!input.trim()) return [];
    const lower = input.toLowerCase();
    return knowledgeBase.filter((item) =>
      item.q.toLowerCase().includes(lower) ||
      item.a.toLowerCase().includes(lower)
    );
  }, [input, knowledgeBase]);

  const findAnswer = (text: string) => {
    const lower = text.toLowerCase();
    let bestMatch: typeof knowledgeBase[number] | null = null;
    let bestScore = 0;

    for (const item of knowledgeBase) {
      const qLower = item.q.toLowerCase();
      const words = qLower.split(' ').filter((w) => w.length > 2);
      let score = 0;
      for (const word of words) {
        if (lower.includes(word)) score += 1;
      }
      if (qLower.includes(lower) || lower.includes(qLower)) score += 10;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }

    return bestScore > 0 ? bestMatch : null;
  };

  const handleQuestionClick = (question: string) => {
    const match = knowledgeBase.find((item) => item.q === question);
    if (!match) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: question },
      {
        role: 'bot',
        text: match.a,
        links: match.links,
        showFaqs: true,
      },
    ]);
    setHasUserInteracted(true);
    setInput('');
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const match = findAnswer(text);

    if (match) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', text },
        {
          role: 'bot',
          text: match.a,
          links: match.links,
          showFaqs: true,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: 'user', text },
        {
          role: 'bot',
          text: t.assistant.notSure,
          showWhatsApp: true,
          showFaqs: true,
        },
      ]);
    }
    setHasUserInteracted(true);
    setInput('');
  };

  const handleReset = () => {
    setMessages([{ role: 'bot', text: t.assistant.welcome, showFaqs: true }]);
    setHasUserInteracted(false);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ===== Floating Button ===== */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            onClick={() => setIsOpen(true)}
            aria-label="Open chat assistant"
            className="fixed bottom-6 end-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#1B753C] text-white shadow-lg shadow-[#1B753C]/30 transition-transform duration-300 hover:scale-110"
          >
            <Bot className="h-6 w-6" strokeWidth={1.8} />
            <span className="absolute -top-1 -end-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2EE6A6] opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-[#2EE6A6]" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ===== Chat Window ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
            className="fixed bottom-6 end-6 z-[60] flex h-[520px] w-[350px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* ===== Header ===== */}
            <div className="flex items-center justify-between bg-[#111111] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B753C]/20">
                  <Bot className="h-5 w-5 text-[#2EE6A6]" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{t.assistant.title}</h3>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2EE6A6] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2EE6A6]" />
                    </span>
                    <span className="text-xs text-white/50">{t.assistant.online}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  aria-label="Reset chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" strokeWidth={1.8} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {/* ===== Messages Area ===== */}
            <div className="flex-1 overflow-y-auto bg-[#F8F8F8] px-4 py-4">
              <div className="flex flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div key={idx}>
                    {/* Message bubble */}
                    <div
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-[#1B753C] text-white'
                            : 'border border-black/5 bg-white text-ink/80'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>

                    {/* Action links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className={`mt-2 flex flex-wrap gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.links.map((link) => (
                          <Link
                            key={link.label}
                            to={link.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center rounded-full border border-[#1B753C]/30 bg-[#1B753C]/5 px-3 py-1.5 text-xs font-medium text-[#1B753C] transition-colors duration-300 hover:bg-[#1B753C]/10"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* WhatsApp fallback button */}
                    {msg.showWhatsApp && (
                      <div className="mt-2 flex justify-start">
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#1B753C] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-[#155f30]"
                        >
                          <Bot className="h-3.5 w-3.5" strokeWidth={2} />
                          {t.assistant.talkOnWhatsApp}
                        </a>
                      </div>
                    )}

                    {/* FAQ pills after bot messages */}
                    {msg.role === 'bot' && msg.showFaqs && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {knowledgeBase.map((item) => (
                          <button
                            key={item.q}
                            onClick={() => handleQuestionClick(item.q)}
                            className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/60 transition-all duration-300 hover:border-[#1B753C]/30 hover:bg-[#1B753C]/5 hover:text-[#1B753C]"
                          >
                            {item.q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* ===== Auto-suggest Dropdown ===== */}
            <AnimatePresence>
              {suggestions.length > 0 && input.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-[68px] start-4 end-4 rounded-xl border border-black/10 bg-white shadow-lg"
                >
                  {suggestions.map((item) => (
                    <button
                      key={item.q}
                      onClick={() => handleQuestionClick(item.q)}
                      className="block w-full px-4 py-2.5 text-start text-xs text-ink/70 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl hover:bg-[#1B753C]/5 hover:text-[#1B753C]"
                    >
                      {item.q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ===== Input Area ===== */}
            <div className="border-t border-black/5 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.assistant.inputPlaceholder}
                  className="flex-1 rounded-full border border-black/10 bg-[#F8F8F8] px-4 py-2.5 text-sm text-ink placeholder-ink/30 transition-colors duration-300 focus:border-[#1B753C] focus:outline-none focus:ring-1 focus:ring-[#1B753C]/20"
                />
                <button
                  onClick={handleSend}
                  aria-label="Send message"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B753C] text-white transition-colors duration-300 hover:bg-[#155f30]"
                >
                  <Send className="h-4 w-4 rtl:rotate-180" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
