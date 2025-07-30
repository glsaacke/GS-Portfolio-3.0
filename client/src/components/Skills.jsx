import skillsData from "../data/skills.json"
import "../styles/Skills.css"
import { useState, useEffect } from "react";
import SkillCard from "./SkillCard";

const Skills = () => {

    return ( 
        <div className="skills-container bdr">
            <h2>Skills</h2>
            <div className="skills">
                {skillsData.map(skl => (
                    <SkillCard skill={skl}/>
                ))}
            </div>
        </div>
     );
}
 
export default Skills;