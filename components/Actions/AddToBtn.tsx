"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { HiHeart } from "react-icons/hi2";
import { BASE_API_URL } from "@/index";

type Props = {
  user_id: string;
  movie: any;
  alreadyFavorited: any;
};

function AddToBtn({ user_id, movie, alreadyFavorited }: Props) {
  const router = useRouter();
  const handleClick = async () => {
    if (!user_id) {
      router.push("/login");
    }

    try {
      const res = await fetch(`${BASE_API_URL}/api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          movie_id: movie.id,
          movie_title: movie.title,
          movie_overview: movie.overview,
          movie_backdrop: movie.backdrop_path,
        }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  return (
    <Button
      className={`flex w-[170px] gap-2 border-2 border-red-500 ${
        !alreadyFavorited
          ? "bg-transparent duration-200 hover:bg-red-500"
          : "bg-red-500 hover:bg-transparent"
      }`}
      onClick={handleClick}
    >
      <HiHeart size={30} />
      {alreadyFavorited ? "Favorited" : "Add To Favorite"}
    </Button>
  );
}

export default AddToBtn;
