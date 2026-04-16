import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

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
