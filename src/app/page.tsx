import Link from 'next/link';

export default function Home() {
  return (
    <main style={{padding:24,fontFamily:'system-ui'}}>
      <h1>Checkin App</h1>
      <p><Link href="/login">Sign in</Link> or go to <Link href="/dashboard">Dashboard</Link>.</p>
    </main>
  );
}