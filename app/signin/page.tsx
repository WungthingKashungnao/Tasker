"use client";

import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <SignIn />
    </div>
  );
};

export default page;
