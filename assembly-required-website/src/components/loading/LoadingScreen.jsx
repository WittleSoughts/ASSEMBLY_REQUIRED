import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function LoadingScreen({ handleUserIntro }) {
    const loadingScreenRef = useRef( null )

    useEffect( () => {
        const tl = gsap.timeline({
            onComplete: handleUserIntro
        })

        tl.to( loadingScreenRef.current, {
            opacity: 0,
            duration: 1,
            delay: 2
        } )
    }, [] )

    return <div ref={ loadingScreenRef } className="w-full h-full bg-white opacity-1">
        
    </div>
}