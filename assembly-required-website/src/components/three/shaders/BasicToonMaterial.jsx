import * as THREE from 'three'

export default function BasicToonMaterial({ color = '#FFFFFF', gradientMap }) {
    gradientMap.minFilter = gradientMap.magFilter = THREE.NearestFilter

    return <meshToonMaterial color={ color } gradientMap={ gradientMap } />
}