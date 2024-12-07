import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
const camera = new THREE.PerspectiveCamera(
  62,
  window.innerWidth / window.screen.height,
  0.1,
  1000
);
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.screen.height);

function render(time) {
  time *= 0.001; // ms => s

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(render);
}

render();
