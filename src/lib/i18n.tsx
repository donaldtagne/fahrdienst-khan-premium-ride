import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "de" | "en";

type Dict = Record<string, string>;

export const translations: Record<Lang, Dict> = {
  de: {
    "nav.home": "Startseite",
    "nav.services": "Leistungen",
    "nav.about": "Über uns",
    "nav.contact": "Kontakt",
    "nav.book": "Jetzt buchen",
    "cta.call": "Jetzt anrufen",
    "cta.whatsapp": "WhatsApp",
    "cta.book": "Fahrt anfragen",

    "hero.eyebrow": "Premium Fahrdienst · Frankenthal",
    "hero.title": "Premium Fahrservice für höchste Ansprüche",
    "hero.subtitle":
      "Flughafentransfer · Business Travel · Krankenfahrten · Privater Chauffeurdienst. Diskret, pünktlich und kompromisslos exklusiv in Frankenthal und Rhein-Neckar.",
    "hero.trust1": "24/7 verfügbar",
    "hero.trust2": "Festpreisgarantie",
    "hero.trust3": "Uber Partner",
    "hero.scroll": "Entdecken",

    "services.title": "Unsere Leistungen",
    "services.subtitle": "Maßgeschneiderte Mobilität für jeden Anlass",
    "service.airport.title": "Flughafentransfer",
    "service.airport.desc":
      "Pünktliche Transfers zu allen Flughäfen – Frankfurt, Stuttgart, Hahn und mehr. Inklusive Flugüberwachung.",
    "service.medical.title": "Krankenfahrten",
    "service.medical.desc":
      "Sichere und komfortable Beförderung zu Arzt, Klinik oder Therapie. Erfahrene Fahrer, ruhige Fahrweise.",
    "service.courier.title": "Kurier- und Botenfahrten",
    "service.courier.desc":
      "Schnelle und diskrete Beförderung wichtiger Dokumente und Pakete in der gesamten Region.",
    "service.private.title": "Private Personenbeförderung",
    "service.private.desc":
      "Hochzeiten, Events, Stadtfahrten – wir bringen Sie stilvoll und sicher ans Ziel.",
    "service.business.title": "Firmenfahrten",
    "service.business.desc":
      "Repräsentative Geschäftsfahrten für Sie und Ihre Gäste. Rechnungsstellung möglich.",
    "service.corporate.title": "Corporate Transport",
    "service.corporate.desc":
      "Maßgeschneiderte Mobilitätslösungen für Unternehmen, Konferenzen und Delegationen. Auf Wunsch mit Rahmenvertrag.",

    "service.howTitle": "So läuft das ab",
    "service.detailsHint": "Klicken für Details",
    "service.ctaCall": "Jetzt anrufen",
    "service.ctaWhatsapp": "Per WhatsApp anfragen",
    "service.airport.how":
      "Sie nennen uns Flugnummer, Abflug-/Ankunftsort und Personenanzahl. Wir überwachen Ihren Flug in Echtzeit und passen die Abholzeit automatisch an Verspätungen an. Empfang mit Namensschild am Terminal möglich, Hilfe beim Gepäck inklusive. Pünktliche Ankunft mit Zeitpuffer für Check-in.",
    "service.medical.how":
      "Nach Ihrer Buchung holen wir Sie pünktlich zu Hause ab – auch mit Rollator oder Gehhilfe. Ruhige, vorausschauende Fahrweise, Begleitung bis in die Praxis auf Wunsch. Wir warten während des Termins und bringen Sie sicher zurück. Abrechnung direkt mit der Krankenkasse nach Genehmigung möglich.",
    "service.courier.how":
      "Sie melden uns Abhol- und Zielort sowie gewünschte Zeit. Wir holen das Dokument oder Paket diskret ab, transportieren es direkt – ohne Zwischenstopp – und übergeben es persönlich beim Empfänger. Auf Wunsch mit Foto-Nachweis der Übergabe und Unterschrift.",
    "service.private.how":
      "Wir besprechen Anlass, Strecke und Zeitplan im Voraus. Saubere Limousine, formell gekleideter Fahrer, Wasser an Bord. Für Hochzeiten und Events koordinieren wir uns mit Ihrem Ablaufplan. Warte- und Mehrfachfahrten möglich, transparenter Festpreis vorab.",
    "service.business.how":
      "Einmalige Fahrt oder regelmäßige Termine – wir nehmen Ihre Anfrage per Telefon, WhatsApp oder E-Mail entgegen. Pünktliche Abholung am Büro, Hotel oder Bahnhof. Diskreter Fahrer, ruhiges Arbeiten im Fahrzeug möglich. Monatliche Sammelrechnung mit ausgewiesener MwSt.",
    "service.corporate.how":
      "Wir erstellen ein individuelles Angebot für Ihr Unternehmen: feste Konditionen, priorisierte Verfügbarkeit, mehrere Fahrzeuge bei Bedarf. Eigener Ansprechpartner, Fahrtenbuch, monatliche Reporting-Übersicht. Auch für Konferenzen, Shuttle-Dienste und Delegationen.",

    "about.eyebrow": "Über Fahrdienst Khan",
    "about.title": "Ihr lokaler Premium-Fahrdienst in Frankenthal",
    "about.p1":
      "Fahrdienst Khan steht für zuverlässige, professionelle und kundenorientierte Mobilität. Seit Jahren bringen wir Menschen sicher, pünktlich und entspannt ans Ziel – ob zum Flughafen, zum Arzt oder zum geschäftlichen Termin.",
    "about.p2":
      "Als ortskundiger Fahrdienst in Frankenthal und der gesamten Metropolregion Rhein-Neckar legen wir Wert auf Diskretion, Sauberkeit und eine angenehme Atmosphäre an Bord.",
    "about.stat1": "Jahre Erfahrung",
    "about.stat2": "Zufriedene Kunden",
    "about.stat3": "Tage erreichbar",
    "about.stat4": "Erfolgreiche Fahrten",

    "why.title": "Warum Fahrdienst Khan",
    "why.subtitle": "Eine Klasse für sich",

    "fleet.title": "Unsere Flotte",
    "fleet.subtitle": "Diskret. Komfortabel. Repräsentativ.",
    "fleet.desc": "Sorgfältig gepflegte Premium-Fahrzeuge mit hochwertigem Lederinterieur, Klimatisierung und Ambientebeleuchtung – für ein Reiseerlebnis auf Top-Niveau.",

    "booking.title": "Schnelle Fahrtanfrage",
    "booking.subtitle": "Innerhalb weniger Minuten erhalten Sie ein Angebot",
    "booking.pickup": "Abholort",
    "booking.destination": "Zielort",
    "booking.date": "Datum",
    "booking.time": "Uhrzeit",
    "booking.passengers": "Personen",
    "booking.phone": "Telefonnummer",
    "booking.name": "Ihr Name",
    "booking.notes": "Anmerkungen",
    "booking.submit": "Anfrage senden",
    "booking.success": "Anfrage gesendet! Wir melden uns in Kürze bei Ihnen.",
    "booking.email": "E-Mail (optional)",
    "booking.reserved": "Reservierung erfolgreich!",
    "booking.reservedDesc": "Bewahren Sie den Link unten auf – damit können Sie Ihre Fahrt einsehen oder bis 24 Stunden vor Abholung kostenlos stornieren.",
    "booking.yourLink": "Ihr persönlicher Link",
    "booking.copyLink": "Link kopieren",
    "booking.copied": "Kopiert!",
    "booking.openLink": "Reservierung ansehen",
    "booking.alsoWhatsapp": "Zusätzlich per WhatsApp senden",
    "booking.error": "Fehler beim Senden. Bitte versuchen Sie es erneut.",

    "res.title": "Ihre Reservierung",
    "res.status.pending": "Bestätigung ausstehend",
    "res.status.confirmed": "Bestätigt",
    "res.status.cancelled": "Storniert",
    "res.cancelBtn": "Reservierung stornieren",
    "res.cancelConfirm": "Möchten Sie diese Fahrt wirklich stornieren?",
    "res.cancelled": "Ihre Reservierung wurde storniert.",
    "res.cancelTooLate": "Stornierung nur bis 24 Stunden vor Abholung möglich. Bitte rufen Sie uns an.",
    "res.callUs": "Anrufen",
    "res.notFound": "Reservierung nicht gefunden.",
    "res.backHome": "Zur Startseite",
    "res.created": "Reserviert am",

    "admin.title": "Reservierungen",
    "admin.loginTitle": "Admin-Zugang",
    "admin.loginDesc": "Geben Sie Ihren PIN ein, um die Reservierungen zu verwalten.",
    "admin.pinPlaceholder": "PIN eingeben",
    "admin.enter": "Zugang",
    "admin.logout": "Abmelden",
    "admin.authError": "Ungültiger PIN. Bitte versuchen Sie es erneut.",
    "admin.noReservations": "Keine Reservierungen vorhanden.",
    "admin.statusUpdated": "Status aktualisiert.",
    "admin.confirm": "Bestätigen",
    "admin.cancel": "Stornieren",
    "admin.pending": "Ausstehend",
    "admin.viewDetails": "Details ansehen",
    "admin.filter.all": "Alle",
    "admin.filter.pending": "Ausstehend",
    "admin.filter.confirmed": "Bestätigt",
    "admin.filter.cancelled": "Storniert",

    "contact.title": "Kontakt",
    "contact.subtitle": "Wir sind 24/7 für Sie erreichbar",
    "contact.address": "Adresse",
    "contact.phone": "Telefon",
    "contact.write": "Nachricht schreiben",
    "contact.message": "Ihre Nachricht",
    "contact.send": "Nachricht senden",

    "faq.title": "Häufige Fragen",
    "faq.q1": "Wie weit im Voraus muss ich buchen?",
    "faq.a1": "Wir empfehlen mindestens 24 Stunden im Voraus, kurzfristige Buchungen sind je nach Verfügbarkeit ebenfalls möglich.",
    "faq.q2": "Welche Zahlungsmöglichkeiten gibt es?",
    "faq.a2": "Bar, EC-Karte und auf Anfrage Rechnung für Geschäftskunden.",
    "faq.q3": "Fahren Sie auch nachts?",
    "faq.a3": "Ja, wir sind 24 Stunden am Tag, 7 Tage die Woche für Sie da.",
    "faq.q4": "Welche Gebiete bedienen Sie?",
    "faq.a4": "Frankenthal und die gesamte Metropolregion Rhein-Neckar, sowie deutschlandweite Fahrten auf Anfrage.",

    "reviews.title": "Was unsere Kunden sagen",
    "review1": "Absolut pünktlich und super freundlich. Ich werde Fahrdienst Khan immer wieder gerne nutzen!",
    "review2": "Sehr sauberes Fahrzeug, angenehme Fahrt zum Flughafen Frankfurt. Volle Empfehlung.",
    "review3": "Professionell, diskret und zuverlässig – genau was man von einem guten Fahrdienst erwartet.",

    "footer.tagline": "Ihr Premium-Fahrdienst in Frankenthal",
    "footer.legal": "Rechtliches",
    "footer.impressum": "Impressum",
    "footer.privacy": "Datenschutz",
    "footer.payment": "Zahlungsarten",
    "footer.rights": "Alle Rechte vorbehalten.",

    "page.services.title": "Unsere Leistungen – Fahrdienst Khan Frankenthal",
    "page.about.title": "Über uns – Fahrdienst Khan",
    "page.contact.title": "Kontakt – Fahrdienst Khan",
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.book": "Book now",
    "cta.call": "Call now",
    "cta.whatsapp": "WhatsApp",
    "cta.book": "Request ride",

    "hero.eyebrow": "Premium Chauffeur · Frankenthal",
    "hero.title": "Premium Transportation Beyond Expectations",
    "hero.subtitle":
      "Airport Transfers · Business Travel · Medical Transport · Private Chauffeur Service. Discreet, punctual and uncompromisingly exclusive across Frankenthal and Rhine-Neckar.",
    "hero.trust1": "Available 24/7",
    "hero.trust2": "Fixed price guarantee",
    "hero.trust3": "Uber Partner",
    "hero.scroll": "Explore",

    "services.title": "Our Services",
    "services.subtitle": "Tailored mobility for every occasion",
    "service.airport.title": "Airport Transfer",
    "service.airport.desc":
      "Punctual transfers to all airports – Frankfurt, Stuttgart, Hahn and more. Flight monitoring included.",
    "service.medical.title": "Medical Transport",
    "service.medical.desc":
      "Safe and comfortable transport to doctors, clinics or therapy. Experienced drivers, smooth ride.",
    "service.courier.title": "Courier Services",
    "service.courier.desc":
      "Fast and discreet delivery of important documents and packages throughout the region.",
    "service.private.title": "Private Transport",
    "service.private.desc":
      "Weddings, events, city rides – we take you to your destination in style and safety.",
    "service.business.title": "Business Transport",
    "service.business.desc":
      "Representative business rides for you and your guests. Invoicing available.",
    "service.corporate.title": "Corporate Transportation",
    "service.corporate.desc":
      "Tailored mobility solutions for companies, conferences and delegations. Framework contracts available on request.",

    "service.howTitle": "How it works",
    "service.detailsHint": "Click for details",
    "service.ctaCall": "Call now",
    "service.ctaWhatsapp": "Ask via WhatsApp",
    "service.airport.how":
      "You share your flight number, pickup/drop-off and number of passengers. We track your flight in real time and adjust the pickup time automatically for delays. Meet & greet with name sign at the terminal on request, luggage assistance included. We arrive with a buffer for check-in.",
    "service.medical.how":
      "After booking we pick you up on time at your home – also with walker or walking aid. Smooth, anticipatory driving, accompaniment into the practice on request. We wait during the appointment and bring you safely back. Direct billing with your health insurance possible after approval.",
    "service.courier.how":
      "You tell us pickup and destination plus the desired time. We collect your document or parcel discreetly, transport it directly – no stops – and hand it over in person to the recipient. Photo proof of delivery and signature available on request.",
    "service.private.how":
      "We discuss occasion, route and schedule in advance. Clean premium car, formally dressed driver, water on board. For weddings and events we align with your timeline. Waiting time and multi-stop rides possible, transparent flat price upfront.",
    "service.business.how":
      "Single ride or recurring appointments – we take your request via phone, WhatsApp or email. On-time pickup at the office, hotel or train station. Discreet driver, quiet workspace inside the car. Monthly consolidated invoice with VAT.",
    "service.corporate.how":
      "We create an individual offer for your company: fixed terms, prioritised availability, multiple vehicles on demand. Dedicated contact, ride logs, monthly reporting overview. Also for conferences, shuttle services and delegations.",

    "about.eyebrow": "About Fahrdienst Khan",
    "about.title": "Your local premium chauffeur in Frankenthal",
    "about.p1":
      "Fahrdienst Khan stands for reliable, professional and customer-focused mobility. For years we have been taking people safely, punctually and comfortably to their destinations – whether to the airport, the doctor or a business meeting.",
    "about.p2":
      "As a local chauffeur service in Frankenthal and the entire Rhine-Neckar metropolitan region, we value discretion, cleanliness and a pleasant atmosphere on board.",
    "about.stat1": "Years of experience",
    "about.stat2": "Satisfied customers",
    "about.stat3": "Days available",
    "about.stat4": "Successful trips",

    "why.title": "Why Fahrdienst Khan",
    "why.subtitle": "In a class of its own",

    "fleet.title": "Our Fleet",
    "fleet.subtitle": "Discreet. Comfortable. Representative.",
    "fleet.desc": "Carefully maintained premium vehicles with high-end leather interior, climate control and ambient lighting – for a top-tier travel experience.",

    "booking.title": "Fast booking request",
    "booking.subtitle": "Receive a quote within minutes",
    "booking.pickup": "Pickup location",
    "booking.destination": "Destination",
    "booking.date": "Date",
    "booking.time": "Time",
    "booking.passengers": "Passengers",
    "booking.phone": "Phone number",
    "booking.name": "Your name",
    "booking.notes": "Notes",
    "booking.submit": "Send request",
    "booking.success": "Request sent! We will contact you shortly.",
    "booking.email": "Email (optional)",
    "booking.reserved": "Reservation confirmed!",
    "booking.reservedDesc": "Save the link below — use it to view your trip or cancel for free up to 24 hours before pickup.",
    "booking.yourLink": "Your personal link",
    "booking.copyLink": "Copy link",
    "booking.copied": "Copied!",
    "booking.openLink": "View reservation",
    "booking.alsoWhatsapp": "Also send via WhatsApp",
    "booking.error": "Something went wrong. Please try again.",

    "res.title": "Your reservation",
    "res.status.pending": "Awaiting confirmation",
    "res.status.confirmed": "Confirmed",
    "res.status.cancelled": "Cancelled",
    "res.cancelBtn": "Cancel reservation",
    "res.cancelConfirm": "Are you sure you want to cancel this trip?",
    "res.cancelled": "Your reservation has been cancelled.",
    "res.cancelTooLate": "Cancellation only possible up to 24 hours before pickup. Please call us.",
    "res.callUs": "Call us",
    "res.notFound": "Reservation not found.",
    "res.backHome": "Back to home",
    "res.created": "Booked on",

    "contact.title": "Contact",
    "contact.subtitle": "We are available 24/7",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.write": "Send a message",
    "contact.message": "Your message",
    "contact.send": "Send message",

    "faq.title": "Frequently Asked Questions",
    "faq.q1": "How far in advance do I need to book?",
    "faq.a1": "We recommend at least 24 hours in advance, but short-notice bookings are also possible subject to availability.",
    "faq.q2": "What payment options are available?",
    "faq.a2": "Cash, debit card and invoicing on request for business clients.",
    "faq.q3": "Do you operate at night?",
    "faq.a3": "Yes, we are available 24 hours a day, 7 days a week.",
    "faq.q4": "Which areas do you serve?",
    "faq.a4": "Frankenthal and the entire Rhine-Neckar metropolitan region, plus Germany-wide trips on request.",

    "reviews.title": "What our customers say",
    "review1": "Always on time and super friendly. I will keep using Fahrdienst Khan!",
    "review2": "Very clean vehicle, pleasant ride to Frankfurt Airport. Highly recommended.",
    "review3": "Professional, discreet and reliable – exactly what you expect from a great chauffeur service.",

    "footer.tagline": "Your premium chauffeur in Frankenthal",
    "footer.legal": "Legal",
    "footer.impressum": "Imprint",
    "footer.privacy": "Privacy",
    "footer.payment": "Payment methods",
    "footer.rights": "All rights reserved.",

    "page.services.title": "Our Services – Fahrdienst Khan Frankenthal",
    "page.about.title": "About us – Fahrdienst Khan",
    "page.contact.title": "Contact – Fahrdienst Khan",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "de" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  const t = (key: string) => translations[lang][key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export const CONTACT = {
  name: "Fahrdienst Khan",
  phone: "+49 174 3262459",
  phoneHref: "+491743262459",
  whatsapp: "491743262459",
  address: "Kaulaverling 33, 67227 Frankenthal, Deutschland",
  email: "info@fahrdienst-khan.de",
};