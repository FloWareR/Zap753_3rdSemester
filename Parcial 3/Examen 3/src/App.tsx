import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { texture } from 'three/examples/jsm/nodes/Nodes.js';
import CannonDebugger from 'cannon-es-debugger'
let score = 0

function doThreeJS(){


  var loading = true;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const world = new CANNON.World();
  const gltfloader = new GLTFLoader();
  let modelPipe: THREE.Group<THREE.Object3DEventMap>;

  const tubeArrayTop: any[] = [];
  const tubeArrayBot: any[] = [];
  const tubePhysTop: any[] = [];
  const tubePhysBot: any[] = [];

  const audioLoader = new THREE.AudioLoader();
  const audioListener = new THREE.AudioListener();
  const sound = new THREE.Audio(audioListener);

audioLoader.load('Sounds/flap.mp3', (buffer) => {
  sound.setBuffer(buffer);
});

  gltfloader.load(
    'models/otchim_mob/scene.gltf',
    function ( gltf ) {
      scene.add( gltf.scene );
      model =  gltf.scene;
  
    }, function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  
    },
    // called when loading has errors
    function ( error ) {
  
      console.log( error );
  
    });

    var zPosition = 30;
    var randomSize = 0;
    for (let i = 0; i < 15; i++) {
        
      gltfloader.load(
        'models/mario_pipe/scene.gltf',
        function (gltf) {
          const modelPipe = gltf.scene.clone();
          const modelPipeT = gltf.scene.clone();
          scene.add(modelPipeT);
          scene.add(modelPipe);
          randomSize = getRandomSize();
          modelPipe.scale.set(0.08,randomSize, 0.08);
          if(randomSize > .1){
            randomSize -= .07
          }

          modelPipeT.scale.set(0.08,randomSize, 0.08);
          modelPipeT.rotation.z = Math.PI;

          tubeArrayTop.push(modelPipe); 
          tubeArrayBot.push(modelPipeT); 
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function (error) {
          console.log(error);
        }
      );
      const boxShape = new CANNON.Box(new CANNON.Vec3(2,randomSize/2,2)); 
      const boxBody:any = new CANNON.Body({
        mass: 1, 
        shape: boxShape,
        type:CANNON.Body.DYNAMIC
      });
      const boxBodyT:any = new CANNON.Body({
        mass: 1, 
        shape: boxShape,
        type:CANNON.Body.DYNAMIC
      });
      boxBody.position.set(0, -5, zPosition); 
      boxBodyT.position.set(0, 10, zPosition); 

      tubePhysTop.push(boxBody); 
      tubePhysBot.push(boxBodyT)
      zPosition = zPosition + 15;
      world.addBody(boxBody)
      world.addBody(boxBodyT)
    }


    let spaceKeyPressed = false;


  function getRandomSize() {
      const minZ = 0.05; 
      const maxZ = 0.2;

      return Math.random() * (maxZ - minZ) + minZ;
    }


  world.gravity = new CANNON.Vec3(0,-9.81,0);
  camera.position.set(-10.37,2,-7.75)
  camera.lookAt(0,0,6)

  const cameraController = new THREE.Object3D();
  cameraController.add(camera);
  const cameraTarget = new THREE.Vector3(0,0,6);
  scene.add(cameraController)

  scene.background = new THREE.Color(0.25,0.6,0.95);

  const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
  scene.add(ambientLight);
  
  const light = new THREE.DirectionalLight(0xffffff,0.6);
  light.position.set(0,4,2);
  scene.add(light);

  const fogColor = new THREE.Color(0xffffff); 
  const fogDensity = 0.01; 
  const fog = new THREE.FogExp2(fogColor, fogDensity);
  scene.fog = fog;

  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  renderer.shadowMap.enabled = true

  
  const loader = new RGBELoader();
  const jpgloader = new THREE.TextureLoader();
  
  let model: THREE.Group<THREE.Object3DEventMap>;

  loader.load(
    '/background/rosendal_mountain_midmorning_2k.hdr',
    function(texture){
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
    }
  )
  scene.add(new THREE.AxesHelper(5))  
  function updateMaxScore(newScore: number) {
    const maxscore = localStorage.getItem("maxScore");

    if (!maxscore || newScore > parseInt(maxscore)) {
      localStorage.setItem("maxScore", newScore.toString());
    }
  }

    function updateCamera(): void{
      cameraController.position.copy(model.position);
      cameraController.position.y = 0;
      cameraTarget.copy(model.position); 
      cameraTarget.z += 6;
      cameraTarget.y = 0;
      camera.lookAt(cameraTarget);
    }


    window.addEventListener('keydown', (event) => {
      if (event.key === ' ' && !spaceKeyPressed) {
        spaceKeyPressed = true;
        sphereBody.velocity.y += 7;
        sound.play();


      }
    });
    window.addEventListener('keyup', (event) => {
      if (event.key === ' ') {
        spaceKeyPressed = false;
      }
    });

    function reUsePipes(b){
      b.position.z = 195
    }

    world.gravity = new CANNON.Vec3(0,-9.81,0);
  
  
    const planoGeometry = new THREE.PlaneGeometry(13,1100,1);
    const planoMaterial = new THREE.MeshPhongMaterial({
      color:0x339554,       
      side:THREE.DoubleSide
    });
    const planoMesh = new THREE.Mesh(planoGeometry,planoMaterial);
    const planoMeshT = new THREE.Mesh(planoGeometry,planoMaterial);

    scene.add(planoMesh);  
    scene.add(planoMeshT);  

    planoMesh.receiveShadow = true;  
  
    const planoBody:any = new CANNON.Body({
      shape: new CANNON.Plane(),
      type: CANNON.Body.STATIC,
    })

    const planoBodyT:any = new CANNON.Body({
      shape: new CANNON.Box(new CANNON.Vec3(6.5,550,1)),
      type: CANNON.Body.STATIC,
    })

    world.addBody(planoBody);
    world.addBody(planoBodyT);

    planoBody.position.set(0,-5,0 )
    planoBody.quaternion.setFromEuler(-90 * (Math.PI/180),0,0);
    planoBodyT.position.set(0,10,0 )
    planoBodyT.quaternion.setFromEuler(-90 * (Math.PI/180),0,0);

    const sphereShape = new CANNON.Sphere(1); 
    const sphereBody:any = new CANNON.Body({
      mass: 1, 
      shape: sphereShape,
      type:CANNON.Body.DYNAMIC
    });
    sphereBody.position.set(0,0,0)

    world.addBody(sphereBody);
    const physStep = 1 / 60; //la documentacion recomienda usar este valor
    const clock = new THREE.Clock();



  function loadingFalse(){
    loading = false;
    console.log(loading);
    animate(); 
  }


  function updateScore(){
    score ++;
  }

  sphereBody.addEventListener('collide', (e) => {
    // Handle collision with the sphere and tube here
    console.log('Sphere collided with tube.');
  });

  
  function animate() {
      if(loading){  
        setTimeout(loadingFalse, 3000);
       }
      if (!loading){
        world.step(physStep);
        updateCamera()
        if(sphereBody.position.y >= 9){
          sphereBody.velocity.y = -1;
        }

         const scoreDisplay = document.getElementById("info");
         if (scoreDisplay) {
            scoreDisplay.textContent = `Score: ${score}`;
          }

      planoMesh.position.copy(planoBody.position)
      planoMesh.quaternion.copy(planoBody.quaternion)
      planoMeshT.position.copy(planoBodyT.position)
      planoMeshT.quaternion.copy(planoBodyT.quaternion)
      renderer.render( scene, camera );
      requestAnimationFrame( animate );
      model.position.set(sphereBody.position.x,sphereBody.position.y,sphereBody.position.z)
      sphereBody.position.z = 0;
      sphereBody.position.x = 0;

      tubePhysTop.forEach((b, i) => {
        const mesh = tubeArrayTop[i];
        mesh.position.copy(b.position);
      });    

      tubePhysTop.forEach((b, i) => {
        const mesh = tubePhysBot[i];
        mesh.position.copy(b.position);
        mesh.position.y = 10;
      });    

      tubePhysBot.forEach((b, i) => {
        const mesh = tubeArrayBot[i];
        mesh.position.copy(b.position);
        mesh.position.x = 3
      });   

      tubePhysTop.forEach((b) => {
        b.velocity.set(0,0,-30)
        if(b.position.z <-10){
          reUsePipes(b);
        }
      });
      tubePhysBot.forEach((b) => {
        b.velocity.set(0,0,-5)
        if(b.position.z <-10){
          reUsePipes(b);
        }
      });

    }
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){ 
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
    }
    updateScore();
    // updateMaxScore(score);
  }
 
 animate(); 


 

}






const App = () => {

  return (
    <>
      {doThreeJS()}
      <div id="info">Score: {score}</div> 

    </>
  )
}


export default App
