import Intro from "../components/Intro";
import Experience from "../components/Experience";
import Skills from "../components/Skills";

const Home = () => {
    return ( 
    <div className="home-container">
        <Intro/>
        <Experience/>
        <Skills/>
    </div> 
    );
}
 
export default Home;