import React, { useMemo } from 'react'
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import ICE_NORMAL_MAP from '../../../assets/images/ice-normal-map.jpg'

export default function Scene(props) {
  const { nodes, materials } = useGLTF('/models/scene.glb')

  const normalMap = useMemo( () => {
    const normalMap = useLoader( THREE.TextureLoader, ICE_NORMAL_MAP )

    return normalMap
  }, [] )

  return (
    <group { ...props } dispose={ null }>

      <group>
        <mesh geometry={ nodes.floor.geometry }>
          <meshStandardMaterial color='#FFFFFF' />
        </mesh>

        <mesh geometry={ nodes[ 'back-wall-LARGE' ].geometry }>
          <meshStandardMaterial color='#FFFFFF' />
        </mesh>
      </group>

    </group>
  )
}

useGLTF.preload('/models/scene.glb')
