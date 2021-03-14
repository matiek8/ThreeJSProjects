let camera;
let scene;
let renderer;
let cube;
let sphere;
let sphere1;
let sphere2;
let sphere3;
let mesh;

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
  //camera.position.z = 6;
  camera.position.set(0, 0, 50);

  const cube_geometry = new THREE.BoxGeometry(10, 10, 10);
  const cube_material = new THREE.MeshLambertMaterial({color: "#ff174d"});
  cube = new THREE.Mesh(cube_geometry, cube_material);

  const sphere_geometry =  new THREE.SphereGeometry(10, 10, 10);
  const sphere_material = new THREE.MeshLambertMaterial({color: "#4b484a"});
  sphere = new THREE.Mesh(sphere_geometry, sphere_material);
  sphere1 = new THREE.Mesh(sphere_geometry, sphere_material);
  sphere2 = new THREE.Mesh(sphere_geometry, sphere_material);
  sphere3 = new THREE.Mesh(sphere_geometry, sphere_material);


  const mesh_geometry =  new THREE.SphereGeometry(30, 30, 30);
  const mesh_material = new THREE.MeshLambertMaterial({color: "#4b484a", wireframe: true});
  //mesh_material.wireframe.set(true);
  mesh  = new THREE.Mesh(mesh_geometry, mesh_material);
  scene.add(cube, sphere, sphere1, sphere2, sphere3, mesh);

  const light = new THREE.PointLight(0xffffff, 1, 500);
  light.position.set(10, 0, 60);

  scene.add(light);

}

let direction = 'positive'

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.05;
  mesh.rotation.y += 0.01;
  if(direction==='positive') {
    sphere.position.x += 0.1;
    sphere1.position.y += 0.1;
    sphere2.position.y -= 0.1;
    sphere3.position.x -= 0.1;
  } else {
    sphere.position.x -= 0.1;
    sphere3.position.x += 0.1;
    sphere1.position.y -= 0.1;
    sphere2.position.y += 0.1;
  }

  if (sphere.position.x>20) {
    direction="negative"
  } else if (sphere.position.x<-20) {
    direction="positive"
  }

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  console.log('r');
  init();
});

init();
animate();


