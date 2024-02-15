"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";

const formSchema = z.object({
  input: z.string().min(3).max(50),
});

function SearchInput() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    form.reset();
    router.push(`/search/${values.input}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className="relative -mt-2">
              <FormLabel className="pointer-events-none absolute ml-1 pt-0.5">
                <HiMagnifyingGlassCircle size={35} color="white" />
              </FormLabel>
              <FormControl>
                <div className="flex items-center justify-center">
                  <Input
                    {...field}
                    placeholder="Search movies..."
                    autoComplete="off"
                    className=" w-2 rounded-full bg-zinc-700 pl-10 duration-200 placeholder:text-gray-300 max-md:focus:w-[160px] md:w-full"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default SearchInput;
