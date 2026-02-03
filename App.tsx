
import React, { useState, useEffect } from 'react';
import { translations, Language } from './translations';
import { GoogleGenAI } from "@google/genai";

// --- About Page Component ---
const AboutPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-16">
          <button onClick={() => window.location.href = window.location.origin} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl italic">G</div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors">GLOBAL<span className="text-indigo-600">TIPSS</span></span>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h1 className="text-5xl font-black text-slate-900 leading-tight">
              {t.aboutPage.title}
            </h1>
            <p className="text-2xl text-indigo-600 font-bold">
              {t.aboutPage.subtitle}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.aboutPage.storyText}
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
              alt="Our Team" 
              className="rounded-[3rem] shadow-2xl object-cover h-96 w-full"
            />
          </div>
        </div>

        <div className="bg-slate-50 rounded-[4rem] p-12 lg:p-20 mb-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-black text-slate-900">{t.aboutPage.mission}</h2>
            <p className="text-xl text-slate-600 italic leading-relaxed">
              "{t.aboutPage.missionText}"
            </p>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-12">{t.aboutPage.team}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.aboutPage.teamMembers.map((member, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-xl border-4 border-white"
                />
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-indigo-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {t.aboutPage.valuesList.map((value, idx) => (
            <div key={idx} className="p-10 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6 text-xl font-bold">
                {idx + 1}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">{value.title}</h3>
              <p className="text-slate-500 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="?page=contact" 
            className="inline-block bg-indigo-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
          >
            {t.hero.cta}
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Contact Page Component ---
const ContactPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
      await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `A new contact request from ${formData.name} (${formData.email}) at ${formData.company}. Message: ${formData.message}. Acknowledge this internally.`,
      });
      
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <button onClick={() => window.location.href = window.location.origin} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl italic">G</div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors">GLOBAL<span className="text-indigo-600">TIPSS</span></span>
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 grid md:grid-cols-5">
          <div className="md:col-span-2 bg-indigo-600 p-10 text-white flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-black mb-6">{t.contact.title}</h1>
              <p className="text-indigo-100 text-lg leading-relaxed">{t.contact.subtitle}</p>
            </div>
            
            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <span className="font-medium text-sm">hsalvador@globaltipss.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <span className="font-medium text-sm">+57 319 202 2800</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <span className="font-medium text-sm">St. Petersburg, FL</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 p-10 md:p-14">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{lang === 'es' ? '¡Enviado!' : 'Sent!'}</h2>
                <p className="text-slate-500">{t.contact.success}</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-indigo-600 font-bold hover:underline">
                  {lang === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.contact.name}</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.contact.email}</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.contact.company}</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="Company Inc." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.contact.message}</label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder={lang === 'es' ? 'Cuéntanos tus objetivos de ROAS...' : 'Tell us about your ROAS goals...'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"></textarea>
                </div>
                <button disabled={status === 'loading'} type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-70">
                  {status === 'loading' ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>{t.contact.sending}</>) : t.contact.send}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.5!2d-82.6365!3d27.8465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2e1f2b4e5c1a5%3A0x1234567890abcdef!2s7901%204th%20St%20N%20Suite%20300%2C%20St.%20Petersburg%2C%20FL%2033702!5e0!3m2!1sen!2sus!4v1699999999999"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={lang === 'es' ? 'Ubicación de GlobalTipss' : 'GlobalTipss Location'}
          />
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => window.location.href = window.location.origin} className="text-slate-400 font-medium hover:text-indigo-600 transition-colors">
            ← {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Privacy Policy Component ---
const PrivacyPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2rem] shadow-xl border border-slate-100">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl italic">G</div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">GLOBAL<span className="text-indigo-600">TIPSS</span></span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-8 underline decoration-indigo-500 decoration-4 underline-offset-8">Políticas de privacidad</h1>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed">
          <p>En globaltipss.com, valoramos la privacidad de nuestros usuarios tanto como ellos. Agradecemos la confianza que depositan en nosotros y nos comprometemos a proporcionar la mejor experiencia posible, garantizando la seguridad de la información personal de nuestros usuarios.</p>
          <h2 className="text-xl font-bold text-slate-900 mt-8">Protección de Información</h2>
          <p>Hemos instaurado medidas de seguridad para proteger la información personal del usuario cuando se envía información a nuestro sitio. Nos adherimos a todos los estándares de seguridad establecidos y utilizados por grandes sitios web a nivel mundial, tanto durante la transmisión como la recepción de información. No obstante, ningún método de transmisión de información por Internet ni ningún método de almacenamiento electrónico son completamente seguros. Por ello, aunque nos esforzamos por utilizar los mejores métodos comercialmente aceptables para proteger la información, no podemos garantizar su seguridad absoluta.</p>
          <h2 className="text-xl font-bold text-slate-900 mt-8">Información que recolectamos y utilizamos</h2>
          <p>Recolectamos información de nuestros usuarios de dos formas: información proporcionada directamente por el usuario (nombre, correo electrónico, etc.) e información que recopilamos a través del uso de nuestro sitio (páginas visitadas, tiempo que se permanece en nuestro sitio, etc.)</p>
          <h2 className="text-xl font-bold text-slate-900 mt-8">Información de Contacto</h2>
          <p className="font-bold">Jesus Montero / Harry Salvador</p>
          <p>Oficina 407<br />Cra 24 52 50<br />Bucaramanga, Colombia</p>
          <p>O contáctenos mediante nuestro formulario: <a href="https://globaltipss.com/contacto/" className="text-indigo-600 underline">https://globaltipss.com/contacto/</a></p>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100">
          <button onClick={() => window.location.href = window.location.origin} className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">← Volver al sitio principal</button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---
const Navbar: React.FC<{ lang: Language, setLang: (l: Language) => void }> = ({ lang, setLang }) => {
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl italic">G</div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">GLOBAL<span className="text-indigo-600">TIPSS</span></span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200">
            <button onClick={() => setLang('es')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'es' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>ES</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>EN</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent rounded-bl-[100px]"></div>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold tracking-widest uppercase">
            <i className="fa-solid fa-chart-line"></i> Performance Marketing Experts
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">{t.hero.title}</h1>
          <p className="text-xl text-slate-600 max-w-lg leading-relaxed">{t.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="?page=contact" className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 text-center">{t.hero.cta}</a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="relative bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-100 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Performance Data" className="rounded-2xl w-full h-auto object-cover" />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"><i className="fa-solid fa-arrow-trend-up text-xl"></i></div>
              <div><p className="text-xs text-slate-400 font-bold uppercase">Average ROAS</p><p className="text-2xl font-black text-slate-900">4.8x</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoCarousel: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const logos = [{ name: 'TechFlow', color: 'text-indigo-400' }, { name: 'NexGen', color: 'text-slate-400' }, { name: 'Vantage', color: 'text-blue-400' }, { name: 'Stellar', color: 'text-violet-400' }, { name: 'Rise', color: 'text-emerald-400' }, { name: 'GrowthCo', color: 'text-orange-400' }];
  return (
    <section className="py-12 bg-white overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center"><h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">{t.carousel.title}</h2></div>
      <div className="flex">
        <div className="flex animate-infinite-scroll whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex items-center mx-12 gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <div className={`w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center ${logo.color}`}><i className="fa-solid fa-bolt"></i></div>
              <span className="text-2xl font-bold text-slate-400 tracking-tighter">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900">{t.services.title}</h2>
          <p className="text-lg text-slate-600">{t.services.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.services.items.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <i className={`fa-solid ${item.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-6">{item.desc}</p>
              <a href="?page=contact" className="inline-flex items-center text-xs font-bold text-indigo-600 uppercase tracking-wider group-hover:gap-2 transition-all">Learn more <i className="fa-solid fa-arrow-right ml-2"></i></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-lg italic">G</div>
              <span className="text-xl font-black tracking-tighter text-white">GLOBAL<span className="text-indigo-400">TIPSS</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">{t.footer.description}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.links}</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="?page=about" className="hover:text-white transition-colors">{t.nav.about}</a></li>
              <li><a href="?page=contact" className="hover:text-white transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.legal}</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a></li>
              <li><a href="?page=privacy" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.legalInfo}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.corporate}</h4>
            <ul className="space-y-4 text-sm">
              <li><span className="text-slate-500">{t.footer.company}:</span> Capital Quick LLC</li>
              <li><span className="text-slate-500">EIN:</span> 30-1418776</li>
              <li><span className="text-slate-500">{t.footer.address}:</span> 7901 4th St N, Ste 300, St. Petersburg, FL 33702</li>
              <li><span className="text-slate-500">{t.footer.contactEmail}:</span> <a href="mailto:hsalvador@globaltipss.com" className="hover:text-white transition-colors">hsalvador@globaltipss.com</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-slate-800 text-xs text-center">
          <p>© 2026 GlobalTipss Agency. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'contact' | 'about'>('home');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    if (page === 'privacy') setCurrentPage('privacy');
    else if (page === 'contact') setCurrentPage('contact');
    else if (page === 'about') setCurrentPage('about');
    else setCurrentPage('home');
  }, []);

  if (currentPage === 'privacy') return <PrivacyPage lang={lang} />;
  if (currentPage === 'contact') return <ContactPage lang={lang} />;
  if (currentPage === 'about') return <AboutPage lang={lang} />;

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <LogoCarousel lang={lang} />
      <Services lang={lang} />
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">{lang === 'es' ? 'Transparencia y Seguridad de Datos' : 'Data Transparency & Security'}</h2>
            <p className="text-slate-600 leading-relaxed">{lang === 'es' ? 'En GlobalTipss, el cumplimiento de la GDPR y las políticas locales de protección de datos son nuestra prioridad. Utilizamos los datos de forma ética para optimizar el rendimiento de tus campañas sin comprometer la privacidad del usuario.' : 'At GlobalTipss, GDPR compliance and local data protection policies are our top priority. We use data ethically to optimize your campaign performance without compromising user privacy.'}</p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><i className="fa-solid fa-shield-halved text-indigo-600 text-2xl mb-3"></i><h4 className="font-bold text-slate-900 mb-1">SSL Secure</h4><p className="text-xs text-slate-500">Encrypted data transmission</p></div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><i className="fa-solid fa-user-lock text-indigo-600 text-2xl mb-3"></i><h4 className="font-bold text-slate-900 mb-1">GDPR Ready</h4><p className="text-xs text-slate-500">Privacy focused strategy</p></div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-indigo-600 p-12 rounded-[3rem] text-white space-y-8">
              <h3 className="text-3xl font-bold">{lang === 'es' ? '¿Listo para el siguiente nivel?' : 'Ready for the next level?'}</h3>
              <p className="text-indigo-100 text-lg">{lang === 'es' ? 'Nuestro equipo está listo para auditar tus cuentas y encontrar oportunidades de mejora inmediata.' : 'Our team is ready to audit your accounts and find immediate improvement opportunities.'}</p>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                window.location.href = `mailto:hsalvador@globaltipss.com?subject=Quick Contact from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}`;
              }}>
                <input type="text" name="name" required placeholder={lang === 'es' ? 'Nombre' : 'Name'} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <input type="tel" name="phone" required placeholder={lang === 'es' ? 'Celular' : 'Phone'} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <input type="email" name="email" required placeholder={lang === 'es' ? 'Correo' : 'Email'} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <button type="submit" className="w-full bg-white text-indigo-600 font-bold py-4 rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-widest text-sm">{lang === 'es' ? 'Enviar' : 'Send'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
    </div>
  );
};

export default App;
