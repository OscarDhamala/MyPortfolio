
import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface TerminalProps {
  commands?: string[];
  initialMessage?: string;
  prompt?: string;
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({
  commands = [],
  initialMessage = "Welcome to Oscar's portfolio terminal. Type 'help' for commands.",
  prompt = "visitor@oscar-portfolio:~$",
  className = "",
}) => {
  const [history, setHistory] = useState<string[]>([initialMessage]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const { isTerminal } = useTheme();

  // Simulate typing effect for initial commands
  useEffect(() => {
    if (commands.length > 0 && commandIndex < commands.length) {
      const timer = setTimeout(() => {
        processCommand(commands[commandIndex]);
        setCommandIndex(commandIndex + 1);
      }, 1000 + Math.random() * 1000);

      return () => clearTimeout(timer);
    }
  }, [commandIndex, commands]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      processCommand(currentCommand);
      setCurrentCommand("");
    }
  };

  const processCommand = (cmd: string) => {
    let response: string;

    // Add the command to history
    const newHistory = [...history, `${prompt} ${cmd}`];

    // Process command
    switch (cmd.toLowerCase()) {
      case "help":
        response = "Available commands: about, skills, projects, contact, clear";
        break;
      case "about":
        response = "Oscar Dhamala is a Full Stack Developer with expertise in both frontend and backend technologies.";
        break;
      case "skills":
        response = "Skills: JavaScript, React, Tailwind, Node.js, Python, Database Management, CyberSecurity, Digital Marketing, AI Content Creation";
        break;
      case "projects":
        response = "View projects section for a showcase of recent work";
        break;
      case "contact":
        response = "Email: oscar@example.com | LinkedIn: linkedin.com/in/oscardhamala";
        break;
      case "clear":
        setHistory([initialMessage]);
        return;
      default:
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory([...newHistory, response]);
  };

  if (!isTerminal) return null;

  return (
    <div className={`terminal-container font-mono text-terminal-green overflow-auto ${className}`}>
      <div className="mb-4">
        {history.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap break-words">
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <span>{prompt}</span>
        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none ml-2 font-mono text-terminal-green caret-transparent"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <span className="typed-cursor"></span>
      </div>
    </div>
  );
};

export default Terminal;
