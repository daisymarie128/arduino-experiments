/* ----------------------------

    Threejs with accelorometer

------------------------------------ */
var socket = io(),
    width = window.innerWidth,
    height = window.innerHeight,
    color = new THREE.Color( "#f9f4ee" ),
    cubeColor = new THREE.Color( "#f9f4ee" ),
    accelorometerX,
    accelorometerY,
    accelorometerZ;


// ste up our camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 120;
camera.position.z = 800;

// create our scene
var scene = new THREE.Scene();

// create a renderer and then append it to the dom
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// start creating our cube
var cubeGeometry = new THREE.BoxGeometry(120, 120, 120);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: cubeColor });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 150;

// add our cube to our scene
scene.add(cube);

// create a light
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 500, 300);
scene.add(pointLight);

// create our time
var clock = new THREE.Clock;
socketMoving();

function socketMoving() {
  socket.on('moving', function(data){
    console.log('data: ', data);
    accelorometerX = data.x;
    accelorometerY = data.y;
    accelorometerZ = data.z;
  });
}

function animate() {

  // make our cube move up
  // cube.position.y +=  clock.getElapsedTime();

  cube.rotation.x = accelorometerX / 333 * 3.5;
  cube.rotation.y = accelorometerY / 333 * 3.5;
  cube.rotation.z = accelorometerZ / 333 * 3.5;

  // make our cube hover
  // cube.position.y += Math.sin(clock.getElapsedTime());
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// call animate
animate();
