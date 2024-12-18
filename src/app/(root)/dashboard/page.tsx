"use client";

import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  console.log("Session data:", session);

    if (!session) {
    return <p>Loading...</p>;
  }

  return <div>Welcome, {session.user.username}!</div>;
}

export default page