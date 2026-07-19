import { Link } from 'wouter';
import { company } from '@/data/company';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-navy px-5 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-frost">Erro 404</p>
      <h1 className="mt-4 font-serif text-4xl font-semibold">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-frost/80">
        O endereço acessado não existe ou foi movido. Volte para a página inicial da{' '}
        {company.name}.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-white px-6 py-3 font-semibold text-navy transition-colors hover:bg-frost"
      >
        Ir para o início
      </Link>
    </main>
  );
}
