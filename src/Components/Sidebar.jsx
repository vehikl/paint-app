export const Sidebar = ({shapes, setShapes}) => {

    function generateShape() {
        return  {
            id: Math.random().toString(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 180,
            isDragging: false,
        };
    }
    const addRectangle = () => {
        setShapes({
            ...shapes,
            rectangles: [
                generateShape()
            ]
        })
    }

    return (
        <div className={"sidebarContainer"}>
            <div className='sidebar'>
                <button onClick={() => addRectangle()}>Square</button>
                <button>Star</button>
            </div>
        </div>
    )
}
