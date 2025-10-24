import Topbar from "../components/organisms/Topbar";
import Footer from "../components/organisms/Footer";
import Sidebar from "../components/organisms/Sidebar";
import RightBar from "../components/organisms/RightBar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 w-full px-12 py-8">{children}</main>
        <Footer />
      </div>
      <RightBar />
    </div>
  );
};

export default UserLayout;
