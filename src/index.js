//import * as THREE from "three";
var THREE = require("three");
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

// Set the scene size.
const WIDTH = 800;
const HEIGHT = 650;

//ANIMATION
const mixers = [];
let clock = new THREE.Clock();
//set moving speed
var xSpeed = 5;
var ySpeed = 5;

// Set some camera attributes.
const VIEW_ANGLE = 75;
const ASPECT = window.innerWidth / window.innerHeight;
const NEAR = 0.1;
const FAR = 10000;

// Get the DOM element to attach to
const container = document.querySelector("#container");

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer();

const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.rotation.y = (45 / 180) * Math.PI;
camera.position.x = 400;
camera.position.y = 50;
camera.position.z = 500;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf7bac5);
//0xf7bac5
// Add the camera to the scene.
scene.add(camera);

// Start the renderer.
renderer.setSize(window.innerWidth, window.innerHeight);
// 360 controls event
let controls = new OrbitControls(camera, renderer.domElement);
// Set up the SPHERE

const RADIUS = 35;
const SEGMENTS = 12;
const RINGS = 12;
//SPHERE
// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
const sphereGeometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Move the Sphere back in Z so we
// can see it.
sphere.position.x = 200;
sphere.position.y = 300;
sphere.position.z = 250;

// Finally, add the sphere to the scene.
scene.add(sphere);

// CUBE
function buildCube(color, x) {
  const boxWidth = 30;
  const boxHeight = 30;
  const boxDepht = 30;

  const cubeMaterial = new THREE.MeshPhongMaterial({
    color,
  });
  const cubeGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepht);

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cube.position.x = x;
  cube.position.z = -200;
  scene.add(cube);
  return cube;
}
const cubes = [buildCube(0x8844aa, 70), buildCube(0xa0a0a0, -70)];

//This is Pointlight
const pointLight = new THREE.PointLight(0xffffff);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

//Ambient ligth
//var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
//let hlight = new THREE.AmbientLight(0x404040, 100);
//scene.add(ambientLight);

//Add directionnal light
const color = 0xffffff;
const intensity = 10;
const dlight = new THREE.DirectionalLight(color, intensity);
dlight.position.set(0, 1, 0);
scene.add(dlight);

//car setup
let loader = new GLTFLoader();
loader.load("/scene.gltf", function (gltf) {
  let car = gltf.scene.children[0];
  car.scale.set(0.05, 0.05, 0.05);
  gltf.scene.position.x = 150;
  gltf.scene.position.y = 20;
  gltf.scene.position.z = 200;
  scene.add(gltf.scene);
  update();
});

// Add business man
let ndloader = new GLTFLoader();
ndloader.load("/business_man/scene.gltf", function (gltf) {
  let man = gltf.scene.children[0];
  man.scale.set(0.4, 0.4, 0.4);
  gltf.scene.position.x = -50;
  gltf.scene.position.y = -10;
  gltf.scene.position.z = -50;
  const clonedScene = SkeletonUtils.clone(gltf.scene);
  const root = new THREE.Object3D();
  root.add(clonedScene);
  scene.add(root);
  const mixer = new THREE.AnimationMixer(clonedScene);
  for (let i = 0; i < gltf.animations.length; i++) {
    var clip = gltf.animations[i];
    const action = mixer.clipAction(clip);
    action.play();
  }
  mixers.push(mixer);
  update();
});

// Add car
let carloader = new GLTFLoader();
carloader.load("/cars/scene.gltf", function (gltf) {
  let car = gltf.scene.children[0];
  car.scale.set(40, 50, 60);
  gltf.scene.position.y = -10;
  const clonedScene = SkeletonUtils.clone(gltf.scene);
  const root = new THREE.Object3D();
  root.add(clonedScene);
  scene.add(root);
  const mixer = new THREE.AnimationMixer(clonedScene);
  const firstClip = gltf.animations[0];
  const action = mixer.clipAction(firstClip);
  action.play();
  mixers.push(mixer);
  update();
});

//Add SKater
let sktloader = new GLTFLoader();
sktloader.load("/skater/scene.gltf", function (gltf) {
  let skate = gltf.scene.children[0];
  skate.scale.set(40, 40, 40);
  gltf.scene.position.x = -70;
  gltf.scene.position.y = -10;
  gltf.scene.position.z = -300;
  const clonedScene = SkeletonUtils.clone(gltf.scene);
  const root = new THREE.Object3D();
  root.add(clonedScene);
  scene.add(root);
  const mixer = new THREE.AnimationMixer(clonedScene);
  const firstClip = gltf.animations[0];
  const action = mixer.clipAction(firstClip);
  action.play();
  mixers.push(mixer);
  update();
});

//Add lampadaire
let lamploader = new GLTFLoader();
lamploader.load("/lampadaire_stylise/scene.gltf", function (gltf) {
  let skate = gltf.scene.children[0];
  skate.scale.set(40, 40, 40);
  gltf.scene.position.x = 100;
  gltf.scene.position.y = -10;
  gltf.scene.position.z = -350;
  scene.add(gltf.scene);
  update();
});

//Add lampadaire
let lampsloader = new GLTFLoader();
lampsloader.load("/lampadaire/scene.gltf", function (gltf) {
  let skate = gltf.scene.children[0];
  skate.scale.set(0.4, 0.4, 0.4);
  gltf.scene.position.x = -10;
  gltf.scene.position.y = -10;
  gltf.scene.position.z = 350;
  scene.add(gltf.scene);
  update();
});

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);
renderer.render(scene, camera);

function update() {
  // Draw!
  const delta = clock.getDelta();
  renderer.render(scene, camera);
  for (const mixer of mixers) {
    mixer.update(delta);
  }
  controls.update();
  // Schedule the next frame.
  requestAnimationFrame(update);
  //console.log("update ...");
}

// re-render animation

requestAnimationFrame(update);
