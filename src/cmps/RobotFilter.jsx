import React, { useEffect, useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { useForm } from '../customHooks/useForm'

export function RobotFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)


    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    // console.log(filterByToEdit);
    return <form className="robot-filter" onSubmit={onSubmitFilter}>
        <label htmlFor="model">Model</label>
        <input type="text" id="model"
            placeholder="Search by model"
            name="model"
            onChange={handleChange}
            value={filterByToEdit.model} />

        <label htmlFor="status">Battery</label>
        <input type="number" id="status"
            name="minBatteryStatus"
            placeholder="Search by battery"
            value={filterByToEdit.minBatteryStatus || ''}
            onChange={handleChange}
        />

        <button>Filter</button>
    </form>
}
