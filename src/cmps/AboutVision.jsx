import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"

export function AboutVision() {

    const { txt } = useContext(ThemeContext)

    return (
        <>
            <h1>Our vision is {txt}</h1>
            <ul>
                <li>Take Over The World</li>
                <li>Save The World</li>
                <li>Eat</li>
            </ul>
        </>
    )
}