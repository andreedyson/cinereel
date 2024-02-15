"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EditReview from "../Modal/EditReview";
import { Button } from "../ui/button";
import { HiPencilSquare } from "react-icons/hi2";

type Props = {
  user_id: string;
  review_id: string;
  initialText: string;
  initialRating: number;
};

function EditReviewBtn({
  user_id,
  review_id,
  initialText,
  initialRating,
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    if (!user_id) {
      router.push("/login");
    }

    setOpenModal((prev) => !prev);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <HiPencilSquare size={20} />
      </Button>
      {openModal && (
        <EditReview
          user_id={user_id}
          review_id={review_id}
          initialText={initialText}
          initialRating={initialRating}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default EditReviewBtn;
