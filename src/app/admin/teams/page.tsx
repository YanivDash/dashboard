"use client";
import React from "react";
import { adminTeamsData } from "@/siteConfig/adminTeamsData";
import TableTab from "@/components/tabletab/tableTab";
import Form from "@/components/form/Form";
import MobileSlidebar from "@/components/sidebar/MobileSlidebar";
import Link from "next/link";
function page() {
  return (
    <div className="px-2 mt-3">
      <p className="text-xl  sm:text-2xl lg:text-3xl  font-bold font-inter">
        Netmaxims Technologies
      </p>
      <div className="pt-2 lg:pt-0 flex w-100% justify-between items-end ">
        <div>
          <div className=" hidden  lg:flex font-thin text-sm space-x-3 mb-7">
            <p>Home </p>
            <p>Companies</p>
            <Link href="/admin/teams">Teams</Link>
          </div>
          <div className="lg:hidden text-sm space-x-3 mb-7">
            <MobileSlidebar />
          </div>
        </div>
        <div className="mb-7 flex space-x-4 ">
          <Form />
        </div>
      </div>
      <div>
        <TableTab initialData={adminTeamsData} />
      </div>
    </div>
  );
}

export default page;
