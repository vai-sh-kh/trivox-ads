import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-white flex flex-col items-center justify-center px-4 py-8 safe-area-bottom">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black uppercase tracking-tight mb-3 sm:mb-4">
        404
      </h1>
      <p className="text-zinc-600 text-base sm:text-lg mb-6 sm:mb-8 text-center max-w-sm">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center min-h-[44px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-sm uppercase tracking-widest bg-brand-purple text-white hover:bg-purple-900 transition-colors active:scale-[0.98]"
      >
        Back to home
      </Link>
    </main>
  );
}
