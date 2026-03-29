import "../styles/Experience.css"
import experienceData from "../data/experiences.json";
import educationData from "../data/education.json"
import { useState, useRef, useEffect, useCallback } from "react";
import ExpCard from "./ExpCard";

const Experience = () => {
    const [isTabExp, setIsTabExp] = useState(true);
    const expRef = useRef(null);
    const eduRef = useRef(null);
    const [wrapperHeight, setWrapperHeight] = useState("auto");

    const updateHeight = useCallback(() => {
        const activeRef = isTabExp ? expRef : eduRef;
        const h = activeRef.current?.scrollHeight || 0;
        setWrapperHeight(h);
    }, [isTabExp]);

    useEffect(() => {
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, [updateHeight]);
    
    return ( 
        <section className="experience-container">
            <div className="segmented-control">
                <button
                    className={`sc-button ${isTabExp ? "sc-button-active" : ""}`}
                    onClick={() => setIsTabExp(true)}
                >
                    Experience
                </button>
                <button
                    className={`sc-button ${!isTabExp ? "sc-button-active" : ""}`}
                    onClick={() => setIsTabExp(false)}
                >
                    Education
                </button>
            </div>

            <div className="tab-content-wrapper" style={{ height: wrapperHeight }}>
                <div ref={expRef} className={`tab-panel ${isTabExp ? "tab-panel-active" : "tab-panel-hidden"}`}>
                    <div className="experience-content">
                        {experienceData.map(exp => (
                            <ExpCard experience={exp} isEducation={false} key={exp.id}/>
                        ))}
                    </div>
                </div>
                <div ref={eduRef} className={`tab-panel ${!isTabExp ? "tab-panel-active" : "tab-panel-hidden"}`}>
                    <div className="experience-content">
                        {educationData.map(edu => (
                            <ExpCard experience={edu} isEducation={true} key={edu.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default Experience;