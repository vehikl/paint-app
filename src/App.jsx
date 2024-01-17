
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

    const localStorageImages = localStorage.getItem("images");
    const [images, setImages] = useState(localStorageImages ? JSON.parse(localStorageImages) : []);

    console.log(images);

    return (
        <div className="container">
            <Navbar mouseState={mouseState} setMouseState={setMouseState} setImages={setImages} />
            <MyCanvas mouseState={mouseState} shapes={shapes}  setShapes={setShapes} images={images} />
        </div>
    )
}

export default App
