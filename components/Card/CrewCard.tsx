import Image from "next/image";
import getImagePath from "@/lib/getImagePath";
import { MovieCredits } from "@/typings";

type Props = {
  credits: MovieCredits;
};

function CrewCard({ credits }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {credits.cast.slice(0, 8).map((cast) => (
        <div
          key={cast.id}
          className="flex items-center gap-2 rounded-lg bg-zinc-800"
        >
          <Image
            src={getImagePath(cast.profile_path) || "/assets/no-profile.png"}
            alt={cast.original_name}
            width={300}
            height={100}
            className="h-20 w-20 rounded-l-lg object-cover md:h-32 md:w-32"
          />
          <div className="p-2 font-semibold">
            <p>{cast.original_name}</p>
            <p className="text-zinc-400">{cast.character}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CrewCard;
