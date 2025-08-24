"use client";

import { useEffect, useState } from "react";

import { Place } from "../types";
import PlaceList from "@/components/Places/PlaceList";
import ConfirmModal from "@/components/Places/ConfirmModal";
import UpdateModal from "@/components/Places/UpdateModal";

export default function Home() {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
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
    setShowDeleteModal(true);
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
      setShowDeleteModal(false);
      setSelectedPlace(null);
    } catch (err: any) {
      setError(err.message);
      setShowDeleteModal(false);
      setSelectedPlace(null);
    }
  };

  const handleUpdateClick = (place: Place) => {
    setSelectedPlace(place);
    setShowUpdateModal(true);
  };

  const handleUpdateConfirm = async (updated: Place) => {
    try {
      const res = await fetch(
        `http://localhost:7099/api/places/${updated.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );
      if (!res.ok) throw new Error("Failed to update place");
      setPlaces((prev) =>
        prev ? prev.map((p) => (p.id === updated.id ? updated : p)) : prev
      );
      setShowUpdateModal(false);
      setSelectedPlace(null);
    } catch (err: any) {
      setError(err.message);
      setShowUpdateModal(false);
      setSelectedPlace(null);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recommended Places</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!places && !error && <p>Loading...</p>}
      {places && (
        <PlaceList
          places={places}
          onDeleteClick={handleDeleteClick}
          onUpdateClick={handleUpdateClick}
        />
      )}
      <ConfirmModal
        place={selectedPlace}
        show={showDeleteModal}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedPlace(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
      <UpdateModal
        place={selectedPlace}
        show={showUpdateModal}
        onCancel={() => {
          setShowUpdateModal(false);
          setSelectedPlace(null);
        }}
        onConfirm={handleUpdateConfirm}
      />
    </main>
  );
}
