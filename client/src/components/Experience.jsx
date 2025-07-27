import "../styles/Experience.css"
import { useState } from "react";

const Experience = () => {
    const [activeTab, setActiveTab] = useState("experience");
    
    return ( 
        <section className="experience-container">
            <div class="segmented-control">
                <button className="segment active" onclick="showContent('experience')">Experience</button>
                <button class="segment" onclick="showContent('education')">Education</button>
            </div>
        </section>
     );
}
 
export default Experience;