import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const camera = new THREE.PerspectiveCamera(62, 1);
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader()
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Set display properties
camera.position.z = 20;
camera.position.y = 5;
camera.lookAt(0,0,0)
// scene.background = new THREE.Color(0xaaaaaa);
renderer.setSize(window.innerWidth, window.innerWidth);

// Define meshes to draw
const texture = loader.load('resources/images/checker.png')
texture.colorSpace = THREE.SRGBColorSpace
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = 20;
texture.repeat.set(repeats, repeats);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshPhongMaterial({ map: texture }));
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(2, 1),
  new THREE.MeshPhongMaterial({ color: 0xddaa11 })
);
torus.rotation.set(Math.PI / 2, 0, 0);
torus.position.y = 1
scene.add(torus);

const light1 = new THREE.AmbientLight(0xffffff, .5);
const light2 = new THREE.DirectionalLight(0xffffff, 3);
light2.position.set(-1, 1, 4);

scene.add(light1);
scene.add(light2);

function render() {
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

render();
