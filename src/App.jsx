
import './Resources/App.css'
import {MyCanvas} from "./components/MyCanvas.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {useState} from "react";

function App() {

    const [mouseState, setMouseState] = useState('rectangle');
    const [shapes, setShapes] = useState(null);

    return (
        <div className="container">
            <Navbar mouseState={mouseState} setMouseState={setMouseState} />
            <MyCanvas shapes={shapes} />
        </div>
    )
}

export default App
