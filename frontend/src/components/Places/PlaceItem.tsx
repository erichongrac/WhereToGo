import { Place } from "../../types";

type Props = {
  place: Place;
  onDeleteClick: (place: Place) => void;
  onUpdateClick: (place: Place) => void;
};

export default function PlaceItem({
  place,
  onDeleteClick,
  onUpdateClick,
}: Props) {
  return (
    <li className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{place.name}</h2>
      <p className="text-gray-700">{place.description}</p>
      <p className="text-sm text-gray-500">
        {place.address}, {place.city}, {place.country}
      </p>
      <div className="flex gap-2 mt-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onUpdateClick(place)}
        >
          Update
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => onDeleteClick(place)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
