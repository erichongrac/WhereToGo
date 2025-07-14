'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    //fetch('https://localhost:7099/hello')
    fetch('https://demo-backend-app.azurewebsites.net/hello')
      .then(res => res.text())
      .then(setMessage)
      .catch(err => setMessage('Error: ' + err.message));
  }, []);

  return (
    <main>
      <h1>Backend Message</h1>
      <p>{message}</p>
    </main>
  );
}
