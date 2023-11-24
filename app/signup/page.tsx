import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <SignUp />
    </div>
  );
};

export default page;
