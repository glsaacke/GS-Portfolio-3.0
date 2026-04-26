import Intro from "../components/Intro";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import StravaActivity from "../components/StravaActivity";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
    return ( 
    <div className="home-container">
        <Intro/>
        <Experience/>
        <StravaActivity/>
        <Skills/>
        <Projects/>
        <Contact/>
        <Footer/>
    </div> 
    );
}
 
export default Home;