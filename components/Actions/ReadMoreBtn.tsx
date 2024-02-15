"use client";
import React, { useState } from "react";

const ReadMoreBtn = ({ text }: { text: string }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div onClick={toggleShowMore} className="cursor-pointer">
      {showMore ? (
        <div>
          <p>{text}</p>
          <p className="font-semibold underline">Hide</p>
        </div>
      ) : (
        <div>
          <p className="line-clamp-4">{text.slice(0, 200)}</p>
          <p className="font-semibold underline">Read More</p>
        </div>
      )}
    </div>
  );
};

export default ReadMoreBtn;
