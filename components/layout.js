import Footer from "./footer/footer";
import MenuBar from "./navbar/Menu";

export default function Layout({children}) {
  return (
    <>
      <MenuBar />
      <main className="pt-[80px] lg:pt-[90px] container mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}
