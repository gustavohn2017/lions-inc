"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './floating-whatsapp.css';

const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Olá! Gostaria de saber mais sobre os investimentos do Lions Bank.');
  const phoneNumber = '5511999999999'; // Replace with your actual WhatsApp number

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format the phone number correctly, stripping non-numeric characters if needed
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    // Close the floating widget
    setIsOpen(false);
    // Optional: track the event with analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_contact', {
        'event_category': 'engagement',
        'event_label': 'WhatsApp Contact',
      });
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-105 stable-animation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
          aria-label="Abrir WhatsApp"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-5 z-40 w-80 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faWhatsappSquare} className="text-2xl mr-3" />
                  <div>
                    <h3 className="font-bold text-sm">Lions Bank Invest</h3>
                    <p className="text-xs opacity-90">Atendimento via WhatsApp</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Fechar"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>

            {/* Chat body */}
            <div className="p-4 bg-[#E5DDD5] min-h-[100px] max-h-[200px] overflow-y-auto">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-2 max-w-[80%] ml-auto whatsapp-message">
                <p className="text-sm text-gray-700">Olá! Como podemos ajudar você? Estamos à disposição para tirar dúvidas sobre nossos investimentos.</p>
                <p className="text-[10px] text-gray-500 text-right mt-1">11:30</p>
              </div>
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
              <div className="flex">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-l-lg p-2 text-sm focus:outline-none focus:border-[#128C7E] resize-none"
                  rows={2}
                  placeholder="Digite sua mensagem..."
                ></textarea>
                <button 
                  type="submit"
                  className="bg-[#25D366] text-white px-3 rounded-r-lg hover:bg-[#128C7E] transition-colors"
                >
                  Enviar
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWhatsApp;
