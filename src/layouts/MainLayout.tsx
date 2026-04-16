import Footer from "./Footer";
import Navbar from "./Navbar";
import type { MainLayoutProps } from "../types";

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
