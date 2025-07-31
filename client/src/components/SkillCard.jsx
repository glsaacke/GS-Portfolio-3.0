import "../styles/Skills.css"
import { useState, useEffect } from "react";

const SkillCard = ({skill}) => {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        console.log(`${skill.file}.svg`)
    }, [])

    return ( 
        <span 
            className="skillCard-container" 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: hovered ? skill.hex : "transparent",
                transition: "background-color 0.2s ease"}}>

            <img src={`../skillIcons/${skill.file}.svg`} alt="" />
            <h4>{skill.name}</h4>
        </span>
     );
}
 
export default SkillCard;