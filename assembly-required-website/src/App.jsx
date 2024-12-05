import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/three/Experience.jsx'
import LoadingScreen from './components/loading/LoadingScreen.jsx'

export default function App() {
    const [ isWebsiteLoading, setIsWebsiteLoading ] = useState( true )
    const [ websiteState, setWebsiteState ] = useState( 'intro' )
    const [ isNewUser, setIsNewUser ] = useState( false )
    const [ robotAnimationState, setRobotAnimationState ] = useState( 'idle' )
    const [ robotDialogueState, setRobotDialogueState ] = useState({
        section: '',
        readingType: ''
    })
    const [ packageColors, setPackageColors ] = useState([ //
        '#4C6053',
        '#79A389',
        '#B0CBBA',
        '#EFA29A',
        '#C84C4C',
        '#8C1415'
    ])
    const [ packageContainers, setPackageContainers ] = useState({ //
        container_1: '#EFA29A',
        container_2: '#B0CBBA',
        container_3: '#C84C4C',
        container_4: '#79A389',
        container_5: '#8C1415',
        container_6: '#4C6053'
    })
    const [ chosenPackage, setChosenPackage ] = useState( null )
    const [ chosenContainer, setChosenContainer ] = useState( null ) //

    const isAgentTraining = useRef( false ) //

    const chooseRandomContainer = () => {
        const keys = Object.keys( packageContainers )
        const randomKey = Math.floor( Math.random() * keys.length )
        const pickedKey = keys[ randomKey ]

        const pickedContainer = packageContainers[ pickedKey ]

        setChosenContainer( pickedContainer )
        return pickedContainer
    }

    const trainingStep = ( packageColor ) => {
        const pickedContainer = chooseRandomContainer()
        console.log( pickedContainer )

        while( isAgentTraining.current === true ) {

        }
    }

    const resetRobot = ( newAnimationState ) => {
        setRobotAnimationState( newAnimationState )
    }

    const createPackage = () => {
        const randomIndex = Math.floor( Math.random() * packageColors.length )
        const pickedPackage = packageColors[ randomIndex ]

        setChosenPackage( pickedPackage )
        return pickedPackage
    }

    const initializeEnvironment = () => {
        isAgentTraining.current = true

        const packageColor = createPackage()

        resetRobot( 'handle_package' )

        return packageColor
    }

    const runTraining = () => {
        const packageColor = initializeEnvironment()
        trainingStep( packageColor )
    }

    const handleNewUserIntro = () => {
        setTimeout(() => {
            setRobotDialogueState({
                section: 'intro',
                readingType: 'all'
            })
        }, 1500);
    }

    const handleReturningUser = () => {
        setTimeout(() => {
            setRobotDialogueState({
                section: 'greetings',
                readingType: 'random'
            })
        }, 1000);
    }

    const handleUserIntro = () => {
        setIsWebsiteLoading( false )

        if ( isNewUser ) {
            handleNewUserIntro()
        } else {
            handleReturningUser()
        }
    }

    useEffect( () => {
        if ( websiteState === 'training' ) {
            runTraining()
        }
    }, [ websiteState ] )

    // useEffect( () => {
    //     const hasVisitedSite = localStorage.getItem( 'hasVisited' )
    //     if ( hasVisitedSite ) {
    //         setIsNewUser( false )
    //     } else {
    //         setIsNewUser( true )
    //         localStorage.setItem( 'hasVisited', true )
    //     }
    // }, [] )

    return <div className='fixed top-0 left-0 w-full h-full uppercase overflow-hidden'>
        { 
            isWebsiteLoading 
            && 
            <div className='fixed top-0 left-0 w-full h-full z-50'>
                <LoadingScreen 
                    handleUserIntro={ handleUserIntro }
                /> 
            </div>
        }

        <div className='fixed top-0 left-0 w-full h-full z-10'>
            <Canvas
                camera={{
                    position: [ 0, 0.6, 2.2 ]
                }}
            >
                <Experience 
                    setWebsiteState={ setWebsiteState }
                    robotAnimationState={ robotAnimationState }
                    robotDialogueState={ robotDialogueState }
                    packageContainers={ packageContainers }
                />
            </Canvas>
        </div>
    </div>
}