import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Containers(props) {
  const { nodes, materials } = useGLTF('/models/containers-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group>
        <mesh geometry={nodes.container_4.geometry} material={nodes.container_4.material} />
        <mesh geometry={nodes.container_light_4.geometry} material={nodes.container_light_4.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/containers-transformed.glb')
