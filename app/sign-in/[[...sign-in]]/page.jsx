import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#f7f8fc] overflow-hidden px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(at top left, rgba(194, 225, 255, 0.3) 0%, transparent 40%), radial-gradient(at bottom right, rgba(189, 217, 255, 0.3) 0%, transparent 40%)",
          zIndex: 0,
        }}
      />
      <div className="w-full max-w-md z-10">
        <SignIn />
        <div className="mt-4 text-sm text-gray-600 z-10 flex w-[400px]">
           <div className="w-[60%] mx-auto flex justify-between">
             Don’t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign up
        </Link>
           </div>
      </div>
      </div>
    </div>
  );
}