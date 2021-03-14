let camera;
let scene;
let renderer;
let cube;
let cube1;
let cube2;
let cube3;
let cube4;
let cube5;
let cube6;
let cube7;
let cube8;
let raycaster;
let mouse;

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true

  });
  //renderer.setClearColor("#e5e5e5");
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
  const cube_material = new THREE.MeshLambertMaterial({color: "#3d31af"});
  // cube = new THREE.Mesh(cube_geometry, cube_material);
  //
  // cube1 = new THREE.Mesh(cube_geometry, cube_material);
  // cube1.position.y =2;
  // cube2 = new THREE.Mesh(cube_geometry, cube_material);
  // cube2.position.y = -2;
  //
  // scene.add(cube, cube1, cube2);

  cubeX = -10;
  for (let i = 0; i < 20; i++) {
    cube = new THREE.Mesh(cube_geometry, cube_material);
    cube.position.x = (Math.random() - 0.5) * 10;
    cube.position.y = (Math.random() - 0.5) * 10;
    cube.position.z = (Math.random() - 0.5) * 10;
    scene.add(cube);
    cubeX += 1;
  }

  const light = new THREE.PointLight(0xffffff, 2, 1000);
  light.position.set(0, 0, 25);

  scene.add(light);

}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(scene.children, true);
  for (let i = 0; i < intersects.length; i++) {
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
    this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
    this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
    this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI * .5, ease: Expo.easeOut}, "=-1.5")
  }

}

window.addEventListener('resize', () => {
  console.log('r');
  init();
});

init();
animate();
//
// this.tl =  new TimelineMax({paused: true});
// this.tl.to(cube.scale, 1, {x:2, ease: Expo.easeOut});
// this.tl.to(cube.scale, .5, {x: .5, ease: Expo.easeOut});
// this.tl.to(cube.position, .5, {x:2, ease: Expo.easeOut});
// this.tl.to(cube.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5");

window.addEventListener('mousemove', onMouseMove);

