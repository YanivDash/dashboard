"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion } from "rizzui";
import { cn } from "rizzui";
import { sidebarLinks, sidebarSubLinks } from "@/siteConfig/sidebarData";

import { FaAngleDown } from "react-icons/fa6";
const Sidebar = () => {
  const path = usePathname().split("/");

  return (
    <div className=" h-[100vh] shadow-xl overflow-y-scroll no-scrollbar min-w-5 pb-28">
      <h3 className="flex justify-center pt-2 m-2 text-2xl font-thin">
        Dashboard
      </h3>

      <ul className="flex flex-col items-left text-[15px] text-left pl-5 space-y-7 mt-10">
        {sidebarLinks.map((i) => {
          if (i.dropdown) {
            return (
              <Accordion key={i.title}>
                <Accordion.Header className="w-full">
                  {({ open }) => (
                    <li
                      key={i.title}
                      className={cn(
                        "flex items-center text-left hover:text-slate-200 cursor-pointer font-semibold py-3 pl-2 w-[90%] rounded ",
                        open && "bg-[#f8f8f8]"
                      )}
                    >
                      <i.icon className="text-2xl mr-2" />
                      {i.title}
                      <FaAngleDown
                        className={cn(
                          "text-2xl mr-2 h-5 w-5 -rotate-90 transform transition-transform duration-300 ml-auto",
                          open && "-rotate-0"
                        )}
                      />
                    </li>
                  )}
                </Accordion.Header>

                <Accordion.Body className="ml-7">
                  <ul>
                    {i.dropdown.map((opt, index) => {
                      return (
                        <Link href={`/admin/${opt.href}`} key={index}>
                          <li
                            className={cn(
                              "flex items-center text-left hover:text-slate-200 cursor-pointer font-semibold py-3 pl-2 w-[90%] rounded ",
                              path.includes(opt.href) ? "bg-[#f8f8f8]" : ""
                            )}
                          >
                            {opt.subTitle}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </Accordion.Body>
              </Accordion>
            );
          } else {
            return (
              <Link key={i.title} href="/admin">
                <li
                  className={cn(
                    "flex items-center text-left hover:text-slate-200 cursor-pointer font-semibold py-3 pl-2 w-[90%] rounded ",
                    path.includes(i.title) ? "bg-[#f8f8f8]" : ""
                  )}
                >
                  <i.icon className="text-2xl mr-2" />
                  {i.title}
                </li>
              </Link>
            );
          }
        })}
      </ul>
      <div className="flex flex-col items-left text-[15px] text-left pl-5 space-y-5 mt-10">
        <p
          className={cn(
            "flex items-center text-left cursor-pointer font-thin  pl-2 "
          )}
        >
          SETTINGS
        </p>
        <ul className="space-y-1">
          {sidebarSubLinks.map((i) => (
            <li
              key={i}
              className={cn(
                "flex items-center text-left hover:text-slate-200 cursor-pointer font-thin py-2 pl-2 w-[90%] rounded text-sm "
              )}
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
