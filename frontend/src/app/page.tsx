'use client';

import { useEffect, useState } from 'react';

type Place = {
  id: number;
  name: string;
  city: string;
  country: string;
  address: string;
  description?: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:7099/api/places')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch places');
        return res.json();
      })
      .then(setPlaces)
      .catch(err => setError(err.message));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recommended Places</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!places && !error && <p>Loading...</p>}
      {places && (
        <ul className="space-y-4">
          {places.map(place => (
            <li key={place.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{place.name}</h2>
              <p className="text-gray-700">{place.description}</p>
              <p className="text-sm text-gray-500">
                {place.address}, {place.city}, {place.country}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
