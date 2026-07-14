import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import profile from "../data/profile";
import contact from "../data/contact";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import type { Language } from "../App";

interface ContactProps {
  language: Language;
}

function Contact({ language }: ContactProps) {
  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-10 lg:px-14 dark:border-slate-800 dark:bg-slate-900">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full"
            />

            <div className="relative max-w-3xl">
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
                {contact.subtitle[language]}
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                {contact.title[language]}
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                {contact.description[language]}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={`mailto:${profile.email}`}>
                  <span className="flex items-center gap-2">
                    <FaEnvelope aria-hidden="true" />
                    {contact.emailButton[language]}
                  </span>
                </Button>

                <Button
                  href={profile.github}
                  variant="secondary"
                  external
                >
                  <span className="flex items-center gap-2">
                    <FaGithub aria-hidden="true" />
                    {contact.githubButton[language]}
                  </span>
                </Button>

                {profile.linkedin && (
                  <Button
                    href={profile.linkedin}
                    variant="secondary"
                    external
                  >
                    <span className="flex items-center gap-2">
                      <FaLinkedin aria-hidden="true" />
                      {contact.linkedinButton[language]}
                    </span>
                  </Button>
                )}
              </div>

              <p className="mt-6 font-mono text-xs text-slate-500">
                {contact.responseTime[language]}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;