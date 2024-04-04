import { useContext, useState } from "react"
import { ColorInput } from "./dynamic-inputs/ColorInput"
import { FontsizeInput } from "./dynamic-inputs/FontSizeInput"
import { ThemeContext } from "../context/themeContext"

export function AppFooter() {
    const { theme, onToggleTheme } = useContext(ThemeContext)

    const [cmpType, setCmpType] = useState('color')
    const [footerStyle, setFooterStyle] = useState({
        backgroundColor: 'pink',
        fontSize: '20px'
    })

    function onChangeStyle(newStyle) {
        setFooterStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }



    return (
        <footer style={footerStyle}>
            <section className="container" >
                <h3 className={theme}>Choose your own style
                    <button onClick={onToggleTheme}>Toggle theme</button>
                </h3>
                <div>
                    <select
                        onChange={(ev) => { setCmpType(ev.target.value) }}
                        value={cmpType}
                    >
                        <option value="color">Color</option>
                        <option value="fontSize">Font Size</option>
                    </select>

                    <DynamicCmp cmpType={cmpType} name="Muki" onChangeStyle={onChangeStyle} />
                </div>

            </section>
        </footer >
    )
}


function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'color':
            return <ColorInput {...props} />
        case 'fontSize':
            return <FontsizeInput {...props} />
    }
}