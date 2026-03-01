import Image from "next/image";
import Services from "./services/page";
import About from "./about/page";
import Contact from "./contact/page";
import Home from "./home/page";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Resources from "./resources/page";
export default function HomePage() {
  return (
    <div>
      <Navbar/>
    <Home/>
    <About/>
    <Services/>
    <Resources/>
    <Contact/>
    <Footer/>
    </div>
  );
}
