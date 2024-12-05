import { useMemo } from 'react'
import { ShaderMaterial } from 'three'

export default function customToonShader() {
    const vertexData = `
        attribute vec3 Color;
        varying vec3 vColor;
        varying vec3 vNormal;

        void main() {
            vColor = Color;
            vNormal = normal;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `
    const fragmentData = `
        varying vec3 vColor;
        varying vec3 vNormal;

        uniform vec3 lightDirection;
        uniform float steps;

        void main() {
            vec3 normalizedNormal = normalize( vNormal );
            vec3 normalizedLightDirection = normalize( lightDirection );

            float lightIntensity = max( dot( normalizedNormal, normalizedLightDirection ), 0.0 );

            float toonIntensity = floor( lightIntensity * steps ) / steps;

            vec3 finalColor = vColor * toonIntensity;

            gl_FragColor = vec4( finalColor, 1.0 );
        }
    `
    const uniformData = {
        lightDirection: { value: [ 1, 1, 1 ] },
        steps: { value: 3.0 }
    }

    
    return new ShaderMaterial({
        vertexShader: vertexData,
        fragmentShader: fragmentData,
        uniforms: uniformData,
        vertexColors: true
    }) 
}