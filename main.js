import './style.css'
import * as THREE from 'three';
import { PointLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({

canvas: document.querySelector('#bg'),


});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial( {color: 0xFD5E53, wireframe: true } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight)

const controls = new OrbitControls( camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry( 0.25, 8, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff , wireframe: true } );
  const torusKnot = new THREE.Mesh( geometry, material );
  const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  torusKnot.position.set(x, y, z);

  scene.add( torusKnot );



}

Array(200).fill().forEach(addStar)

//const surp = new THREE.TextureLoader().load('1585529674410.png');
//scene.background = surp;

const spaceT = new THREE.CubeTextureLoader().load('ss1.jpg');
scene.background = spaceT;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
 
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){

  requestAnimationFrame(animate);

  torus.rotation.x +=0.01 ;
  torus.rotation.y +=0.005 ;
  torus.rotation.z +=0.01 ;
  controls.update();
  renderer.render( scene, camera );


}


  
 
animate()