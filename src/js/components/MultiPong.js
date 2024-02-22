import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class MultiPong {

	disconnect_socket() {
		if (this._socket) {
			if (this._socket.readyState === WebSocket.OPEN) {
				this._socket.close();
				cancelAnimationFrame(this._animationFrameId);
			}
		}
	}

	constructor() {
		let socket = null;
		this._socket = socket;
	} //constructor

	_setupControls() {
		new OrbitControls(this._camera, this._divContainer);
	}

	_setupBackground() {
		const loader = new THREE.TextureLoader();

		loader.load(
	    	this._WAVE_PATH,
	    	(texture) => {
	        	this._scene.background = texture;
	    	},
		);
	}

	_sleep(sec) {
		let start = Date.now(), now = start;
		while (now - start < sec * 1000) {
			now = Date.now();
		}
	}

	_setupSocket() {
		const SOCKET_PROTOCOL = import.meta.env.TS_SOCKET_PROTOCOL;
		const HOST_IP = import.meta.env.TS_HOST_IP;
		const SERVER_PORT = import.meta.env.TS_SERVER_PORT;
		const ENTRYPOINT = SOCKET_PROTOCOL + '://' + HOST_IP + ':' + SERVER_PORT;
		const url = ENTRYPOINT + '/multiPong/';
		this._socket = new WebSocket(url);
		const JWT = localStorage.getItem("token");

		this._socket.onopen = function(event) {
			console.log('WebSocket이 열렸습니다.');
			// jwt 소켓으로 전송.
			this._socket.send(JSON.stringify({
				'type': 'jwt',
				'jwt': JWT
			}));
		}.bind(this);

		this._socket.onmessage = function(event) {
			const data = JSON.parse(event.data);
			console.log(data.type);
			switch (data.type) {
				case 'game_over_disconnected':
					this._socket.close();
					cancelAnimationFrame(this._animationFrameId);
                    if (data.detail === 'game_over') {
						alert("player " + (data.winner === 1 ? this._p1nickname : this._p2nickname) + " win!");
                        window.location.hash = "#";
                    } else if (data.detail === 'game_over_disconnected') {
						alert("Opponent disconnected! " + "player " + (data.winner === 1 ? this._p1nickname : this._p2nickname) + " win!");
                        window.location.hash = "#";
                    }
					break;
				case 'player_num':
					this._player_num = data.player_num;
					this._camera.position.set((this._player_num === 1) ? -3.0 : 3.0, 2, 0);
					this._camera.lookAt(0, -1, 0);
					const keyMapping = this._player_num === 1 ? 
					{ 'ArrowRight': 'ArrowRight', 'ArrowLeft': 'ArrowLeft' } : 
					{ 'ArrowRight': 'ArrowLeft', 'ArrowLeft': 'ArrowRight' };
					this._keyMapping = keyMapping;
					break;
				case 'positions':
					this._sphere.position.set(...data.sphere_position);
					this._cube_1.position.set(...data.p1_bar_position);
					this._cube_2.position.set(...data.p2_bar_position);
					break;
				case 'scores':
					this._p1score = data.player_1_score;
					this._p2score = data.player_2_score;
					break;
				case 'nick_name':
					this._p1nickname = data.p1_nick_name;
					this._p2nickname = data.p2_nick_name;
			}
		}.bind(this);
		
		this._socket.onclose = function(event) {
			console.log('WebSocket이 닫혔습니다.');
			this._socket = null;
		}
	}

	_setupKeyboardControls() {
		const keyboardState = {};
		this._keyboardState = keyboardState;

		document.addEventListener('keydown', (event) => {
			keyboardState[event.code] = true;
		});
		document.addEventListener('keyup', (event) => {
			keyboardState[event.code] = false;
		});
	}

	_setupCamera() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			100
		);
		const cam_pos = new THREE.Vector3(0, 0, 3);
		camera.position.copy(cam_pos);
		camera.lookAt(0, 0, 0);
		this._camera = camera;
	}

	_setupLight() {
		const light = new THREE.AmbientLight(0xffffff, 0.2);

		this._scene.add(light);
		this._light = light;

		const color = 0xffffff; // 광원의 색상.
		const intensity = 1; //광원의 세기.
		const direct_light = new THREE.DirectionalLight(color, intensity);
		direct_light.position.set(-1, 2, 4);
		this._scene.add(direct_light);
		this._direct_light = direct_light;
	}

	_setupGround() {

		const loader = new THREE.TextureLoader();
		loader.load(this._GROUND_PATH, (texture) => {
			texture.encoding = THREE.sRGBEncoding;
			const material = new THREE.MeshBasicMaterial({
				map: texture,
				side: THREE.DoubleSide,
			});
			const geometry = new THREE.PlaneGeometry( 5, 6 );
			const BottomPlane = new THREE.Mesh( geometry, material );
			BottomPlane.rotation.x = Math.PI / 2;
			BottomPlane.position.y = -0.1;		
			this._scene.add(BottomPlane);
			this._BottomPlane = BottomPlane;
		});
	}

	_setupModel() {
		this._setupGround();

		let loader = new GLTFLoader();
		loader.load(this._MODEL_PATH, (gltf) => {
			const model_1 = gltf.scene;
			const model_2 = gltf.scene.clone();
			model_1.scale.set(0.1, 0.1, 0.1);
			model_1.position.x = -2.5;
			model_1.rotation.y = Math.PI / 2;
			model_2.scale.set(0.1, 0.1, 0.1);
			model_2.position.x = 2.5;
			model_2.rotation.y = -Math.PI / 2;
			// model_2.rotation.y = Math.PI;
			this._scene.add(model_1);
			this._scene.add(model_2);
			this._cube_1 = model_1;
			this._cube_2 = model_2;
		});

		loader = new THREE.TextureLoader();
		loader.load(this._BALL_PATH, (texture) => {
			// texture.encoding = THREE.sRGBEncoding;
			const Spherematerial = new THREE.MeshBasicMaterial({
				map: texture,
			});
			const Spheregeometry = new THREE.SphereGeometry(0.04, 32, 32);
			const sphere = new THREE.Mesh(Spheregeometry, Spherematerial);
			this._scene.add(sphere);
			this._sphere = sphere;
		});

		this._rotation_speed = 0.05;
	}

	resize() { 
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time) {
   		this._renderer.render(this._scene, this._camera);
		this.update(time);
   		this._animationFrameId = requestAnimationFrame(this.render.bind(this));
	}

	_CheckKeyboardInput() {
		['ArrowRight', 'ArrowLeft'].forEach((key) => {
			if (this._socket.readyState === WebSocket.OPEN && this._keyboardState[key]) {
				this._socket.send(JSON.stringify({
					'type': 'keydown',
					'keycode': this._keyMapping[key],
					'player_num': this._player_num
				}));
			}
		});
	}
	
	update( time ) {
		this._CheckKeyboardInput();

		if (this._sphere) {
			this._sphere.rotation.x += this._rotation_speed;
			this._sphere.rotation.y += this._rotation_speed;
			this._sphere.rotation.z += this._rotation_speed;
		}

		this._div_p1score.innerHTML = this._p1nickname + " P1 Score : " + this._p1score;
		this._div_p2score.innerHTML = this._p2nickname + " P2 Score : " + this._p2score;
	}

	run() {
		const MODEL_PATH = "assets/pikachu/scene.gltf";
		const BALL_PATH = "assets/images/poketball_square.png";
		const GROUND_PATH = "assets/images/ground.jpg";
		const WAVE_PATH = "assets/images/cartoon_wave_2.jpg";
		this._MODEL_PATH = MODEL_PATH;
		this._BALL_PATH = BALL_PATH;
		this._GROUND_PATH = GROUND_PATH;
		this._WAVE_PATH = WAVE_PATH;

		const divContainer = document.querySelector("#multi_canvas");
		this._divContainer = divContainer;

		this._player_num = 0;

		const renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setPixelRatio(window.devicePixelRatio);
		divContainer.appendChild(renderer.domElement);
		// renderer.domElement -> canvas타입의 dom객체
		this._renderer = renderer;

		const scene = new THREE.Scene();
		this._scene = scene;

		this._p1score = 0;
		this._p2score = 0;
		
		this._p1nickname = "";
		this._p2nickname = "";

		const div_p1score = document.getElementById("p1-score");
		const div_p2score = document.getElementById("p2-score");

		this._div_p1score = div_p1score;
		this._div_p2score = div_p2score;

		this._setupBackground();
		this._setupCamera();
		this._setupLight();
		this._setupModel();
		this._setupControls();
		this._setupKeyboardControls();
		this._setupSocket();

		window.onresize = this.resize.bind(this);
		//window.onresize -> 창크기 변경시 발생하는 메서드
		this.resize(); //renderer와 camera의 속성을 창크기에 맞게 설정해주기 위함.
		this._animationFrameId = requestAnimationFrame(this.render.bind(this));
	}
} // end of class