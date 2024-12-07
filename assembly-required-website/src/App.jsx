import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/three/Experience.jsx'
import LoadingScreen from './components/loading/LoadingScreen.jsx'
import Navigation from './components/navigation/Navigation.jsx'

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
    const [ packageContainers, setPackageContainers ] = useState([ //
        { index: 1, color: '#EFA29A' },
        { index: 2, color: '#B0CBBA' },
        { index: 3, color: '#C84C4C' },
        { index: 4, color: '#79A389' },
        { index: 5, color: '#8C1415' },
        { index: 6, color: '#4C6053' }
    ])
    const [ chosenPackage, setChosenPackage ] = useState( '#FFFFFF' )
    const [ chosenContainer, setChosenContainer ] = useState( null ) //

    const isAgentTraining = useRef( false ) //

    const executeChosenAction = ( pickedContainer ) => {
        setTimeout(() => {
            setRobotAnimationState( `container_${ pickedContainer.index }` )
        }, 1000);
    }

    const chooseRandomContainer = () => {
        const randomIndex = Math.floor( Math.random() * packageContainers.length )
        const pickedContainer = packageContainers[ randomIndex ]

        setChosenContainer( pickedContainer )
        return pickedContainer
    }

    const trainingStep = ( packageColor ) => {
        const pickedContainer = chooseRandomContainer()
        console.log( `[*] CHOOSING CONTAINER:: index: ${ pickedContainer.index } | color: ${ pickedContainer.color }` )

        executeChosenAction( pickedContainer )
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
        console.log( `[*] CHOOSING PACKAGE COLOR:: ${ packageColor }` )

        return packageColor
    }

    const runTraining = () => {
        const packageColor = initializeEnvironment()
        trainingStep( packageColor )
    }

    const handleUserIntro = () => {
        setIsWebsiteLoading( false )

        if ( isNewUser ) {
            setTimeout(() => {
                setRobotDialogueState({
                    section: 'intro',
                    readingType: 'all'
                })
            }, 500)
        } else {
            setTimeout(() => {
                setRobotDialogueState({
                    section: 'greetings',
                    readingType: 'random'
                })
            }, 500)
        }
    }

    useEffect( () => {
        if ( websiteState === 'navigation-home' ) {
            
        } else if ( websiteState === 'navigation-feedback' ) {

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

        {
            websiteState === 'drop_package'
            &&
            <div className='fixed top-0 left-0 w-full h-full z-40'>
                <Navigation
                    websiteState={ websiteState }
                    runTraining={ runTraining }
                />
            </div>
        }

        <div className='fixed top-0 left-0 w-full h-full z-30'>
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
                    chosenPackage={ chosenPackage }
                    chosenContainer={ chosenContainer }
                />
            </Canvas>
        </div>
    </div>
}