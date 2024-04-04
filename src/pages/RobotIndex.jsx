import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, Outlet, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { robotService } from "../services/robot.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { loadRobots, removeRobot, removeRobotOptimitic, saveRobot, setFilterBy } from "../store/actions/robot.actions"
import { spendBalance } from "../store/actions/user.actions"

import { RobotList } from "../cmps/RobotList"
import { RobotFilter } from './../cmps/RobotFilter'
import { RobotFilterType } from './../cmps/RobotFilterType';

export default function RobotIndex() {

    // const {robots} = useSelector((storeState) => storeState.robotModule)
    const robots = useSelector((storeState) => storeState.robotModule.robots)
    const filterBy = useSelector((storeState) => storeState.robotModule.filterBy)
    const isLoading = useSelector((storeState) => storeState.robotModule.isLoading)

    const [popo, setPopo] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setFilterBy(robotService.getFilterFromParams(searchParams))
    }, [])

    useEffect(() => {
        // Sanitize filterBy object
        setSearchParams(filterBy)
        loadRobots()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(fieldsToUpdate)
    }

    const onRemoveRobot = useCallback(async (robotId, ev) => {

        const elLi = ev.target.closest('li')
        // await utilService.animateCSS(elLi, 'zoomOut', false)
        try {
            await removeRobotOptimitic(robotId)
            // await removeRobot(robotId)
            spendBalance(10)
            showSuccessMsg('Robot removed successfully')
        } catch (err) {
            console.log('Had issues loading robots', err);
            showErrorMsg('Could not remove robot')
        }
    }, [])

    const onUpdateRobot = useCallback(async (robot) => {
        try {
            await saveRobot(robot)
            showSuccessMsg('Robot Updated successfully')
        } catch (err) {
            console.log('Had issues saving robot', err);
            showErrorMsg('Could not update robot')
        }
    }, [])

    async function onAddRobot(robot) {
        try {
            await saveRobot(robot)
            showSuccessMsg('Robot added successfully')
        } catch (err) {
            console.log('Had issues adding robot', err);
            showErrorMsg('Could not add robot')
        }
    }

    function onSpendBalance() {
        spendBalance(10)
    }

    function getBigNum() {
        console.log('getting big num');
        let counter = 0
        for (var i = 0; i < 10 ** 8 * 5 * 3; i++) {
            counter++
        }
        return counter * (robots?.length || 0)
    }

    const bigNum = useMemo(getBigNum, [robots?.length])

    const { type, model, minBatteryStatus } = filterBy
    return <section className="robot-index">
        <h1>Welcome! this is our robots</h1>
        <h1>Big num is {bigNum}</h1>
        <button onClick={() => setPopo(prev => !prev)}>{popo ? 'Yes popo' : 'No popo'}</button>
        <button onClick={onSpendBalance}>Spend Balance</button>
        <Link to="/robot/edit"><button>Add new robot</button></Link>

        <RobotFilterType onSetFilter={onSetFilter} filterBy={{ type }} />
        <RobotFilter onSetFilter={onSetFilter} filterBy={{ model, minBatteryStatus }} />
        {!isLoading && <RobotList
            robots={robots}
            onRemoveRobot={onRemoveRobot}
            onUpdateRobot={onUpdateRobot}
            number={5}
            obj={[]}
             />}
        {isLoading && <div>Loading..</div>}

        <Outlet context={{ title: 'hi', onAddRobot, onUpdateRobot }} />
    </section>

}
