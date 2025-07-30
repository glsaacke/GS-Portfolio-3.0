import "../styles/Experience.css"
import { useState, useEffect } from "react";

const ExpCard = ({experience, isEducation}) => {

    useEffect(() => {
        console.log(experience)
    }, [])

    function formatCompanyName(name){
        return name.toLowerCase().replace(/\s+/g, "-");
    };

    return ( 
        <div className="expCard-container cbd">
            <img src={`../expImg/${formatCompanyName(experience.company)}.png`} alt={`${experience.company} logo`} />
            <div className="exp-info">
                <p>{experience.dateString}</p>
                <h3>{experience.title}</h3>
                <h4>{experience.company}</h4>
                {isEducation ? <></> : <p>{experience.description}</p>}
                
            </div>
        </div>
     );
}
 
export default ExpCard;