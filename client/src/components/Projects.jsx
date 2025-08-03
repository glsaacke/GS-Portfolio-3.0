import "../styles/Projects.css"
import projectData from "../data/projects.json"

const Projects = () => {
    return ( 
        <div className="projects-container ">
            <h2>Projects</h2>
            <div className="project-card-container">
                {projectData.map((proj, index) => (

                    <div className="project-card" href={proj.link} target="_blank" rel="noopener noreferrer" key={index}>
                        <img src={`/projImg/${proj.imgSrc}`} alt="" />
                        <h3>{proj.name}</h3>
                        <div className="project-links">
                            {proj.link == "none" ? <></> : 
                            <a href={proj.link} target="_blank" rel="noopener noreferrer">
                                Visit
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                </svg>
                            </a>}
                            <a href={proj.source} target="_blank" rel="noopener noreferrer">
                                Code
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-code-slash" viewBox="0 0 16 16">
                                    <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
                                </svg>
                            </a>
                        </div>
                        <p className="project-card-description">{proj.description}</p>
                        <div className="proj-skill-container">
                            {proj.skills.map((skill, index) => (
                                <div className="proj-skill" key={index}>
                                    <p>{skill}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                ))}
            </div>
        </div>
     );
}
 
export default Projects;