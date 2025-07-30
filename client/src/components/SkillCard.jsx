import "../styles/Skills.css"
import { useState, useEffect } from "react";

const SkillCard = ({skill}) => {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        console.log(`${skill.name.toLowerCase()}.svg`)
    }, [])

    return ( 
        <span 
            className="skillCard-container" 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: hovered ? skill.hex : "transparent",
                transition: "background-color 0.2s ease"}}>

            <img src={`../skillIcons/${skill.name.toLowerCase()}.svg`} alt="" />
            <h4>{skill.name}</h4>
        </span>
     );
}
 
export default SkillCard;