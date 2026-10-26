import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { portfolioData } from '@/data/portfolioData';
import { getWhatsAppUrl } from '@/utils/contact';
import ContactCards, { LinkedinIcon } from '@/components/ui/ContactCards';
import ShimmerButton from '@/components/ui/ShimmerButton';

export default function Contact() {
  const { personal } = portfolioData;
  const { t, lang } = useLanguage();

  const whatsappMessage = lang === 'en'
    ? 'Hello Aldy Oktaviano, I came across your portfolio at aldyokta.my.id and would like to discuss an opportunity.'
    : 'Halo Aldy Oktaviano, saya melihat portofolio Anda di aldyokta.my.id dan tertarik untuk berdiskusi lebih lanjut.';

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const url = getWhatsAppUrl(whatsappMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppPrepare = (e) => {
    e.currentTarget.href = getWhatsAppUrl(whatsappMessage);
  };

  const linkedInCard = (
    <div className="w-80 overflow-hidden text-left bg-[#1d2226] text-[#e8e6e3] rounded-2xl border border-[rgba(255,255,255,0.12)] shadow-2xl">
      {/* LinkedIn Dark Cover Banner */}
      <div className="h-16 bg-gradient-to-r from-[#4b5563] via-[#374151] to-[#1f2937] relative" />

      <div className="px-5 pt-2 pb-4">
        {/* Real Avatar with #OPENTOWORK green ring */}
        <div className="-mt-12 mb-2 w-fit relative">
          <img
            src="/linkedin-avatar.png"
            alt={personal.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-[#1d2226] shadow-md"
          />
        </div>

        {/* Name & Pronouns */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-bold text-base text-white tracking-tight">{personal.name}</span>
          <span className="text-xs text-[#9ca3af] font-normal">He/Him</span>
        </div>

        {/* Real Headline from Profile */}
        <p className="text-xs text-[#d1d5db] font-medium leading-relaxed mt-1">
          Software Tester | Manual Testing | Regression Testing
        </p>

        {/* Company & Details */}
        <div className="mt-2.5 pt-2 border-t border-[rgba(255,255,255,0.08)] flex flex-col gap-1 text-[11px] text-[#9ca3af]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span className="text-[#e5e7eb] font-medium">PT. Tiga Serangkai Inti Corpora</span>
          </div>
          <div className="flex items-center justify-between text-[#9ca3af] pt-0.5">
            <span>Surakarta, Jawa Tengah</span>
            <span className="text-[#60a5fa] font-medium">286+ koneksi</span>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-3 pt-2.5 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between text-xs font-semibold text-[#70b5f9] hover:underline">
          <span>{lang === 'en' ? 'Open LinkedIn Profile' : 'Buka Profil LinkedIn'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#70b5f9]" />
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
              loading: t.contact.githubLoading,
              error: t.contact.githubError,
            }}
            locale={lang === 'en' ? 'en-US' : 'id-ID'}
          />

          {/* Direct WhatsApp CTA Button (Obfuscated & dynamically generated on user interaction) */}
          <div className="mt-2 flex items-center justify-center">
            <ShimmerButton
              as="a"
              href="#whatsapp"
              onClick={handleWhatsAppClick}
              onMouseEnter={handleWhatsAppPrepare}
              onFocus={handleWhatsAppPrepare}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.contact.chatWa}
              className="rounded-xl shadow-sm"
              innerClassName="h-11 px-6 rounded-xl font-semibold text-sm"
            >
              <span>{t.contact.chatWa}</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </ShimmerButton>
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
