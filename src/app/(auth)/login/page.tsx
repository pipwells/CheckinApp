'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{maxWidth:480, margin:'80px auto', fontFamily:'system-ui'}}>
      <h1>Sign in</h1>
      <form method="post" action="/api/auth/callback/credentials">
        <input type="hidden" name="csrfToken" value="" />
        <div>
          <label>Email</label>
          <input name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}