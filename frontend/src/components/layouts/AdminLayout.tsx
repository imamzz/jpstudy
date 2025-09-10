import Sidebar from "../organisms/Sidebar";
import Topbar from "../organisms/Topbar";
import Footer from "../organisms/Footer";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-4 bg-gray-50">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
