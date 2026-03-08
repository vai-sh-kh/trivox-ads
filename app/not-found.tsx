import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight mb-4">
        404
      </h1>
      <p className="text-zinc-600 text-lg mb-8 text-center">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-brand-purple text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-purple-900 transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
