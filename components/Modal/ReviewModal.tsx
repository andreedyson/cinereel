"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StarRating from "../Actions/StarRating";
import { BASE_API_URL } from "@/index";

type Props = {
  user_id: string;
  movie: any;
  isVisible: boolean;
  onClose: () => void;
};

function ReviewModal({ user_id, movie, isVisible, onClose }: Props) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const commentSchema = z.object({
    comment: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  });

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleRatingChange = (rating: number) => setSelectedRating(rating);

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_API_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          text: values.comment,
          movie_id: movie.id,
          rating: selectedRating,
        }),
      });

      const msg = await res.json();
      if (!res.ok) {
        onClose();
        toast({
          description: msg.message,
          variant: "destructive",
        });
      } else {
        toast({
          description: msg.message,
        });
        setSubmitting(false);
        onClose();
        router.refresh();
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex h-screen w-full flex-col items-center justify-center md:mx-auto">
      <div
        className="fixed inset-0 -z-10 h-screen w-full bg-black/80"
        onClick={() => onClose()}
      />
      <Card className="w-[320px] bg-[#f8f8f8] md:w-[380px]">
        <CardHeader className="text-center">
          <CardTitle>Add a Movie Review</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormItem>
                <FormLabel>Movie Details</FormLabel>
                <p>Title: {movie.title}</p>
                <p>
                  Released:{" "}
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </FormItem>
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={8}
                        placeholder="Give a review for the movie..."
                        maxLength={400}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Give a Star Rating</FormLabel>
                <div>
                  <StarRating
                    initialRating={selectedRating}
                    onRatingChange={handleRatingChange}
                  />
                </div>
              </FormItem>
              <div className="flex justify-between gap-4">
                <Button
                  variant={"ghost"}
                  className="w-full ring-2 ring-zinc-700"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-zinc-700 hover:bg-zinc-700/80"
                  disabled={submitting}
                >
                  {!submitting ? "Submit" : "Submitting"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReviewModal;
