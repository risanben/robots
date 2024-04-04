import { robotService } from "../../services/robot.service";
import { ADD_ROBOT, REMOVE_ROBOT, SET_FILTER_BY, SET_IS_LOADING, SET_ROBOTS, UNDO_CHANGES, UPDATE_ROBOT } from "../reducers/robot.reducer";
import { SPEND_BALANCE } from "../reducers/user.reducer";
import { store } from "../store";


export async function loadRobots() {
	store.dispatch({ type: SET_IS_LOADING, isLoading: true })
	try {
		const { filterBy } = store.getState().robotModule
		const robots = await robotService.query(filterBy)
		store.dispatch({ type: SET_ROBOTS, robots })
	} catch (err) {
		console.log('Had issues loading robots', err)
		throw err
	} finally {
		store.dispatch({ type: SET_IS_LOADING, isLoading: false })
	}
}

export async function removeRobotOptimitic(robotId) {
	try {
		store.dispatch({ type: REMOVE_ROBOT, robotId })
		await robotService.remove(robotId)
	} catch (err) {
		console.log('Had issues removing robots', err)
		store.dispatch({ type: UNDO_CHANGES })
		throw err
	}
}

export async function removeRobot(robotId) {
	try {
		await robotService.remove(robotId)
		store.dispatch({ type: REMOVE_ROBOT, robotId })
	} catch (err) {
		console.log('Had issues removing robots', err)
		throw err
	}
}

export async function saveRobot(robot) {
	try {
		const type = robot.id ? UPDATE_ROBOT : ADD_ROBOT
		const savedRobot = await robotService.save(robot)
		store.dispatch({ type, robot: savedRobot })
	} catch (err) {
		console.log('Had issues saving robots', err)
		throw err
	}
}

export function setFilterBy(fieldsToUpdate) {
	store.dispatch({ type: SET_FILTER_BY, fieldsToUpdate })
}
