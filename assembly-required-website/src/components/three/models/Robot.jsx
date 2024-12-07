import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGraph, useLoader } from '@react-three/fiber'
import { Html, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import BasicOutline from '../shaders/BasicOutline'
import BasicToonMaterial from '../shaders/BasicToonMaterial'
import dialogueScript from '../../../assets/data/dialogueScript'
import TOON_TONE from '../../../assets/images/fourTone.jpg'

export default function Robot({ 
  setWebsiteState, 
  setCameraPosition, 
  animationState, 
  dialogueState, 
  chosenPackage,
  chosenContainer,
  ...props 
}) {
  const [ currentDialogueText, setCurrentDialogueText ] = useState( '' )
  const [ isSpeaking, setIsSpeaking ] = useState( false )
  const [ isPackageShown, setIsPackageShown ] = useState( true )
  const [ isWaitingForUserClick, setIsWaitingForUserClick ] = useState( false )

  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/robot-transformed.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  const robotRef = useRef( null )
  const currentRobotAnimation = useRef( null )
  const currentSectionRef = useRef( null )
  const currentReadingTypeRef = useRef( null )
  const currentScriptSectionLineRef = useRef( 0 )

  const [ gradientMap, scriptData ] = useMemo( () => {
    const gradientMap = useLoader( THREE.TextureLoader, TOON_TONE )

    return [ gradientMap, dialogueScript ]
  } )

  const playRobotAnimation = ( animationName ) => {
    if ( actions[ animationName ] ) {
      actions[ animationName ].reset().fadeIn( 0.5 ).setLoop( THREE.LoopOnce ).play().clampWhenFinished = true
    }
  }

  const parseDisplayChar = ( newChar ) => {
    setCurrentDialogueText( ( prev ) => prev + newChar )
  }

  const parseDialogueLine = ( text, onComplete ) => {
    setCurrentDialogueText( '' )
    let index = 0

    playRobotAnimation( 'talk' )

    const parseNextChar = () => {
      if ( index >= text.length ) {
        currentScriptSectionLineRef.current += 1

        if ( onComplete ) {
          onComplete()
        }

        return
      }

      const char = text[ index ]
      if ( char === '|' ) {
        let delayMarker = ''
        index++

        while ( index < text.length && /\d/.test( text[ index ] ) ) {
          delayMarker += text[ index ]
          index++
        }

        const parsedDelayMarker = parseInt( delayMarker, 10 ) || 500

        setTimeout( parseNextChar, parsedDelayMarker )
      } else {
        parseDisplayChar( char )
        index ++

        setTimeout( parseNextChar, Math.floor( Math.random() * 60 ) + 12 )
      }
    }
    parseNextChar()
  }

  const parseOnComplete = () => {
    setIsSpeaking( false )

    if ( 
          dialogueState.readingType === 'all' 
          && 
          currentScriptSectionLineRef.current < scriptData[ dialogueState.section ].length 
    ) {
      setIsWaitingForUserClick( true )

      const handleClick = () => {
        document.removeEventListener( 'click', handleClick )

        setIsWaitingForUserClick( false )
        speak()
      }

      document.addEventListener( 'click', handleClick )
    } else {
      setIsWaitingForUserClick( true )
      currentScriptSectionLineRef.current = 0

      const handleClick = () => {
        document.removeEventListener( 'click', handleClick )

        setIsWaitingForUserClick( false )
        setCurrentDialogueText( '' )
        
        setCameraPosition( new THREE.Vector3( 0, 0.6, 2.2 ) )
        if ( setWebsiteState ) {
          setTimeout( () => {
            setWebsiteState( 'training' )
          }, 1000)
        }
      }

      document.addEventListener( 'click', handleClick )
    }
  }

  const speak = () => {
    if ( !isSpeaking ) {
      setIsSpeaking( true )
      setCameraPosition( new THREE.Vector3( 0, 0.4, 1.6 ) )
      
      let lineIndex 
      switch ( dialogueState.readingType ) {
        case 'all':
          lineIndex = currentScriptSectionLineRef.current
          break;
        case 'random':
          lineIndex = Math.floor( Math.random() * scriptData[ dialogueState.section ].length )
          break;
      
        default:
          break;
      }

      const line = scriptData[ dialogueState.section ]?.[ lineIndex ]
      if ( line ) {
        parseDialogueLine( line.text, parseOnComplete )
      }
    }
  }

  useEffect( () => {
    if ( actions[ animationState ] ) {
      if ( currentRobotAnimation.current ) {
        currentRobotAnimation.current.stop()
      }

      const newAnimation = actions[ animationState ]
      switch ( animationState ) {
        case 'handle_package':
          newAnimation.reset().fadeIn( 0.5 ).setLoop( THREE.LoopOnce ).play().clampWhenFinished = true
          break

        default:
          newAnimation.reset().fadeIn( 0.5 ).setLoop( THREE.LoopOnce ).play().clampWhenFinished = true
          break
      }

      currentRobotAnimation.current = newAnimation
    }

    return () => actions[ animationState ]?.fadeOut( 0.5 )
  }, [ animationState ] )

  useEffect( () => {
    if ( dialogueState ) {
      currentSectionRef.current = dialogueState.section
      currentReadingTypeRef.current = dialogueState.readingType

      if ( currentSectionRef.current && currentReadingTypeRef.current ) {
        speak()
      }
    }
  }, [ dialogueState ] )

  return (
    <group ref={ group } { ...props } dispose={ null }>
      <group name="Scene">
        <group name="Armature">
          <primitive object={ nodes.Bone } />
        </group>

        <group ref={ robotRef } >
          <skinnedMesh name="body" geometry={nodes.body.geometry} skeleton={nodes.body.skeleton}>
            <Html
              position={[ 0, 1.2, 0 ]}
              center
            >

              <div className={ `w-80 text-md text-black p-4 rounded-md text-center ${ isWaitingForUserClick ? 'animate-pulse' : '' }` } >
                { currentDialogueText }
              </div>

            </Html>
            <BasicToonMaterial color='#919090' gradientMap={ gradientMap } />
          </skinnedMesh>
          
        </group>

        <skinnedMesh name="face" geometry={nodes.face.geometry} skeleton={nodes.face.skeleton}>
          <BasicToonMaterial color='#808080' gradientMap={ gradientMap } />
        </skinnedMesh>

        <skinnedMesh name="package" geometry={nodes['package'].geometry} skeleton={nodes['package'].skeleton}>
          <meshStandardMaterial color={ chosenPackage } />
        </skinnedMesh>
        
      </group>
    </group>
  )
}

useGLTF.preload('/models/robot-transformed.glb')
