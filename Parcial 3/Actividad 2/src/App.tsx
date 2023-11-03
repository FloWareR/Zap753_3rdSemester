import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RaycastResult } from 'cannon';

function doThreeJS(){
 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  //Color fondo
  scene.background = new THREE.Color(0.25,0.6,0.95);

  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
  scene.add(ambientLight);
  
  //Luz direccional
  // const light = new THREE.DirectionalLight(0xffffff,0.6);
  // light.position.set(0,4,2);
  // scene.add(light);
  // light.castShadow = true;
  // light.shadow.camera.right = 10;
  // light.shadow.camera.left = -10;

  // const lightH = new THREE.DirectionalLightHelper(light,10);
  // scene.add(lightH)
  // const lightS = new THREE.CameraHelper(light.shadow.camera);
  // scene.add(lightS)




  const renderer = new THREE.WebGLRenderer();
  //renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  //renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  //renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 2, 2, 2 );
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
  const material2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
  const cube2 = new THREE.Mesh( geometry2, material2 );
  scene.add( cube2 );
  

  const cubeAr: THREE.Mesh[] = [];
  const cubeIds = [];

  for(let i = 0; i < 5; i++){
    const cubeA = new THREE.Mesh( geometry2, material2 );
    cubeA.position.set((randomNum(-9,9)),(randomNum(-4,3)),(randomNum(-9,9)))
    scene.add(cubeA);
    cubeIds.push(cubeA.id);
    cubeAr.push(cubeA)
  } 

  cubeAr.push(cube2)

  function randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  cube2.castShadow = true;

  cube.castShadow = true;
  const planeG = new THREE.PlaneGeometry(20,20,1,1  );
  const planeM = new THREE.MeshStandardMaterial({color:"darkgray", wireframe:false, side: THREE.DoubleSide})
  const plane = new THREE.Mesh(planeG,planeM)
  plane.rotateX(90 * (Math.PI/180));
  scene.add(plane);
  camera.position.z = 5;
  plane.receiveShadow = true;

  const clock = new THREE.Clock();
  
  const gui = new dat.GUI();
  const options = {
    intensity: 500,
    angle: Math.PI/4,
    penumbra: 0.5,
    color: 0xffff00,
    wireframe: false,
  }
  gui.add(options,'intensity',0,1100)
  gui.add(options,'angle',0,Math.PI/2)
  gui.add(options,'penumbra',0,1)
  gui.add(options,'wireframe').onChange((e =>{
    cube2.material.wireframe = e
  }))
  gui.add(options, 'color').onChange((e) => {
    cube2.material.color.set(e);
  })
  //Raycaster
  //en Three js cualquier objeto intersectado por el raycast es añadido a la lista
  //setearemos la camara como la fuente y el mouse como el punto final
  const mousePosition = new THREE.Vector2();

  window.addEventListener('mousemove', function(e){
    //obtenemos las coordenadas normalizadas (de 0 a 1)    
    mousePosition.x =  ( e.clientX / window.innerWidth ) * 2 - 1;
    mousePosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

  })

  const rayCaster = new THREE.Raycaster();
  let loaded = false;
  setTimeout(()=>{
    loaded = true
  },1000)

  const sLight = new THREE.SpotLight("white");
  sLight.position.set(-2,18,2);
  sLight.castShadow = true;
  scene.add(sLight)
  const sLightH = new THREE.SpotLightHelper(sLight);
  scene.add(sLightH)





  document.body.addEventListener('click', (e) => {
    if (loaded) {
      rayCaster.setFromCamera(mousePosition, camera);
      const intObj = rayCaster.intersectObjects(cubeAr); 
      for (let i = 0; i < intObj.length; i++) {
        const intersectedCube = intObj[i].object;
        if (intersectedCube.parent === cube) {
          scene.attach(intersectedCube);
        } else {
          cube.attach(intersectedCube);
        }
      }
    }
  });
  
  

  
  function animate() {
    const time = clock.getElapsedTime();

    sLight.angle = options.angle
    sLight.penumbra = options.penumbra
    sLight.intensity = options.intensity
  
    sLightH.update()


    
  

    plane.position.set(0,-5,0)
    requestAnimationFrame( animate );
    cube.position.set(Math.sin(time) * 10, 5,0)
	  controls.update();
    renderer.render( scene, camera );
  }


  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  animate(); //Iniciamos el loop
}


const App = () => {

  return (
    <>
      <div id="info"></div>
      {doThreeJS()}
    </>
  )
}

export default App

