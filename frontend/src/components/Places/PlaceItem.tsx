import { Place } from "../../types";

type Props = {
  place: Place;
  onDeleteClick: (place: Place) => void;
};

export default function PlaceItem({ place, onDeleteClick }: Props) {
  return (
    <li className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{place.name}</h2>
      <p className="text-gray-700">{place.description}</p>
      <p className="text-sm text-gray-500">
        {place.address}, {place.city}, {place.country}
      </p>
      <button
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => onDeleteClick(place)}
      >
        Delete
      </button>
    </li>
  );
}
