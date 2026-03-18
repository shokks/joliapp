export type SupportedLocale = "en" | "de";

type TranslationTree = {
  welcome: {
    dayLabel: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  joliLogin: {
    title: string;
    subtitle: string;
    helper: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    continue: string;
    back: string;
    loading: string;
    errorMissingFields: string;
    errorInvalidEmail: string;
    errorWeakPassword: string;
  };
  klappConnect: {
    title: string;
    subtitle: string;
    helper: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    continue: string;
    back: string;
    connecting: string;
    connected: string;
    errorMissingFields: string;
    errorInvalidEmail: string;
    errorInvalidCredentials: string;
    errorConnectionFailed: string;
    recoveryTitle: string;
    recoveryBody: string;
  };
  firstSync: {
    title: string;
    subtitle: string;
    syncing: string;
    extracting: string;
    finalizing: string;
    emptyState: string;
    successTitle: string;
    successBody: string;
    retry: string;
    openDashboard: string;
    retrying: string;
    errorTitle: string;
    errorBody: string;
  };
  settings: {
    title: string;
    subtitle: string;
    account: string;
    klapp: string;
    preferences: string;
    joliAccount: string;
    beta: string;
    connected: string;
    active: string;
    reconnectRequired: string;
    reconnectDescription: string;
    appearance: string;
    language: string;
    automatic: string;
    english: string;
    german: string;
    connectionState: string;
    futurePreferences: string;
    futurePreferencesBody: string;
  };
};

export const translations: Record<SupportedLocale, TranslationTree> = {
  en: {
    welcome: {
      dayLabel: "Joli beta",
      title: "Welcome to Joli.",
      subtitle: "A calmer way to stay on top of family admin.",
      cta: "Continue",
    },
    joliLogin: {
      title: "Sign up for Joli.",
      subtitle: "Create your beta login.",
      helper: "We'll use this email for your Joli beta account only.",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@example.com",
      passwordPlaceholder: "Create a password",
      continue: "Continue",
      back: "Back",
      loading: "Creating your Joli beta access...",
      errorMissingFields: "Enter your name, email, and password to continue.",
      errorInvalidEmail: "Enter a valid email address.",
      errorWeakPassword: "Use at least 8 characters for your password.",
    },
    klappConnect: {
      title: "Connect Klapp.",
      subtitle: "Use your Klapp login.",
      helper: "Connecting Klapp lets Joli sync school messages and surface the tasks that matter.",
      emailPlaceholder: "parent@example.com",
      passwordPlaceholder: "Your Klapp password (not stored)",
      continue: "Connect Klapp",
      back: "Back",
      connecting: "Connecting Klapp...",
      connected: "Klapp connected. Preparing first sync...",
      errorMissingFields: "Enter your Klapp email and password to continue.",
      errorInvalidEmail: "Enter a valid Klapp email address.",
      errorInvalidCredentials: "Those Klapp details were not recognised. Check them and try again.",
      errorConnectionFailed: "Joli couldn't connect to Klapp right now. Try again in a moment.",
      recoveryTitle: "Need to reconnect?",
      recoveryBody: "If Klapp disconnects later, you'll come back here to refresh the connection safely.",
    },
    firstSync: {
      title: "Getting ready.",
      subtitle: "This takes a moment.",
      syncing: "Syncing messages",
      extracting: "Finding what needs attention",
      finalizing: "Preparing your dashboard",
      emptyState: "No urgent items yet. We'll still open your dashboard so you can look around.",
      successTitle: "First sync complete.",
      successBody: "Your first items are ready.",
      retry: "Retry sync",
      openDashboard: "Open dashboard",
      retrying: "Retrying sync...",
      errorTitle: "First sync needs another try.",
      errorBody: "We couldn't finish syncing messages this time.",
    },
    settings: {
      title: "Settings",
      subtitle: "Your Joli setup.",
      account: "Account",
      klapp: "Klapp",
      preferences: "Preferences",
      joliAccount: "Joli account",
      beta: "Beta",
      connected: "Connected",
      active: "Active",
      reconnectRequired: "Reconnect required",
      reconnectDescription: "Open onboarding to reconnect your Klapp account.",
      appearance: "Appearance",
      language: "Language",
      automatic: "Automatic",
      english: "English",
      german: "German",
      connectionState: "Connection state",
      futurePreferences: "Beta preferences",
      futurePreferencesBody: "Notification timing and extra controls will land here later.",
    },
  },
  de: {
    welcome: {
      dayLabel: "Joli Beta",
      title: "Willkommen bei Joli.",
      subtitle: "Ein ruhigerer Weg durch den Familienalltag.",
      cta: "Weiter",
    },
    joliLogin: {
      title: "Bei Joli anmelden.",
      subtitle: "Erstelle deinen Beta-Zugang.",
      helper: "Diese E-Mail nutzt Joli nur für deinen Beta-Zugang.",
      namePlaceholder: "Dein Name",
      emailPlaceholder: "du@beispiel.de",
      passwordPlaceholder: "Passwort erstellen",
      continue: "Weiter",
      back: "Zurück",
      loading: "Dein Joli-Beta-Zugang wird erstellt...",
      errorMissingFields: "Bitte Name, E-Mail und Passwort eingeben.",
      errorInvalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
      errorWeakPassword: "Bitte verwende mindestens 8 Zeichen für dein Passwort.",
    },
    klappConnect: {
      title: "Klapp verbinden.",
      subtitle: "Mit deinen Klapp-Zugangsdaten.",
      helper: "Mit der Klapp-Verbindung kann Joli Schulnachrichten synchronisieren und Wichtiges für dich herausfiltern.",
      emailPlaceholder: "eltern@beispiel.de",
      passwordPlaceholder: "Dein Klapp-Passwort (wird nicht gespeichert)",
      continue: "Klapp verbinden",
      back: "Zurück",
      connecting: "Klapp wird verbunden...",
      connected: "Klapp ist verbunden. Der erste Sync wird vorbereitet...",
      errorMissingFields: "Bitte Klapp-E-Mail und Passwort eingeben.",
      errorInvalidEmail: "Bitte gib eine gültige Klapp-E-Mail-Adresse ein.",
      errorInvalidCredentials: "Diese Klapp-Zugangsdaten wurden nicht erkannt. Bitte prüfe sie und versuche es erneut.",
      errorConnectionFailed: "Joli konnte Klapp gerade nicht verbinden. Bitte versuche es gleich noch einmal.",
      recoveryTitle: "Neu verbinden?",
      recoveryBody: "Falls Klapp später getrennt wird, landest du wieder hier und kannst die Verbindung sicher erneuern.",
    },
    firstSync: {
      title: "Es geht los.",
      subtitle: "Das dauert nur einen Moment.",
      syncing: "Nachrichten werden synchronisiert",
      extracting: "Wichtige Aufgaben werden erkannt",
      finalizing: "Dein Dashboard wird vorbereitet",
      emptyState: "Noch keine dringenden Punkte. Wir öffnen trotzdem dein Dashboard, damit du dich umsehen kannst.",
      successTitle: "Erster Sync abgeschlossen.",
      successBody: "Deine ersten Einträge sind bereit.",
      retry: "Sync erneut starten",
      openDashboard: "Dashboard öffnen",
      retrying: "Sync wird erneut gestartet...",
      errorTitle: "Der erste Sync braucht einen neuen Versuch.",
      errorBody: "Dieses Mal konnten wir die Nachrichten nicht vollständig synchronisieren.",
    },
    settings: {
      title: "Einstellungen",
      subtitle: "Dein Joli-Setup.",
      account: "Konto",
      klapp: "Klapp",
      preferences: "Präferenzen",
      joliAccount: "Joli-Konto",
      beta: "Beta",
      connected: "Verbunden",
      active: "Aktiv",
      reconnectRequired: "Erneut verbinden",
      reconnectDescription: "Öffne das Onboarding, um dein Klapp-Konto neu zu verbinden.",
      appearance: "Darstellung",
      language: "Sprache",
      automatic: "Automatisch",
      english: "Englisch",
      german: "Deutsch",
      connectionState: "Verbindungsstatus",
      futurePreferences: "Beta-Präferenzen",
      futurePreferencesBody: "Benachrichtigungszeiten und weitere Einstellungen kommen später hierhin.",
    },
  },
};
