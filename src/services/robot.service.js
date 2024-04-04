import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const robotService = {
    query,
    save,
    remove,
    getById,
    getDefaultRobot,
    getDefaultFilter,
    getFilterFromParams
}

const STORAGE_KEY = 'robots'

_createRobots()

async function query(filterBy) {
    console.log('Loading robots');
    let robots = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        let { minBatteryStatus, model = '', type = '' } = filterBy
        minBatteryStatus = minBatteryStatus || 0
        const regexModelTerm = new RegExp(model, 'i')
        robots = robots.filter(robot =>
            regexModelTerm.test(robot.model) &&
            robot.batteryStatus > minBatteryStatus &&
            (!type || type === robot.type)
        )
    }
    return robots
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(robotToSave) {
    if (robotToSave.id) {
        return storageService.put(STORAGE_KEY, robotToSave)
    } else {
        robotToSave.isOn = false
        return storageService.post(STORAGE_KEY, robotToSave)
    }
}

function getDefaultRobot(model = '', type = '', batteryStatus = 100) {
    return {
        model,
        batteryStatus,
        type
    }
}

function getDefaultFilter() {
    return {
        type: '',
        minBatteryStatus: 0,
        maxBattery: '',
        model: ''
    }
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {
        // type: searchParams.get('type'),
        // model:
    }
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}


function _createRobots() {
    let robots = utilService.loadFromStorage(STORAGE_KEY)
    if (!robots || !robots.length) {
        robots = [
            { id: 'r1', model: 'Salad-O-Matic', batteryStatus: 80, type: 'Cooking' },
            { id: 'r2', model: 'Dusty', batteryStatus: 100, type: 'Cleaning' },
            { id: 'r3', model: 'Dominique Sote', batteryStatus: 100, type: 'Pleasure' },
            { id: 'r4', model: 'DevTron', batteryStatus: 40, type: 'Office' }
        ]
        utilService.saveToStorage(STORAGE_KEY, robots)
    }
}