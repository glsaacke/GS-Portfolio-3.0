import Intro from "../components/Intro";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";

const Home = () => {
    return ( 
    <div className="home-container">
        <Intro/>
        <Experience/>
        <Skills/>
        <Projects/>
    </div> 
    );
}
 
export default Home;