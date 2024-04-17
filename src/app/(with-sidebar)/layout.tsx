import Sidebar from "@/components/Sidebar/Sidebar";

const WithSidebarLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full flex">
            <Sidebar />
            <div className="w-full overflow-hidden md:w-full md:overflow-auto">{children}</div>
        </div>
    )
};

export default WithSidebarLayout;