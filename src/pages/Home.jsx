import { useRef, useState } from 'react'
import imgUrl from '../assets/imgs/react.png'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'

export function Home() {
    // const [count, setCount] = useState(0)
    const count = useSelector((storeState) => {
        return storeState.userModule.count
    })
    const dispatch = useDispatch()

    const elH1Ref = useRef()
    const elImgRef = useRef()
    async function onAnimate() {
        await utilService.animateCSS(elH1Ref.current, 'rubberBand')
        await utilService.animateCSS(elImgRef.current, 'hinge', false)
    }

    function onChangeCount(diff) {
        // setCount(prevCount => prevCount + diff)
        // dispatch({ type: 'INCREMENT' })
        dispatch({ type: 'CHANGE_BY', diff })
    }

    return (
        <section className="home">
            <h1 ref={elH1Ref}>Welcome to our Robots App</h1>

            <section>
                <h1>Count is {count}</h1>
                <button onClick={() => onChangeCount(1)}>+1</button>
                <button onClick={() => onChangeCount(10)}>+10</button>
            </section>

            <img ref={elImgRef} src={imgUrl} alt="" />

            <section>
                <button onClick={onAnimate}>Animate</button>
            </section>
        </section>
    )
}
