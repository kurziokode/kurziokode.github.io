anime({
  targets: '.nav .icon i',
  translateX: [100, 0],
  duration: 1200,
  opacity: [0, 1],
  delay: (el, i) => {
    return 300 + 100 * i;
  },
})

anime({
  targets: '.nav .icon p',
  duration: 10000,
  opacity: [0, 1],
  delay:  (el, i) => {
    return 4000 + 200 * i;
  },
  
})

anime({
  targets: '.live .person',
  translateY: [100, 0],
  duration: 3000,
  delay: (el, i) => {
    return 1000 + 200 * i;
  },
})

anime({
  targets: '.like i',
  easing: 'easeOutExpo',
  scale: [2, 1],
  opacity: [0, 1],
  delay: 1200
})

anime({
  targets: '.comment i',
  easing: 'easeOutExpo',
  scale: [2, 1],
  opacity: [0, 1],
  delay: 1300
})

anime({
  targets: '.share i',
  easing: 'easeOutExpo',
  scale: [2, 1],
  opacity: [0, 1],
  delay: 1400
})

anime({
  targets: '.newsfeed .card',
  translateY: [300, 0],
  easing: 'easeOutExpo',
  opacity: [0, 1],
  delay: (el, i) => 700 + 300 * i
})





if ( ! Modernizr.webgl ) alert('Your browser dosent support WebGL');

			var container, stats;

			var camera, scene, renderer;
      var mouseX = 0, mouseY = 0;

      var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.y = 400;

				scene = new THREE.Scene();

				var light, object, object2;

				scene.add( new THREE.AmbientLight( 0xffffff, 0.8 ) );

				light = new THREE.DirectionalLight( 0xffffff, 0.2 );
				light.position.set( 1, 1, 1 );
				scene.add( light );

				var material = new THREE.MeshLambertMaterial( { ambient: 0x0885c2, side: THREE.DoubleSide } );
        var material2 = new THREE.MeshLambertMaterial( { ambient: 0x000000, side: THREE.DoubleSide } );
        var material3 = new THREE.MeshLambertMaterial( { ambient: 0xed334e, side: THREE.DoubleSide } );
        var material4 = new THREE.MeshLambertMaterial( { ambient: 0xfbb132, side: THREE.DoubleSide } );
        var material5 = new THREE.MeshLambertMaterial( { ambient: 0x1c8b3c, side: THREE.DoubleSide } );


				object = new THREE.Mesh( new THREE.TorusGeometry( 100, 10, 10, 50 ), material );
				object.position.set( -250, 0, 0 );
				scene.add( object );
        
        object2 = new THREE.Mesh( new THREE.TorusGeometry( 100, 10, 10, 50 ), material2 );
				object2.position.set( -10, 00, 5 );
				scene.add( object2 );
        
        object3 = new THREE.Mesh( new THREE.TorusGeometry( 100, 10, 10, 50 ), material3 );
				object3.position.set( 230, 0, 0 );
				scene.add( object3 );
        
        object4 = new THREE.Mesh( new THREE.TorusGeometry( 100, 10, 10, 50 ), material4 );
				object4.position.set(-125, -100, -5 );
				scene.add( object4 );
        
        object5 = new THREE.Mesh( new THREE.TorusGeometry( 100, 10, 10, 50 ), material5 );
				object5.position.set(115, -100, 10 );
				scene.add( object5 );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setSize( window.innerWidth, window.innerHeight );

				container.appendChild( renderer.domElement );
        
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				window.addEventListener( 'resize', onWindowResize, false );

			}

     function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

			}


			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {
				requestAnimationFrame( animate );
				render();
			}

     
			function render() {

        camera.position.z = 650;
        
        camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

				camera.lookAt( scene.position );
				renderer.render( scene, camera );

			}

