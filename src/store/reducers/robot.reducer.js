import { robotService } from "../../services/robot.service";

export const SET_ROBOTS = 'SET_ROBOTS'
export const REMOVE_ROBOT = 'REMOVE_ROBOT'
export const UPDATE_ROBOT = 'UPDATE_ROBOT'
export const ADD_ROBOT = 'ADD_ROBOT'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UNDO_CHANGES = 'UNDO_CHANGES'

const initialState = {
    robots: null,
    lastRobots: [],
    filterBy: robotService.getDefaultFilter(),
    isLoading: true
}

export function robotReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_ROBOTS:
            return {
                ...state,
                robots: cmd.robots
            }

        case REMOVE_ROBOT:
            return {
                ...state,
                lastRobots: [...state.robots],
                robots: state.robots.filter(robot => robot.id !== cmd.robotId),
            }

        case ADD_ROBOT:
            return {
                ...state,
                robots: [...state.robots, cmd.robot]
            }

        case UPDATE_ROBOT:
            return {
                ...state,
                robots: state.robots.map(robot => robot.id === cmd.robot.id ? cmd.robot : robot)
            }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.fieldsToUpdate }
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        case UNDO_CHANGES:
            return {
                ...state,
                robots: [...state.lastRobots]
            }

        default:
            return state
    }
}