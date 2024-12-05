import { useEffect, useState } from 'react'
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
    const [ packageColors, setPackageColors ] = useState([
        '#4C6053',
        '#79A389',
        '#B0CBBA',
        '#EFA29A',
        '#C84C4C',
        '#8C1415'
    ])

    const handleNewUserIntro = () => {
        setRobotAnimationState( 'idle' )

        setTimeout(() => {
            setRobotDialogueState({
                section: 'intro',
                readingType: 'all'
            })
        }, 1500);
    }

    const handleReturningUser = () => {
        setRobotAnimationState( 'idle' )

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
        if ( websiteState === 'navigation' ) {
            console.log( 'navigation component activated' )
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
                />
            </Canvas>
        </div>
    </div>
}