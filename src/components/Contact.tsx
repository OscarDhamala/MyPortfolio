
import React from "react";
import { Mail, Phone, MapPin, MessageCircle, Satellite } from "lucide-react";

export default function Contact() {
  const handleWhatsAppClick = () => {
    // You can add your WhatsApp number here later
    window.open('https://wa.me/9779869112525', '_blank');
  };

  const handleEmailClick = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=oscardhamala117@gmail.com', '_blank');
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="orb orb-indigo"></div>
      <div className="contact-orbit"></div>
      <div className="section-container">
        <h2 className="section-heading text-center">
          Get In Touch
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="glass-panel rounded-3xl p-8 space-card">
            <h3 className="text-2xl font-bold mb-6 text-slate-100">
              Let's Connect
            </h3>
            <p className="text-lg mb-8 text-slate-300">
              Have a project in mind or just want to say hi? Feel free to reach out through any of the channels below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_12px_24px_rgba(34,211,238,0.35)]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-100">Email</h4>
                  <p className="text-slate-300">
                    oscardhamala117@gmail.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_12px_24px_rgba(34,211,238,0.35)]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-100">Phone</h4>
                  <p className="text-slate-300">
                    +977-9869112525
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_12px_24px_rgba(34,211,238,0.35)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-100">Location</h4>
                  <p className="text-slate-300">
                    Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Swinging Contact Icons */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <Satellite className="w-5 h-5 text-amber-300 mx-auto mb-3 rocket-fly-slow" />
              <h3 className="text-2xl font-bold mb-8 text-center text-slate-100">
                Message Me Directly
              </h3>
              
              <div className="flex justify-center gap-20">
                {/* WhatsApp Icon with Rope */}
                <div className="relative">
                  {/* Rope */}
                  <div className="w-1 h-24 mx-auto mb-2 rounded bg-slate-300/50"></div>
                  
                  {/* Swinging WhatsApp Icon */}
                  <div 
                    className="swing-animation w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 shadow-[0_12px_24px_rgba(16,185,129,0.35)]"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  
                  <p className="text-center mt-3 font-medium text-slate-200">
                    WhatsApp
                  </p>
                </div>
                
                {/* Email Icon with Rope */}
                <div className="relative">
                  {/* Rope */}
                  <div className="w-1 h-24 mx-auto mb-2 rounded bg-slate-300/50"></div>
                  
                  {/* Swinging Email Icon */}
                  <div 
                    className="swing-animation-delayed w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 bg-gradient-to-br from-cyan-400 to-indigo-500 text-slate-950 shadow-[0_12px_24px_rgba(56,189,248,0.35)]"
                    onClick={handleEmailClick}
                  >
                    <Mail className="w-8 h-8" />
                  </div>
                  
                  <p className="text-center mt-3 font-medium text-slate-200">
                    Email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
