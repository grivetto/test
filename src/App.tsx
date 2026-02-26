import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Stethoscope,
  Syringe,
  Scissors,
  Heart,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Star
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    petName: '',
    reason: 'Visita di Controllo'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          petName: '',
          reason: 'Visita di Controllo'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-sage-200 selection:text-sage-900">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-sage-600" fill="currentColor" />
            <span className="font-serif text-2xl font-semibold tracking-tight text-sage-900">
              Dr. Clara Paws
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-sage-600 transition-colors">Chi Siamo</a>
            <a href="#services" className="text-sm font-medium hover:text-sage-600 transition-colors">Servizi</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-sage-600 transition-colors">Dicono di Noi</a>
            <a href="#contact" className="text-sm font-medium hover:text-sage-600 transition-colors">Contatti</a>
            <a
              href="#book"
              className="bg-sage-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-sage-700 transition-colors shadow-sm"
            >
              Prenota Appuntamento
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[60px] left-0 w-full bg-white shadow-lg z-40 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2 border-b border-sage-100">Chi Siamo</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2 border-b border-sage-100">Servizi</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2 border-b border-sage-100">Dicono di Noi</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2 border-b border-sage-100">Contatti</a>
              <a
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-sage-600 text-white px-5 py-3 rounded-full text-center font-medium mt-4"
              >
                Prenota Appuntamento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2000"
              alt="Veterinarian with a dog"
              className="w-full h-full object-cover object-right-top"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                <span>Cure amorevoli per i tuoi migliori amici</span>
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-serif font-medium leading-[1.1] text-sage-900 mb-6">
                Cure veterinarie esperte con un tocco delicato.
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg text-charcoal/80 mb-8 max-w-xl leading-relaxed">
                Benvenuti nella clinica della Dott.ssa Clara, dove trattiamo ogni animale come uno di famiglia. Cure mediche, chirurgiche e dentali complete in un ambiente senza stress.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <a
                  href="#book"
                  className="bg-sage-600 text-white px-8 py-4 rounded-full font-medium hover:bg-sage-700 transition-colors shadow-lg shadow-sage-600/20 flex items-center gap-2"
                >
                  Prenota una Visita <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  className="bg-white text-sage-900 px-8 py-4 rounded-full font-medium hover:bg-sage-50 transition-colors border border-sage-200"
                >
                  I Nostri Servizi
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
                    alt="Dr. Clara examining a cat"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-sage-100 rounded-full z-0 blur-3xl opacity-60" />
                <div className="absolute -top-8 -left-8 w-48 h-48 bg-sage-200 rounded-full z-0 blur-3xl opacity-40" />

                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border border-sage-50">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center text-sage-600">
                      <Star className="w-6 h-6" fill="currentColor" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-sage-900">15+</div>
                      <div className="text-sm text-charcoal/70">Anni di Esperienza</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeIn} className="text-sm font-bold tracking-widest text-sage-600 uppercase mb-3">
                  Conosci la Dott.ssa Clara
                </motion.h2>
                <motion.h3 variants={fadeIn} className="text-4xl lg:text-5xl font-serif font-medium text-sage-900 mb-6">
                  Una passione per il benessere degli animali lunga una vita.
                </motion.h3>
                <motion.div variants={fadeIn} className="space-y-4 text-charcoal/80 text-lg leading-relaxed mb-8">
                  <p>
                    La Dott.ssa Clara esercita la medicina veterinaria da oltre 15 anni, con un'attenzione particolare alle cure preventive e alla medicina interna.
                  </p>
                  <p>
                    Laureata con il massimo dei voti presso il College of Veterinary Medicine della Cornell University, crede in un approccio olistico alla salute degli animali: curare non solo i sintomi, ma comprendere l'intero animale nel suo ambiente domestico.
                  </p>
                  <p>
                    "Il mio obiettivo è collaborare con i proprietari per garantire che i loro amici a quattro zampe vivano una vita il più lunga e felice possibile."
                  </p>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Signature_of_John_Hancock.svg/1200px-Signature_of_John_Hancock.svg.png"
                    alt="Signature"
                    className="h-12 opacity-40 grayscale"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-sage-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-widest text-sage-600 uppercase mb-3">I Nostri Servizi</h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-medium text-sage-900 mb-6">
                Cure complete per ogni fase della vita.
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Stethoscope className="w-8 h-8" />,
                  title: "Visite di Controllo",
                  desc: "Controlli di routine per individuare precocemente potenziali problemi di salute e mantenere il tuo animale in forma."
                },
                {
                  icon: <Syringe className="w-8 h-8" />,
                  title: "Vaccinazioni",
                  desc: "Vaccini di base e specifici per lo stile di vita, adattati ai fattori di rischio e all'ambiente del tuo animale."
                },
                {
                  icon: <Scissors className="w-8 h-8" />,
                  title: "Chirurgia",
                  desc: "Sala chirurgica all'avanguardia per sterilizzazioni, castrazioni e procedure sui tessuti molli."
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Cure Dentali",
                  desc: "Pulizie professionali, radiografie dentali digitali e chirurgia orale per prevenire le malattie."
                }
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-sage-100"
                >
                  <div className="w-16 h-16 bg-sage-100 text-sage-600 rounded-2xl flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-serif font-bold text-sage-900 mb-3">{service.title}</h4>
                  <p className="text-charcoal/70 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-widest text-sage-600 uppercase mb-3">Dicono di Noi</h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-medium text-sage-900 mb-6">
                Animali felici, umani ancora più felici.
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  text: "La Dott.ssa Clara è semplicemente la migliore. Ha dedicato così tanto tempo a spiegare il piano di cura del mio cane. Si vede che ama sinceramente gli animali.",
                  author: "Sarah M.",
                  pet: "Proprietaria di Bella (Golden Retriever)"
                },
                {
                  text: "La clinica è così calma e accogliente. Il mio gatto di solito odia il veterinario, ma l'approccio senza paura qui ha fatto un'enorme differenza.",
                  author: "James T.",
                  pet: "Proprietario di Oliver (Maine Coon)"
                },
                {
                  text: "Veniamo qui da 5 anni. Dalle vaccinazioni da cucciolo a un recente intervento dentale, le cure sono state costantemente eccellenti.",
                  author: "Elena R.",
                  pet: "Proprietaria di Max & Luna"
                }
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-cream p-8 rounded-3xl"
                >
                  <div className="flex gap-1 text-sage-400 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5" fill="currentColor" />)}
                  </div>
                  <p className="text-lg text-charcoal/80 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-bold text-sage-900">{testimonial.author}</div>
                    <div className="text-sm text-charcoal/60">{testimonial.pet}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Contact Section */}
        <section id="contact" className="py-24 bg-sage-900 text-sage-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl lg:text-5xl font-serif font-medium mb-6">
                  Pronto a programmare la tua visita?
                </h2>
                <p className="text-sage-200 text-lg mb-10 max-w-md">
                  Accettiamo nuovi pazienti! Chiamaci o prenota online per fissare il primo appuntamento del tuo animale.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-sage-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Posizione</h4>
                      <p className="text-sage-200">123 Wellness Way<br />Portland, OR 97204</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-sage-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Contatti</h4>
                      <p className="text-sage-200">(555) 123-4567<br />hello@drpaws.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-sage-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Orari</h4>
                      <p className="text-sage-200">Lun-Ven: 8:00 - 18:00<br />Sab: 9:00 - 14:00<br />Dom: Chiuso</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="book" className="bg-white rounded-[2rem] p-8 lg:p-12 text-charcoal shadow-2xl">
                <h3 className="text-2xl font-serif font-bold text-sage-900 mb-6">Richiedi un Appuntamento</h3>

                {submitStatus === 'success' ? (
                  <div className="bg-sage-50 rounded-xl p-8 text-center border border-sage-200">
                    <div className="w-16 h-16 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8" fill="currentColor" />
                    </div>
                    <h4 className="text-xl font-bold text-sage-900 mb-2">Richiesta Inviata!</h4>
                    <p className="text-charcoal/80 mb-6">
                      Grazie per averci contattato. La tua richiesta per {formData.petName || 'il tuo animale'} è stata ricevuta. Ti chiameremo al più presto per confermare l'orario.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="text-sage-600 font-medium hover:text-sage-700 underline"
                    >
                      Invia un'altra richiesta
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-1">Nome</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-sage-50 border-none focus:ring-2 focus:ring-sage-300 outline-none transition-shadow" placeholder="Mario" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-1">Cognome</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-sage-50 border-none focus:ring-2 focus:ring-sage-300 outline-none transition-shadow" placeholder="Rossi" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-1">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-sage-50 border-none focus:ring-2 focus:ring-sage-300 outline-none transition-shadow" placeholder="mario@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-1">Nome e Razza dell'Animale</label>
                      <input type="text" name="petName" value={formData.petName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-sage-50 border-none focus:ring-2 focus:ring-sage-300 outline-none transition-shadow" placeholder="Bella, Golden Retriever" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-1">Motivo della Visita</label>
                      <select name="reason" value={formData.reason} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-sage-50 border-none focus:ring-2 focus:ring-sage-300 outline-none transition-shadow text-charcoal">
                        <option value="Visita di Controllo">Visita di Controllo</option>
                        <option value="Vaccinazioni">Vaccinazioni</option>
                        <option value="Visita per Malattia">Visita per Malattia</option>
                        <option value="Consulto Dentale">Consulto Dentale</option>
                        <option value="Altro">Altro</option>
                      </select>
                    </div>

                    {submitStatus === 'error' && (
                      <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 rounded-lg">
                        Si è verificato un errore durante l'invio della richiesta. Riprova più tardi.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sage-600 text-white font-medium py-4 rounded-xl hover:bg-sage-700 transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Invio in corso...
                        </>
                      ) : (
                        "Invia Richiesta"
                      )}
                    </button>
                    <p className="text-xs text-center text-charcoal/50 mt-4">
                      Ti chiameremo entro 24 ore per confermare l'orario del tuo appuntamento.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-sage-950 text-sage-400 py-12 border-t border-sage-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-sage-200">
            <Heart className="w-5 h-5" fill="currentColor" />
            <span className="font-serif text-xl font-semibold tracking-tight">
              Dr. Clara Paws
            </span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Clinica Veterinaria Dott.ssa Clara Paws. Tutti i diritti riservati.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-sage-200 transition-colors">Instagram</a>
            <a href="#" className="hover:text-sage-200 transition-colors">Facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
