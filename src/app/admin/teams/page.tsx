"use client";
import React from "react";
import { adminTeamsData } from "@/siteConfig/adminTeamsData";
import TableTab from "@/components/tabletab/tableTab";
import Form from "@/components/form/Form";
import MobileSlidebar from "@/components/sidebar/MobileSlidebar";
function page() {
  return (
    <div className="px-5 mt-3">
      <p className="text-xl  sm:text-2xl lg:text-3xl  font-bold font-inter">
        Netmaxims Technologies
      </p>
      <div className="flex w-100% justify-between items-end ">
        <div>
          <div className=" hidden  lg:flex font-thin text-sm space-x-3 mb-7">
            <p>Home </p>
            <p>Companies</p>
            <p>Team</p>
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
