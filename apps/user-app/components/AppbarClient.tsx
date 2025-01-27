"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const { data: session } = useSession(); // Destructure `data` directly for simplicity
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/api/auth/signin");
  };

  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={handleSignOut} // Use the defined function for clarity
        user={session?.user} // Optional chaining in case session or user is undefined
      />
    </div>
  );
}
