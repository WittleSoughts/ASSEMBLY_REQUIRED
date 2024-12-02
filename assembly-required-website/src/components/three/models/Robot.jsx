import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { Html, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import dialogueScript from '../../../assets/data/dialogueScript'

export default function Robot({ 
  setWebsiteState, 
  animationState, 
  dialogueState, 
  setCameraPosition, 
  ...props 
}) {
  const [ currentDialogueText, setCurrentDialogueText ] = useState( '' )
  const [ isSpeaking, setIsSpeaking ] = useState( false )
  const [ isPackageShown, setIsPackageShown ] = useState( false )
  const [ isWaitingForUserClick, setIsWaitingForUserClick ] = useState( false )

  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/robot-transformed.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  const robotRef = useRef( null )
  const currentSectionRef = useRef( null )
  const currentReadingTypeRef = useRef( null )
  const currentScriptSectionLineRef = useRef( 0 )

  const [ packageMaterial, scriptData ] = useMemo( () => {
    const material = nodes['package'].material.clone()
    material.transparent = true;
    material.opacity = 0

    return [ material, dialogueScript ]
  } )

  const parseDisplayChar = ( newChar ) => {
    setCurrentDialogueText( ( prev ) => prev + newChar )
  }

  const parseDialogueLine = ( text, onComplete ) => {
    setCurrentDialogueText( '' )
    let index = 0

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
        
        if ( setWebsiteState ) {
          setTimeout( () => {
            setCameraPosition( new THREE.Vector3( 0, 0.6, 2.2 ) )
            setWebsiteState( 'navigation' )
          }, 500)
        }
      }

      document.addEventListener( 'click', handleClick )
    }
  }

  const speak = () => {
    if ( !isSpeaking ) {
      setIsSpeaking( true )
      
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
    packageMaterial.opacity = isPackageShown ? 1 : 0
  }, [ isPackageShown ] )

  useEffect( () => {
    if ( actions[ animationState ] ) {
      switch ( animationState ) {
        case 'intro':
          actions[ animationState ].reset().fadeIn( 0.5 ).setLoop( THREE.LoopOnce ).play().clampWhenFinished = true
          setTimeout(() => {
            setCameraPosition( new THREE.Vector3( 0, 0.4, 1.6 ) )
          }, 1000)
          break

        case 'idle':
          actions[ animationState ].reset().fadeIn( 0.5 ).setLoop( THREE.LoopRepeat ).play()
          setTimeout(() => {
            setCameraPosition( new THREE.Vector3( 0, 0.4, 1.6 ) )
          }, 500);
          break

        default:
          break
      }
    }
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
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Bone} />
        </group>

        <group ref={ robotRef } >
          <skinnedMesh name="body" geometry={nodes.body.geometry} material={nodes.body.material} skeleton={nodes.body.skeleton}>
            <Html
              position={[ 0, 1.2, 0 ]}
              center
            >

              <div className={ `w-80 text-md text-black p-4 rounded-md text-center ${ isWaitingForUserClick ? 'animate-pulse' : '' }` } >
                { currentDialogueText }
              </div>

            </Html>
          </skinnedMesh>
        </group>

        <skinnedMesh name="face" geometry={nodes.face.geometry} material={nodes.face.material} skeleton={nodes.face.skeleton} />
        <skinnedMesh name="package" geometry={nodes['package'].geometry} material={ packageMaterial } skeleton={nodes['package'].skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/robot-transformed.glb')
