import { useMemo } from 'react'
import * as THREE from 'three'

export default function BasicOutline() {
    const THICKNESS = useMemo( () => {
        return 0.015
    }, [] )

    return new THREE.ShaderMaterial({
        vertexShader: `
            void main() {
                vec3 newPosition = position + normal * ${ THICKNESS };
                gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
            }
        `,
        fragmentShader: `
            void main() {
                gl_FragColor = vec4( 255, 255, 255, 1 );
            }
        `,
        side: THREE.BackSide
    })
}