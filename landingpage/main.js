import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight)
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.IcosahedronGeometry(1,0)
const material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true});
const icosahedron = new THREE.Mesh (geometry,material);

scene.add(icosahedron);




function animate() {
  requestAnimationFrame(animate);

  icosahedron.rotation.y += 0.01;

  renderer.render(scene,camera);
}

animate();