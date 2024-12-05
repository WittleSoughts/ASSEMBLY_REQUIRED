import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Containers({ packageContainers, ...props }) {
  const { nodes, materials } = useGLTF('/models/containers.glb')

  return (
    <group {...props} dispose={null}>
      <group>

        <group>
          <mesh geometry={ nodes.package_container_1.geometry }>
            <meshStandardMaterial color={ packageContainers?.container_1 } />
          </mesh>
          <mesh geometry={ nodes.package_container_light_1.geometry } material={ nodes.package_container_light_1.material } />
        </group>

        <group>
          <mesh geometry={ nodes.package_container_2.geometry }>
            <meshStandardMaterial color={ packageContainers?.container_2 } />
          </mesh>
          <mesh geometry={ nodes.package_container_light_2.geometry } material={ nodes.package_container_light_2.material } />
        </group>

        <group>
          <mesh geometry={ nodes.package_container_3.geometry }>
            <meshStandardMaterial color={ packageContainers?.container_3 } />
          </mesh>
          <mesh geometry={ nodes.package_container_light_3.geometry } material={ nodes.package_container_light_3.material } />
        </group>

        <group>
          <mesh geometry={ nodes.package_container_4.geometry }>
            <meshStandardMaterial color={ packageContainers?.container_4 } />
          </mesh>
          <mesh geometry={ nodes.package_container_light_4.geometry } material={ nodes.package_container_light_4.material } />
        </group>

        <group>
          <mesh geometry={ nodes.package_container_5.geometry }>
            <meshStandardMaterial color={ packageContainers?.container_5 } />
          </mesh>
          <mesh geometry={ nodes.package_container_light_5.geometry } material={ nodes.package_container_light_5.material } />
        </group>

        <group>
          <mesh geometry={ nodes.package_container_6.geometry }>
            <meshStandardMaterial color={ packageContainers?.container_6 } />
          </mesh>
          <mesh geometry={ nodes.package_container_light_6.geometry } material={ nodes.package_container_light_6.material } />
        </group>

      </group>
    </group>
  )
}

useGLTF.preload('/models/containers.glb')
