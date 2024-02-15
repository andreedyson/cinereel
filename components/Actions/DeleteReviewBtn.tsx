"use client";

import { useState } from "react";
import DeleteConfirmation from "../Modal/DeleteConfirmation";
import { Button } from "../ui/button";
import { HiTrash } from "react-icons/hi2";

type Props = {
  user_id: string;
  review_id: string;
};

function DeleteReviewBtn({ user_id, review_id }: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Button
        variant={"destructive"}
        onClick={() => setOpenModal((prev) => !prev)}
      >
        <HiTrash size={20} />
      </Button>
      {openModal && (
        <DeleteConfirmation
          user_id={user_id}
          review_id={review_id}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default DeleteReviewBtn;
