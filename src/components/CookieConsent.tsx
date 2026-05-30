import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'equinoxe_cookie_consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(COOKIE_CONSENT_KEY));
  }, []);

  const saveConsent = (value: 'accepted' | 'refused') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-6 sm:right-auto" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="max-w-md rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_24px_90px_rgba(14,27,41,0.18)]">
        <div className="grid gap-5">
          <div>
            <p id="cookie-title" className="font-serif text-xl font-semibold text-ink">
              Gestion des cookies
            </p>
            <p className="mt-2 text-sm leading-6 text-anthracite/75">
              Nous utilisons uniquement les cookies nécessaires au fonctionnement du site. Avec votre accord, des mesures anonymisées peuvent aider à améliorer l’expérience de navigation.
            </p>
            <Link to="/cookies" className="mt-3 inline-flex text-sm font-bold text-sage-dark hover:text-ink">
              Consulter la politique cookies
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => saveConsent('refused')}
              className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-sage-dark hover:text-sage-dark"
            >
              Refuser
            </button>
            <button
              type="button"
              onClick={() => saveConsent('accepted')}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-dark"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
