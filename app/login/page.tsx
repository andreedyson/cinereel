"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { HiEye, HiEyeSlash } from "react-icons/hi2";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
      router.refresh();
    }
  }, [session, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Email is not valid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password should be atleast 8 characters");
      return;
    }

    setSubmitting(true);

    const res = await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setSubmitting(false);
    }

    if (res?.status === 200) {
      setError("");
      router.refresh();
      router.replace("/");
    }
  };

  return (
    <div className=" flex min-h-[600px] items-center justify-center p-4">
      <div className="w-96 rounded-md bg-gradient-to-br from-zinc-600/80 via-zinc-600/50 to-zinc-600/80 p-8">
        <h2 className="mb-8 text-center text-3xl font-bold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
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
            <div className="relative flex items-center">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                required
                className="w-full rounded-md bg-zinc-800 py-6 text-base"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div
                className="absolute right-4 cursor-pointer text-[#999999]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? <HiEye size={25} /> : <HiEyeSlash size={25} />}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full text-lg font-bold hover:bg-white/50"
          >
            {submitting ? "Loggin In" : "Login"}
          </Button>
          {error && (
            <div className="flex w-full justify-center">
              <p className="mt-4 w-fit rounded-md bg-red-600/80 px-2 py-1 font-semibold">
                {error}
              </p>
            </div>
          )}
        </form>
        <div className="mt-4 text-center">
          <Link
            href={"/register"}
            className="font-semibold duration-200 hover:text-gray-400"
          >
            Don&apos;t have an account?{" "}
            <span className="underline">Register</span>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={() => signIn("google")}
            className="mt-6 w-full bg-white text-lg font-bold text-black hover:bg-white/50"
          >
            <Image
              src={"/assets/google-logo.png"}
              alt="google"
              width={30}
              height={30}
              className="mr-4"
            />
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
