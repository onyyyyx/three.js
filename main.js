import * as THREE from "three";

function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;

  return cube;
}

const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
let fov = 75;
const aspect = 2;
let near = 1;
let far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

const boxDimensions = [1, 1, 1];
const geometry = new THREE.BoxGeometry(...boxDimensions);
const cubes = [
  makeInstance(geometry, 0x44aa88, 0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844, 2),
];

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(-1, 2, 4);
scene.add(light);

function render(time) {
  time *= 0.001; // ms => s

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * 0.1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  fov = document.getElementById("range").value;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

render();
