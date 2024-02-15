"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

function LogoutBtn() {
  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}

export default LogoutBtn;
