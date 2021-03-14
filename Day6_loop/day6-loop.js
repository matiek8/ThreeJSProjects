let scene, camera, renderer, controls, geometry;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#000000");

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  let container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 500;

  controls = new THREE.OrbitControls(camera, renderer.domElement);


  let texture = (new THREE.TextureLoader).load("img/particle.png");
  let material = new THREE.PointsMaterial({
    size: 10,
    vertexColors: THREE.VertexColors,
    map: texture,
    alphaTest: 0.5
  });

  geometry = new THREE.Geometry();
  let x, y, z;

  //Точечки
  for (let i = 0; i <= 100000; i++) {
    x = Math.sin(i / 10) * 100;
    y = Math.cos(i / 10) * 100;
    z = i;

    geometry.vertices.push(new THREE.Vector3(x, y, z));
    geometry.colors.push(new THREE.Color("#ffffff"));
  }

  let pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);
}


function animate() {
  requestAnimationFrame(animate);
  geometry.verticesNeedUpdate = true;

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  init();
});

init();
animate();

