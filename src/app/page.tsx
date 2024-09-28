"use client";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Link className="px-3 py-2 flex bg-green rounded my-10" href="/admin">
        Admin
      </Link>
    </>
  );
}
