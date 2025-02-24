import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


console.log(`this is`, THREE)
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/9.jpg')
const matcapTexture2 = textureLoader.load('/textures/matcaps/10.jpg')


// Fonts
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            '.Catalina',
            {
                font: font,
                size: 1,
                height: 0.2,
                letterSpacing: 500,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )


        textGeometry.center()

        const textMaterial = new THREE.MeshMatcapMaterial()
        textMaterial.matcap = matcapTexture
        textMaterial.wireframe = false
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)



        // Create second text object
        const textGeometry2 = new TextGeometry(
            'UX| UI - Web Development',
            {
                font: font,
                size: 0.3,
                height: 0.1,
                curveSegments: 10,
                bevelEnabled: false
            }
        )
        textGeometry2.center()

        const textMaterial2 = new THREE.MeshMatcapMaterial()
        textMaterial2.matcap = matcapTexture2
        textMaterial2.wireframe = false

        const text2 = new THREE.Mesh(textGeometry2, textMaterial2)
        text2.position.y = -1.0
        scene.add(text2)




        const donutGeometry = new THREE.TorusGeometry(0.08, 0.08, 20, 45)
        const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        for (let i = 0; i < 200; i++) {
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 15
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            // donut.scale.x = scale
            // donut.scale.y = scale
            // donut.scale.z = scale

            donut.scale.set(scale, scale, scale)
            scene.add(donut)
        }
    }
)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
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

    // Time
    // const cuerrentTime = Date.now()
    // const deltaTime = cuerrentTime - time
    // time = cuerrentTime
    // console.log(deltaTime)

    // // Update object
    // textMaterial.rotation.y = elapsedTime * Math.PI 

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()