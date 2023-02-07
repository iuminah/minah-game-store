import Footer from "./footer/footer";
import MenuBar from "./navbar/Menu";

export default function Layout({children}) {
  return (
    <>
      <MenuBar />
      <main className="pt-[80px] lg:pt-[90px] container mx-auto px-4 lg:px-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
