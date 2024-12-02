import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Containers(props) {
  const { nodes, materials } = useGLTF('/models/containers.glb')
  return (
    <group {...props} dispose={null}>
      <group>
        <mesh geometry={nodes.package_container_2.geometry} material={nodes.package_container_2.material} />
        <mesh geometry={nodes.package_container_1.geometry} material={nodes.package_container_1.material} />
        <mesh geometry={nodes.package_container_3.geometry} material={nodes.package_container_3.material} />
        <mesh geometry={nodes.package_container_5.geometry} material={nodes.package_container_5.material} />
        <mesh geometry={nodes.package_container_4.geometry} material={nodes.package_container_4.material} />
        <mesh geometry={nodes.package_container_6.geometry} material={nodes.package_container_6.material} />
        <mesh geometry={nodes.package_container_light_2.geometry} material={nodes.package_container_light_2.material} />
        <mesh geometry={nodes.package_container_light_1.geometry} material={nodes.package_container_light_1.material} />
        <mesh geometry={nodes.package_container_light_3.geometry} material={nodes.package_container_light_3.material} />
        <mesh geometry={nodes.package_container_light_5.geometry} material={nodes.package_container_light_5.material} />
        <mesh geometry={nodes.package_container_light_4.geometry} material={nodes.package_container_light_4.material} />
        <mesh geometry={nodes.package_container_light_6.geometry} material={nodes.package_container_light_6.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/containers.glb')
