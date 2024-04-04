
export function ColorInput({ name, onChangeStyle }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']

    function onChangeColor(color) {
        const newStyle = { backgroundColor: color }
        onChangeStyle(newStyle)
    }

    return <section className="color-input">
        <div className="items-container">
            {
                colors.map(color => <div
                    onClick={() => onChangeColor(color)}
                    key={color}
                    style={{ backgroundColor: color }}
                    className="item"
                >
                </div>)
            }
        </div>
        <h3>Hello {name} pick a color!</h3>
    </section>
}