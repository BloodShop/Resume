const HOBBIES = [
  {
    icon: "fas fa-bolt",
    title: "Blueboard systems",
    description: "Designing electric motion products, rideable systems, and the firmware-plus-hardware pieces that make them usable.",
    tag: "Builder"
  },
  {
    icon: "fas fa-plane",
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
    icon: "fas fa-wind",
    title: "Snowboarding",
    description: "Cold-weather edge control, fast terrain reading, and another reason to spend time outside of code.",
    tag: "Snow"
  },
  {
    icon: "fas fa-dumbbell",
    title: "Exercise and lifting",
    description: "Strength work and consistency off the keyboard to keep the rest of the stack sustainable.",
    tag: "Training"
  },
  {
    icon: "fas fa-laptop-code",
    title: "Coding beyond work",
    description: "Production backend by day, side projects, automation, and experiments whenever there is room for another idea.",
    tag: "Engineer"
  }
];

const GALLERY_FALLBACKS = {
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
  ]
};

const CURATED_GALLERIES = {
  surron: [
    {
      src: "images/surron_build_FB_IMG_1768138483116.jpg",
      title: "Kitchen labs",
      description: "Kitchen labs old days."
    },
    {
      src: "images/surron_build_IMG_20260213_113209.jpg",
      title: "Controller fitment",
      description: "Configuring controller of the e-bike."
    },
    {
      src: "images/surron_build_IMG-20251101-WA0071(1).jpg",
      title: "Front fork calibration",
      description: "Calibrating front suspension forks."
    },
    {
      src: "images/surron_build_IMG20260209105514.jpg",
      title: "Controller adapter print",
      description: "3D printing mount adapter for the controller."
    },
    {
      src: "images/surron_IMG-20250918-WA0086.jpg",
      title: "DIY wiring",
      description: "Some diy."
    },
    {
      src: "images/surron_IMG20250828183413.jpg",
      title: "DIY assembly",
      description: "More diy."
    },
  ],
  setup: [
    {
      src: "images/setup_qkd_IMG20260107104420.jpg",
      title: "QKD setup",
      description: "QKD setup with custom pcbs and solidrun lx2160a boards."
    },
    {
      src: "images/setup_nxp_lx2160a_IMG_20250713_162927.jpg",
      title: "SolidRun platform",
      description: "Bench work around networking and compute hardware beyond the laptop."
    },
    {
      src: "images/setup_rpi5_n_jetson_IMG20260318204456.jpg",
      title: "Raspberry Pi and Jetson",
      description: "Mixed-platform setup for prototyping, testing, and integration work."
    },
    {
      src: "images/setup_2jetsons_pi_zero_IMG20260318204744.jpg",
      title: "Dual Jetson bench",
      description: "Embedded compute setup with more than one board in the loop."
    }
  ],
  stash: [
    {
      src: "images/stash_FB_IMG_1768478697049.jpg",
      title: "Ultra Bee ski bike",
      description: "Surron Ultra Bee Electric Ski Bike."
    },
    {
      src: "images/stash_IMG-20250804-WA0055.jpg",
      title: "Two EUCs",
      description: "Two EUC (electric unicycles)."
    },
    {
      src: "images/stash_IMG-20250804-WA0056.jpg",
      title: "Two Onewheels",
      description: "Two onewheels."
    },
    {
      src: "images/stash_IMG-20250807-WA0031.jpeg",
      title: "Electric skateboards",
      description: "Three electric skateboards."
    },
    {
      src: "images/stash_IMG-20250822-WA0030.jpeg",
      title: "Engined motorcycles",
      description: "Two engined motorcycles."
    },
    {
      src: "images/stash_IMG-20250822-WA0131.jpeg",
      title: "Electric scooter",
      description: "Electric Scooter MiaDynamics."
    },
    {
      src: "images/stash_IMG20260130110701.jpg",
      title: "First option",
      description: "Upgraded Surron Light bee (my first option)."
    },
    {
      src: "images/stash_IMG20250930075650.jpg",
      title: "Third option",
      description: "Stock Surron Light bee (Third option of mine)."
    },
    {
      src: "images/stash_IMG-20260214-WA0031.jpeg",
      title: "Second option",
      description: "Surron Light bee Semi upgraded (my second option)."
    }
  ]
};

const GALLERY_CONFIG = {
  glider: {
    prefix: "glider_",
    fallbackTitle: "Glider log",
    fallbackDescription: "Glider-side snapshots from airfield prep, flight days, and time around the aircraft."
  },
  surron: {
    prefix: "surron_",
    fallbackTitle: "Surron build",
    fallbackDescription: "Build, tuning, and ride checkpoints from the Surron and e-bike side."
  },
  setup: {
    prefix: "setup_",
    fallbackTitle: "Lab setup",
    fallbackDescription: "SolidRun, Jetson, Raspberry Pi, and other embedded compute setups on the bench."
  },
  stash: {
    prefix: "stash_",
    fallbackTitle: "Transport setup",
    fallbackDescription: "Transport, storage, and tool organization that keep the hardware stack usable."
  }
};

const GALLERY_BEHAVIOR = {
  surron: {
    pinFirst: true,
    shuffleRest: true
  },
  stash: {
    shuffleAll: true
  }
};

const MOTION_SCENES = [
  {
    key: "onewheel",
    label: "Onewheel commute",
    background: 0x1a2d45,
    fogNear: 14,
    fogFar: 38
  },
  {
    key: "glider",
    label: "Glider flight",
    background: 0x8fc7ea,
    fogNear: 28,
    fogFar: 68
  },
  {
    key: "surron",
    label: "Surron run",
    background: 0x3b3126,
    fogNear: 14,
    fogFar: 34
  },
  {
    key: "snowboard",
    label: "Snowboard carve",
    background: 0xdcefff,
    fogNear: 14,
    fogFar: 42
  },
  {
    key: "exercise",
    label: "Lifting session",
    background: 0x101722,
    fogNear: 12,
    fogFar: 30
  },
  {
    key: "coding",
    label: "Standing desk coding",
    background: 0x132031,
    fogNear: 14,
    fogFar: 32
  },
  {
    key: "sleep",
    label: "Sleep reset",
    background: 0x081119,
    fogNear: 12,
    fogFar: 30
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  updateDerivedMetrics();
  renderHobbies();
  bindRailControls();
  void renderGalleries();
  initMobileFooter();
  initHeroAnimation();
});

function updateDerivedMetrics() {
  document.querySelectorAll("[data-start-year]").forEach((element) => {
    const startYear = Number(element.dataset.startYear);
    const currentYear = new Date().getFullYear();
    if (!Number.isFinite(startYear) || !Number.isFinite(currentYear) || currentYear < startYear) {
      return;
    }

    element.textContent = `${currentYear - startYear + 1}+`;
  });
}

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

async function renderGalleries() {
  const discoveredFiles = await loadImageDirectoryListing();
  document.querySelectorAll("[data-gallery]").forEach((rail) => {
    const items = buildGalleryItems(rail.dataset.gallery, discoveredFiles);
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

async function loadImageDirectoryListing() {
  try {
    const response = await fetch("images/");
    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    return Array.from(doc.querySelectorAll("a"))
      .map((link) => link.getAttribute("href") || "")
      .filter((href) => /\.[a-z0-9]+$/i.test(href) && !href.includes("/"))
      .filter((href) => /\.(png|jpe?g|webp|gif)$/i.test(href))
      .map((href) => decodeURIComponent(href.replace(/^\.\//, "")));
  } catch (error) {
    return [];
  }
}

function buildGalleryItems(key, discoveredFiles) {
  const config = GALLERY_CONFIG[key];
  if (!config) {
    return [];
  }

  if (CURATED_GALLERIES[key]) {
    return arrangeGalleryItems(key, CURATED_GALLERIES[key]);
  }

  const matchedFiles = discoveredFiles
    .filter((file) => file.startsWith(config.prefix))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }));

  if (!matchedFiles.length) {
    return GALLERY_FALLBACKS[key] || [];
  }

  return matchedFiles.map((file, index) => {
    const copy = describeGalleryItem(key, file, index);
    return {
      src: `images/${file}`,
      title: copy.title,
      description: copy.description
    };
  });
}

function arrangeGalleryItems(key, items) {
  const copies = items.map((item) => ({ ...item }));
  const behavior = GALLERY_BEHAVIOR[key];
  if (!behavior) {
    return copies;
  }

  if (behavior.pinFirst && behavior.shuffleRest && copies.length > 1) {
    const [first, ...rest] = copies;
    return [first, ...shuffleItems(rest)];
  }

  if (behavior.shuffleAll) {
    return shuffleItems(copies);
  }

  return copies;
}

function shuffleItems(items) {
  const copies = [...items];
  for (let index = copies.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copies[index], copies[randomIndex]] = [copies[randomIndex], copies[index]];
  }

  return copies;
}

function describeGalleryItem(key, file, index) {
  const config = GALLERY_CONFIG[key];

  if (key === "setup") {
    if (file.includes("lx2160a")) {
      return {
        title: "SolidRun LX2160A setup",
        description: "Bench work around SolidRun networking and edge compute hardware."
      };
    }

    if (file.includes("2jetsons")) {
      return {
        title: "Dual Jetson bench",
        description: "Multiple Jetsons and support boards wired together for platform testing."
      };
    }

    if (file.includes("rpi5") || file.includes("jetson")) {
      return {
        title: "Raspberry Pi and Jetson stack",
        description: "Raspberry Pi, Jetson, and mixed embedded platforms lined up for experiments."
      };
    }
  }

  return {
    title: `${config.fallbackTitle} ${index + 1}`,
    description: config.fallbackDescription
  };
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

function initMobileFooter() {
  const footer = document.querySelector(".site-footer");
  if (!footer) {
    return;
  }

  const mediaQuery = window.matchMedia("(max-width: 767px)");
  let lastScrollY = window.scrollY;

  function updateFooterVisibility() {
    const isMobile = mediaQuery.matches;
    document.body.classList.toggle("has-mobile-footer", isMobile);

    if (!isMobile) {
      document.body.classList.remove("mobile-footer-hidden");
      lastScrollY = window.scrollY;
      return;
    }

    const currentScrollY = window.scrollY;
    const nearTop = currentScrollY < 96;
    const nearBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 32;
    const scrollingDown = currentScrollY > lastScrollY + 8;
    const scrollingUp = currentScrollY < lastScrollY - 8;

    if (nearTop || nearBottom || scrollingUp) {
      document.body.classList.remove("mobile-footer-hidden");
    } else if (scrollingDown) {
      document.body.classList.add("mobile-footer-hidden");
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", updateFooterVisibility, { passive: true });
  window.addEventListener("resize", updateFooterVisibility);
  updateFooterVisibility();
}

function initHeroAnimation() {
  if (!window.THREE) {
    return;
  }

  const THREE = window.THREE;
  const canvas = document.getElementById("hero-canvas");
  const labelEl = document.getElementById("scene-label");
  const indexEl = document.getElementById("scene-index");
  const countEl = document.getElementById("scene-count");
  const stepEls = Array.from(document.querySelectorAll("[data-scene-step]"));

  if (!canvas || !labelEl || !indexEl || !countEl) {
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
  const sunTarget = new THREE.Object3D();
  sunTarget.position.set(0, 1, 0);
  scene.add(sunTarget);
  sunLight.target = sunTarget;
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
  const snowScene = createSnowScene(THREE);
  const gymScene = createGymScene(THREE);
  const deskScene = createDeskScene(THREE);
  const bedScene = createBedScene(THREE);
  const fakeShadows = createFakeShadows(THREE);

  scene.add(roadScene.group);
  scene.add(trailScene.group);
  scene.add(snowScene.group);
  scene.add(gymScene.group);
  scene.add(deskScene.group);
  scene.add(bedScene.group);
  scene.add(fakeShadows.group);

  const avatar = createAvatar(THREE);
  const onewheel = createOnewheel(THREE);
  const glider = createGlider(THREE);
  const surron = createSurron(THREE);
  const snowboard = createSnowboard(THREE);
  const barbell = createBarbell(THREE);

  scene.add(avatar.group);
  scene.add(onewheel.group);
  scene.add(glider.group);
  scene.add(surron.group);
  scene.add(snowboard.group);
  scene.add(barbell.group);

  const context = {
    THREE,
    scene,
    camera,
    renderer,
    ambientLight,
    sunLight,
    sunTarget,
    fillLight,
    mountains,
    clouds,
    stars,
    sun,
    moon,
    roadScene,
    trailScene,
    snowScene,
    gymScene,
    deskScene,
    bedScene,
    fakeShadows,
    avatar,
    onewheel,
    glider,
    surron,
    snowboard,
    barbell
  };

  const sceneDuration = 5.8;
  let previousIndex = -1;

  function updateSceneState(sceneIndex) {
    const current = MOTION_SCENES[sceneIndex];
    labelEl.textContent = current.label;
    indexEl.textContent = String(sceneIndex + 1).padStart(2, "0");
    countEl.textContent = String(MOTION_SCENES.length).padStart(2, "0");
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
    context.onewheel.wheelSpin.rotation.set(0, 0, 0);

    context.glider.group.visible = false;
    context.glider.group.position.set(0, 0, 0);
    context.glider.group.rotation.set(0, 0, 0);

    context.surron.group.visible = false;
    context.surron.group.position.set(0, 0, 0);
    context.surron.group.rotation.set(0, 0, 0);
    context.surron.frontWheelSpin.rotation.set(0, 0, 0);
    context.surron.backWheelSpin.rotation.set(0, 0, 0);
    context.surron.headlight.intensity = 0.2;

    context.roadScene.group.visible = false;
    context.trailScene.group.visible = false;
    context.snowScene.group.visible = false;
    context.gymScene.group.visible = false;
    context.deskScene.group.visible = false;
    context.bedScene.group.visible = false;
    context.snowboard.group.visible = false;
    context.snowboard.group.position.set(0, 0, 0);
    context.snowboard.group.rotation.set(0, 0, 0);
    context.snowboard.board.rotation.set(0, 0, -0.08);
    context.barbell.group.visible = false;
    context.barbell.group.position.set(0, 0, 0);
    context.barbell.group.rotation.set(0, 0, 0);
    context.bedScene.sleepFigure.group.visible = false;
    context.bedScene.sleepFigure.group.position.set(-0.32, 1.06, 0);
    context.bedScene.sleepFigure.chest.scale.y = 1;
    context.bedScene.sleepFigure.head.position.y = 0.14;
    Object.values(context.fakeShadows.items).forEach((shadow) => {
      shadow.visible = false;
      shadow.material.opacity = 0;
    });

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
      context.avatar.group.rotation.set(0.04, 1.28, -0.1);
      poseRide(context.avatar, localTime);

      context.onewheel.group.position.set(x, 0.12, 0.02);
      context.onewheel.wheelSpin.rotation.z = -localTime * 14;
      animateRoadScene(context.roadScene, localTime, progress);

      const shadow = context.fakeShadows.items.ride;
      shadow.visible = true;
      shadow.position.set(x, 0.03, 0.1);
      shadow.scale.set(1.8, 1.3, 1);
      shadow.material.opacity = 0.28;

      context.camera.position.set(x + 3.4, 2.7, 8.2);
      context.camera.lookAt(x + 0.8, 2.2, 0);

      context.clouds.group.position.x = -localTime * 0.12;
      context.stars.material.opacity = 0.05;
      context.sun.position.set(7.5, 8.1, -16);
      context.sunLight.position.set(8, 9, 4);
      context.sunTarget.position.set(x + 0.6, 1.2, 0);
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
      context.glider.group.rotation.set(0.06 + Math.sin(localTime * 0.7) * 0.04, -0.18, bank);
      animateGliderScene(context, localTime);

      const shadow = context.fakeShadows.items.glider;
      shadow.visible = true;
      shadow.position.set(x, 0.04, z);
      shadow.scale.set(2.3, 0.95, 1);
      shadow.material.opacity = 0.14;

      context.camera.position.set(x + 7.1, y + 2.1, z + 6.1);
      context.camera.lookAt(x, y + 0.15, z);

      context.clouds.group.position.x = -localTime * 0.22;
      context.sunTarget.position.set(x, y - 1.8, z);
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
      context.surron.group.rotation.set(0.02, 0, 0.03);
      context.surron.frontWheelSpin.rotation.z = -localTime * 20;
      context.surron.backWheelSpin.rotation.z = -localTime * 20;
      context.surron.headlight.intensity = 0.55;
      animateTrailScene(context.trailScene, localTime, progress);

      const shadow = context.fakeShadows.items.surron;
      shadow.visible = true;
      shadow.position.set(x, 0.04, 0.42);
      shadow.scale.set(2.4, 1.2, 1);
      shadow.material.opacity = 0.3;

      context.avatar.group.position.set(x - 0.16, 1.02 + bounce, 0.44);
      context.avatar.group.rotation.set(0.08, 1.42, -0.04);
      poseSurron(context.avatar, localTime);

      context.camera.position.set(x + 4.6, 2.4, 6.9);
      context.camera.lookAt(x + 0.45, 1.55, 0.38);
      context.sunTarget.position.set(x + 0.4, 1.1, 0.35);
    },

    snowboard(localTime, progress) {
      const x = lerp(-4.3, 4.1, progress);
      const carve = Math.sin(progress * Math.PI * 4) * 0.24;
      const lean = Math.sin(progress * Math.PI * 2) * 0.26;
      const hop = Math.max(0, Math.sin(progress * Math.PI * 2)) * 0.08;

      context.snowScene.group.visible = true;
      context.avatar.group.visible = true;
      context.snowboard.group.visible = true;
      context.sun.visible = true;
      context.moon.visible = false;
      context.stars.material.opacity = 0;
      context.mountains.group.visible = true;
      context.mountains.group.position.y = -0.9;
      context.clouds.group.visible = true;
      context.clouds.group.position.x = -localTime * 0.16;
      context.sun.position.set(7.3, 8.8, -16);
      context.sunLight.intensity = 1.36;
      context.fillLight.intensity = 0.48;

      context.snowboard.group.position.set(x, 0.14 + hop, carve);
      context.snowboard.group.rotation.set(0, 0.04, -0.1 - lean);
      context.snowboard.board.rotation.y = lean * 0.3;
      context.avatar.group.position.set(x, 0.08 + hop * 0.7, carve + 0.04);
      context.avatar.group.rotation.set(0.08, -0.22, -0.18 - lean * 0.72);
      poseSnowboard(context.avatar, localTime, lean);
      animateSnowScene(context.snowScene, localTime, progress);

      const shadow = context.fakeShadows.items.snowboard;
      shadow.visible = true;
      shadow.position.set(x, 0.03, carve);
      shadow.scale.set(2.3, 1.15, 1);
      shadow.material.opacity = 0.22;

      context.camera.position.set(x + 4.6, 2.9, 7.6);
      context.camera.lookAt(x + 0.4, 1.9, carve);
      context.sunTarget.position.set(x + 0.6, 1.2, carve);
    },

    exercise(localTime) {
      const press = (Math.sin(localTime * 2.4) + 1) * 0.5;
      const bodyDip = (1 - press) * 0.07;

      context.gymScene.group.visible = true;
      context.avatar.group.visible = true;
      context.barbell.group.visible = true;
      context.mountains.group.visible = false;
      context.clouds.group.visible = false;
      context.sun.visible = false;
      context.moon.visible = false;
      context.stars.material.opacity = 0;
      context.ambientLight.intensity = 0.96;
      context.sunLight.intensity = 0.44;
      context.fillLight.intensity = 0.76;

      context.avatar.group.position.set(0, 0.18 - bodyDip, 0.26);
      context.avatar.group.rotation.set(0, 0.02, 0);
      poseLift(context.avatar, localTime, press);

      context.barbell.group.position.set(0, 1.92 + press * 0.92 - bodyDip * 0.25, 0.18);
      context.barbell.group.rotation.set(0, 0.02, 0);
      animateGymScene(context.gymScene, context.barbell, localTime, press);

      const shadow = context.fakeShadows.items.exercise;
      shadow.visible = true;
      shadow.position.set(0, 0.03, 0.36);
      shadow.scale.set(2.7, 1.45, 1);
      shadow.material.opacity = 0.24;

      context.camera.position.set(4.9, 3.3, 7.2);
      context.camera.lookAt(0, 2.7, 0.18);
      context.sunTarget.position.set(0.1, 2.2, -0.2);
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

      context.avatar.group.position.set(-0.45, 0.18 + Math.sin(localTime * 3.4) * 0.02, 0.88);
      context.avatar.group.rotation.set(0, 2.18, 0);
      poseCoding(context.avatar, localTime);
      animateDeskScene(context.deskScene, localTime);

      const shadow = context.fakeShadows.items.desk;
      shadow.visible = true;
      shadow.position.set(-0.2, 0.03, 0.45);
      shadow.scale.set(2.7, 1.4, 1);
      shadow.material.opacity = 0.2;

      context.camera.position.set(5.4, 3.15, 7.7);
      context.camera.lookAt(0.45, 2.35, 0.2);

      context.deskScene.screen.material.emissiveIntensity = 1.1 + Math.sin(localTime * 4.2) * 0.16;
      context.deskScene.screenBars.forEach((bar, index) => {
        bar.scale.x = 0.65 + (Math.sin(localTime * 4 + index) + 1) * 0.35;
        bar.position.x = -0.78 + index * 0.3 + Math.sin(localTime * 1.2 + index * 0.5) * 0.03;
      });
      context.sunTarget.position.set(0.5, 1.9, -0.2);
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

      context.avatar.group.visible = false;
      context.bedScene.sleepFigure.group.visible = true;
      context.bedScene.sleepFigure.group.position.set(-0.32 + breath * 0.18, 1.06 + breath * 0.2, 0);
      animateSleepScene(context.bedScene, localTime);

      const shadow = context.fakeShadows.items.sleep;
      shadow.visible = true;
      shadow.position.set(-0.2, 0.03, 0);
      shadow.scale.set(2.7, 1.4, 1);
      shadow.material.opacity = 0.16;

      context.camera.position.set(4.6, 3.4, 7.3);
      context.camera.lookAt(-0.15, 1.3, 0);

      context.bedScene.lampLight.intensity = 0.14 + Math.sin(localTime * 0.45) * 0.01;
      context.bedScene.sleepFigure.chest.scale.y = 1 + breath * 0.14;
      context.bedScene.sleepFigure.head.position.y = 0.14 + breath * 0.08;
      context.bedScene.dreamParticles.children.forEach((particle, index) => {
        const lift = (localTime * 0.28 + index * 0.32) % 1;
        particle.position.y = 2.7 + lift * 1.35;
        particle.position.x = 0.45 + Math.sin(localTime * 0.8 + index) * 0.18;
        particle.material.opacity = 0.2 + (1 - lift) * 0.55;
      });
      context.sunTarget.position.set(-0.2, 1.1, 0);
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
    context.sunLight.target.updateMatrixWorld();

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
  leftArmPivot.position.set(-0.68, 2.62, 0.12);
  rightArmPivot.position.set(0.68, 2.62, 0.12);

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
  leftLegPivot.position.set(-0.31, 1.48, 0);
  rightLegPivot.position.set(0.31, 1.48, 0);

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
  leftFoot.position.set(-0.34, 0.18, 0.14);
  rightFoot.position.set(0.34, 0.18, 0.14);
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
  const metal = new THREE.MeshStandardMaterial({ color: 0xd2dae2, roughness: 0.32 });

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
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.34, 18), metal);
  hub.rotation.x = Math.PI / 2;

  const spokeVertical = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.84, 0.04), metal);
  const spokeHorizontal = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.08, 0.04), metal);
  const wheelSpin = new THREE.Group();
  wheelSpin.position.y = 0.22;
  wheelSpin.add(tire);
  wheelSpin.add(hub);
  wheelSpin.add(spokeVertical);
  wheelSpin.add(spokeHorizontal);
  group.add(wheelSpin);

  const leftRail = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.3, 0.62), dark);
  const rightRail = leftRail.clone();
  leftRail.position.set(-0.26, 0.37, 0);
  rightRail.position.set(0.26, 0.37, 0);
  group.add(leftRail);
  group.add(rightRail);

  return { group, wheelSpin };
}

function createGlider(THREE) {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color: 0xe9dcc5, roughness: 0.46 });
  const accent = new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.55 });
  const glass = new THREE.MeshStandardMaterial({
    color: 0x7fc8ff,
    transparent: true,
    opacity: 0.45,
    roughness: 0.1
  });

  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 5.8, 22), body);
  fuselage.rotation.z = Math.PI / 2;
  group.add(fuselage);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.76, 20), accent);
  nose.rotation.z = -Math.PI / 2;
  nose.position.x = 3.22;
  group.add(nose);

  const tailCone = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.7, 18), body);
  tailCone.rotation.z = Math.PI / 2;
  tailCone.position.x = -3.1;
  group.add(tailCone);

  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.07, 4.5), body);
  const rightWing = leftWing.clone();
  leftWing.position.set(0.18, 0.08, 2.35);
  rightWing.position.set(0.18, 0.08, -2.35);
  leftWing.rotation.x = -0.05;
  rightWing.rotation.x = 0.05;
  group.add(leftWing);
  group.add(rightWing);

  const leftWingTip = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.3), accent);
  const rightWingTip = leftWingTip.clone();
  leftWingTip.position.set(0.22, 0.06, 4.58);
  rightWingTip.position.set(0.22, 0.06, -4.58);
  group.add(leftWingTip);
  group.add(rightWingTip);

  const tailWing = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 1.8), body);
  tailWing.position.set(-2.72, 0.42, 0);
  group.add(tailWing);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.82, 0.06), body);
  fin.position.set(-2.95, 0.75, 0);
  group.add(fin);

  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.44, 16, 16), glass);
  canopy.scale.set(1.55, 0.72, 0.95);
  canopy.position.set(0.74, 0.34, 0);
  group.add(canopy);

  const pilotHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 14, 14),
    new THREE.MeshStandardMaterial({ color: 0x1b3146, roughness: 0.55 })
  );
  pilotHead.position.set(0.56, 0.28, 0);
  group.add(pilotHead);

  const landingWheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.16, 16),
    new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.8 })
  );
  landingWheel.rotation.z = Math.PI / 2;
  landingWheel.position.set(0.18, -0.24, 0);
  group.add(landingWheel);

  return { group };
}

function createSurron(THREE) {
  const group = new THREE.Group();
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x1e222b, roughness: 0.55 });
  const frameAccent = new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.48 });
  const tireMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0b0e, roughness: 0.86 });
  const metal = new THREE.MeshStandardMaterial({ color: 0xc5ccd4, roughness: 0.32 });

  const frontWheel = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.11, 18, 36), tireMaterial);
  const backWheel = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.11, 18, 36), tireMaterial);
  const frontRim = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.04, 12, 24), metal);
  const backRim = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.04, 12, 24), metal);
  const frontHub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 16), metal);
  const backHub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 16), metal);
  frontHub.rotation.x = Math.PI / 2;
  backHub.rotation.x = Math.PI / 2;

  const frontSpokeA = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.05, 0.04), metal);
  const frontSpokeB = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.06, 0.04), metal);
  const backSpokeA = frontSpokeA.clone();
  const backSpokeB = frontSpokeB.clone();

  const frontWheelSpin = new THREE.Group();
  const backWheelSpin = new THREE.Group();
  frontWheelSpin.position.set(1.5, 0.72, 0);
  backWheelSpin.position.set(-1.45, 0.72, 0);
  frontWheelSpin.add(frontWheel);
  frontWheelSpin.add(frontRim);
  frontWheelSpin.add(frontHub);
  frontWheelSpin.add(frontSpokeA);
  frontWheelSpin.add(frontSpokeB);
  backWheelSpin.add(backWheel);
  backWheelSpin.add(backRim);
  backWheelSpin.add(backHub);
  backWheelSpin.add(backSpokeA);
  backWheelSpin.add(backSpokeB);
  group.add(frontWheelSpin);
  group.add(backWheelSpin);

  const frameBar1 = new THREE.Mesh(new THREE.BoxGeometry(2.38, 0.1, 0.14), frameAccent);
  frameBar1.position.set(0.08, 1.5, 0);
  frameBar1.rotation.z = -0.18;
  group.add(frameBar1);

  const frameBar2 = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.09, 0.14), frameMaterial);
  frameBar2.position.set(-0.16, 1.12, 0);
  frameBar2.rotation.z = 0.56;
  group.add(frameBar2);

  const frameBar3 = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.09, 0.14), frameMaterial);
  frameBar3.position.set(0.54, 1.05, 0);
  frameBar3.rotation.z = -0.76;
  group.add(frameBar3);

  const battery = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.02, 0.5), frameMaterial);
  battery.position.set(-0.04, 1.14, 0);
  group.add(battery);

  const tank = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.5, 0.44), frameAccent);
  tank.position.set(0.42, 1.56, 0);
  tank.rotation.z = -0.16;
  group.add(tank);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.2, 0.48), frameMaterial);
  seat.position.set(-0.2, 1.76, 0);
  seat.rotation.z = 0.05;
  group.add(seat);

  const tailPanel = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.16, 0.36), frameAccent);
  tailPanel.position.set(-1.06, 1.9, 0);
  tailPanel.rotation.z = 0.16;
  group.add(tailPanel);

  const swingArm = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.11, 0.16), metal);
  swingArm.position.set(-0.88, 1.02, 0);
  swingArm.rotation.z = -0.24;
  group.add(swingArm);

  const forkLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.24, 0.08), metal);
  const forkRight = forkLeft.clone();
  forkLeft.position.set(1.46, 1.42, 0.14);
  forkRight.position.set(1.46, 1.42, -0.14);
  forkLeft.rotation.z = -0.12;
  forkRight.rotation.z = -0.12;
  group.add(forkLeft);
  group.add(forkRight);

  const handlebar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), frameMaterial);
  handlebar.position.set(1.7, 2.02, 0);
  handlebar.rotation.z = 0.18;
  group.add(handlebar);

  const numberPlate = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.62, 0.08), frameAccent);
  numberPlate.position.set(1.46, 1.74, 0);
  numberPlate.rotation.z = -0.1;
  group.add(numberPlate);

  const frontFender = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.14), frameMaterial);
  frontFender.position.set(1.5, 1.48, 0);
  frontFender.rotation.z = 0.16;
  group.add(frontFender);

  const rearFender = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.06, 0.18), frameMaterial);
  rearFender.position.set(-1.18, 1.55, 0);
  rearFender.rotation.z = 0.28;
  group.add(rearFender);

  const shock = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.88, 14), metal);
  shock.position.set(-0.36, 1.36, 0);
  shock.rotation.z = -0.55;
  group.add(shock);

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
    frontWheelSpin,
    backWheelSpin,
    headlight
  };
}

function createRoadScene(THREE) {
  const group = new THREE.Group();
  const stripes = [];

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
    stripe.userData.baseX = stripe.position.x;
    stripes.push(stripe);
    group.add(stripe);
  }

  const skyline = new THREE.Group();
  const skylineBlocks = [];
  for (let i = 0; i < 7; i += 1) {
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(1.2 + i * 0.12, 1.8 + (i % 3) * 1.1, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x223447, roughness: 0.82 })
    );
    building.position.set(-7 + i * 2.2, building.geometry.parameters.height / 2, -4.8 - (i % 2) * 1.1);
    building.userData.baseY = building.position.y;
    skylineBlocks.push(building);
    skyline.add(building);
  }
  group.add(skyline);

  return { group, stripes, skylineBlocks };
}

function createTrailScene(THREE) {
  const group = new THREE.Group();
  const rocks = [];
  const shrubs = [];

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
    rock.userData.baseY = rock.position.y;
    rocks.push(rock);
    group.add(rock);
  }

  for (let i = 0; i < 7; i += 1) {
    const shrub = new THREE.Mesh(
      new THREE.ConeGeometry(0.22 + (i % 2) * 0.06, 0.7 + (i % 3) * 0.12, 8),
      new THREE.MeshStandardMaterial({ color: 0x415334, roughness: 0.95 })
    );
    shrub.position.set(-6.8 + i * 2.1, 0.35, i % 2 === 0 ? 3.8 : -4.1);
    shrub.userData.baseScale = shrub.scale.y;
    shrubs.push(shrub);
    group.add(shrub);
  }

  return { group, rocks, shrubs };
}

function createSnowScene(THREE) {
  const group = new THREE.Group();
  const pines = [];
  const markers = [];
  const peaks = [];

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(42, 26),
    new THREE.MeshStandardMaterial({ color: 0xe8f4ff, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  const slope = new THREE.Mesh(
    new THREE.PlaneGeometry(22, 5.8),
    new THREE.MeshStandardMaterial({ color: 0xfafcff, roughness: 0.95 })
  );
  slope.rotation.x = -Math.PI / 2;
  slope.position.set(0, 0.03, 0);
  group.add(slope);

  for (let index = 0; index < 6; index += 1) {
    const marker = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1.2, 10),
      new THREE.MeshStandardMaterial({ color: index % 2 === 0 ? 0xff7a45 : 0x2b5677, roughness: 0.58 })
    );
    marker.position.set(-5 + index * 2.2, 0.6, index % 2 === 0 ? 1.75 : -1.75);
    marker.userData.baseZ = marker.position.z;
    markers.push(marker);
    group.add(marker);
  }

  for (let index = 0; index < 8; index += 1) {
    const pine = new THREE.Group();
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 0.5, 10),
      new THREE.MeshStandardMaterial({ color: 0x70513d, roughness: 0.9 })
    );
    trunk.position.y = 0.25;
    pine.add(trunk);

    const canopy = new THREE.Mesh(
      new THREE.ConeGeometry(0.34 + (index % 2) * 0.08, 1.05 + (index % 3) * 0.12, 10),
      new THREE.MeshStandardMaterial({ color: 0x395844, roughness: 0.95 })
    );
    canopy.position.y = 0.92;
    pine.add(canopy);

    pine.position.set(-8 + index * 2.2, 0, index % 2 === 0 ? 4.3 : -4.5);
    pine.userData.baseY = pine.position.y;
    pines.push(pine);
    group.add(pine);
  }

  const peakSpecs = [
    { x: -8.6, h: 4.8, r: 2.3 },
    { x: -4.8, h: 3.6, r: 1.8 },
    { x: -1.2, h: 5.4, r: 2.6 },
    { x: 3.1, h: 4.2, r: 2.1 },
    { x: 7.2, h: 5.1, r: 2.5 }
  ];

  peakSpecs.forEach((spec, index) => {
    const peak = new THREE.Group();
    const rock = new THREE.Mesh(
      new THREE.ConeGeometry(spec.r, spec.h, 4),
      new THREE.MeshStandardMaterial({ color: 0x9aa8b5, roughness: 0.96 })
    );
    rock.position.y = spec.h / 2;
    rock.rotation.y = Math.PI / 4;
    peak.add(rock);

    const snowCap = new THREE.Mesh(
      new THREE.ConeGeometry(spec.r * 0.56, spec.h * 0.34, 4),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88 })
    );
    snowCap.position.y = spec.h * 0.78;
    snowCap.rotation.y = Math.PI / 4;
    peak.add(snowCap);

    peak.position.set(spec.x, -0.2, -8.2 - (index % 2) * 1.4);
    peaks.push(peak);
    group.add(peak);
  });

  return { group, pines, markers, peaks };
}

function createGymScene(THREE) {
  const group = new THREE.Group();
  const slats = [];

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 16),
    new THREE.MeshStandardMaterial({ color: 0x1d2733, roughness: 0.96 })
  );
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const mat = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6, 3.8),
    new THREE.MeshStandardMaterial({ color: 0x111822, roughness: 0.92 })
  );
  mat.rotation.x = -Math.PI / 2;
  mat.position.set(0.15, 0.02, 0.35);
  group.add(mat);

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 10),
    new THREE.MeshStandardMaterial({ color: 0x101722, roughness: 0.9 })
  );
  wall.position.set(0, 5, -4.3);
  group.add(wall);

  for (const x of [-1.65, 1.75]) {
    const upright = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 3.2, 0.14),
      new THREE.MeshStandardMaterial({ color: 0xc8d0db, roughness: 0.34 })
    );
    upright.position.set(x, 1.6, -0.2);
    group.add(upright);
  }

  const crossbar = new THREE.Mesh(
    new THREE.BoxGeometry(3.58, 0.12, 0.14),
    new THREE.MeshStandardMaterial({ color: 0xc8d0db, roughness: 0.34 })
  );
  crossbar.position.set(0.05, 3.1, -0.2);
  group.add(crossbar);

  for (let index = 0; index < 7; index += 1) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.08, 0.01),
      new THREE.MeshBasicMaterial({ color: 0x4df4cb })
    );
    slat.position.set(-0.92 + index * 0.34, 3.92 - (index % 3) * 0.18, -4.22);
    slat.userData.baseY = slat.position.y;
    slats.push(slat);
    group.add(slat);
  }

  return { group, slats };
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
  keyboard.position.set(0.54, 1.98, 0.26);
  group.add(keyboard);

  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.13, 0.22, 14),
    new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.5 })
  );
  mug.position.set(1.72, 2.05, 0.28);
  group.add(mug);

  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.04, 0.32),
    new THREE.MeshStandardMaterial({ color: 0xe3e6ec, roughness: 0.45 })
  );
  mouse.position.set(1.22, 1.98, 0.28);
  group.add(mouse);

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

  const tower = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 1.38, 0.92),
    new THREE.MeshStandardMaterial({ color: 0x18212a, roughness: 0.58 })
  );
  tower.position.set(-1.42, 0.72, -0.18);
  group.add(tower);

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

  return { group, screen, screenBars, lampLight, mug, mouse };
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

  const windowFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 2.2, 1.7),
    new THREE.MeshStandardMaterial({ color: 0x203046, roughness: 0.7 })
  );
  windowFrame.position.set(-4.2, 4.2, -3.9);
  group.add(windowFrame);

  const windowGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 1.9),
    new THREE.MeshBasicMaterial({ color: 0x365d88, transparent: true, opacity: 0.42 })
  );
  windowGlow.position.set(-4.06, 4.2, -3.8);
  group.add(windowGlow);

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

  const sleepFigure = new THREE.Group();
  const pajamas = new THREE.MeshStandardMaterial({ color: 0x6f8ba8, roughness: 0.84 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xf2bf97, roughness: 0.82 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.28, 0.72), pajamas);
  torso.position.set(-0.08, 0, 0);
  sleepFigure.add(torso);

  const legs = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.24, 0.62), pajamas);
  legs.position.set(1.16, -0.02, 0);
  sleepFigure.add(legs);

  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.16, 0.22), pajamas);
  arm.position.set(0.08, 0.11, 0.38);
  arm.rotation.z = 0.1;
  sleepFigure.add(arm);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), skin);
  head.position.set(-1.12, 0.14, 0.12);
  sleepFigure.add(head);

  sleepFigure.position.set(-0.32, 1.06, 0);
  group.add(sleepFigure);

  return { group, lampLight, dreamParticles, windowGlow, sleepFigure: { group: sleepFigure, chest: torso, head } };
}

function createSnowboard(THREE) {
  const group = new THREE.Group();
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(1.72, 0.08, 0.36),
    new THREE.MeshStandardMaterial({ color: 0x18283c, roughness: 0.52 })
  );
  board.position.y = 0.1;
  board.rotation.z = -0.08;
  group.add(board);

  const nose = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.12, 18),
    new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.45 })
  );
  nose.rotation.z = Math.PI / 2;
  nose.position.set(0.84, 0.11, 0);
  group.add(nose);

  const tail = nose.clone();
  tail.position.x = -0.84;
  group.add(tail);

  const bindingA = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.18, 0.18),
    new THREE.MeshStandardMaterial({ color: 0xeff5ff, roughness: 0.4 })
  );
  const bindingB = bindingA.clone();
  bindingA.position.set(0.3, 0.22, 0);
  bindingB.position.set(-0.3, 0.22, 0);
  group.add(bindingA);
  group.add(bindingB);

  return { group, board };
}

function createBarbell(THREE) {
  const group = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0xc6d0db, roughness: 0.25 });
  const plate = new THREE.MeshStandardMaterial({ color: 0x101217, roughness: 0.72 });

  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.8, 16), metal);
  bar.rotation.z = Math.PI / 2;
  group.add(bar);

  for (const side of [-1, 1]) {
    const outerPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.14, 20), plate);
    const innerPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.1, 20), plate);
    outerPlate.rotation.z = Math.PI / 2;
    innerPlate.rotation.z = Math.PI / 2;
    outerPlate.position.set(side * 1.18, 0, 0);
    innerPlate.position.set(side * 0.96, 0, 0);
    group.add(outerPlate);
    group.add(innerPlate);
  }

  return { group };
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

function createFakeShadows(THREE) {
  const group = new THREE.Group();
  const texture = createShadowTexture(THREE);

  function makeShadow(size) {
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        opacity: 0
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.renderOrder = 1;
    group.add(shadow);
    return shadow;
  }

  return {
    group,
    items: {
      ride: makeShadow(2.8),
      glider: makeShadow(4.2),
      surron: makeShadow(3.4),
      snowboard: makeShadow(3.1),
      exercise: makeShadow(3.4),
      desk: makeShadow(3.8),
      sleep: makeShadow(3.6)
    }
  };
}

function createShadowTexture(THREE) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
  gradient.addColorStop(0, "rgba(0,0,0,0.72)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
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

function animateRoadScene(roadScene, localTime) {
  roadScene.stripes.forEach((stripe, index) => {
    const offset = (localTime * 4.8 + index * 0.2) % 18;
    stripe.position.x = -8.5 + offset;
  });

  roadScene.skylineBlocks.forEach((building, index) => {
    building.position.y = building.userData.baseY + Math.sin(localTime * 0.8 + index * 0.45) * 0.03;
  });
}

function animateGliderScene(context, localTime) {
  context.clouds.group.children.forEach((cloud, index) => {
    cloud.position.z += Math.sin(localTime * 0.3 + index) * 0.001;
  });
}

function animateTrailScene(trailScene, localTime, progress) {
  trailScene.rocks.forEach((rock, index) => {
    rock.position.y = rock.userData.baseY + Math.sin(localTime * 4.4 + index) * 0.015;
  });

  trailScene.shrubs.forEach((shrub, index) => {
    shrub.rotation.z = Math.sin(localTime * 1.6 + index * 0.7) * 0.03;
  });

  trailScene.group.rotation.z = Math.sin(progress * Math.PI * 2) * 0.01;
}

function animateSnowScene(snowScene, localTime, progress) {
  snowScene.pines.forEach((pine, index) => {
    pine.rotation.z = Math.sin(localTime * 0.9 + index * 0.35) * 0.02;
  });

  snowScene.markers.forEach((marker, index) => {
    marker.position.z = marker.userData.baseZ + Math.sin(progress * Math.PI * 2 + index) * 0.12;
  });

  snowScene.peaks.forEach((peak, index) => {
    peak.position.y = -0.2 + Math.sin(localTime * 0.45 + index * 0.4) * 0.03;
  });
}

function animateGymScene(gymScene, barbell, localTime, press) {
  gymScene.slats.forEach((slat, index) => {
    slat.position.y = slat.userData.baseY + Math.sin(localTime * 5 + index * 0.6) * 0.035;
  });

  barbell.group.rotation.z = Math.sin(localTime * 2.4) * 0.03;
  barbell.group.position.z = 0.18 - (1 - press) * 0.05;
}

function animateDeskScene(deskScene, localTime) {
  deskScene.mug.rotation.y += 0.01;
  deskScene.mouse.position.x = 1.22 + Math.sin(localTime * 3) * 0.04;
}

function animateSleepScene(bedScene, localTime) {
  bedScene.windowGlow.material.opacity = 0.3 + Math.sin(localTime * 0.7) * 0.05;
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
  avatar.leftArmPivot.rotation.z = 0.74 + Math.sin(localTime * 4.8) * 0.08;
  avatar.rightArmPivot.rotation.z = -0.74 - Math.sin(localTime * 4.8) * 0.08;
  avatar.leftArmPivot.rotation.x = -0.72;
  avatar.rightArmPivot.rotation.x = -0.72;
  avatar.leftLegPivot.rotation.x = -0.58 + Math.sin(localTime * 4.8) * 0.05;
  avatar.rightLegPivot.rotation.x = -0.54 - Math.sin(localTime * 4.8) * 0.05;
  avatar.leftLegPivot.rotation.z = 0.08;
  avatar.rightLegPivot.rotation.z = -0.08;
  avatar.head.rotation.z = Math.sin(localTime * 2.2) * 0.04;
}

function poseSurron(avatar, localTime) {
  avatar.leftArmPivot.rotation.x = -0.98;
  avatar.rightArmPivot.rotation.x = -0.94;
  avatar.leftArmPivot.rotation.z = 0.34;
  avatar.rightArmPivot.rotation.z = -0.34;
  avatar.leftLegPivot.rotation.x = -1.02 + Math.sin(localTime * 8) * 0.05;
  avatar.rightLegPivot.rotation.x = -0.94 - Math.sin(localTime * 8) * 0.05;
  avatar.leftLegPivot.rotation.z = 0.04;
  avatar.rightLegPivot.rotation.z = -0.04;
  avatar.head.rotation.x = 0.1;
}

function poseSnowboard(avatar, localTime, lean) {
  avatar.leftArmPivot.rotation.x = -0.82 + Math.sin(localTime * 3.8) * 0.08;
  avatar.rightArmPivot.rotation.x = -0.48 - Math.sin(localTime * 3.2) * 0.06;
  avatar.leftArmPivot.rotation.z = 0.5 + lean * 0.45;
  avatar.rightArmPivot.rotation.z = -0.34 - lean * 0.24;
  avatar.leftLegPivot.rotation.x = -1.18;
  avatar.rightLegPivot.rotation.x = -1.02;
  avatar.leftLegPivot.rotation.z = 0.08 + lean * 0.12;
  avatar.rightLegPivot.rotation.z = -0.08 - lean * 0.12;
  avatar.head.rotation.z = -lean * 0.28;
}

function poseLift(avatar, localTime, press) {
  const lockout = press * 0.92;
  avatar.leftArmPivot.rotation.x = -1.34 - lockout;
  avatar.rightArmPivot.rotation.x = -1.34 - lockout;
  avatar.leftArmPivot.rotation.z = 0.06;
  avatar.rightArmPivot.rotation.z = -0.06;
  avatar.leftLegPivot.rotation.x = -0.22 + (1 - press) * 0.24;
  avatar.rightLegPivot.rotation.x = -0.22 + (1 - press) * 0.24;
  avatar.head.rotation.x = -0.02 + press * 0.16;
  avatar.head.rotation.z = Math.sin(localTime * 1.2) * 0.02;
}

function poseCoding(avatar, localTime) {
  avatar.leftArmPivot.rotation.x = -1.18 + Math.sin(localTime * 6.5) * 0.08;
  avatar.rightArmPivot.rotation.x = -1.16 - Math.sin(localTime * 6.5) * 0.08;
  avatar.leftArmPivot.rotation.z = 0.28;
  avatar.rightArmPivot.rotation.z = -0.32;
  avatar.leftLegPivot.rotation.x = -0.08;
  avatar.rightLegPivot.rotation.x = 0.08;
  avatar.head.rotation.z = Math.sin(localTime * 1.8) * 0.03;
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
