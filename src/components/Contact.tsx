
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  const { isTerminal } = useTheme();

  const handleWhatsAppClick = () => {
    // You can add your WhatsApp number here later
    window.open('https://wa.me/9779869112525', '_blank');
  };

  const handleEmailClick = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=oscardhamala117@gmail.com', '_blank');
  };

  return (
    <section id="contact" className={`py-20 ${isTerminal ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="section-container">
        <h2 className="section-heading text-center">
          {isTerminal ? '> Contact_Me' : 'Get In Touch'}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div>
            <h3 className={`text-2xl font-bold mb-6 ${
              isTerminal ? 'font-mono text-terminal-green' : ''
            }`}>
              Let's Connect
            </h3>
            <p className={`text-lg mb-8 ${
              isTerminal ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Have a project in mind or just want to say hi? Feel free to reach out through any of the channels below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full ${
                  isTerminal ? 'bg-terminal-dark text-terminal-green' : 'bg-black text-white'
                }`}>
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className={`${isTerminal ? 'text-gray-400' : 'text-gray-600'}`}>
                    oscardhamala117@gmail.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full ${
                  isTerminal ? 'bg-terminal-dark text-terminal-green' : 'bg-black text-white'
                }`}>
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className={`${isTerminal ? 'text-gray-400' : 'text-gray-600'}`}>
                    +977-9869112525
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full ${
                  isTerminal ? 'bg-terminal-dark text-terminal-green' : 'bg-black text-white'
                }`}>
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className={`${isTerminal ? 'text-gray-400' : 'text-gray-600'}`}>
                    Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Swinging Contact Icons */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <h3 className={`text-2xl font-bold mb-8 text-center ${
                isTerminal ? 'font-mono text-terminal-green' : ''
              }`}>
                Message Me Directly
              </h3>
              
              <div className="flex justify-center gap-20">
                {/* WhatsApp Icon with Rope */}
                <div className="relative">
                  {/* Rope */}
                  <div 
                    className={`w-1 h-24 mx-auto mb-2 ${
                      isTerminal ? 'bg-terminal-green' : 'bg-gray-800'
                    }`}
                    style={{
                      background: isTerminal ? '#00ff00' : '#8B4513',
                      borderRadius: '2px'
                    }}
                  ></div>
                  
                  {/* Swinging WhatsApp Icon */}
                  <div 
                    className={`cursor-target swing-animation w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${
                      isTerminal ? 'bg-terminal-green text-black hover:bg-terminal-green/80' : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  
                  <p className={`text-center mt-3 font-medium ${
                    isTerminal ? 'text-terminal-green font-mono' : ''
                  }`}>
                    WhatsApp
                  </p>
                </div>
                
                {/* Email Icon with Rope */}
                <div className="relative">
                  {/* Rope */}
                  <div 
                    className={`w-1 h-24 mx-auto mb-2 ${
                      isTerminal ? 'bg-terminal-green' : 'bg-gray-800'
                    }`}
                    style={{
                      background: isTerminal ? '#00ff00' : '#8B4513',
                      borderRadius: '2px'
                    }}
                  ></div>
                  
                  {/* Swinging Email Icon */}
                  <div 
                    className={`cursor-target swing-animation-delayed w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${
                      isTerminal ? 'bg-terminal-green text-black hover:bg-terminal-green/80' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    onClick={handleEmailClick}
                  >
                    <Mail className="w-8 h-8" />
                  </div>
                  
                  <p className={`text-center mt-3 font-medium ${
                    isTerminal ? 'text-terminal-green font-mono' : ''
                  }`}>
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
