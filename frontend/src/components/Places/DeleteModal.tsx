import { Place } from "../../types";

type Props = {
  place: Place | null;
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({
  place,
  show,
  onCancel,
  onConfirm,
}: Props) {
  if (!show || !place) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
        <p className="mb-4">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{place.name}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
