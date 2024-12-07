import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function rad(deg) {
  return (deg * Math.PI) / 180;
}

function setPosAndRotat(mesh, pos, rotat) {
  mesh.position.set(...pos);
  mesh.rotation.set(...rotat.map((d) => rad(d)));
}

class Maker {
  cube(size, pos, rotat, color, material) {
    const geometry = new THREE.BoxGeometry(...size);
    const cube = new THREE.Mesh(geometry, material);

    setPosAndRotat(cube, pos, rotat);
    scene.add(cube);
  }
  cone(radius, height, pos, rotat, color, material) {
    const geometry = new THREE.ConeGeometry(radius, height);
    const cone = new THREE.Mesh(geometry, material);

    setPosAndRotat(cone, pos, rotat);
    scene.add(cone);
  }
  circle(radius, pos, rotat, color, material) {
    const geometry = new THREE.CircleGeometry(radius);
    const circle = new THREE.Mesh(geometry, material);

    setPosAndRotat(circle, pos, rotat);
    scene.add(circle);
  }
  cylinder(radiusT, radiusB, height, pos, rotat, color, material) {
    const geometry = new THREE.CylinderGeometry(radiusT, radiusB, height);
    const cylinder = new THREE.Mesh(geometry, material);

    setPosAndRotat(cylinder, pos, rotat);
    scene.add(cylinder);
  }
  sphere(radius, pos, rotat, color, material) {
    const geometry = new THREE.SphereGeometry(radius);
    const sphere = new THREE.Mesh(geometry, material);

    setPosAndRotat(sphere, pos, rotat);
    scene.add(sphere);
  }
  torus(radius, tubeRadius, pos, rotat, color, material) {
    const geometry = new THREE.TorusGeometry(radius, tubeRadius);
    const torus = new THREE.Mesh(geometry, material);

    setPosAndRotat(torus, pos, rotat);
    scene.add(torus);
  }
}

class Utils {
  light(pos, color, intensity, displayed = false) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);

    if (displayed) {
      const mark = new THREE.Mesh(
        new THREE.SphereGeometry(0.05),
        new THREE.MeshPhongMaterial({ color: 0xffffff })
      );
      mark.position.set(...pos);
      scene.add(mark);
    }
  }
  material(color, emissivity = 0) {
    return new THREE.MeshPhongMaterial({ color, emmssive: emissivity });
  }
}

const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
const make = new Maker();
const utils = new Utils();

const fov = 62;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(
  fov,
  window.innerWidth / window.screen.height,
  near,
  far
);
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);

// Set display properties
camera.position.z = 4;
camera.position.y = 0.25;
// scene.background = new THREE.Color(0xaaaaaa);
renderer.setSize(window.innerWidth, window.screen.height);

// Define meshes to draw
make.torus(1, 0.5, [0, 0, 0], [90, 0, 0], 0xddaa11, utils.material(0xddaa11, 0xffffff));

utils.light([-1, 1, 4], 0xffffff, 3);

function render(time) {
  time *= 0.001; // ms => s

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(render);
}

render();
