import { useEffect, useState } from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { useForm } from "../customHooks/useForm"

export function RobotFilterType({ filterBy, onSetFilter }) {
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)

    return (
        <section className="robot-filter">
            Choose your type
            <select value={filterByToEdit.type} onChange={handleChange}
                id="type" name="type" >
                <option value="">Choose a type</option>
                <option value="Cooking">Cooking</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Pleasure">Pleasure</option>
                <option value="Office">Office</option>
            </select>
        </section>
    )
}
