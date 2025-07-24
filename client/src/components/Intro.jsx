import "../styles/intro.css"

const Intro = () => {
    return ( 
        <div className="intro-container container">
            <div className="title-container row bdy">
                <div className="col-xs-3 pfp bdc">
                    <img className=" " src="../public/BigRings.jpg" alt="Picture of Gavin Saacke" />
                </div>
                <div className="title-text col-xs-9 bdr">
                    <h1>Gavin Saacke</h1>
                    <h4>Fullstack Developer</h4>
                    <h4>Endurance Athlete</h4>
                </div>
            </div>
        </div>
     );
}
 
export default Intro;