import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mainContainer">
        <div className="content">
          <Sidebar />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
