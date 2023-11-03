import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { element, func } from 'three/examples/jsm/nodes/Nodes.js';

function doThree(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  camera.position.z = 15;
  camera.position.y = 3;  

  //Color fondo
  scene.background = new THREE.Color( 'lightgreen' );

  //Luz direccional
  const light = new THREE.DirectionalLight(0xffffff,0.6);
  light.position.set(-1,4,2);
  scene.add(light);
  light.castShadow=true;
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0x99aaff,1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.shadowMap.enabled = true;

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.update();

  document.body.appendChild( renderer.domElement );

  const world = new CANNON.World();
  world.gravity = new CANNON.Vec3(0,-9.81,0);


  const planoGeometry = new THREE.PlaneGeometry(25,25,5,5);
  const planoMaterial = new THREE.MeshPhongMaterial({
    color:0x339944,       
    side:THREE.DoubleSide
  });
  const planoMesh = new THREE.Mesh(planoGeometry,planoMaterial);
  
  scene.add(planoMesh);  
  planoMesh.receiveShadow = true;  

  const planoBody:any = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(12.5,12.5,0.1)),
    type: CANNON.Body.STATIC,
  })
  world.addBody(planoBody);
  planoBody.quaternion.setFromEuler(-90 * (Math.PI/180),0,0);
  

  const meshArray:any= [];
  const bodyArray:any= [];
  let maxParticles = 50; 
  let currentParticleCount = 0; 
  let particlePosition = 0;
  
  function spawnParticles() {
    if (currentParticleCount < maxParticles) {
      createSphere();
      launchSphere(bodyArray[currentParticleCount]);
      currentParticleCount++;
    } 
    else{
      bodyArray[particlePosition].position.set(0,1,0)
      launchSphere(bodyArray[particlePosition])
      particlePosition++
      if(particlePosition > maxParticles-1){
        particlePosition = 0;
      }
    }
  }

  let particleTimer;
  particleTimer = setInterval(spawnParticles, 100);

  console.log(meshArray)
  console.log(bodyArray)

  function createSphere(){
    const esferaGeo = new THREE.SphereGeometry(.5);
    const esferaMat = new THREE.MeshPhongMaterial({
      color: 0xeebb77,
      wireframe: false
    });
    const esferaMesh = new THREE.Mesh(esferaGeo,esferaMat);

    const sphereShape = new CANNON.Sphere(0.5); 
    const sphereBody:any = new CANNON.Body({
      mass: 1, 
      shape: sphereShape,
      type:CANNON.Body.DYNAMIC
    });

    
    sphereBody.position.set(0, 0, 0)
    esferaMesh.position.copy(sphereBody.position)

    meshArray.push(esferaMesh)
    bodyArray.push(sphereBody);

    world.addBody(sphereBody);
    scene.add(esferaMesh)


  }
  function launchSphere(sphereBody:any){

    const initialVelocity = new CANNON.Vec3(
      (Math.random() * 10 - 5),  
      30,                         
      (Math.random() * 10 - 5)   
    );
    sphereBody.velocity.copy(initialVelocity);
  }

  const physStep = 1 / 60; //la documentacion recomienda usar este valor
  const clock = new THREE.Clock();

  function animate() {
    world.step(physStep);

    planoMesh.position.copy(planoBody.position)
    planoMesh.quaternion.copy(planoBody.quaternion)
    
    bodyArray.forEach((b, i) => {
      const mesh = meshArray[i];
      mesh.position.copy(b.position);
    });
    

    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
  }
  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    controls.update();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate();
}

const App = () => {
  return (
    <>      
    {doThree()}
    </>
  )
}

export default App