import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/three/Experience.jsx'

export default function App() {
    const [ websiteState, setWebsiteState ] = useState( 'intro' )
    const [ isNewUser, setIsNewUser ] = useState( false )
    const [ robotAnimationState, setRobotAnimationState ] = useState( null )
    const [ robotDialogueState, setRobotDialogueState ] = useState({
        section: '',
        readingType: ''
    })

    const handleNewUserIntro = () => {
        setRobotAnimationState( 'intro' )

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

    const handleExperienceLoaded = () => {
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
        <div className='fixed top-0 left-0 w-full h-full z-10'>
            <Canvas
                camera={{
                    position: [ 0, 0.6, 2.2 ]
                }}
            >
                <Experience 
                    setWebsiteState={ setWebsiteState }
                    handleExperienceLoaded={ handleExperienceLoaded } 
                    robotAnimationState={ robotAnimationState }
                    robotDialogueState={ robotDialogueState }
                />
            </Canvas>
        </div>
    </div>
}