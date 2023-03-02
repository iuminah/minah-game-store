import {Container} from "@mui/material";
import Footer from "./footer/footer";
import Navbar from "./navbar/Navbar";

export default function Layout({children}) {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" className="pt-20">
        {children}
      </Container>
      <Footer />
    </>
  );
}
