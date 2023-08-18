
import './Resources/App.css'
import {MyCanvas} from "./Components/MyCanvas.jsx";
import {Sidebar} from "./Components/Sidebar.jsx";
import {useState} from "react";

function generateShapes() {
    return [...Array(10)].map((_, i) => ({
        id: i.toString(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 180,
        isDragging: false,
    }));
}

const INITIAL_STATE = generateShapes();
function App() {

    const [shapes, setShapes] = useState({
        stars: INITIAL_STATE
    });

    return (
        <div className="container">
            <Sidebar shapes={shapes} setShapes={setShapes} />
            <MyCanvas shapes={shapes} />
        </div>
    )
}

export default App
