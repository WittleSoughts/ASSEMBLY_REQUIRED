import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import customToonShader from '../shaders/customToonShader'

export default function CustomSphere(props) {
  const { nodes, materials } = useGLTF( '/models/custom_sphere-transformed.glb' )

  const toonShader = useMemo( () => customToonShader(), [] )

  return (
    <group position={[ 0, 0.5, 0 ]} { ...props } dispose={ null }>
      <group>
        <mesh geometry={ nodes.custom_sphere.geometry } material={ toonShader } />
      </group>
    </group>
  )
}

useGLTF.preload( '/models/custom_sphere-transformed.glb' )
