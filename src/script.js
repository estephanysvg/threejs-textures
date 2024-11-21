import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// const image = new Image()

// //Todavía no se ha cargado la imagen pero para que no tengamos errores con el scoping
// const texture = new THREE.Texture(image)
// // En nuevas versiones de three.js para que el color se vea de forma correcta tendremos que especificar que es SRGBColorSpace
// texture.colorSpace = THREE.SRGBColorSpace

// image.onload = () => {
//     //En vez de ponerlo aquí todo el codio le decimos que se re-renderice una vez se ha cargado
//     texture.needsUpdate = true
// }

// image.src = '/textures/door/color.jpg'

const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () => {
//     console.log('onStart');
// }

// loadingManager.onLoad = () => {
//     console.log('onLoad');
// }

// loadingManager.onProgress = () => {
//     console.log('onProgress');
// }

// loadingManager.onError = () => {
//     console.log('onError');
// }


const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
alphaTexture.colorSpace = THREE.SRGBColorSpace

const heightTexture = textureLoader.load('/textures/door/height.jpg')
heightTexture.colorSpace = THREE.SRGBColorSpace

const normalTexture = textureLoader.load('/textures/door/normal.jpg')
normalTexture.colorSpace = THREE.SRGBColorSpace

const ambientTexture = textureLoader.load('/textures/door/ambient.jpg')
ambientTexture.colorSpace = THREE.SRGBColorSpace

const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
metalnessTexture.colorSpace = THREE.SRGBColorSpace

const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
roughnessTexture.colorSpace = THREE.SRGBColorSpace






/**
 * Principios PBR (Phisically Based Rendering)
 * - Técnicas que tienden a seguir la vida real para conseguir resultados realistas
 * - Está llegando a ser el standar
 * - Popular 
*/

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()