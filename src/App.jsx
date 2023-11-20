
import './Resources/App.css'
import {MyCanvas} from "./components/MyCanvas";
import {Navbar} from "./components/Navbar";
import {useState} from "react";

function App() {

    const initialShapes = {
        rectangles: [],
        ellipses: [],
        lines: [],
        texts: [],
    };

    const [mouseState, setMouseState] = useState('rectangle');
    const [shapes, setShapes] = useState(initialShapes);

    return (
        <div className="container">
            <Navbar mouseState={mouseState} setMouseState={setMouseState} />
            <MyCanvas mouseState={mouseState} shapes={shapes}  setShapes={setShapes} />
        </div>
    )
}

export default App
