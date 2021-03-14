let camera;
let scene;
let renderer;

let controls;

let cylinder;
let cone;
let cabine;

let wings;
let wings1;
let wings2;

let tail;
let tailWing;
let tailUpWing;
let tailWingLigth;

let blade1;
let blade2;


function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true

  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 0, 80);

  controls.update();

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  const tailUpWing_geometry = new THREE.BoxGeometry(5, 2, 10);
  const tailUpWing_material = new THREE.MeshLambertMaterial({color: "#ffffff"});
  tailUpWing = new THREE.Mesh(tailUpWing_geometry, tailUpWing_material);
  tailUpWing.position.x = -30;

  const tailWing_geometry = new THREE.BoxGeometry(5, 5, 2);
  const tailWing_material = new THREE.MeshLambertMaterial({color: "#ffffff"});
  tailWing = new THREE.Mesh(tailWing_geometry, tailWing_material);
  tailWing.position.x = -30;
  tailWing.position.y = 3;

  const tailWingLigth_geometry = new THREE.BoxGeometry(5, 1, 2);
  const tailWingLigth_material = new THREE.MeshLambertMaterial({color: "#ff596a"});
  tailWingLigth = new THREE.Mesh(tailWingLigth_geometry, tailWingLigth_material);
  tailWingLigth.position.x = -30;
  tailWingLigth.position.y = 4;


  const cabine_geometry = new THREE.CylinderGeometry(2, 2, 10, 16);
  const cabine_material = new THREE.MeshLambertMaterial({color: "#7bd1ff"});
  cabine = new THREE.Mesh(cabine_geometry, cabine_material);
  cabine.rotation.z = Math.PI / 2;
  cabine.position.y = 5;

  const wings_geometry = new THREE.BoxGeometry(10, 2, 50);
  const wings_material = new THREE.MeshLambertMaterial({color: "#ffffff"});
  wings = new THREE.Mesh(wings_geometry, wings_material);

  const wings1_geometry = new THREE.BoxGeometry(2, 2, 48);
  const wings1_material = new THREE.MeshLambertMaterial({color: "#ffffff"});
  wings1 = new THREE.Mesh(wings1_geometry, wings1_material);
  wings2 = new THREE.Mesh(wings1_geometry, wings1_material);
  wings1.position.x = -6;
  wings2.position.x = 6;

  const cylinder_geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
  const cylinder_material = new THREE.MeshLambertMaterial({color: "#ffffff"});
  cylinder = new THREE.Mesh(cylinder_geometry, cylinder_material);
  cylinder.rotation.z = Math.PI / 2;

  const tail_geometry = new THREE.ConeGeometry(5, 20, 32);
  const tail_material = new THREE.MeshLambertMaterial({color: "#ffffff"});
  tail = new THREE.Mesh(tail_geometry, tail_material);
  tail.rotation.z = Math.PI / 2;
  tail.position.x = -20;

  const cone_geometry = new THREE.ConeGeometry(5, 10, 32);
  const cone_material = new THREE.MeshLambertMaterial({color: "#ff596a"});
  cone = new THREE.Mesh(cone_geometry, cone_material);
  cone.rotation.z = -Math.PI / 2;
  cone.position.x = 15;

  const blade1_geometry = new THREE.BoxGeometry(1, 2, 20);
  const blade1_material = new THREE.MeshLambertMaterial({color: "#48464a"});
  blade1 = new THREE.Mesh(blade1_geometry, blade1_material);
  blade1.position.x = 20;

  const blade2_geometry = new THREE.BoxGeometry(1, 20, 2);
  const blade2_material = new THREE.MeshLambertMaterial({color: "#48464a"});
  blade2 = new THREE.Mesh(blade2_geometry, blade2_material);
  blade2.position.x = 20;


  scene.add(cylinder, cone, cabine, tail, tailWing, tailUpWing, tailWingLigth, wings, wings1, wings2, blade2, blade1);

  const light = new THREE.PointLight(0xffffff, 1, 1000);
  light.position.set(0, 0, 80);

  const light1 = new THREE.HemisphereLight( 0xffffbb, 0x080820, .3 );
  scene.add( light, light1 );

}

let direction = 'positive';


function animate() {
  requestAnimationFrame(animate);

  blade1.rotation.x += Math.PI * .1;
  blade2.rotation.x += Math.PI * .1;

  let x = camera.position.x,
    y = camera.position.y,
    z = camera.position.z;

  camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
  camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
  camera.position.y = z * Math.cos(0.1) + x * Math.sin(0.1);


  controls.update();

  if (direction === 'positive') {
    wings.rotation.x += Math.PI * .001;
    wings1.rotation.x += Math.PI * .001;
    wings2.rotation.x += Math.PI * .001;
    tailWing.rotation.x += Math.PI * .001;
    tailUpWing.rotation.x += Math.PI * .001;
    tailWingLigth.rotation.x += Math.PI * .001;
    cabine.rotation.x += Math.PI * .001;
  } else {
    wings.rotation.x -= Math.PI * .001;
    wings1.rotation.x -= Math.PI * .001;
    wings2.rotation.x -= Math.PI * .001;
    tailWing.rotation.x -= Math.PI * .001;
    tailUpWing.rotation.x -= Math.PI * .001;
    tailWingLigth.rotation.x -= Math.PI * .001;
    cabine.rotation.x -= Math.PI * .001;
  }

  if (wings.rotation.x > 0.2) {
    direction = "negative"
  } else if (wings.rotation.x < -0.2) {
    direction = "positive"
  }


  renderer.render(scene, camera);
}

const rotSpeed = .02

// function checkRotation(event){
//   console.log(event)
//
//   let x = camera.position.x,
//     y = camera.position.y,
//     z = camera.position.z;
//
//   if (event.keyCode===37){
//     camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
//     camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
//   } else if (event.keyCode===39){
//     camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
//     camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
//   }
//
//   camera.lookAt(scene.position);
// }

window.addEventListener('resize', () => {
  console.log('r');
  init();
});

init();
animate();

// window.addEventListener('keydown', (e)=>checkRotation(e));

