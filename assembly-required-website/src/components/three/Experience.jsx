import { useEffect, useState } from 'react'
import { Environment, Sparkles, useProgress, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Containers from './models/Containers.jsx'
import Robot from './models/Robot.jsx'
import Scene from './models/Scene.jsx'

export default function Experience({ 
    setWebsiteState,
    robotAnimationState,
    robotDialogueState,
    packageContainers,
    chosenPackage,
    chosenContainer
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
        <ambientLight color='#e6f7ff' intensity={ 1.5 } />
        <directionalLight position={[ 0, 2, 2 ]} intensity={ 2.5 } />

        <Robot 
            setWebsiteState={ setWebsiteState }
            setCameraPosition={ setCameraPosition }
            animationState={ robotAnimationState } 
            dialogueState={ robotDialogueState }
            chosenPackage={ chosenPackage }
            chosenContainer={ chosenContainer }
        />
        <Containers packageContainers={ packageContainers } />
        <Scene />

        <Sparkles 
            count={ 120 }
            scale={[ 8, 2, 2 ]}
            size={ 3 }
            speed={ 0.5 }
            position-y={ 1 }
        />

        {/* <Environment preset='warehouse' environmentIntensity={ 0.8 } /> */}
    </>
}