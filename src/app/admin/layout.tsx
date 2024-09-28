import Sidebar from "@/components/sidebar/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center">
      <div className="w-[20%] hidden lg:block min-w-[300px] fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="w-[20%] hidden lg:block min-w-[300px]"></div>
      <div className="w-full lg:w-[80%]">{children}</div>
    </main>
  );
}
