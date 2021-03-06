import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Loader } from "three";

//Setting up the scene, camera and renderer

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x191919);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//Updates the vieport when a window is resized
  window.addEventListener('resize', function(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width,height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
})


camera.position.setZ(1);

renderer.render(scene, camera);

//Creating icosahedron

const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const icosahedron = new THREE.Mesh(geometry, material);

scene.add(icosahedron);

//Set up lightning

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//Helper for visualizing grid
const gridHelper = new THREE.GridHelper();
//scene.add(gridHelper);

//Enables interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

//Background

const backgroundTexture = new THREE.TextureLoader().load("stars.jpg");
//scene.background = backgroundTexture;

//Functions


//Function to move camera
function moveCamera() {
  const position = document.body.getBoundingClientRect().top;
  icosahedron.rotation.y += 0.01;
  camera.position.x = position * -0.001;
  //camera.position.y = position * -0.0002;
}

//Set up camera to move on scrolling
document.body.onscroll = moveCamera;
moveCamera();

//Funcation to populate the scene with stars, MeshStandardMaterials reacts to light
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//Populating the scene with 500 stars
Array(500).fill().forEach(addStar);

//Our animation loop
function animate() {
  requestAnimationFrame(animate);

  icosahedron.rotation.y += 0.006;

  controls.update();

  renderer.render(scene, camera);

  window.onresize = function () {
    document.body.height = window.innerHeight;
  };
  window.onresize();
}

animate();
