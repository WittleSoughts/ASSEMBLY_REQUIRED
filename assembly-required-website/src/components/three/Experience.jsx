import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Scene from './models/Scene.jsx'

export default function Experience() {
    useFrame( ( state ) => {
        const camera = state.camera
        console.log( camera.position )
    } )

    return <>
        <OrbitControls />

        <Scene />
    </>
}