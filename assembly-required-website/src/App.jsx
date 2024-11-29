import { Canvas } from '@react-three/fiber'
import Experience from './components/three/Experience.jsx'

export default function App() {
    return <div className=''>
        <div className=''>
            <Canvas>
                <Experience />
            </Canvas>
        </div>
    </div>
}