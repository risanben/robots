import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Suspense, lazy } from 'react';

import { store } from './store/store'

const About = lazy(() => import('./pages/About'))
const RobotIndex = lazy(() => import('./pages/RobotIndex'))
const RobotDetails = lazy(() => import('./pages/RobotDetails'))
const RobotEdit = lazy(() => import('./pages/RobotEdit'))

// import { About } from './pages/About'
// import { RobotIndex } from './pages/RobotIndex'
// import { RobotDetails } from './pages/RobotDetails'
// import { RobotEdit } from './pages/RobotEdit'

import { Home } from './pages/Home'

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg'
import { AboutVision } from './cmps/AboutVision'
import { AboutTeam } from './cmps/AboutTeam'
import { DynamicModal } from './cmps/DynamicModal'
import { ThemeContext, ThemeProvider } from './context/themeContext'


export function App() {
    return (
        <Provider store={store}>
            <Router>
                <ThemeProvider>
                    <section className='main-app'>
                        <AppHeader />

                        <main className='container'>
                            <Routes>
                                <Route path="/" element={<Home />} />

                                <Route path="/about" element={
                                    <Suspense fallback={<div>Loading page...</div>}>
                                        <About />
                                    </Suspense>
                                } >
                                    <Route path="/about/team" element={<AboutTeam />} />
                                    <Route path="/about/vision" element={<AboutVision />} />
                                </Route>

                                <Route path="/robot" element={
                                    <Suspense fallback={<div>Loading page...</div>}>
                                        <RobotIndex />
                                    </Suspense>
                                } >
                                    <Route path="/robot/edit/:robotId?" element={
                                        <Suspense fallback={<div>Loading page...</div>}>
                                            <RobotEdit />
                                        </Suspense>
                                    } />
                                </Route>
                                <Route path="/robot/:robotId" element={
                                    <Suspense fallback={<div>Loading page...</div>}>
                                        <RobotDetails />
                                    </Suspense>
                                } />
                            </Routes>
                        </main>
                        <DynamicModal />
                        <UserMsg />
                        <AppFooter />
                    </section>
                </ThemeProvider>
            </Router>
        </Provider >


    )
}
