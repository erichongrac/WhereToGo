"use client";

import { useEffect, useState } from "react";
import PlaceList from "../components/Places/PlaceList";
import ConfirmModal from "../components/Places/ConfirmModal";
import { Place } from "../types";

export default function Home() {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  useEffect(() => {
    fetch("http://localhost:7099/api/places")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch places");
        return res.json();
      })
      .then(setPlaces)
      .catch((err) => setError(err.message));
  }, []);

  const handleDeleteClick = (place: Place) => {
    setSelectedPlace(place);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPlace) return;
    try {
      const res = await fetch(
        `http://localhost:7099/api/places/${selectedPlace.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete place");
      setPlaces((prev) =>
        prev ? prev.filter((p) => p.id !== selectedPlace.id) : prev
      );
      setShowModal(false);
      setSelectedPlace(null);
    } catch (err: any) {
      setError(err.message);
      setShowModal(false);
      setSelectedPlace(null);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recommended Places</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!places && !error && <p>Loading...</p>}
      {places && (
        <PlaceList places={places} onDeleteClick={handleDeleteClick} />
      )}
      <ConfirmModal
        place={selectedPlace}
        show={showModal}
        onCancel={() => {
          setShowModal(false);
          setSelectedPlace(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}
