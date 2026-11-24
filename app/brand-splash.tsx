const splashStart = `
  (() => {
    if (location.pathname !== "/" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.dataset.brandIntro = "";
  })();
`;

export function BrandSplash({ signature }: { signature: string }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: splashStart }} />
      <div className="brand-splash" aria-hidden="true">
        <span className="splash-signature">{signature}</span>
      </div>
    </>
  );
}
