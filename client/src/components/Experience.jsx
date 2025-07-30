import "../styles/Experience.css"
import experienceData from "../data/experiences.json";
import educationData from "../data/education.json"
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
                                <ExpCard experience={exp} isEducation={false} key={exp.id}/>
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <div class="segmented-control">
                            <button className="sc-button" onClick={handleSwapExperience} style={{backgroundColor: "#363432", color: "white"}}>Experience</button>
                            <button className="sc-button" onClick={handleSwapExperience} style={{backgroundColor: "white", color: "#363432"}}>Education</button>
                        </div>
                        <div className="experience-content">
                            {educationData.map(edu => (
                                    <ExpCard experience={edu} isEducation={true} key={edu.id}/>
                            ))}
                        </div>
                    </>
                }
                
            
        </section>
     );
}
 
export default Experience;