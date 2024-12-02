import { useEffect, useState } from 'react'
import { Environment, useProgress, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Containers from './models/Containers.jsx'
import Robot from './models/Robot.jsx'
import Scene from './models/Scene.jsx'

export default function Experience({ 
    setWebsiteState,
    robotAnimationState,
    robotDialogueState
}) {
    const [ cameraPosition, setCameraPosition ] = useState( new THREE.Vector3( 0, 0.6, 2.2 ) )

    useFrame( ( state ) => {
        const camera = state.camera
        camera.position.lerp( cameraPosition, 0.1 )
        camera.lookAt( 0, 0.5, 0 )
    } )

    const { progress } = useProgress()
    useEffect( () => {
        if ( progress === 100 ) {
            console.log( '[+] 3D EXPERIENCE LOADED::' )
        }
    }, [] )

    return <>
        <Robot 
            setWebsiteState={ setWebsiteState }
            setCameraPosition={ setCameraPosition }
            animationState={ robotAnimationState } 
            dialogueState={ robotDialogueState }
        />
        <Containers />
        <Scene />

        <Environment preset='warehouse' environmentIntensity={ 0.8 } />
    </>
}