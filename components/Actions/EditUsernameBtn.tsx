"use client";

import { useState } from "react";
import EditUsername from "../Modal/EditUsername";
import { HiPencilSquare } from "react-icons/hi2";

type Props = {
  user_id: string;
  initialUsername: string;
};

function EditUsernameBtn({ user_id, initialUsername }: Props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="cursor-pointer">
      <HiPencilSquare size={20} onClick={() => setOpenModal((prev) => !prev)} />
      {openModal && (
        <EditUsername
          user_id={user_id}
          initialUsername={initialUsername}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default EditUsernameBtn;
