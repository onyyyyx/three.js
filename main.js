import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function makeInstance(dims, position, rotation, type, color) {
  const SHAPE_TYPES = [
    THREE.BoxGeometry,
    THREE.CircleGeometry,
    THREE.ConeGeometry,
    THREE.CylinderGeometry,
    THREE.DodecahedronGeometry,
    THREE.IcosahedronGeometry,
    THREE.OctahedronGeometry,
    THREE.PlaneGeometry,
    THREE.SphereGeometry,
    THREE.TetrahedronGeometry,
  ];

  const material = new THREE.MeshPhongMaterial({ color });

  const shape = new THREE.Mesh(new SHAPE_TYPES[type](...dims), material);
  scene.add(shape);
  const geometry = new THREE.EdgesGeometry(new SHAPE_TYPES[type](...dims));
  scene.add(geometry)

  shape.position.set(...position);
  shape.rotation.set(...rotation);

  return shape;
}

const pi = Math.PI;

const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 75;
const aspect = 2;
const near = 0.01;
const far = 15;

const camera = new THREE.PerspectiveCamera(
  fov,
  window.innerWidth / window.innerHeight,
  near,
  far
);
camera.position.z = 2;
camera.position.y = 0.25;
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const shapes = [
  makeInstance([1, 1, 1], [0, 0, 0], [0, 0, 0], 0, 0x44aa88),
  makeInstance([0.5, 2, 100], [0, 0.5, 0], [0, 0, pi / 4], 2, 0xff0000),
];

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(-1, 1, 4);
scene.add(light);

function render(time) {
  time *= 0.001; // ms => s

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(render);
}

render();
