import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0d1128', color: '#f8f5ff', fontFamily: 'DM Sans, sans-serif', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#7cf6d2', fontFamily: 'Space Mono, monospace', fontSize: 12, letterSpacing: '0.18em' }}>404</p>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 40, margin: '12px 0' }}>Page not found</h1>
        <Link href="/" style={{ color: '#7cf6d2' }}>Back home</Link>
      </div>
    </main>
  );
}
