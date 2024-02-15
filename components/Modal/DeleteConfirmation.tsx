import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { BASE_API_URL } from "@/index";

type Props = {
  user_id: string;
  review_id: string;
  onClose: () => void;
};

function DeleteConfirmation({ user_id, review_id, onClose }: Props) {
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${BASE_API_URL}/api/review`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          review_id: review_id,
        }),
      });

      const msg = await res.json();

      if (!res.ok) {
        toast({
          description: msg.message,
        });
        throw new Error("Failed to delete review");
      } else {
        toast({
          description: msg.message,
        });
        onClose();
        setDeleting(false);
        router.refresh();
      }
    } catch (error: any) {
      setDeleting(false);
      throw new Error(error);
    }
  };
  return (
    <div className="fixed inset-0 mx-4 flex items-center justify-center bg-black/80">
      <div className="flex w-[320px] flex-col justify-center gap-4 rounded-md bg-[#f8f8f8] p-4 text-black">
        <h2 className="text-center font-semibold">
          Are you sure you want to delete this review?
        </h2>
        <Button
          variant={"destructive"}
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
        <Button
          onClick={() => onClose()}
          className="bg-transparent text-black ring-2 ring-zinc-800 hover:text-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
