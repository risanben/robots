export function FontsizeInput({ name, onChangeStyle }) {
    const fontSizes = ['14px', '18px', '22px', '26px']


    return <section className="color-input">
        <div className="items-container">
            {
                fontSizes.map(fontSize => <div
                    onClick={() => onChangeStyle({ fontSize })}
                    style={{ fontSize }}
                    key={fontSize}
                    className="item">
                    {fontSize}
                </div>)
            }
        </div>
        <p>Hello! {name} pick a font size!</p>
    </section>
}