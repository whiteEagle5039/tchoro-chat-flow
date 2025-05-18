
export interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

export interface Option {
  id: string;
  text: string;
  nextStep: string;
}

export interface ChatStep {
  id: string;
  message: string;
  options: Option[];
}

export const chatFlow: Record<string, ChatStep> = {
  welcome: {
    id: "welcome",
    message: "Bonjour ! Je suis Tchoro, votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
    options: [
      { id: "info", text: "En savoir plus sur vos services", nextStep: "services" },
      { id: "help", text: "J'ai besoin d'aide", nextStep: "help" },
      { id: "pricing", text: "Informations sur les prix", nextStep: "pricing" }
    ]
  },
  services: {
    id: "services",
    message: "Nous proposons une variété de services. Lequel vous intéresse ?",
    options: [
      { id: "web", text: "Développement web", nextStep: "web_dev" },
      { id: "mobile", text: "Applications mobiles", nextStep: "mobile_app" },
      { id: "back", text: "Retourner au menu principal", nextStep: "welcome" }
    ]
  },
  web_dev: {
    id: "web_dev",
    message: "Notre équipe crée des sites web modernes, responsives et performants. Nous utilisons les dernières technologies comme React, Vue et Next.js.",
    options: [
      { id: "portfolio", text: "Voir le portfolio", nextStep: "portfolio" },
      { id: "contact", text: "Contacter un expert", nextStep: "contact" },
      { id: "back", text: "Retourner aux services", nextStep: "services" }
    ]
  },
  mobile_app: {
    id: "mobile_app",
    message: "Nous développons des applications mobiles natives et cross-platform pour iOS et Android, avec une expertise en React Native et Flutter.",
    options: [
      { id: "portfolio", text: "Voir le portfolio", nextStep: "portfolio" },
      { id: "contact", text: "Contacter un expert", nextStep: "contact" },
      { id: "back", text: "Retourner aux services", nextStep: "services" }
    ]
  },
  help: {
    id: "help",
    message: "Je suis là pour vous aider. Quelle est votre question ?",
    options: [
      { id: "technical", text: "Problème technique", nextStep: "technical" },
      { id: "account", text: "Question sur mon compte", nextStep: "account" },
      { id: "back", text: "Retourner au menu principal", nextStep: "welcome" }
    ]
  },
  technical: {
    id: "technical",
    message: "Pour les problèmes techniques, notre équipe de support est disponible 24/7. Comment préférez-vous être contacté ?",
    options: [
      { id: "email", text: "Par email", nextStep: "email_support" },
      { id: "phone", text: "Par téléphone", nextStep: "phone_support" },
      { id: "back", text: "Retourner à l'aide", nextStep: "help" }
    ]
  },
  email_support: {
    id: "email_support",
    message: "Merci ! Veuillez nous envoyer les détails de votre problème à support@tchoro.com. Un membre de notre équipe vous répondra dans les 24 heures.",
    options: [
      { id: "thanks", text: "Merci pour l'information", nextStep: "welcome" }
    ]
  },
  phone_support: {
    id: "phone_support",
    message: "Vous pouvez contacter notre équipe de support au 01 23 45 67 89 entre 9h et 18h, du lundi au vendredi.",
    options: [
      { id: "thanks", text: "Merci pour l'information", nextStep: "welcome" }
    ]
  },
  account: {
    id: "account",
    message: "Pour les questions concernant votre compte, veuillez préciser votre demande :",
    options: [
      { id: "password", text: "Réinitialiser mon mot de passe", nextStep: "password_reset" },
      { id: "billing", text: "Question de facturation", nextStep: "billing" },
      { id: "back", text: "Retourner à l'aide", nextStep: "help" }
    ]
  },
  password_reset: {
    id: "password_reset",
    message: "Pour réinitialiser votre mot de passe, rendez-vous sur la page de connexion et cliquez sur 'Mot de passe oublié'. Vous recevrez un email avec les instructions.",
    options: [
      { id: "thanks", text: "Merci pour l'information", nextStep: "welcome" }
    ]
  },
  billing: {
    id: "billing",
    message: "Pour les questions de facturation, veuillez contacter notre service client à billing@tchoro.com ou au 01 23 45 67 90.",
    options: [
      { id: "thanks", text: "Merci pour l'information", nextStep: "welcome" }
    ]
  },
  pricing: {
    id: "pricing",
    message: "Nos tarifs varient selon vos besoins spécifiques. Quel type de service vous intéresse ?",
    options: [
      { id: "web_pricing", text: "Développement web", nextStep: "web_pricing" },
      { id: "mobile_pricing", text: "Applications mobiles", nextStep: "mobile_pricing" },
      { id: "back", text: "Retourner au menu principal", nextStep: "welcome" }
    ]
  },
  web_pricing: {
    id: "web_pricing",
    message: "Les prix pour le développement web commencent à 5000€ pour un site vitrine et 10000€ pour une application web complète. Nous proposons également des forfaits mensuels de maintenance.",
    options: [
      { id: "quote", text: "Demander un devis personnalisé", nextStep: "quote" },
      { id: "back", text: "Voir d'autres prix", nextStep: "pricing" }
    ]
  },
  mobile_pricing: {
    id: "mobile_pricing",
    message: "Les prix pour le développement d'applications mobiles commencent à 8000€ pour une application simple et 15000€ pour une application complexe avec backend personnalisé.",
    options: [
      { id: "quote", text: "Demander un devis personnalisé", nextStep: "quote" },
      { id: "back", text: "Voir d'autres prix", nextStep: "pricing" }
    ]
  },
  quote: {
    id: "quote",
    message: "Merci de votre intérêt ! Pour recevoir un devis personnalisé, veuillez nous contacter à sales@tchoro.com avec les détails de votre projet.",
    options: [
      { id: "thanks", text: "Merci pour l'information", nextStep: "welcome" }
    ]
  },
  portfolio: {
    id: "portfolio",
    message: "Vous pouvez consulter notre portfolio à l'adresse www.tchoro.com/portfolio. Vous y trouverez nos projets récents et des études de cas.",
    options: [
      { id: "back", text: "Retourner au menu principal", nextStep: "welcome" }
    ]
  },
  contact: {
    id: "contact",
    message: "Un de nos experts vous contactera bientôt. Comment préférez-vous être contacté ?",
    options: [
      { id: "email_contact", text: "Par email", nextStep: "email_contact" },
      { id: "phone_contact", text: "Par téléphone", nextStep: "phone_contact" }
    ]
  },
  email_contact: {
    id: "email_contact",
    message: "Merci ! Veuillez nous fournir votre adresse email à contact@tchoro.com, et un expert vous contactera dans les 48 heures.",
    options: [
      { id: "back", text: "Retourner au menu principal", nextStep: "welcome" }
    ]
  },
  phone_contact: {
    id: "phone_contact",
    message: "Merci ! Veuillez nous laisser votre numéro de téléphone au 01 23 45 67 88, et un expert vous contactera dans les 48 heures.",
    options: [
      { id: "back", text: "Retourner au menu principal", nextStep: "welcome" }
    ]
  }
};
