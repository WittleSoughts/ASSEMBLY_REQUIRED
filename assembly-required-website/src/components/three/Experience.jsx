import { useEffect } from 'react'
import { Environment, useProgress } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Containers from './models/Containers.jsx'
import Robot from './models/Robot.jsx'
import Scene from './models/Scene.jsx'

export default function Experience({ handleExperienceLoaded }) {
    useFrame( ( state ) => {
        const camera = state.camera
        camera.lookAt( 0, 0.5, 0 )
    } )

    const { progress } = useProgress()
    useEffect( () => {
        if ( progress === 100 ) {
            console.log( '[+] 3D EXPERIENCE LOADED::' )
            handleExperienceLoaded()
        }
    }, [] )

    return <>
        <Robot />
        <Containers />
        <Scene />

        <Environment preset='warehouse' environmentIntensity={ 0.8 } />
    </>
}