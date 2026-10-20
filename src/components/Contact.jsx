import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import ContactCards, { LinkedinIcon } from './ui/contact-cards';

export default function Contact() {
  const { personal } = portfolioData;
  const { t, lang } = useLanguage();

  const whatsappMessage = lang === 'en'
    ? 'Hello Aldy Oktaviano, I came across your portfolio at aldyokta.my.id and would like to discuss an opportunity.'
    : 'Halo Aldy Oktaviano, saya melihat portofolio Anda di aldyokta.my.id dan tertarik untuk berdiskusi lebih lanjut.';

  const whatsappUrl = `https://wa.me/${personal.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

  const linkedInCard = (
    <div className="w-72 overflow-hidden text-left">
      <div className="h-16 bg-gradient-to-br from-[#0A66C2] via-[#0077B5] to-[#0A66C2]/40 relative" />
      <div className="flex flex-col gap-1 px-4 pt-2 pb-4 bg-[var(--surface)]">
        <div className="-mt-11 mb-1 w-fit">
          <div className="size-14 rounded-full bg-gradient-to-br from-[#96551f] to-[#5b6270] flex items-center justify-center text-white font-bold text-lg ring-4 ring-[var(--surface)] shadow-md">
            AO
          </div>
        </div>
        <span className="font-semibold text-base text-[var(--text)]">{personal.name}</span>
        <span className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
          Quality Assurance Tester & Frontend Developer
        </span>
        <span className="text-xs text-[var(--text-muted)] mt-0.5">
          Surakarta, Jawa Tengah, Indonesia
        </span>
        <div className="mt-2.5 pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[#0A66C2]">
          <span>{lang === 'en' ? 'Open LinkedIn Profile' : 'Buka Profil LinkedIn'}</span>
          <ArrowUpRight className="size-3.5" />
        </div>
      </div>
    </div>
  );

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* H2 Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight">
          {t.contact.title}
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-base text-[var(--text-muted)] leading-relaxed">
          {t.contact.subtitle}
        </p>

        {/* Interactive Contact Cards (Copy Email in-place, GitHub Heatmap, LinkedIn Profile Card) */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <ContactCards
            email={personal.email}
            github={{
              username: 'AldyOkta',
              url: personal.github,
            }}
            links={[
              {
                label: 'LinkedIn',
                href: personal.linkedin,
                icon: <LinkedinIcon className="size-5" />,
                card: linkedInCard,
              },
            ]}
            labels={{
              copy: t.contact.copyEmail,
              copied: t.contact.emailCopied,
              contributions: t.contact.contributions,
            }}
            locale={lang === 'en' ? 'en-US' : 'id-ID'}
          />

          {/* Direct WhatsApp CTA Button */}
          <div className="mt-2 flex items-center justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-6 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <span>{t.contact.chatWa}</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* Location Text */}
        <p className="mt-6 text-sm text-[var(--text-muted)]">
          {t.contact.location}
        </p>
      </div>
    </section>
  );
}
