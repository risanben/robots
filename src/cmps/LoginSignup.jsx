import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './ImgUploader'
import { loadUsers } from '../store/actions/user.actions'
import { useSelector } from 'react-redux';

export function LoginSignup(props) {
    const users = useSelector(storeState => storeState.userModule.users)
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        loadUsers()
    }, [])


    function clearState() {
        setCredentials(userService.getEmptyUser())
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    async function onLogin(ev) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        await props.onLogin(credentials)
        clearState()
    }

    async function onSignup(ev) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        await props.onSignup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(prevIsSignup => !prevIsSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
    }
    return (
        <div className="login-page">
            <p>
                <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
            </p>
            {!isSignup && <form className="login-form" onSubmit={onLogin}>
                <select
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                >
                    <option value="">Select User</option>
                    {users.map(user => <option key={user.id} value={user.username}>{user.fullname}</option>)}
                </select>
                {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    /> */}
                <button>Login!</button>
            </form>}
            <div className="signup-section">
                {isSignup && <form className="signup-form" onSubmit={onSignup}>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Fullname"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <ImgUploader onUploaded={onUploaded} />
                    <button >Signup!</button>
                </form>}
            </div>
        </div>
    )
}