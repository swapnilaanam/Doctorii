import Sidebar from "@/components/Sidebar/Sidebar";

const WithSidebarLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full flex">
            <Sidebar />
            <div className="w-full">{children}</div>
        </div>
    )
};

export default WithSidebarLayout;