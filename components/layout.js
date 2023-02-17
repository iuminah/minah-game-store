import Footer from "./footer/footer";
import Navbar from "./navbar/Navbar";

export default function Layout({children}) {
  return (
    <>
      <Navbar />
      <main className="container pt-20">{children}</main>
      <Footer />
    </>
  );
}
