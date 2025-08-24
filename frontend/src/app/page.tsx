"use client";

import { useEffect, useState } from "react";
import PlaceList from "../components/Places/PlaceList";
import DeleteModal from "../components/Places/DeleteModal";
import UpdateModal from "../components/Places/UpdateModal";
import AddModal from "../components/Places/AddModal";
import { Place } from "../types";

export default function Home() {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
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

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddConfirm = async (
    newPlace: Omit<Place, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const res = await fetch("http://localhost:7099/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlace),
      });
      if (!res.ok) throw new Error("Failed to add place");
      const created = await res.json();
      setPlaces((prev) => (prev ? [...prev, created] : [created]));
      setShowAddModal(false);
    } catch (err: any) {
      setError(err.message);
      setShowAddModal(false);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recommended Places</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleAddClick}
      >
        Add Place
      </button>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!places && !error && <p>Loading...</p>}
      {places && (
        <PlaceList
          places={places}
          onDeleteClick={handleDeleteClick}
          onUpdateClick={handleUpdateClick}
        />
      )}
      <DeleteModal
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
      <AddModal
        show={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onConfirm={handleAddConfirm}
      />
    </main>
  );
}
