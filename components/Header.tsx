import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { getUser } from "@/lib/actions/user.actions";
import SearchInput from "./Actions/SearchInput";
import GenreDropdown from "./Actions/GenreDropdown";
import LogoutBtn from "./Actions/LogoutBtn";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { buttonVariants } from "./ui/button";

export default async function Header() {
  const session: any = await getServerSession(authOptions);

  const user = await getUser(session?.user?.email);
  const user_id = user?._id.toString();

  return (
    <header className="sticky top-0 z-[100] w-full bg-gradient-to-t from-zinc-200/0 via-zinc-900/25 to-zinc-900">
      <nav className="flex items-center justify-between px-4 py-4 md:px-8">
        <div>
          <Link href={"/"}>
            <h1 className=" text-2xl font-bold text-red-600 lg:text-3xl">
              Cine
              <span className="text-orange-500">Reel</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <GenreDropdown />
          <SearchInput />
          <div className="flex items-center gap-2">
            {!session && (
              <div className="flex items-center">
                <Link
                  href={"/login"}
                  className={`${buttonVariants({
                    variant: "link",
                  })} text-white`}
                >
                  Login
                </Link>
              </div>
            )}
            {session && (
              <Popover>
                <PopoverTrigger>
                  <Image
                    src={session?.user?.image || "/assets/no-profile.png"}
                    width={40}
                    height={40}
                    alt="user_img"
                    className="rounded-full bg-white object-contain p-0.5"
                  />
                </PopoverTrigger>
                <PopoverContent className="mr-4 flex w-40 flex-col items-center justify-center gap-2 bg-zinc-800 font-semibold text-white">
                  <Link
                    href={`/user-profile/${user_id}`}
                    className="border-b-2 border-gray-600 p-2"
                  >
                    Your Profile
                  </Link>
                  <LogoutBtn />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
