import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const gui = new GUI();
const camera = new THREE.PerspectiveCamera(62, 1);
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Set display properties
camera.position.z = 20;
camera.position.y = 5;
camera.lookAt(0, 0, 0);
// scene.background = new THREE.Color(0xaaaaaa);
renderer.setSize(window.innerWidth, window.innerWidth);

// Define meshes to draw
const texture = loader.load("resources/images/checker.png");
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = 20;
texture.repeat.set(repeats, repeats);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide })
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(2, 1),
  new THREE.MeshPhongMaterial({ color: 0xddaa11 })
);
torus.rotation.set(Math.PI / 2, 0, 0);
torus.position.y = 1;
scene.add(torus);

const [skyColor, groundColor] = [0x87ceeb, 0xb97a20]
const light = new THREE.HemisphereLight(skyColor, groundColor, 1)

gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('groundColor');
gui.addColor( new ColorGUIHelper(light, 'groundColor'), 'value').name('skyColor')
gui.add(light, 'intensity', 0, 5, 0.01);

scene.add(light);

function render() {
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

render();
