// components/FAQ.jsx
"use client"
import { useState } from 'react';

const faqs = [
  {
    question: "What is our mission?",
    answer: "Our mission is to empower communities through education, support sustainable development, and promote social justice.",
  },
  {
    question: "How can I get involved?",
    answer: "You can get involved by volunteering with us, participating in our events, or donating to support our programs.",
  },
  {
    question: "What types of programs do you offer?",
    answer: "We offer various programs focused on education, health, environmental sustainability, and community development.",
  },
  {
    question: "Are donations tax-deductible?",
    answer: "Yes, all donations made to our organization are tax-deductible. You will receive a receipt for your contributions.",
  },
  {
    question: "How can I stay updated on your activities?",
    answer: "You can subscribe to our newsletter, follow us on social media, or check our website for the latest updates.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq container mx-auto px-4 py-8" id="faq">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item bg-white shadow-lg rounded-lg transition-transform transform duration-300 ease-in-out">
            <div 
              className={`flex justify-between items-center p-4 cursor-pointer hover:bg-green-200 rounded-lg ${openIndex === index ? 'bg-yellow-200' : 'bg-white'}`} 
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              <span className={`text-gray-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                &#x25BC;
              </span>
            </div>
            <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}>
              <p className="text-gray-600 p-4">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
