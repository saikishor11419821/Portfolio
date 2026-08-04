export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-void" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--color-void)]" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 85% 15%, rgba(176,107,255,0.06), transparent 60%)",
        }}
      />
    </div>
  );
}
