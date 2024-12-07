import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import BasicOutline from '../shaders/BasicOutline'
import BasicToonMaterial from '../shaders/BasicToonMaterial.jsx'
import TOON_TONE from '../../../assets/images/fourTone.jpg'

export default function Containers({ packageContainers, ...props }) {
  const { nodes, materials } = useGLTF('/models/containers.glb')

  const gradientMap = useMemo( () => {
    const gradientMap = useLoader( THREE.TextureLoader, TOON_TONE )

    return gradientMap
  }, [] )

  return (
    <group {...props} dispose={null}>
      <group>

        <group>
          <mesh geometry={ nodes.package_container_1.geometry } material={ BasicOutline() } renderOrder={ 1 } />
          <mesh geometry={ nodes.package_container_1.geometry } renderOrder={ 2 }>
            <BasicToonMaterial color={ packageContainers[ 0 ]?.color } gradientMap={ gradientMap } />
          </mesh>
        </group>

        <group>
          <mesh geometry={ nodes.package_container_2.geometry } material={ BasicOutline() } renderOrder={ 1 } />
          <mesh geometry={ nodes.package_container_2.geometry } renderOrder={ 2 }>
            <BasicToonMaterial color={ packageContainers[ 1 ]?.color } gradientMap={ gradientMap } />
          </mesh>
        </group>

        <group>
          <mesh geometry={ nodes.package_container_3.geometry } material={ BasicOutline() } renderOrder={ 1 } />
          <mesh geometry={ nodes.package_container_3.geometry } renderOrder={ 2 }>
            <BasicToonMaterial color={ packageContainers[ 2 ]?.color } gradientMap={ gradientMap } />
          </mesh>
        </group>

        <group>
          <mesh geometry={ nodes.package_container_4.geometry } material={ BasicOutline() } renderOrder={ 1 } />  
          <mesh geometry={ nodes.package_container_4.geometry } renderOrder={ 2 }>
            <BasicToonMaterial color={ packageContainers[ 3 ]?.color } gradientMap={ gradientMap } />
          </mesh>
        </group>

        <group>
          <mesh geometry={ nodes.package_container_5.geometry } material={ BasicOutline() } renderOrder={ 1 } />
          <mesh geometry={ nodes.package_container_5.geometry } renderOrder={ 2 }>
            <BasicToonMaterial color={ packageContainers[ 4 ]?.color } gradientMap={ gradientMap } />
          </mesh>
        </group>

        <group>
          <mesh geometry={ nodes.package_container_6.geometry } material={ BasicOutline() } renderOrder={ 1 } />
          <mesh geometry={ nodes.package_container_6.geometry } renderOrder={ 2 }>
            <BasicToonMaterial color={ packageContainers[ 5 ]?.color } gradientMap={ gradientMap } />
          </mesh>
        </group>

      </group>
    </group>
  )
}

useGLTF.preload('/models/containers.glb')
