import "../styles/Experience.css"
import experienceData from "../data/experiences.json";
import { useState, useEffect } from "react";
import ExpCard from "./ExpCard";

const Experience = () => {
    const [isTabExp, setIsTabExp] = useState(true);
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        
    }, [])

    function handleSwapExperience(){
        setIsTabExp(prev => !prev)
    }
    
    return ( 
        <section className="experience-container">
            
                {isTabExp ? 
                    <>
                        <div class="segmented-control">
                            <button className="sc-button" onClick={handleSwapExperience} style={{backgroundColor: "white", color: "#363432"}}>Experience</button>
                            <button className="sc-button" onClick={handleSwapExperience} style={{backgroundColor: "#363432", color: "white"}}>Education</button>
                        </div> 
                        <div className="experience-content">
                            {experienceData.map(exp => (
                                <ExpCard experience={exp} key={exp.id}/>
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <div class="segmented-control">
                            <button className="sc-button" onClick={handleSwapExperience} style={{backgroundColor: "#363432", color: "white"}}>Experience</button>
                            <button className="sc-button" onClick={handleSwapExperience} style={{backgroundColor: "white", color: "#363432"}}>Education</button>
                        </div>
                    </>
                }
                
            
        </section>
     );
}
 
export default Experience;