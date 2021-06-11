import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight)
camera.position.setZ(10);

renderer.render(scene,camera);

//Creating icosahedron

const geometry = new THREE.IcosahedronGeometry(1,0)
const material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true});
const icosahedron = new THREE.Mesh (geometry,material);

scene.add(icosahedron);

//Set up lightning

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);


const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


//Functions 


//Funcation to populate the scene with stars, MeshStandardMaterials reacts to light
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xFFFFFF})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3)
  .fill()
  .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
  
}

Array(300).fill().forEach(addStar);


//Our animation loop
function animate() {
  
  requestAnimationFrame(animate);

  icosahedron.rotation.y += 0.01;

  controls.update();

  renderer.render(scene,camera);
}

animate();