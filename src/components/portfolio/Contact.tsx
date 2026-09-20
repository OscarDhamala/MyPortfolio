import { SOCIAL } from "@/data/portfolioData";
import { IconGithub, IconLinkedIn, IconMail, IconWhatsapp } from "@/components/portfolio/icons";

const Contact = () => {
  return (
    <section
      id="contact"
      className="mx-auto flex max-w-2xl scroll-mt-28 flex-col items-center gap-6 px-6 py-16 text-center min-[900px]:py-24"
    >
      <span className="font-mono text-xs uppercase tracking-wider text-accent">Get in touch</span>
      <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-balance sm:text-[52px]">
        Let's build something.
      </h2>
      <p className="max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
        Open to freelance projects, full-stack roles, and interesting problems. I usually reply within a day.
      </p>
      <a
        href="mailto:oscardhamala117@gmail.com"
        className="mt-1 break-words border-b-2 border-accent pb-1 text-xl font-extrabold transition-opacity hover:opacity-70 sm:text-[26px]"
      >
        oscardhamala117@gmail.com
      </a>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <a
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
        >
          <IconLinkedIn className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
        >
          <IconGithub className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={SOCIAL.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
        >
          <IconWhatsapp className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={SOCIAL.email}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
        >
          <IconMail className="h-4 w-4" />
          Email me
        </a>
      </div>
    </section>
  );
};

export default Contact;
