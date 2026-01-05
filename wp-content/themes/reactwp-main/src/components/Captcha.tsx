import React, { useEffect, useRef } from "react";

export interface CaptchaProps {
  onVerify: (token: string) => void;
}

declare global {
  interface Window {
    grecaptcha: any;
    onCaptchaLoad: () => void;
  }
}

export const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      console.error(
        "reCAPTCHA site key is missing. Please set VITE_RECAPTCHA_SITE_KEY in your .env file.",
      );
      return;
    }

    // Check if script is already loaded
    if (window.grecaptcha && window.grecaptcha.render) {
      renderCaptcha();
    } else {
      // Load script
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onCaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.onCaptchaLoad = () => {
        renderCaptcha();
      };
    }

    return () => {
      // Cleanup if needed (grecaptcha doesn't have a destroy method easily accessible)
      window.onCaptchaLoad = () => {};
    };
  }, [siteKey]);

  const renderCaptcha = () => {
    if (captchaRef.current && widgetId.current === null && siteKey) {
      try {
        widgetId.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token);
          },
          "expired-callback": () => {
            onVerify("");
          },
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
      }
    }
  };

  if (!siteKey) {
    return (
      <div className="text-red-500 text-sm">reCAPTCHA configuration error</div>
    );
  }

  return <div ref={captchaRef} className="my-4 flex justify-center"></div>;
};
