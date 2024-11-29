import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Scene(props) {
  const { nodes, materials } = useGLTF('/models/scene-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group>
        <mesh geometry={nodes.floor.geometry} material={nodes.floor.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/scene-transformed.glb')
