import { memo } from "react"
import { Link } from "react-router-dom"

import { RobotPreview } from "./RobotPreview"

export const RobotList = memo(({ robots, onRemoveRobot, onUpdateRobot }) => {

    console.log('List rendered')
    // What if there was a big spender function here

    function onIncreaseBattery(robot) {
        const updatedRobot = { ...robot, batteryStatus: robot.batteryStatus + 10 }
        onUpdateRobot(updatedRobot)
    }

    return (
        <ul className="robot-list">
            {
                robots.map(robot => <li key={robot.id}>
                    <RobotPreview robot={robot} />

                    <div className="robot-actions">
                        <button onClick={(ev) => onRemoveRobot(robot.id, ev)}>X</button>
                        <button onClick={() => { onIncreaseBattery(robot) }}>+</button>
                        <Link to={`/robot/edit/${robot.id}`}><button>Edit</button></Link>
                    </div>
                </li>)
            }
        </ul>
    )
})
