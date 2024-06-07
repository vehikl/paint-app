import './Resources/App.css';
import { MyCanvas } from './Components/MyCanvas';
import { Navbar } from './Components/Navbar';
import { useState } from 'react';
import { Footer } from './Components/Footer';

function App() {
    const localStorageImages = localStorage.getItem('images');

    const initialShapes = {
        rectangles: [],
        ellipses: [],
        lines: [],
        texts: [],
        images: localStorageImages ? JSON.parse(localStorageImages) : [],
    };

    const [mouseState, setMouseState] = useState('rectangle');
    const [shapes, setShapes] = useState(initialShapes);
    const [zoom, setZoom] = useState(100);

    return (
        <div className="container">
            <Navbar
                mouseState={mouseState}
                setMouseState={setMouseState}
                setShapes={setShapes}
            />
            <MyCanvas
                mouseState={mouseState}
                shapes={shapes}
                setShapes={setShapes}
                zoom={zoom}
            />
            <Footer zoom={zoom} setZoom={setZoom} />
        </div>
    );
}

export default App;
