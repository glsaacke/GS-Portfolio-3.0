import "../styles/Projects.css"
import projectData from "../data/projects.json"

const Projects = () => {
    return ( 
        <div className="projects-container ">
            <h2>Projects</h2>
            <div className="project-card-container">
                {projectData.map(proj => (

                    <a className="project-card" href={proj.link} target="_blank" rel="noopener noreferrer">
                        <img src={`../projImg/${proj.imgSrc}`} alt="" />
                        <h3>{proj.name}</h3>
                        <p className="project-card-description">{proj.description}</p>
                        <div className="proj-skill-container">
                            {proj.skills.map(skill => (
                                <div className="proj-skill">
                                    <p>{skill}</p>
                                </div>
                            ))}
                        </div>
                    </a>

                ))}
            </div>
        </div>
     );
}
 
export default Projects;