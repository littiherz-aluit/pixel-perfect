import { Link } from "@tanstack/react-router";

export function ComingSoon({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-site text-center">
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{subtitle}</p>
        <p className="mt-8 text-sm text-muted-foreground">Estamos terminando esta sección.</p>
        <Link to="/" className="btn btn-primary mt-6">Volver al inicio</Link>
      </div>
    </section>
  );
}
