import Script from "next/script";

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return null;

  return (
    <Script id="portfolio-analytics" strategy="afterInteractive">
      {`
        (() => {
          if (!["francisuzoigwe.me", "www.francisuzoigwe.me"].includes(location.hostname)) return;
          const id = ${JSON.stringify(measurementId)};
          window.dataLayer = window.dataLayer || [];
          function gtag() { window.dataLayer.push(arguments); }
          gtag("js", new Date());
          gtag("config", id, { allow_google_signals: false, allow_ad_personalization_signals: false });
          const script = document.createElement("script");
          script.async = true;
          script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
          document.head.appendChild(script);
        })();
      `}
    </Script>
  );
}
