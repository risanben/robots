import { Link } from "react-router-dom";

export function RobotPreview({ robot }) {
    return <article className="robot-preview">
        <Link to={`/robot/${robot.id}`}>
            <img src={`https://robohash.org/${robot.type}`} />
            <h2>{robot.model}</h2>
            <h4>{robot.type}</h4>
            <h6>{robot.batteryStatus}</h6>
        </Link>


        
    </article>

}
