import MenuBar from "./navbar/Menu";

export default function Layout({children}) {
  return (
    <>
      <MenuBar />
      <main className="pt-[100px]">{children}</main>
    </>
  );
}
