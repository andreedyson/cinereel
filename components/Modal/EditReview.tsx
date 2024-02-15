"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StarRating from "../Actions/StarRating";
import { BASE_API_URL } from "@/index";

type Props = {
  user_id: string;
  review_id: string;
  initialText: string;
  initialRating: number;
  onClose: () => void;
};

function EditReview({
  user_id,
  review_id,
  initialText,
  initialRating,
  onClose,
}: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState(initialRating);
  const [submitting, setSubmitting] = useState(false);

  const commentSchema = z.object({
    comment: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  });

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: initialText,
    },
  });

  const handleRatingChange = (rating: number) => setSelectedRating(rating);

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_API_URL}/api/review`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          review_id: review_id,
          text: values.comment,
          rating: selectedRating,
        }),
      });

      const msg = await res.json();

      if (!res.ok) {
        toast({
          description: msg.message,
        });
      } else {
        toast({
          description: msg.message,
        });
        onClose();
        router.refresh();
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex h-screen w-full flex-col items-center justify-center md:mx-auto">
      <div
        className="fixed inset-0 -z-10 h-screen w-full bg-black/80"
        onClick={() => onClose()}
      />
      <Card className="w-[320px] bg-[#f8f8f8] md:w-[380px]">
        <CardHeader className="text-center">
          <CardTitle>Edit Review</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormItem>
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
                          placeholder="Edit your review..."
                          maxLength={400}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
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
                  {!submitting ? "Update Review" : "Updating"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditReview;
