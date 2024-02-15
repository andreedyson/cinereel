"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
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
import { BASE_API_URL } from "@/index";

type Props = {
  user_id: string;
  initialUsername: string;
  onClose: () => void;
};

function EditUsername({ user_id, initialUsername, onClose }: Props) {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const usernameSchema = z.object({
    username: z
      .string()
      .nonempty()
      .min(4, { message: "Minimum 4 characters." })
      .max(32, { message: "Maximum 32 characters" }),
  });

  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: initialUsername,
    },
  });

  const onSubmit = async (values: z.infer<typeof usernameSchema>) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_API_URL}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          newUsername: values.username,
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
        setSubmitting(false);
        onClose();
        router.refresh();
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center md:mx-auto">
      <div
        className="fixed inset-0 -z-10 h-screen w-full bg-black/80"
        onClick={() => onClose()}
      />
      <Card className="w-[320px] border-y-8 border-y-orange-500 bg-[#f8f8f8] md:w-[380px]">
        <CardHeader className="text-center">
          <CardTitle>Edit Username</CardTitle>
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={32} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  {!submitting ? "Update Username" : "Updating..."}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditUsername;
