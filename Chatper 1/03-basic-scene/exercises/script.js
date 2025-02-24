

console.log(THREE)

// Scene
const scene = new THREE.Scene()

// Red Cube 
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xABC1FF })
const mesh = new THREE.Mesh(geometry, material)

// add mesh to the scene
scene.add(mesh)

// Fonts
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            '.Catalina',
            {
                font: font,
                size: 0.5,
                height: 0.2,
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
            donut.position.y = (Math.random() - 0.5) * 10
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



// Sizes
const sizes = {
    width: 800,
    height: 600

}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

scene.add(camera)

// renderer 
const canvas = document.querySelector('.webgl')

const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)