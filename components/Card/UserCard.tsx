import Link from "next/link";
import Image from "next/image";

type Props = {
  user: any;
};

function UserCard({ user }: Props) {
  return (
    <div className="min-w-full rounded-md bg-gradient-to-r from-zinc-700/90 via-zinc-700/60 to-zinc-700/35 p-4 duration-200 hover:scale-105 md:w-[300px]">
      <Link
        href={`/user-profile/${user._id.toString()}`}
        className="flex items-center gap-2 md:gap-4"
      >
        <Image
          src={user.image || "/assets/no-profile.png"}
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full bg-white object-contain p-0.5"
        />
        <div className="text-xs font-semibold md:text-base">
          <p className="line-clamp-1">{user.name}</p>
          <p>{user.favoritedMovies.length} Favorited</p>
          <p>{`${user.review.length} ${
            user.review.length <= 1 ? "Review" : "Reviews"
          }`}</p>
        </div>
      </Link>
    </div>
  );
}

export default UserCard;
