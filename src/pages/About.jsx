import { useEffect } from "react"
import { Outlet } from "react-router"
import { Link } from "react-router-dom"

import { loadRobots } from "../store/actions/robot.actions"

import { showSuccessMsg } from "../services/event-bus.service"

import { Accordion } from "../cmps/Accordion"
import { onToggleModal } from "../store/actions/app.actions"

export default function About() {
    const cmpType = 'GoodBye'
    const cmps = ['Hello', 'GoodBye', 'WelcomeBack', 'Hello', 'GoodBye', 'Hello', 'GoodBye', 'Hello', 'GoodBye', 'Hello', 'GoodBye',]

    useEffect(() => {
        loadRobots()
    }, [])

    function sayHello() {
        showSuccessMsg('Hey user')
    }

    function onValidate() {
        const modalData = {
            cmp: Validate,
            props: {
                user: { fullname: 'Muki' },
                onApprove: () => {
                    showSuccessMsg('Approved!')
                    onToggleModal()
                }
            }
        }
        onToggleModal(modalData)
    }

    function onUserApproved() {
        showSuccessMsg('Approved')
    }

    return <div className="about">
{/* 
        <DynamicCmp>
            <div>asdasd</div>
        </DynamicCmp> */}

        {
            /* <section>
                <DynamicCmp cmpType={cmpType} name={'Muki'} />
    
                {
                    cmps.map((cmp, idx) => <DynamicCmp key={idx} cmpType={cmp} name={'Muki'} />)
                }
            </section> */
        }

        <section>
            <Accordion title="My Something" >
                <h3>Another Title</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum velit, illo possimus, facere eius magnam odit rem tempore inventore ducimus, beatae quam aliquam adipisci voluptates facilis harum! Odio, non nobis?</p>
            </Accordion>
            <Accordion title="My First Lorem">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptates, eveniet sapiente, in debitis ducimus, praesentium iusto
                similique labore ea et aperiam culpa veritatis necessitatibus beatae! Magnam
                iusto expedita recusandae error reiciendis esse totam, possimus reprehenderit sint
                maxime omnis dignissimos quisquam quod corporis quis quaerat odio accusantium inventore
                officiis, vitae eaque sed hic. Doloremque, necessitatibus aut
                adipisci at animi, culpa laudantium eum facere fuga officiis inventore?
            </Accordion>
            <Accordion title="My Second Lorem">
                Consectetur adipisicing elit. Maiores, obcaecati. Veniam,
                blanditiis libero. Cumque, illum! Reiciendis illum, dignissimos delectus
                hic aliquid unde facere modi quis fugiat, ratione ab molestias rem amet
                facilis cumque veritatis quasi. At in maxime suscipit excepturi nulla cum,
                repellat obcaecati ipsam molestiae sapiente mollitia quidem quam.
            </Accordion>
            <Accordion title="My Third Lorem">
                Quos inventore quae delectus, alias iusto recusandae eligendi
                vel dignissimos et quia ipsa exercitationem possimus perferendis
                eum minima sit officiis placeat tenetur, facilis eaque ipsum
                reprehenderit animi enim quas? Sequi?
            </Accordion>
        </section>
        <section>

            <h1 onClick={() => sayHello()}>We are all about robots</h1>
            <button onClick={onValidate}>Validate user</button>
            <nav>
                <Link to="/about/team">Team</Link>
                <Link to="/about/vision">Vision</Link>
            </nav>

            <Outlet />
        </section>
        <section>

        </section>


    </div>
}

function Validate({ user, onApprove }) {
    return (
        <section className="flex column space-around align-center">
            <h2>Welcome {user?.fullname}!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod perferendis vitae recusandae optio eum expedita, quasi maxime laudantium iste ex, quam quas obcaecati culpa! Quo ex ratione at omnis, deserunt totam non doloribus minus eum inventore ipsam sint recusandae blanditiis quaerat dignissimos voluptates iusto vitae cupiditate voluptatibus expedita incidunt magni. Corporis accusamus, quidem omnis sapiente ad impedit nihil, ut eligendi aut a at inventore. Perspiciatis quas accusamus non doloribus nihil quam quisquam dolorem dolorum. Cumque, voluptatem facere fugit officiis sequi nesciunt accusamus repellat aliquid, enim ab aut ex velit sapiente dolore, voluptas expedita pariatur necessitatibus? Cumque, ea architecto? Maxime, numquam!</p>
            <button onClick={onApprove} className="simple-button">Approve</button>
        </section>
    )
}













function Hello({ name }) {
    return <h1>Hello there {name}</h1>
}
function GoodBye({ name }) {
    return <h1>Bye {name}</h1>
}
function WelcomeBack({ name }) {
    return <h1>Welcome back {name}</h1>
}



function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'Hello':
            return <Hello {...props} />
        case 'GoodBye':
            return <GoodBye {...props} />
        case 'WelcomeBack':
            return <WelcomeBack {...props} />
    }
}






































