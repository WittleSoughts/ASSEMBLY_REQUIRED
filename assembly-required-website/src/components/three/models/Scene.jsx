import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Scene(props) {
  const { nodes, materials } = useGLTF('/models/scene.glb')

  return (
    <group {...props} dispose={null}>
      <group>
        <mesh geometry={nodes.floor.geometry} material={nodes.floor.material} />
        <mesh geometry={nodes['back-wall-LARGE'].geometry} material={nodes['back-wall-LARGE'].material} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/scene.glb')
