
import React from "react";
import { Mail, MessageCircle, Satellite } from "lucide-react";

export default function Contact() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9779869112525', '_blank');
  };

  const handleEmailClick = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=oscardhamala117@gmail.com', '_blank');
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="orb orb-indigo"></div>
      <div className="section-container">
        <h2 className="section-heading text-center">
          Get In Touch
        </h2>

        <div className="flex justify-center items-center">
          <div className="relative">
            <Satellite className="w-5 h-5 text-amber-300 mx-auto mb-3 rocket-fly-slow" />
            <h3 className="text-2xl font-bold mb-8 text-center text-stone-100">
              Message Me Directly
            </h3>

            <div className="flex justify-center gap-20">
              <div className="relative">
                <div className="w-1 h-24 mx-auto mb-2 rounded bg-stone-300/50"></div>
                <div
                  className="swing-animation w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 bg-gradient-to-br from-emerald-400 to-cyan-500 text-stone-950 shadow-[0_12px_24px_rgba(16,185,129,0.35)]"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-8 h-8" />
                </div>
                <p className="text-center mt-3 font-medium text-stone-200">
                  WhatsApp
                </p>
              </div>

              <div className="relative">
                <div className="w-1 h-24 mx-auto mb-2 rounded bg-stone-300/50"></div>
                <div
                  className="swing-animation-delayed w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 bg-gradient-to-br from-cyan-400 to-indigo-500 text-stone-950 shadow-[0_12px_24px_rgba(56,189,248,0.35)]"
                  onClick={handleEmailClick}
                >
                  <Mail className="w-8 h-8" />
                </div>
                <p className="text-center mt-3 font-medium text-stone-200">
                  Email
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
