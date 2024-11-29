import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/three/Experience.jsx'

export default function App() {
    const [ robotAnimationState, setRobotAnimationState ] = useState( null )

    const handleExperienceLoaded = () => {

    }

    useEffect( () => {

    }, [] )

    return <div className='fixed top-0 left-0 w-full h-full overflow-hidden'>
        <div className='fixed top-0 left-0 w-full h-full z-10'>
            <Canvas
                camera={{
                    position: [ 0, 0.6, 2.2 ]
                }}
            >
                <Experience handleExperienceLoaded={ handleExperienceLoaded } />
            </Canvas>
        </div>
    </div>
}