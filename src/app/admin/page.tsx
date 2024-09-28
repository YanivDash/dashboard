"use client";
import Link from "next/link";
const page = () => {
  return (
    <main className=" h-[100%] justify-center items-center">
      <Link
        className="px-3 py-2 flex justify-center bg-gray-100 rounded my-10"
        href="/admin/teams"
      >
        Teams
      </Link>
    </main>
  );
};

export default page;
