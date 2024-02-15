import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import { getUser } from "@/lib/actions/user.actions";
import EditReviewBtn from "../Actions/EditReviewBtn";
import DeleteReviewBtn from "../Actions/DeleteReviewBtn";
import { HiStar } from "react-icons/hi2";
import ReadMoreBtn from "../Actions/ReadMoreBtn";

type Props = {
  review: any;
  movie_details?: any;
};

async function ReviewCard({ review, movie_details }: Props) {
  const session: any = await getServerSession(authOptions);
  const user = await getUser(session?.user?.email);

  // Movie Title corresponding to the Review
  const correspondingMovie =
    movie_details &&
    movie_details.find((mov: any) => mov.id === review.movie_id);

  return (
    <div className="flex flex-wrap gap-4 pb-4">
      <div
        key={review._id}
        className="w-full rounded-md bg-zinc-800 p-6 lg:w-[400px]"
      >
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Link
                href={`/user-profile/${review.user}`}
                className="text-base font-semibold md:text-xl"
              >
                {review.user_name}
              </Link>
              <div className="flex items-center gap-1 font-semibold">
                {review.rating}
                <HiStar size={20} color="#ffc107" />
              </div>
            </div>
            {correspondingMovie && (
              <Link
                href={`/movie-details/${correspondingMovie.id}`}
                className="duration-200 hover:text-orange-500"
              >
                {correspondingMovie.title}
              </Link>
            )}
          </div>
          <div>
            {review.text.length > 200 ? (
              <div>
                <ReadMoreBtn text={review.text} />
              </div>
            ) : (
              <p>{review.text}</p>
            )}
          </div>
          {user?._id.toString() === review.user.toString() && (
            <div className="flex items-center gap-2">
              <EditReviewBtn
                user_id={review.user.toString()}
                review_id={review._id}
                initialText={review.text}
                initialRating={review.rating}
              />
              <DeleteReviewBtn
                user_id={review.user.toString()}
                review_id={review._id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
