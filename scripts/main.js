const HOBBIES = [
  {
    icon: "fas fa-bolt",
    title: "Blueboard systems",
    description: "Designing electric motion products, rideable systems, and the firmware-plus-hardware pieces that make them usable.",
    tag: "Builder"
  },
  {
    icon: "fas fa-wind",
    title: "Glider flying",
    description: "Glider time sharpens planning, situational awareness, and fast decisions under changing conditions.",
    tag: "Pilot"
  },
  {
    icon: "fas fa-motorcycle",
    title: "Surron and e-bikes",
    description: "Tuning, maintaining, and iterating on electric bikes with the same mindset used on technical products.",
    tag: "Rideables"
  },
  {
    icon: "fas fa-laptop-code",
    title: "Coding beyond work",
    description: "Production backend by day, side projects, automation, and experiments whenever there is room for another idea.",
    tag: "Engineer"
  }
];

const GALLERIES = {
  glider: [
    {
      src: "images/glider_9b035380755aae15dd2183bedb6d967d_336235.89999992255_1773847784943.jpg",
      title: "Glider day",
      description: "Field day moments and airframe prep before getting airborne."
    },
    {
      src: "images/glider_c38b39c283c8194c12cad330375c5688_2206637.766666512_1773848033911.jpg",
      title: "Negev soaring",
      description: "Wide sky, long lines, and the kind of quiet that only gliding gives you."
    },
    {
      src: "images/glider_IMG20251128111432.jpg",
      title: "Flight log memory",
      description: "A grounded snapshot from the glider side of life."
    }
  ],
  surron: [
    {
      src: "images/surron_IMG20250828183413.jpg",
      title: "Build phase",
      description: "Hands-on iteration around setup, fit, and mechanical details."
    },
    {
      src: "images/surron_IMG-20250918-WA0086.jpg",
      title: "Ride day",
      description: "The bike in its natural state: outside and moving."
    },
    {
      src: "images/surron_IMG20250930075650.jpg",
      title: "Tuning session",
      description: "Adjustments, testing, and refining the rideable system."
    },
    {
      src: "images/surron_IMG20260130110701.jpg",
      title: "Latest snapshot",
      description: "Another checkpoint in the Surron and e-bike build loop."
    }
  ]
};

const MOTION_SCENES = [
  {
    key: "onewheel",
    label: "Onewheel commute",
    detail: "Dusk city ride with a moving board, rider lean, and camera tracking.",
    background: 0x1a2d45,
    fogNear: 14,
    fogFar: 38
  },
  {
    key: "glider",
    label: "Glider flight",
    detail: "A wider sky with cloud drift, long wings, and a banking flight line.",
    background: 0x8fc7ea,
    fogNear: 28,
    fogFar: 68
  },
  {
    key: "surron",
    label: "Surron run",
    detail: "Trail colors, faster wheel motion, and a more aggressive riding posture.",
    background: 0x3b3126,
    fogNear: 14,
    fogFar: 34
  },
  {
    key: "coding",
    label: "Standing desk coding",
    detail: "Monitor glow, typing motion, and an indoor work setup anchored around the desk.",
    background: 0x132031,
    fogNear: 14,
    fogFar: 32
  },
  {
    key: "sleep",
    label: "Sleep reset",
    detail: "Quiet night scene, softer lighting, and a short breathing pause before the loop restarts.",
    background: 0x081119,
    fogNear: 12,
    fogFar: 30
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  renderHobbies();
  renderGalleries();
  bindRailControls();
  initHeroAnimation();
});

function initAOS() {
  if (!window.AOS) {
    return;
  }

  window.AOS.init({
    anchorPlacement: "top-left",
    duration: 900,
    once: true
  });
}

function renderHobbies() {
  const container = document.getElementById("hobby-strip");
  if (!container) {
    return;
  }

  container.innerHTML = HOBBIES.map((hobby) => `
    <article class="hobby-card">
      <span class="hobby-card__icon"><i class="${hobby.icon}"></i></span>
      <h3>${hobby.title}</h3>
      <p>${hobby.description}</p>
      <span class="hobby-card__tag">${hobby.tag}</span>
    </article>
  `).join("");
}

function renderGalleries() {
  document.querySelectorAll("[data-gallery]").forEach((rail) => {
    const items = GALLERIES[rail.dataset.gallery] || [];
    rail.innerHTML = items.map((item) => `
      <article class="media-card">
        <img class="media-card__image" src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="media-card__body">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      </article>
    `).join("");
  });
}

function bindRailControls() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const rail = document.getElementById(button.dataset.scrollTarget);
      if (!rail) {
        return;
      }

      const direction = button.dataset.scrollDirection === "prev" ? -1 : 1;
      rail.scrollBy({
        left: direction * rail.clientWidth * 0.82,
        behavior: "smooth"
      });
    });
  });
}

function initHeroAnimation() {
  if (!window.THREE) {
    return;
  }

  const THREE = window.THREE;
  const canvas = document.getElementById("hero-canvas");
  const labelEl = document.getElementById("scene-label");
  const detailEl = document.getElementById("scene-detail");
  const indexEl = document.getElementById("scene-index");
  const stepEls = Array.from(document.querySelectorAll("[data-scene-step]"));

  if (!canvas || !labelEl || !detailEl || !indexEl) {
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const backgroundColor = new THREE.Color(MOTION_SCENES[0].background);
  const tmpColor = new THREE.Color();
  scene.background = backgroundColor;
  scene.fog = new THREE.Fog(backgroundColor.clone(), MOTION_SCENES[0].fogNear, MOTION_SCENES[0].fogFar);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const clock = new THREE.Clock();

  const ambientLight = new THREE.HemisphereLight(0xcde6ff, 0x2f2116, 1.3);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xfff1cf, 1.15);
  sunLight.position.set(9, 10, 4);
  scene.add(sunLight);

  const fillLight = new THREE.PointLight(0x72c5ff, 0.55, 60);
  fillLight.position.set(-6, 4, 8);
  scene.add(fillLight);

  const atmosphere = new THREE.Group();
  scene.add(atmosphere);

  const mountains = createMountains(THREE);
  const clouds = createCloudField(THREE);
  const stars = createStars(THREE);
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xffd88a })
  );
  sun.position.set(7, 8.5, -16);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xf2f7ff })
  );
  moon.position.set(7, 7.6, -14);

  atmosphere.add(mountains.group);
  atmosphere.add(clouds.group);
  scene.add(stars);
  scene.add(sun);
  scene.add(moon);

  const roadScene = createRoadScene(THREE);
  const trailScene = createTrailScene(THREE);
  const deskScene = createDeskScene(THREE);
  const bedScene = createBedScene(THREE);

  scene.add(roadScene.group);
  scene.add(trailScene.group);
  scene.add(deskScene.group);
  scene.add(bedScene.group);

  const avatar = createAvatar(THREE);
  const onewheel = createOnewheel(THREE);
  const glider = createGlider(THREE);
  const surron = createSurron(THREE);

  scene.add(avatar.group);
  scene.add(onewheel.group);
  scene.add(glider.group);
  scene.add(surron.group);

  const context = {
    THREE,
    scene,
    camera,
    renderer,
    ambientLight,
    sunLight,
    fillLight,
    mountains,
    clouds,
    stars,
    sun,
    moon,
    roadScene,
    trailScene,
    deskScene,
    bedScene,
    avatar,
    onewheel,
    glider,
    surron
  };

  const sceneDuration = 5.8;
  let previousIndex = -1;

  function updateSceneState(sceneIndex) {
    const current = MOTION_SCENES[sceneIndex];
    labelEl.textContent = current.label;
    detailEl.textContent = current.detail;
    indexEl.textContent = String(sceneIndex + 1).padStart(2, "0");
    stepEls.forEach((step) => {
      step.classList.toggle("is-active", step.dataset.sceneStep === current.key);
    });
  }

  function resetSceneObjects() {
    resetAvatarPose(context.avatar);

    context.avatar.group.visible = false;
    context.avatar.group.position.set(0, 0, 0);
    context.avatar.group.rotation.set(0, 0, 0);

    context.onewheel.group.visible = false;
    context.onewheel.group.position.set(0, 0, 0);
    context.onewheel.group.rotation.set(0, 0, 0);
    context.onewheel.tire.rotation.set(0, 0, Math.PI / 2);

    context.glider.group.visible = false;
    context.glider.group.position.set(0, 0, 0);
    context.glider.group.rotation.set(0, 0, 0);

    context.surron.group.visible = false;
    context.surron.group.position.set(0, 0, 0);
    context.surron.group.rotation.set(0, 0, 0);
    context.surron.frontWheel.rotation.set(0, 0, Math.PI / 2);
    context.surron.backWheel.rotation.set(0, 0, Math.PI / 2);
    context.surron.headlight.intensity = 0.2;

    context.roadScene.group.visible = false;
    context.trailScene.group.visible = false;
    context.deskScene.group.visible = false;
    context.bedScene.group.visible = false;

    context.mountains.group.visible = true;
    context.clouds.group.visible = true;
    context.stars.visible = true;
    context.stars.material.opacity = 0;
    context.sun.visible = true;
    context.moon.visible = false;

    context.ambientLight.intensity = 1.3;
    context.sunLight.intensity = 1.15;
    context.fillLight.intensity = 0.55;

    context.deskScene.screen.material.emissiveIntensity = 0.8;
    context.deskScene.screenBars.forEach((bar, barIndex) => {
      bar.scale.x = 1;
      bar.position.x = -0.65 + barIndex * 0.26;
    });

    context.bedScene.dreamParticles.children.forEach((particle) => {
      particle.visible = true;
    });
  }

  const sceneUpdaters = {
    onewheel(localTime, progress) {
      const x = lerp(-4.4, 4.4, progress);
      const bob = Math.sin(localTime * 6.6) * 0.08;

      context.roadScene.group.visible = true;
      context.avatar.group.visible = true;
      context.onewheel.group.visible = true;
      context.sun.visible = true;
      context.mountains.group.position.y = -0.25;

      context.avatar.group.position.set(x, 0.18 + bob, 0.04);
      context.avatar.group.rotation.set(0.04, -0.18, -0.14);
      poseRide(context.avatar, localTime);

      context.onewheel.group.position.set(x, 0.12, 0.02);
      context.onewheel.tire.rotation.x = -localTime * 14;

      context.camera.position.set(x + 3.4, 2.7, 8.2);
      context.camera.lookAt(x + 0.8, 2.2, 0);

      context.clouds.group.position.x = -localTime * 0.12;
      context.stars.material.opacity = 0.05;
      context.sun.position.set(7.5, 8.1, -16);
      context.sunLight.position.set(8, 9, 4);
    },

    glider(localTime, progress) {
      const x = Math.sin(progress * Math.PI * 2) * 1.8;
      const y = 5.5 + Math.sin(localTime * 1.4) * 0.35;
      const z = Math.cos(progress * Math.PI * 2) * 1.4;
      const bank = Math.sin(localTime * 1.2) * 0.34 - 0.12;

      context.glider.group.visible = true;
      context.mountains.group.position.y = -1.5;
      context.clouds.group.visible = true;
      context.sun.visible = true;
      context.sun.position.set(6.4, 9.2, -18);
      context.moon.visible = false;
      context.stars.material.opacity = 0;
      context.sunLight.intensity = 1.45;
      context.fillLight.intensity = 0.4;

      context.glider.group.position.set(x, y, z);
      context.glider.group.rotation.set(0.08 + Math.sin(localTime * 0.7) * 0.04, -0.58, bank);

      context.camera.position.set(x + 6.2, y + 2.3, z + 8.8);
      context.camera.lookAt(x - 1.1, y - 0.1, z);

      context.clouds.group.position.x = -localTime * 0.22;
    },

    surron(localTime, progress) {
      const x = lerp(-4.2, 4.2, progress);
      const bounce = Math.sin(localTime * 9.2) * 0.05;

      context.trailScene.group.visible = true;
      context.avatar.group.visible = true;
      context.surron.group.visible = true;
      context.sun.visible = true;
      context.sun.position.set(5.2, 7.4, -15);
      context.clouds.group.position.x = -localTime * 0.08;
      context.stars.material.opacity = 0.02;
      context.sunLight.intensity = 1.05;
      context.fillLight.intensity = 0.42;

      context.surron.group.position.set(x, 0.28 + bounce * 0.35, 0.45);
      context.surron.group.rotation.set(0, -0.36, 0.02);
      context.surron.frontWheel.rotation.x = -localTime * 20;
      context.surron.backWheel.rotation.x = -localTime * 20;
      context.surron.headlight.intensity = 0.55;

      context.avatar.group.position.set(x - 0.08, 0.88 + bounce, 0.45);
      context.avatar.group.rotation.set(0.08, -0.42, -0.05);
      poseSurron(context.avatar, localTime);

      context.camera.position.set(x + 3.8, 2.6, 7.7);
      context.camera.lookAt(x + 0.9, 1.6, 0.4);
    },

    coding(localTime) {
      context.deskScene.group.visible = true;
      context.avatar.group.visible = true;
      context.mountains.group.visible = false;
      context.clouds.group.visible = false;
      context.sun.visible = false;
      context.moon.visible = false;
      context.stars.material.opacity = 0;
      context.ambientLight.intensity = 1;
      context.sunLight.intensity = 0.55;
      context.fillLight.intensity = 0.82;

      context.avatar.group.position.set(0.35, 0.15 + Math.sin(localTime * 3.4) * 0.02, 0.2);
      context.avatar.group.rotation.set(0, 0.48, 0);
      poseCoding(context.avatar, localTime);

      context.camera.position.set(5.2, 3.1, 7.4);
      context.camera.lookAt(0.45, 2.3, 0.15);

      context.deskScene.screen.material.emissiveIntensity = 1.1 + Math.sin(localTime * 4.2) * 0.16;
      context.deskScene.screenBars.forEach((bar, index) => {
        bar.scale.x = 0.65 + (Math.sin(localTime * 4 + index) + 1) * 0.35;
        bar.position.x = -0.78 + index * 0.3 + Math.sin(localTime * 1.2 + index * 0.5) * 0.03;
      });
    },

    sleep(localTime) {
      const breath = Math.sin(localTime * 1.8) * 0.025;

      context.bedScene.group.visible = true;
      context.avatar.group.visible = true;
      context.mountains.group.visible = false;
      context.clouds.group.visible = false;
      context.sun.visible = false;
      context.moon.visible = true;
      context.moon.position.set(6.8, 7.5, -13);
      context.stars.material.opacity = 0.95;
      context.ambientLight.intensity = 0.72;
      context.sunLight.intensity = 0.24;
      context.fillLight.intensity = 0.28;

      context.avatar.group.position.set(-0.55 + breath * 0.5, 0.72 + breath, 0.08);
      context.avatar.group.rotation.set(0, 0, Math.PI / 2.14);
      poseSleep(context.avatar, localTime);

      context.camera.position.set(4.6, 3.4, 7.3);
      context.camera.lookAt(-0.15, 1.3, 0);

      context.bedScene.lampLight.intensity = 0.14 + Math.sin(localTime * 0.45) * 0.01;
      context.bedScene.dreamParticles.children.forEach((particle, index) => {
        const lift = (localTime * 0.28 + index * 0.32) % 1;
        particle.position.y = 2.7 + lift * 1.35;
        particle.position.x = 0.45 + Math.sin(localTime * 0.8 + index) * 0.18;
        particle.material.opacity = 0.2 + (1 - lift) * 0.55;
      });
    }
  };

  function renderFrame() {
    const elapsed = clock.getElapsedTime();
    const totalDuration = sceneDuration * MOTION_SCENES.length;
    const cycle = elapsed % totalDuration;
    const sceneIndex = Math.floor(cycle / sceneDuration);
    const localTime = cycle - sceneIndex * sceneDuration;
    const progress = localTime / sceneDuration;
    const sceneConfig = MOTION_SCENES[sceneIndex];

    if (sceneIndex !== previousIndex) {
      updateSceneState(sceneIndex);
      previousIndex = sceneIndex;
    }

    tmpColor.set(sceneConfig.background);
    backgroundColor.lerp(tmpColor, 0.08);
    scene.fog.color.copy(backgroundColor);
    scene.fog.near = sceneConfig.fogNear;
    scene.fog.far = sceneConfig.fogFar;

    resetSceneObjects();
    animateClouds(context.clouds, elapsed);
    twinkleStars(context.stars, elapsed);

    sceneUpdaters[sceneConfig.key](localTime, progress);

    renderer.render(scene, camera);
    requestAnimationFrame(renderFrame);
  }

  function handleResize() {
    const bounds = canvas.getBoundingClientRect();
    const width = Math.max(1, bounds.width);
    const height = Math.max(1, bounds.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", handleResize);
  handleResize();
  updateSceneState(0);
  renderFrame();
}

function createAvatar(THREE) {
  const group = new THREE.Group();

  const skin = new THREE.MeshStandardMaterial({ color: 0xf2bf97, roughness: 0.8 });
  const jacket = new THREE.MeshStandardMaterial({ color: 0x1b3146, roughness: 0.6 });
  const pants = new THREE.MeshStandardMaterial({ color: 0x151b22, roughness: 0.72 });
  const shoes = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.35, 0.5), jacket);
  torso.position.y = 2.2;
  group.add(torso);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.18, 12), skin);
  neck.position.y = 2.94;
  group.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 20), skin);
  head.position.y = 3.38;
  group.add(head);

  const helmet = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2.2),
    new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.55 })
  );
  helmet.position.y = 3.44;
  group.add(helmet);

  const leftArmPivot = new THREE.Group();
  const rightArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.62, 2.62, 0);
  rightArmPivot.position.set(0.62, 2.62, 0);

  const armGeometry = new THREE.CylinderGeometry(0.11, 0.12, 0.96, 14);
  const leftArm = new THREE.Mesh(armGeometry, skin);
  const rightArm = new THREE.Mesh(armGeometry, skin);
  leftArm.position.y = -0.48;
  rightArm.position.y = -0.48;
  leftArmPivot.add(leftArm);
  rightArmPivot.add(rightArm);
  group.add(leftArmPivot);
  group.add(rightArmPivot);

  const leftLegPivot = new THREE.Group();
  const rightLegPivot = new THREE.Group();
  leftLegPivot.position.set(-0.24, 1.48, 0);
  rightLegPivot.position.set(0.24, 1.48, 0);

  const legGeometry = new THREE.CylinderGeometry(0.13, 0.14, 1.22, 14);
  const leftLeg = new THREE.Mesh(legGeometry, pants);
  const rightLeg = new THREE.Mesh(legGeometry, pants);
  leftLeg.position.y = -0.61;
  rightLeg.position.y = -0.61;
  leftLegPivot.add(leftLeg);
  rightLegPivot.add(rightLeg);
  group.add(leftLegPivot);
  group.add(rightLegPivot);

  const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.72), shoes);
  const rightFoot = leftFoot.clone();
  leftFoot.position.set(-0.24, 0.18, 0.14);
  rightFoot.position.set(0.24, 0.18, 0.14);
  group.add(leftFoot);
  group.add(rightFoot);

  return {
    group,
    head,
    torso,
    leftArmPivot,
    rightArmPivot,
    leftLegPivot,
    rightLegPivot,
    leftFoot,
    rightFoot
  };
}

function createOnewheel(THREE) {
  const group = new THREE.Group();
  const dark = new THREE.MeshStandardMaterial({ color: 0x101217, roughness: 0.62 });
  const accent = new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.45 });

  const deck = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 0.6), dark);
  deck.position.y = 0.32;
  group.add(deck);

  const frontPad = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.14, 0.64), accent);
  const rearPad = frontPad.clone();
  frontPad.position.set(0.75, 0.36, 0);
  rearPad.position.set(-0.75, 0.36, 0);
  group.add(frontPad);
  group.add(rearPad);

  const tire = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.17, 18, 36),
    new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.84 })
  );
  tire.rotation.z = Math.PI / 2;
  tire.position.y = 0.22;
  group.add(tire);

  return { group, tire };
}

function createGlider(THREE) {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color: 0xe9dcc5, roughness: 0.48 });
  const accent = new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.55 });
  const glass = new THREE.MeshStandardMaterial({
    color: 0x7fc8ff,
    transparent: true,
    opacity: 0.45,
    roughness: 0.1
  });

  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 4.6, 18), body);
  fuselage.rotation.z = Math.PI / 2;
  group.add(fuselage);

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 18), accent);
  nose.position.x = 2.35;
  group.add(nose);

  const wing = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.1, 0.92), body);
  wing.position.y = 0.08;
  group.add(wing);

  const tailWing = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.08, 0.45), body);
  tailWing.position.set(-2.02, 0.44, 0);
  group.add(tailWing);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.78, 0.4), body);
  fin.position.set(-2.14, 0.76, 0);
  group.add(fin);

  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.44, 16, 16), glass);
  canopy.scale.set(1.35, 0.65, 0.95);
  canopy.position.set(0.6, 0.36, 0);
  group.add(canopy);

  const pilotHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 14, 14),
    new THREE.MeshStandardMaterial({ color: 0x1b3146, roughness: 0.55 })
  );
  pilotHead.position.set(0.45, 0.34, 0);
  group.add(pilotHead);

  return { group };
}

function createSurron(THREE) {
  const group = new THREE.Group();
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x1e222b, roughness: 0.55 });
  const frameAccent = new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.48 });
  const tireMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0b0e, roughness: 0.86 });

  const frontWheel = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.11, 18, 36), tireMaterial);
  const backWheel = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.11, 18, 36), tireMaterial);
  frontWheel.rotation.z = Math.PI / 2;
  backWheel.rotation.z = Math.PI / 2;
  frontWheel.position.set(1.5, 0.72, 0);
  backWheel.position.set(-1.45, 0.72, 0);
  group.add(frontWheel);
  group.add(backWheel);

  const frameBar1 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.08, 0.12), frameAccent);
  frameBar1.position.set(0, 1.42, 0);
  frameBar1.rotation.z = -0.2;
  group.add(frameBar1);

  const frameBar2 = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.08, 0.12), frameMaterial);
  frameBar2.position.set(-0.25, 1.1, 0);
  frameBar2.rotation.z = 0.45;
  group.add(frameBar2);

  const frameBar3 = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.08, 0.12), frameMaterial);
  frameBar3.position.set(0.35, 1.08, 0);
  frameBar3.rotation.z = -0.62;
  group.add(frameBar3);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.16, 0.44), frameMaterial);
  seat.position.set(-0.08, 1.58, 0);
  group.add(seat);

  const fork = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.1, 0.12), frameMaterial);
  fork.position.set(1.42, 1.28, 0);
  fork.rotation.z = -0.12;
  group.add(fork);

  const handlebar = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.08, 0.08), frameMaterial);
  handlebar.position.set(1.62, 1.94, 0);
  handlebar.rotation.z = 0.12;
  group.add(handlebar);

  const headlight = new THREE.PointLight(0xffe1a1, 0.2, 12);
  headlight.position.set(1.9, 1.84, 0);
  group.add(headlight);

  const lamp = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.18, 0.18),
    new THREE.MeshStandardMaterial({ color: 0xfff2c8, emissive: 0xffcc66, emissiveIntensity: 1.3 })
  );
  lamp.position.copy(headlight.position);
  group.add(lamp);

  return {
    group,
    frontWheel,
    backWheel,
    headlight
  };
}

function createRoadScene(THREE) {
  const group = new THREE.Group();

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    new THREE.MeshStandardMaterial({ color: 0x202b36, roughness: 0.96 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  group.add(ground);

  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 5.5),
    new THREE.MeshStandardMaterial({ color: 0x13181d, roughness: 0.92 })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.02, 0);
  group.add(road);

  for (let i = 0; i < 9; i += 1) {
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 0.02, 0.14),
      new THREE.MeshStandardMaterial({ color: 0xffdc90, emissive: 0xffa95c, emissiveIntensity: 0.15 })
    );
    stripe.position.set(-7.6 + i * 1.9, 0.04, 0);
    group.add(stripe);
  }

  const skyline = new THREE.Group();
  for (let i = 0; i < 7; i += 1) {
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(1.2 + i * 0.12, 1.8 + (i % 3) * 1.1, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x223447, roughness: 0.82 })
    );
    building.position.set(-7 + i * 2.2, building.geometry.parameters.height / 2, -4.8 - (i % 2) * 1.1);
    skyline.add(building);
  }
  group.add(skyline);

  return { group };
}

function createTrailScene(THREE) {
  const group = new THREE.Group();

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 26),
    new THREE.MeshStandardMaterial({ color: 0x564131, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  const trail = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 6),
    new THREE.MeshStandardMaterial({ color: 0x7b5e46, roughness: 0.98 })
  );
  trail.rotation.x = -Math.PI / 2;
  trail.position.y = 0.02;
  group.add(trail);

  for (let i = 0; i < 10; i += 1) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.24 + (i % 3) * 0.07),
      new THREE.MeshStandardMaterial({ color: 0x9e8062, roughness: 1 })
    );
    rock.position.set(-7 + i * 1.6, 0.18, i % 2 === 0 ? 2.6 : -2.9);
    group.add(rock);
  }

  return { group };
}

function createDeskScene(THREE) {
  const group = new THREE.Group();

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 16),
    new THREE.MeshStandardMaterial({ color: 0x253444, roughness: 0.95 })
  );
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 10),
    new THREE.MeshStandardMaterial({ color: 0x132031, roughness: 0.9 })
  );
  wall.position.set(0, 5, -4.3);
  group.add(wall);

  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.14, 1.2),
    new THREE.MeshStandardMaterial({ color: 0xb08a5d, roughness: 0.72 })
  );
  deskTop.position.set(0.7, 1.9, 0);
  group.add(deskTop);

  for (const x of [-0.55, 1.95]) {
    for (const z of [-0.46, 0.46]) {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 1.7, 0.12),
        new THREE.MeshStandardMaterial({ color: 0xe3e6ec, roughness: 0.45 })
      );
      leg.position.set(x, 1.05, z);
      group.add(leg);
    }
  }

  const monitorFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 1.15, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x0e1116, roughness: 0.5 })
  );
  monitorFrame.position.set(0.95, 2.62, -0.1);
  group.add(monitorFrame);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.56, 0.86),
    new THREE.MeshStandardMaterial({
      color: 0x1c8b73,
      emissive: 0x46ffd4,
      emissiveIntensity: 0.8,
      roughness: 0.2
    })
  );
  screen.position.set(0.95, 2.62, -0.052);
  group.add(screen);

  const stand = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.68, 0.14),
    new THREE.MeshStandardMaterial({ color: 0xc9d4df, roughness: 0.38 })
  );
  stand.position.set(0.95, 2.05, -0.1);
  group.add(stand);

  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 0.05, 0.38),
    new THREE.MeshStandardMaterial({ color: 0x1a2029, roughness: 0.5 })
  );
  keyboard.position.set(0.72, 1.98, 0.18);
  group.add(keyboard);

  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.13, 0.22, 14),
    new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.5 })
  );
  mug.position.set(1.72, 2.05, 0.28);
  group.add(mug);

  const lampLight = new THREE.PointLight(0xffdca3, 0.9, 18);
  lampLight.position.set(1.45, 4.2, 1.2);
  group.add(lampLight);

  const lamp = new THREE.Mesh(
    new THREE.ConeGeometry(0.35, 0.55, 18),
    new THREE.MeshStandardMaterial({ color: 0xf2c66d, roughness: 0.5 })
  );
  lamp.position.copy(lampLight.position);
  lamp.rotation.z = Math.PI;
  group.add(lamp);

  const screenBars = [];
  for (let index = 0; index < 6; index += 1) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.06, 0.01),
      new THREE.MeshBasicMaterial({ color: 0xe7fff7 })
    );
    bar.position.set(-0.65 + index * 0.26, 2.74 - (index % 3) * 0.18, -0.045);
    screenBars.push(bar);
    group.add(bar);
  }

  return { group, screen, screenBars, lampLight };
}

function createBedScene(THREE) {
  const group = new THREE.Group();

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 16),
    new THREE.MeshStandardMaterial({ color: 0x152030, roughness: 0.95 })
  );
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 10),
    new THREE.MeshStandardMaterial({ color: 0x0b1320, roughness: 0.9 })
  );
  wall.position.set(0, 5, -4.3);
  group.add(wall);

  const bedBase = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.4, 1.9),
    new THREE.MeshStandardMaterial({ color: 0x5a4331, roughness: 0.78 })
  );
  bedBase.position.set(-0.25, 0.42, 0);
  group.add(bedBase);

  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(3.55, 0.36, 1.72),
    new THREE.MeshStandardMaterial({ color: 0xf1ece2, roughness: 0.85 })
  );
  mattress.position.set(-0.25, 0.78, 0);
  group.add(mattress);

  const blanket = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.18, 1.54),
    new THREE.MeshStandardMaterial({ color: 0x2b5677, roughness: 0.92 })
  );
  blanket.position.set(0.12, 1.02, 0);
  group.add(blanket);

  const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.18, 0.58),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82 })
  );
  pillow.position.set(-1.42, 1.02, 0.22);
  group.add(pillow);

  const nightStand = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.82, 0.68),
    new THREE.MeshStandardMaterial({ color: 0x5a4331, roughness: 0.7 })
  );
  nightStand.position.set(2.05, 0.42, -0.28);
  group.add(nightStand);

  const lampLight = new THREE.PointLight(0xffdba3, 0.14, 10);
  lampLight.position.set(2.05, 1.1, -0.28);
  group.add(lampLight);

  const lamp = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.22, 0.38, 14),
    new THREE.MeshStandardMaterial({ color: 0xf2c66d, roughness: 0.46 })
  );
  lamp.position.copy(lampLight.position);
  group.add(lamp);

  const dreamParticles = new THREE.Group();
  for (let index = 0; index < 4; index += 1) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.08 + index * 0.02, 12, 12),
      new THREE.MeshBasicMaterial({
        color: 0xcde6ff,
        transparent: true,
        opacity: 0.55
      })
    );
    particle.position.set(0.45, 2.7 + index * 0.35, 0);
    dreamParticles.add(particle);
  }
  group.add(dreamParticles);

  return { group, lampLight, dreamParticles };
}

function createMountains(THREE) {
  const group = new THREE.Group();
  const mountainMaterial = new THREE.MeshStandardMaterial({ color: 0x47505d, roughness: 1 });

  const mountainSpecs = [
    { x: -8, y: -0.4, z: -10, h: 4.5, r: 2.8 },
    { x: -3.2, y: -0.3, z: -9.5, h: 3.8, r: 2.4 },
    { x: 1.2, y: -0.5, z: -10.4, h: 5.1, r: 3.1 },
    { x: 6.3, y: -0.4, z: -9.8, h: 4.2, r: 2.6 }
  ];

  mountainSpecs.forEach((spec) => {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(spec.r, spec.h, 4), mountainMaterial);
    mesh.position.set(spec.x, spec.y + spec.h / 2, spec.z);
    mesh.rotation.y = Math.PI / 4;
    group.add(mesh);
  });

  return { group };
}

function createCloudField(THREE) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: 0xf8fbff,
    roughness: 0.95,
    transparent: true,
    opacity: 0.94
  });

  const cloudAnchors = [
    { x: -8, y: 6.6, z: -12 },
    { x: -3, y: 7.2, z: -14 },
    { x: 2.5, y: 6.2, z: -13 },
    { x: 7.5, y: 7, z: -15 }
  ];

  cloudAnchors.forEach((anchor, index) => {
    const cloud = new THREE.Group();
    cloud.userData.baseX = anchor.x;
    cloud.userData.baseY = anchor.y;
    cloud.userData.phase = index;
    for (let puffIndex = 0; puffIndex < 4; puffIndex += 1) {
      const puff = new THREE.Mesh(
        new THREE.SphereGeometry(0.55 + puffIndex * 0.08, 12, 12),
        material
      );
      puff.position.set(puffIndex * 0.5, Math.sin(puffIndex) * 0.14, 0);
      cloud.add(puff);
    }
    cloud.position.set(anchor.x, anchor.y, anchor.z);
    group.add(cloud);
  });

  return { group };
}

function createStars(THREE) {
  const starCount = 220;
  const positions = new Float32Array(starCount * 3);

  for (let index = 0; index < starCount; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 26;
    positions[index * 3 + 1] = Math.random() * 12 + 2;
    positions[index * 3 + 2] = -Math.random() * 24 - 6;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: 0xf2f7ff,
      size: 0.12,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true
    })
  );
}

function animateClouds(clouds, elapsed) {
  clouds.group.children.forEach((cloud) => {
    cloud.position.x = cloud.userData.baseX + Math.sin(elapsed * 0.12 + cloud.userData.phase) * 0.85;
    cloud.position.y = cloud.userData.baseY + Math.sin(elapsed * 0.35 + cloud.userData.phase) * 0.08;
  });
}

function twinkleStars(stars, elapsed) {
  stars.rotation.y = elapsed * 0.01;
}

function resetAvatarPose(avatar) {
  avatar.head.rotation.set(0, 0, 0);
  avatar.leftArmPivot.rotation.set(0, 0, 0.12);
  avatar.rightArmPivot.rotation.set(0, 0, -0.12);
  avatar.leftLegPivot.rotation.set(0, 0, 0.04);
  avatar.rightLegPivot.rotation.set(0, 0, -0.04);
  avatar.leftFoot.rotation.set(0, 0, 0);
  avatar.rightFoot.rotation.set(0, 0, 0);
}

function poseRide(avatar, localTime) {
  avatar.leftArmPivot.rotation.z = 0.48 + Math.sin(localTime * 4.8) * 0.09;
  avatar.rightArmPivot.rotation.z = -0.48 - Math.sin(localTime * 4.8) * 0.09;
  avatar.leftArmPivot.rotation.x = -0.18;
  avatar.rightArmPivot.rotation.x = -0.18;
  avatar.leftLegPivot.rotation.x = -0.6 + Math.sin(localTime * 4.8) * 0.06;
  avatar.rightLegPivot.rotation.x = -0.56 - Math.sin(localTime * 4.8) * 0.06;
  avatar.head.rotation.z = Math.sin(localTime * 2.2) * 0.04;
}

function poseSurron(avatar, localTime) {
  avatar.leftArmPivot.rotation.x = -1.1;
  avatar.rightArmPivot.rotation.x = -1.05;
  avatar.leftArmPivot.rotation.z = 0.22;
  avatar.rightArmPivot.rotation.z = -0.22;
  avatar.leftLegPivot.rotation.x = -1.22 + Math.sin(localTime * 8) * 0.08;
  avatar.rightLegPivot.rotation.x = -1.14 - Math.sin(localTime * 8) * 0.08;
  avatar.head.rotation.x = 0.08;
}

function poseCoding(avatar, localTime) {
  avatar.leftArmPivot.rotation.x = -1.45 + Math.sin(localTime * 6.5) * 0.08;
  avatar.rightArmPivot.rotation.x = -1.45 - Math.sin(localTime * 6.5) * 0.08;
  avatar.leftArmPivot.rotation.z = 0.08;
  avatar.rightArmPivot.rotation.z = -0.08;
  avatar.leftLegPivot.rotation.x = -0.04;
  avatar.rightLegPivot.rotation.x = 0.05;
  avatar.head.rotation.z = Math.sin(localTime * 1.8) * 0.04;
}

function poseSleep(avatar, localTime) {
  avatar.leftArmPivot.rotation.z = -0.52 + Math.sin(localTime * 1.8) * 0.04;
  avatar.rightArmPivot.rotation.z = 0.28;
  avatar.leftLegPivot.rotation.x = 0.2;
  avatar.rightLegPivot.rotation.x = -0.08;
  avatar.leftFoot.rotation.z = -0.24;
  avatar.rightFoot.rotation.z = 0.12;
  avatar.head.rotation.z = 0.22 + Math.sin(localTime * 1.8) * 0.03;
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}
