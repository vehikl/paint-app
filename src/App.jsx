import './Resources/App.css';
import { MyCanvas } from './components/MyCanvas';
import { Navbar } from './components/Navbar';
import { useState } from 'react';

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
            />
        </div>
    );
}

export default App;
