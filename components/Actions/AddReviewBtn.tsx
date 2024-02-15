"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReviewModal from "../Modal/ReviewModal";
import { Button } from "../ui/button";

type Props = {
  user_id: string;
  movie: any;
  alreadyReviewed: any;
};

function AddReviewBtn({ user_id, movie, alreadyReviewed }: Props) {
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
      <Button
        className={`flex w-[170px] gap-2 bg-transparent ring-2 duration-300 ${
          !alreadyReviewed
            ? "ring-orange-500 hover:bg-orange-500"
            : "bg-orange-500 ring-0"
        }`}
        onClick={handleClick}
      >
        {alreadyReviewed ? "Reviewed" : "Add Review"}
      </Button>
      {openModal && (
        <ReviewModal
          user_id={user_id}
          movie={movie}
          isVisible={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default AddReviewBtn;
