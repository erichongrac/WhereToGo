import PlaceItem from "./PlaceItem";
import { Place } from "../../types";

type Props = {
  places: Place[];
  onDeleteClick: (place: Place) => void;
};

export default function PlaceList({ places, onDeleteClick }: Props) {
  return (
    <ul className="space-y-4">
      {places.map((place) => (
        <PlaceItem key={place.id} place={place} onDeleteClick={onDeleteClick} />
      ))}
    </ul>
  );
}
