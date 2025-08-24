import { useEffect, useState } from "react";
import { Place } from "../../types";

type Props = {
  place: Place | null;
  show: boolean;
  onCancel: () => void;
  onConfirm: (updated: Place) => void;
};

export default function UpdateModal({
  place,
  show,
  onCancel,
  onConfirm,
}: Props) {
  const [form, setForm] = useState<Place | null>(place);

  // Prefill form when modal opens or place changes
  useEffect(() => {
    setForm(place);
  }, [place, show]);

  if (!show || !place) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-bold mb-2">Update Place</h3>
        <div className="mb-4 flex flex-col gap-2">
          <input
            name="name"
            value={form?.name ?? ""}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Name"
          />
          <textarea
            name="description"
            value={form?.description ?? ""}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Description"
          />
          <input
            name="address"
            value={form?.address ?? ""}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Address"
          />
          <input
            name="city"
            value={form?.city ?? ""}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="City"
          />
          <input
            name="country"
            value={form?.country ?? ""}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Country"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => form && onConfirm(form)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
