"use client";

import { useState } from "react";
import { HiStar } from "react-icons/hi";

type Props = {
  initialRating?: number;
  onRatingChange: (rating: number) => void;
};

function StarRating({ initialRating = 0, onRatingChange }: Props) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(initialRating);

  // Handle rating from parent component
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => handleRatingClick(currentRating)}
              className="hidden"
            />
            <HiStar
              size={30}
              color={
                currentRating <= (hoveredStar ?? rating)
                  ? "#ffc107" // Yellow color for filled stars
                  : "#e4e5e9" // Gray color for empty stars
              }
              className="cursor-pointer"
              onMouseEnter={() => setHoveredStar(currentRating)}
              onMouseLeave={() => setHoveredStar(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
