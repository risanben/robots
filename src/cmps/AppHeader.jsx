import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { login, logout, signup } from "../store/actions/user.actions";
import { LoginSignup } from "./LoginSignup";
import { ThemeContext } from "../context/themeContext";
import { useContext } from "react";

export function AppHeader() {

    const { theme } = useContext(ThemeContext)

    const count = useSelector((storeState) => {
        return storeState.userModule.count
    })
    const numOfRobots = useSelector((storeState) => {
        return storeState.robotModule.robots?.length
    })

    const user = useSelector(storeState => storeState.userModule.user)


    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }


    return (
        <header className="app-header">
            <section className="container">
                <h1 className={theme}>Robots</h1>
                <h3>{numOfRobots} in the app</h3>

                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/robot">Robots</NavLink>
                </nav>
            </section>

            <section className="container">
                {user &&
                    <span className="user-info">
                        {user.imgUrl && <img src={user.imgUrl} />}
                        {user.fullname}
                        <span className="score">{user.balance?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <div className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </div>
                }
            </section>
        </header>
    )
}
