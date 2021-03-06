let size = 50;
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = size;
canvas.height = size;
canvas.classList.add('tempcanvas');
document.body.appendChild(canvas);


function loadImages(paths, whenLoaded) {
  var imgs = [];
  paths.forEach(function (path) {
    var img = new Image;
    img.onload = function () {
      imgs.push(img);
      if (imgs.length == paths.length) whenLoaded(imgs);
    }
    img.src = path;
  });
}

function fillUp(array, max) {

  var length = array.length;
  for (i = 0; i < max - length; i++) {
    array.push(array[Math.floor(Math.random() * length)])
  }
  return array;
}

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

function getArrayFromImage(img) {
  let imageCoords = [];
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(img, 0, 0, size, size);
  let data = ctx.getImageData(0, 0, size, size);

  data = data.data;

  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var red = data[((size * y) + x) * 4];
      var green = data[((size * y) + x) * 4 + 1];
      var blue = data[((size * y) + x) * 4 + 2];
      var alpha = data[((size * y) + x) * 4 + 3];
      if (alpha > 0) {
        imageCoords.push([10 * (x - size / 2), 10 * (size / 2 - y)]);
      }
    }
  }
  return shuffle(fillUp(imageCoords, 1500));
}


let images = ['img/octopus.svg', 'img/owl.svg', 'img/panda.svg', 'img/penguin.svg', 'img/snail.svg'];
loadImages(images, function (loadedImages) {
  var gallery = [];
  loadedImages.forEach(function (el, index) {
    gallery.push(getArrayFromImage(loadedImages[index]));
  });
  console.log(gallery);

  let camera, controls, scene, renderer, geometry;


  function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    let container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 500;

    controls = new THREE.OrbitControls(camera, renderer.domElement);


    // ?????? ???????? ???? ??????????
    let texture = (new THREE.TextureLoader).load("img/particle.png");
    let material = new THREE.PointCloudMaterial({
      size: 5,
      vertexColors: THREE.VertexColors,
      map: texture,
      alphaTest: 0.5
    });

    geometry = new THREE.Geometry();

    gallery[0].forEach((el, index) => {
      geometry.vertices.push(new THREE.Vector3(el[0], el[1], Math.random() * 100));
      geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    });

    let pointCloud = new THREE.PointCloud(geometry, material);
    scene.add(pointCloud);
    // ?????????? ??????????

    window.addEventListener('resize', onWindowResize, false);

  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }


  let i = 0;

  function animate() {
    i++;
    requestAnimationFrame(animate);


    geometry.vertices.forEach(function (particle, index) {
      let dX, dY, dZ;
      dX = Math.sin(i / 10 + index / 2) / 10;
      dY = 0;
      dZ = 0;
      particle.add(new THREE.Vector3(dX, dY, dZ));
    });
    geometry.verticesNeedUpdate = true;


    render();

  }


  function render() {
    renderer.render(scene, camera);
  }

  init();
  animate();

  let current = 0;
  document.body.addEventListener('click', function () {
    current++;
    current = current % gallery.length;
    geometry.vertices.forEach(function (particle, index) {
      let tl = new TimelineMax();
      tl.to(particle, 1, {x: gallery[current][index][0], y: gallery[current][index][1]});
    })
  })


});
