let camera;
let scene;
let conrols;
let renderer;

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

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  camera.position.set(0, 20, 100);

  controls.update();

  const geometry = new THREE.SphereGeometry(3, 30, 30);
  const material = new THREE.MeshLambertMaterial({color: "#3d75ff"});
  const sphere = new THREE.Mesh(geometry, material);

  scene.add(sphere);

  const light = new THREE.PointLight(0xffffff, 1, 500);
  light.position.set(10, 0, 25);

  scene.add(light);

}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  init();
});


window.addEventListener('keydown', (e) => {
  let cameraPosition = camera.position.z;

  if (e.keyCode == '38') {
    console.log("Up", cameraPosition);
    camera.position.z = cameraPosition + 1;
    camera.updateProjectionMatrix();
    controls.update();
  } else if (e.keyCode == '40') {
    console.log("Down");
    camera.position.z = cameraPosition > 1 ? cameraPosition - 1 : cameraPosition
    camera.updateProjectionMatrix();
    controls.update();
  }

});

init();
animate();


