import * as THREE from 'three';

const scene = new THREE.Scene();
const aspect = window.innerWidth/window.innerHeight;
const camera = new THREE.OrthographicCamera(-7 * aspect, 7 * aspect, 7, -7, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const spotLight = new THREE.SpotLight( 0xffffff );
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load("sand.png");
const texture2 = textureLoader.load("cone.jpg");
const texture3 = textureLoader.load("world.jpg");
const room = createRoom();
const light = new THREE.HemisphereLight( 0xe3c8a3 , 0x365f75, 1);
const pointLight = new THREE.PointLight(0x880808, 0.1);


spotLight.position.set(2,-1,9);
spotLight.castShadow = true;
spotLight.intensity = 10;
scene.add( spotLight );


scene.background = new THREE.Color ( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


pointLight.intensity = 5;

pointLight.position.set(0,0,0)
room.position.set(1.5,0,1.5);
light.position.set(0.5,1.5,0);


scene.add(room);
scene.add(light);
scene.add(pointLight);


camera.position.set(7,7,7);
camera.lookAt(0,0,0);

function animate() {
    requestAnimationFrame(animate);

	if ( scene ) {
        scene.rotation.y = Math.sin(Date.now() * 0.0002) * Math.PI * 0.1;
    }
	renderer.render( scene, camera );

}
animate();

function createRoom(){
    const room = new THREE.Group();

    // Materials
    const floorMaterial = new THREE.MeshToonMaterial({ color: 0xFFFDD0 })
    const wallMaterial = new THREE.MeshToonMaterial({color:0xFFFFF0 })

    // Geometries
    const floorGeometry = new THREE.BoxGeometry(10,1.1,15);
    const leftWallGeometry = new THREE.BoxGeometry(0.1,5.5,15,1);
    const rightWallGeometry = new THREE.BoxGeometry(10,5.5,0.1,1);

    // Meshes
    const floor = new THREE.Mesh(floorGeometry,floorMaterial);
    const leftWall = new THREE.Mesh(leftWallGeometry,wallMaterial);
    const rightWall = new THREE.Mesh(rightWallGeometry,wallMaterial);

    // Positions
    floor.position.y = -1
    leftWall.position.set(-4.95,1.74,0);
    rightWall.position.set(0,1.74,-7.5);

    room.add(floor, leftWall, rightWall);

    return room;
}

const cubeGeo = new THREE.BoxGeometry(1,1,1);
const cubeMat = new THREE.MeshBasicMaterial({map: texture1});
const cube = new THREE.Mesh( cubeGeo, cubeMat );
scene.add(cube);
cube.position.y = 1;
cube.position.z = 0;

const sphGeo = new THREE.SphereGeometry(1, 20, 10);
const sphMat = new THREE.MeshMatcapMaterial({color: 0xFFFDD0,map: texture3});
const sphere = new THREE.Mesh(sphGeo, sphMat);
scene.add(sphere);
sphere.position.y = 0.5;
sphere.position.z = 5;

const coneGeo = new THREE.ConeGeometry(2, 3, 4); 
const coneMat = new THREE.MeshMatcapMaterial({color: 0x7B3F00, transparent : true, opacity : 1,map: texture2});
const cone = new THREE.Mesh(coneGeo, coneMat);
scene.add(cone);
cone.position.y = 0;
cone.position.z = -4.5;