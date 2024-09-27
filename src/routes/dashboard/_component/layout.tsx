import Header from "./header";
import Sidebar from "./sidebar";

export function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Sidebar />
      <div className='pl-[264px]'>
        <Header />
        <div>{children}</div>
      </div>
    </>
  )
}
