this.yu = this.yu || {};
(function(){
	var SceneBase = function(dom) {
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(45, dom.clientWidth / dom.clientHeight, 1, 3000);
		this.camera.position.set(0, 0, 1500);

		if (THREE.OrbitControls)
			var controller = new THREE.OrbitControls(this.camera);
		var stats = null;

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(dom.clientWidth, dom.clientHeight);
		dom.appendChild(this.renderer.domElement);

		this.render = function() {
			if (this.renderer) {
				this.renderer.render(this.scene, this.camera);
				if (controller && controller.enabled)
					controller.update();
				if (stats)
					stats.update();
			}
		};

		this.setTarget = function(Vec3) {
			if(!controller)
				return;
			controller.target.copy(Vec3);
		}

		this.setController = function(isEnabled) {
			if(!controller)
				return;
			controller.enabled = isEnabled;
		};

		this.setStats = function() {
			if(Stats == undefined)
				return;

			stats = new Stats();
			dom.parentNode.appendChild(stats.dom);
		}

		this.resize = function() {
			this.camera.aspect = dom.clientWidth / dom.clientHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(dom.clientWidth, dom.clientHeight);
		};
	};

	yu.SceneBase = SceneBase;
})();