export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-ink-faint font-mono">
          © {new Date().getFullYear()} Luis Antonio Sanches Dias
        </p>
        <p className="text-xs text-ink-faint font-mono">Rio Branco — Acre, Brasil</p>
      </div>
    </footer>
  );
}
