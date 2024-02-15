"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_API_URL } from "@/index";

function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name.trim().length < 4) {
      setError("Name should be atleast 4 characters");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid Email");
      return;
    }

    if (password.length < 8) {
      setError("Password should be atleast 8 characters");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${BASE_API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const msg = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        setError(msg.message);
      } else {
        setSubmitting(false);
        setError("");
        router.push("/login");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div className="flex min-h-[600px] items-center justify-center p-4">
      <div className="w-96 rounded-md bg-gradient-to-br from-zinc-600/80 via-zinc-600/50 to-zinc-600/80 p-8">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Register an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              autoComplete="off"
              min={4}
              required
              className="w-full rounded-md bg-zinc-800 py-6 text-base"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
              required
              className="w-full rounded-md bg-zinc-800 py-6 text-base"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              min={8}
              required
              className="w-full rounded-md bg-zinc-800 py-6 text-base"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full text-lg font-bold hover:bg-white/50"
          >
            {submitting ? "Registering" : "Register"}
          </Button>
          {error && (
            <div className="flex w-full justify-center">
              <p className="mt-4 w-fit rounded-md px-2 py-1 font-semibold text-red-500">
                {error}
              </p>
            </div>
          )}
        </form>
        <div className="mt-4 text-center">
          <Link
            href={"/login"}
            className="font-semibold duration-200 hover:text-gray-400"
          >
            Already have an account? <span className="underline">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;