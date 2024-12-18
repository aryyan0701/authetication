"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  // console.log("Session data:", session);

 
   if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in. Please sign in.</p>;
  }

   const handleSignOut = () => {
    signOut({
      callbackUrl: "/sign-in",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {session.user.username || session.user.email}!
      </h1>

      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
}

export default page