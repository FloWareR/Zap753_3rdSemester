
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

function doThreeJS(){



  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let currentTimeout: number | undefined;
  //Color fondo
  scene.background = new THREE.Color( 'skyblue' );
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0x99aaff,1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer();

  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.toneMappingExposure = 0.85;
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  //1 ============================================================ Iluminacion con HDRI y reflejos
  const loader = new RGBELoader();  

  const jpgloader = new THREE.TextureLoader();
  const gltfloader = new GLTFLoader();



  camera.position.z = 5;
  controls.update();

  const etiquetasRenderer = new CSS2DRenderer(); //lo primero es inicializar
  etiquetasRenderer.setSize(window.innerWidth, window.innerHeight); //le damos tamaño
  etiquetasRenderer.domElement.style.position = 'absolute'; //esta propiedad
  etiquetasRenderer.domElement.style.top = '0px';//y esta propiedad son para poner encima de nuestra escena de threeJs
  document.body.appendChild(etiquetasRenderer.domElement); //lo añadimos al DOM, posteriormente vamos a animate y resize y lo añadimos
  etiquetasRenderer.domElement.style.pointerEvents = 'none'; //sino, los orbitControls no van a jalar porque los eventos de mouse
  //son registrados por el etiquetasRenderer
  etiquetasRenderer.domElement.style.color = "#ffffff";

  //parte2
  const p = document.createElement('p'); //creamos
  // p.textContent = 'Hola Crack';
  const pCSSObject = new CSS2DObject(p);
  // pCSSObject.position.set(-10, 0, 0);



  scene.add(pCSSObject); 
  const ptool = document.createElement('p');  
  ptool.className = 'tooltip hide';
  ptool.textContent = 'TOOLTIP';
  const pContainer = document.createElement('div');
  pContainer.appendChild(ptool);
  const cPointLabel = new CSS2DObject(pContainer);
  cPointLabel.position.set(0,1,0);
  scene.add(cPointLabel);

  const allObjects = [];
  const objectsLeft = [];

  loader.load('/environments/christmas_photo_studio_07_1k.hdr',
    function(texture){
      texture.mapping = THREE.EquirectangularRefractionMapping;
      scene.background = texture;
      scene.environment = texture;
    }
  )
    let model; 


    gltfloader.load(
      '/HouseModel/coolHouse.gltf',
      function(gltf){
        model = gltf.scene;
        scene.add(model);
            }
    )

  //3 ================================== AUDIO
  const listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  const sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'audio/wineGlassClink.wav', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.5 );
  });


  const mousePosition = new THREE.Vector2();
  const rayCaster = new THREE.Raycaster();
  window.addEventListener('click',(e)=>{
   
      mousePosition.x =  ( e.clientX / window.innerWidth ) * 2 - 1;
      mousePosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
      
      rayCaster.setFromCamera(mousePosition,camera);
      const intersects = rayCaster.intersectObjects(scene.children);
      if(intersects.length>0){
         

        const objPos = intersects[0].object.position;
        ptool.className = 'tooltip show'
        cPointLabel.position.set(objPos.x,objPos.y+1,objPos.z)
        ptool.textContent = intersects[0].object.name

        if(currentTimeout!= undefined){clearTimeout(currentTimeout)};

        currentTimeout = setTimeout(()=>{
          ptool.className = 'tooltip hide';
        },2000);

        if(sound.isPlaying){
          sound.stop();      
        }
        sound.play();
                
      }else{
        
      }
  })

  function animate() {
    requestAnimationFrame( animate );


    
    etiquetasRenderer.render(scene,camera);
    renderer.render( scene, camera );
  }


  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    etiquetasRenderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  animate(); //Iniciamos el loop


}


function Clase() {

  return (

    <>      
    
    {doThreeJS()}
  
      
    </>
  )
}

export default Clase