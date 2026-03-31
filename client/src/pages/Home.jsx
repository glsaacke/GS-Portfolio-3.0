import Intro from "../components/Intro";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
    return ( 
    <div className="home-container">
        <Intro/>
        <Experience/>
        <Skills/>
        <Projects/>
        <Contact/>
        <Footer/>
    </div> 
    );
}
 
export default Home;