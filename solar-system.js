import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

class AxisGridHelper {
  constructor(node, units = 10) {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 2; // after the grid
    node.add(axes);

    const grid = new THREE.GridHelper(units, units);
    grid.material.depthTest = false;
    grid.renderOrder = 1;
    node.add(grid);

    this.grid = grid;
    this.axes = axes;
    this.visible = false;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    this.grid.visible = v;
    this.axes.visible = v;
  }
}

function makeAxisGrid(node, label, units) {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, "visible").name(label);
}

const gui = new GUI();
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
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

// Main data
const objects = [];
const sphere = new THREE.SphereGeometry(1, 6, 6);

const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
const sunMesh = new THREE.Mesh(sphere, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
objects.push(sunMesh);
console.log(objects, scene);

const light = new THREE.PointLight(0xffffff, 100);
scene.add(light);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({
  color: 0x2233ff,
  emissive: 0x112244,
});
const earthMesh = new THREE.Mesh(sphere, earthMaterial);
earthOrbit.add(earthMesh);
objects.push(earthMesh);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({
  color: 0x888888,
  emissive: 0x222222,
});
const moonMesh = new THREE.Mesh(sphere, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

makeAxisGrid(solarSystem, "solarSystem", 25);
makeAxisGrid(sunMesh, "sunMesh");
makeAxisGrid(earthOrbit, "earthOrbit");
makeAxisGrid(earthMesh, "earthMesh");
makeAxisGrid(moonOrbit, "moonOrbit");
makeAxisGrid(moonMesh, "moonMesh");

function render(time) {
  time *= 0.001; // ms => s

  objects.forEach((obj) => {
    obj.rotation.y = time;
  });

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(render);
}

render();
