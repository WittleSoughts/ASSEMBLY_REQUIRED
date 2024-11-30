import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Robot({ animationState, ...props }) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/models/robot-transformed.glb')
  const { actions } = useAnimations(animations, group)

  useEffect( () => {
    if ( actions[ animationState ] ) {
      actions[ animationState ].play()
    }
  }, [ animationState ] )

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <group name="Bone">
            <group name="Bone001" position={[0, 0.639, 0]} />
          </group>
        </group>
        <mesh name="body" geometry={nodes.body.geometry} material={nodes.body.material} scale={0.3} />
        <mesh name="package" geometry={nodes['package'].geometry} material={nodes['package'].material} position={[0, 0.603, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/robot-transformed.glb')
