const CHAPTER_DURATION = 6.4

const CHAPTERS = [
  { key: "onewheel", label: "Onewheel commute", background: 0x10243a, fogFar: 34, build: createCommuteChapter },
  { key: "glider", label: "Glider flight", background: 0x8ecdf4, fogFar: 72, build: createGliderChapter },
  { key: "surron", label: "Surron run", background: 0x312319, fogFar: 34, build: createSurronChapter },
  { key: "snowboard", label: "Snowboard carve", background: 0xd9efff, fogFar: 44, build: createSnowboardChapter },
  { key: "exercise", label: "Lifting session", background: 0x08121d, fogFar: 30, build: createExerciseChapter },
  { key: "coding", label: "Standing desk coding", background: 0x0c1a28, fogFar: 30, build: createCodingChapter },
  { key: "sleep", label: "Sleep reset", background: 0x050912, fogFar: 28, build: createSleepChapter }
]

window.addEventListener("DOMContentLoaded", initAnimationLab)

function initAnimationLab() {
  if (!window.THREE) {
    return
  }

  const THREE = window.THREE
  const canvas = document.getElementById("animation-canvas")
  const labelEl = document.getElementById("scene-label")
  const indexEl = document.getElementById("scene-index")
  const countEl = document.getElementById("scene-count")
  const progressEl = document.getElementById("scene-progress")
  const stepEls = Array.from(document.querySelectorAll("[data-scene-step]"))

  if (!canvas || !labelEl || !indexEl || !countEl || !progressEl) {
    return
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.08

  const scene = new THREE.Scene()
  const backgroundColor = new THREE.Color(CHAPTERS[0].background)
  scene.background = backgroundColor
  scene.fog = new THREE.Fog(backgroundColor.clone(), 10, CHAPTERS[0].fogFar)

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 140)
  camera.position.set(10, 5, 11)

  const clock = new THREE.Clock()

  const hemi = new THREE.HemisphereLight(0xddefff, 0x102030, 1.1)
  scene.add(hemi)

  const sunLight = new THREE.DirectionalLight(0xfff1c7, 1.35)
  sunLight.position.set(12, 13, 6)
  const sunTarget = new THREE.Object3D()
  sunTarget.position.set(0, 1.5, 0)
  scene.add(sunTarget)
  sunLight.target = sunTarget
  scene.add(sunLight)

  const rimLight = new THREE.PointLight(0x6fe9ff, 0.42, 60)
  rimLight.position.set(-8, 6, 9)
  scene.add(rimLight)

  const atmosphere = createAtmosphere(THREE)
  scene.add(atmosphere.group)

  const stageRoot = new THREE.Group()
  scene.add(stageRoot)

  const builtChapters = CHAPTERS.map((chapter) => {
    const built = chapter.build(THREE)
    built.group.visible = false
    stageRoot.add(built.group)
    return Object.assign({}, chapter, built)
  })

  const world = {
    THREE,
    scene,
    renderer,
    camera,
    backgroundColor,
    hemi,
    sunLight,
    sunTarget,
    rimLight,
    atmosphere,
    cameraGoal: new THREE.Vector3(10, 5, 11),
    lookGoal: new THREE.Vector3(0, 1.8, 0),
    skyGoal: new THREE.Color(CHAPTERS[0].background),
    fogGoal: CHAPTERS[0].fogFar,
    hemiGoal: 1.1,
    sunGoal: 1.35,
    rimGoal: 0.42
  }

  countEl.textContent = String(CHAPTERS.length).padStart(2, "0")

  let previousIndex = -1

  function syncUi(chapterIndex, phase) {
    const chapter = builtChapters[chapterIndex]
    labelEl.textContent = chapter.label
    indexEl.textContent = String(chapterIndex + 1).padStart(2, "0")
    progressEl.style.width = `${phase * 100}%`
    stepEls.forEach((step) => {
      step.classList.toggle("is-active", step.dataset.sceneStep === chapter.key)
    })
  }

  function handleResize() {
    const bounds = canvas.getBoundingClientRect()
    const width = Math.max(bounds.width, 1)
    const height = Math.max(bounds.height, 1)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  function updateWorld() {
    backgroundColor.lerp(world.skyGoal, 0.08)
    scene.fog.color.copy(backgroundColor)
    scene.fog.far = damp(world.fogGoal, scene.fog.far, 0.08)
    hemi.intensity = damp(world.hemiGoal, hemi.intensity, 0.1)
    sunLight.intensity = damp(world.sunGoal, sunLight.intensity, 0.08)
    rimLight.intensity = damp(world.rimGoal, rimLight.intensity, 0.08)
    camera.position.lerp(world.cameraGoal, 0.08)
    sunTarget.position.lerp(world.lookGoal, 0.06)
    camera.lookAt(world.lookGoal)
    sunLight.target.updateMatrixWorld()
  }

  function renderFrame() {
    const elapsed = clock.getElapsedTime()
    const totalDuration = CHAPTER_DURATION * builtChapters.length
    const cycle = (elapsed * 0.92) % totalDuration
    const chapterIndex = Math.floor(cycle / CHAPTER_DURATION)
    const local = cycle - chapterIndex * CHAPTER_DURATION
    const phase = local / CHAPTER_DURATION

    if (chapterIndex !== previousIndex) {
      builtChapters.forEach((chapter, index) => {
        chapter.group.visible = index === chapterIndex
      })
      syncUi(chapterIndex, phase)
      previousIndex = chapterIndex
    } else {
      progressEl.style.width = `${phase * 100}%`
    }

    const chapter = builtChapters[chapterIndex]
    chapter.update(world, phase, elapsed)
    updateAtmosphere(world, chapter.key, phase, elapsed)
    updateWorld()
    renderer.render(scene, camera)
    requestAnimationFrame(renderFrame)
  }

  window.addEventListener("resize", handleResize)
  handleResize()
  syncUi(0, 0)
  renderFrame()
}

function createAtmosphere(THREE) {
  const group = new THREE.Group()

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xffd48e })
  )
  sun.position.set(9, 8, -20)
  group.add(sun)

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.86, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xf1f7ff })
  )
  moon.position.set(9, 7.4, -18)
  group.add(moon)

  const cloudGroup = new THREE.Group()
  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8fbff,
    roughness: 0.95,
    transparent: true,
    opacity: 0.92
  })

  const cloudAnchors = [
    [-10, 6.8, -17],
    [-3, 7.4, -16],
    [4, 6.2, -18],
    [11, 7.1, -19]
  ]

  cloudAnchors.forEach((anchor, index) => {
    const cloud = new THREE.Group()
    cloud.userData.baseX = anchor[0]
    cloud.userData.baseY = anchor[1]
    cloud.userData.phase = index * 0.8

    for (let puff = 0; puff < 5; puff += 1) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.56 + puff * 0.06, 12, 12),
        cloudMaterial
      )
      sphere.position.set(puff * 0.45, Math.sin(puff * 0.7) * 0.18, 0)
      cloud.add(sphere)
    }

    cloud.position.set(anchor[0], anchor[1], anchor[2])
    cloudGroup.add(cloud)
  })

  group.add(cloudGroup)

  const mountainGroup = new THREE.Group()
  const mountainMaterial = new THREE.MeshStandardMaterial({ color: 0x4d5a67, roughness: 1 })
  ;[
    [-12, 4.6, -15, 3.1],
    [-6.5, 3.7, -14.5, 2.3],
    [-0.2, 5.5, -15.4, 3.8],
    [6.4, 4.2, -14.8, 2.8],
    [12, 5.1, -15.6, 3.4]
  ].forEach((spec) => {
    const mountain = new THREE.Mesh(
      new THREE.ConeGeometry(spec[3], spec[1], 4),
      mountainMaterial
    )
    mountain.position.set(spec[0], spec[1] / 2 - 0.3, spec[2])
    mountain.rotation.y = Math.PI / 4
    mountainGroup.add(mountain)
  })
  group.add(mountainGroup)

  const starPositions = new Float32Array(240 * 3)
  for (let index = 0; index < 240; index += 1) {
    starPositions[index * 3] = (Math.random() - 0.5) * 40
    starPositions[index * 3 + 1] = Math.random() * 18 + 4
    starPositions[index * 3 + 2] = -Math.random() * 30 - 12
  }
  const starGeometry = new THREE.BufferGeometry()
  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.16,
    transparent: true,
    opacity: 0,
    sizeAttenuation: true
  })
  const stars = new THREE.Points(starGeometry, starMaterial)
  group.add(stars)

  return { group, sun, moon, cloudGroup, mountainGroup, stars, starMaterial }
}

function updateAtmosphere(world, key, phase, elapsed) {
  const { atmosphere } = world
  atmosphere.cloudGroup.children.forEach((cloud) => {
    cloud.position.x = cloud.userData.baseX + Math.sin(elapsed * 0.18 + cloud.userData.phase) * 0.9
    cloud.position.y = cloud.userData.baseY + Math.sin(elapsed * 0.34 + cloud.userData.phase) * 0.08
  })

  atmosphere.stars.rotation.y = elapsed * 0.008
  atmosphere.sun.visible = key !== "exercise" && key !== "coding" && key !== "sleep"
  atmosphere.moon.visible = key === "sleep"
  atmosphere.cloudGroup.visible = key !== "exercise" && key !== "coding"
  atmosphere.mountainGroup.visible = key !== "exercise" && key !== "coding" && key !== "sleep"
  atmosphere.starMaterial.opacity = key === "sleep" ? 0.96 : key === "onewheel" ? 0.12 : 0

  if (key === "glider") {
    atmosphere.sun.position.set(10, 9.2, -20)
    atmosphere.mountainGroup.position.y = -1.6
    world.skyGoal.setHex(0x8ecdf4)
    world.fogGoal = 72
    world.hemiGoal = 1.32
    world.sunGoal = 1.62
    world.rimGoal = 0.36
  } else if (key === "snowboard") {
    atmosphere.sun.position.set(8.6, 8.4, -18)
    atmosphere.mountainGroup.position.y = -0.8
    world.skyGoal.setHex(0xd9efff)
    world.fogGoal = 44
    world.hemiGoal = 1.22
    world.sunGoal = 1.45
    world.rimGoal = 0.3
  } else if (key === "surron") {
    atmosphere.sun.position.set(8, 7.2, -16)
    atmosphere.mountainGroup.position.y = -0.35
    world.skyGoal.setHex(0x312319)
    world.fogGoal = 34
    world.hemiGoal = 0.98
    world.sunGoal = 1.12
    world.rimGoal = 0.42
  } else if (key === "exercise") {
    world.skyGoal.setHex(0x08121d)
    world.fogGoal = 30
    world.hemiGoal = 0.88
    world.sunGoal = 0.45
    world.rimGoal = 0.76
  } else if (key === "coding") {
    world.skyGoal.setHex(0x0c1a28)
    world.fogGoal = 30
    world.hemiGoal = 0.92
    world.sunGoal = 0.52
    world.rimGoal = 0.84
  } else if (key === "sleep") {
    atmosphere.moon.position.set(9, 7.8, -18)
    world.skyGoal.setHex(0x050912)
    world.fogGoal = 28
    world.hemiGoal = 0.52
    world.sunGoal = 0.18
    world.rimGoal = 0.22
  } else {
    atmosphere.sun.position.set(9, 7.6, -18)
    atmosphere.mountainGroup.position.y = -0.2
    world.skyGoal.setHex(0x10243a)
    world.fogGoal = 34
    world.hemiGoal = 1.1
    world.sunGoal = 1.28
    world.rimGoal = 0.4
  }

  if (phase > 0.86) {
    const next = CHAPTERS[(CHAPTERS.findIndex((chapter) => chapter.key === key) + 1) % CHAPTERS.length]
    world.skyGoal.lerp(new world.THREE.Color(next.background), smoothstep(0.86, 1, phase))
  }
}

function createCommuteChapter(THREE) {
  const group = new THREE.Group()

  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(36, 9),
    new THREE.MeshStandardMaterial({ color: 0x131b24, roughness: 0.95 })
  )
  road.rotation.x = -Math.PI / 2
  road.position.y = 0
  group.add(road)

  const shoulder = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 18),
    new THREE.MeshStandardMaterial({ color: 0x202f3a, roughness: 1 })
  )
  shoulder.rotation.x = -Math.PI / 2
  shoulder.position.y = -0.01
  group.add(shoulder)

  const stripes = []
  for (let index = 0; index < 11; index += 1) {
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.03, 0.14),
      new THREE.MeshStandardMaterial({ color: 0xf8c76c, emissive: 0xf5a84f, emissiveIntensity: 0.15 })
    )
    stripe.position.set(-10 + index * 2.1, 0.04, 0)
    stripes.push(stripe)
    group.add(stripe)
  }

  for (let index = 0; index < 8; index += 1) {
    const tower = new THREE.Mesh(
      new THREE.BoxGeometry(1.2 + (index % 3) * 0.2, 2.4 + (index % 4) * 0.9, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x223447, roughness: 0.88 })
    )
    tower.position.set(-10 + index * 2.8, tower.geometry.parameters.height / 2, -5.4 - (index % 2) * 1.2)
    group.add(tower)
  }

  const rig = createOneWheelRig(THREE)
  rig.group.position.set(-5.4, 0.18, 0.1)
  group.add(rig.group)

  const rider = createCharacter(THREE, {
    torsoColor: 0xff8f4d,
    pantsColor: 0x101720,
    accentColor: 0x18283a,
    helmet: true
  })
  rider.group.position.set(0, 0.86, 0.04)
  rig.group.add(rider.group)

  return {
    group,
    update(world, phase, elapsed) {
      const x = lerp(-7.2, 7.2, easeInOutCubic(phase))
      const bob = Math.sin(elapsed * 6.8) * 0.05
      const lean = -0.12 - Math.sin(phase * Math.PI * 2) * 0.04

      stripes.forEach((stripe, index) => {
        stripe.position.x = ((elapsed * 6 + index * 2.1) % 22) - 11
      })

      rig.group.position.set(x, 0.18 + bob, 0.1)
      rig.group.rotation.set(0.02, 0, lean)
      rig.wheel.rotation.z = -elapsed * 16

      rider.group.rotation.set(0.14, 0, 0.05)
      poseCommute(rider, elapsed)

      setView(world, [x + 4.8, 3.1, 8.4], [x + 0.5, 1.9, 0.1])
    }
  }
}

function createGliderChapter(THREE) {
  const group = new THREE.Group()
  const glider = createGliderRig(THREE)
  group.add(glider.group)

  for (let index = 0; index < 7; index += 1) {
    const puff = createCloudCluster(THREE, 0xffffff)
    puff.position.set(-10 + index * 3.8, 3.5 + (index % 3) * 0.6, -3 - index * 0.8)
    puff.scale.setScalar(0.72 + (index % 3) * 0.14)
    puff.userData.phase = index * 0.7
    group.add(puff)
  }

  return {
    group,
    update(world, phase, elapsed) {
      group.children.forEach((child, index) => {
        if (child !== glider.group) {
          child.position.x += Math.sin(elapsed * 0.22 + child.userData.phase) * 0.002
        }
      })

      const angle = phase * Math.PI * 2
      const x = Math.cos(angle) * 2.8
      const y = 5.5 + Math.sin(angle * 2) * 0.35
      const z = Math.sin(angle) * 1.8
      const bank = Math.sin(angle) * 0.42

      glider.group.position.set(x, y, z)
      glider.group.rotation.set(0.08 + Math.cos(angle) * 0.06, -0.16, bank)
      glider.propeller.rotation.x = elapsed * 18

      setView(world, [x + 8.2, y + 2.2, z + 6.2], [x, y + 0.15, z])
    }
  }
}

function createSurronChapter(THREE) {
  const group = new THREE.Group()

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(38, 18),
    new THREE.MeshStandardMaterial({ color: 0x584330, roughness: 1 })
  )
  ground.rotation.x = -Math.PI / 2
  group.add(ground)

  const trail = new THREE.Mesh(
    new THREE.PlaneGeometry(32, 6),
    new THREE.MeshStandardMaterial({ color: 0x7d5d45, roughness: 0.98 })
  )
  trail.rotation.x = -Math.PI / 2
  trail.position.y = 0.02
  group.add(trail)

  for (let index = 0; index < 12; index += 1) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.18 + (index % 3) * 0.06),
      new THREE.MeshStandardMaterial({ color: 0x9f7e60, roughness: 1 })
    )
    rock.position.set(-9 + index * 1.8, 0.2, index % 2 === 0 ? 2.8 : -3.1)
    group.add(rock)
  }

  const bike = createMotorcycleRig(THREE)
  bike.group.position.set(-6.2, 0.25, 0.2)
  group.add(bike.group)

  const rider = createCharacter(THREE, {
    torsoColor: 0x151b23,
    pantsColor: 0x0d1118,
    accentColor: 0xff8f4d,
    helmet: true
  })
  rider.group.position.set(-0.25, 1.18, 0)
  bike.group.add(rider.group)

  return {
    group,
    update(world, phase, elapsed) {
      const x = lerp(-7, 7, easeInOutCubic(phase))
      const bounce = Math.sin(elapsed * 9.5) * 0.05

      bike.group.position.set(x, 0.28 + bounce, 0.22)
      bike.group.rotation.set(0.02, 0, 0.02)
      bike.frontWheel.rotation.z = -elapsed * 20
      bike.backWheel.rotation.z = -elapsed * 20
      bike.headlight.intensity = 0.55

      rider.group.rotation.set(0.1, 0, -0.02)
      poseMoto(rider, elapsed)

      setView(world, [x + 4.8, 3.2, 7.4], [x + 0.8, 1.7, 0.15])
    }
  }
}

function createSnowboardChapter(THREE) {
  const group = new THREE.Group()

  const snowField = new THREE.Mesh(
    new THREE.PlaneGeometry(38, 18),
    new THREE.MeshStandardMaterial({ color: 0xf5fbff, roughness: 0.96 })
  )
  snowField.rotation.x = -Math.PI / 2
  group.add(snowField)

  const slope = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 6.4),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92 })
  )
  slope.rotation.x = -Math.PI / 2
  slope.position.y = 0.03
  group.add(slope)

  const snowPeaks = new THREE.Group()
  ;[
    [-10, 5.6, -11, 3.2],
    [-5.6, 4.2, -10.5, 2.4],
    [-0.4, 6.5, -11.8, 3.8],
    [5.8, 5.1, -10.8, 3],
    [11, 6.2, -11.6, 3.6]
  ].forEach((spec) => {
    const base = new THREE.Mesh(
      new THREE.ConeGeometry(spec[3], spec[1], 4),
      new THREE.MeshStandardMaterial({ color: 0x9db4c7, roughness: 0.96 })
    )
    base.position.set(spec[0], spec[1] / 2 - 0.25, spec[2])
    base.rotation.y = Math.PI / 4
    snowPeaks.add(base)

    const cap = new THREE.Mesh(
      new THREE.ConeGeometry(spec[3] * 0.54, spec[1] * 0.32, 4),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82 })
    )
    cap.position.set(spec[0], spec[1] * 0.78 - 0.15, spec[2])
    cap.rotation.y = Math.PI / 4
    snowPeaks.add(cap)
  })
  group.add(snowPeaks)

  const board = createSnowboardRig(THREE)
  board.group.position.set(-6, 0.14, 0)
  group.add(board.group)

  const rider = createCharacter(THREE, {
    torsoColor: 0x274761,
    pantsColor: 0x0f1a28,
    accentColor: 0xff8f4d,
    helmet: false
  })
  rider.group.position.set(0, 0.52, 0.02)
  board.group.add(rider.group)

  return {
    group,
    update(world, phase, elapsed) {
      const x = lerp(-7.2, 7.2, easeInOutCubic(phase))
      const carve = Math.sin(phase * Math.PI * 4) * 0.36
      const lean = Math.sin(phase * Math.PI * 2) * 0.32

      board.group.position.set(x, 0.16, carve)
      board.group.rotation.set(0, 0.06, -0.14 - lean)

      rider.group.position.set(0, 0.38, 0.02)
      rider.group.rotation.set(0.08, 0, -0.08 - lean * 0.5)
      poseSnowboard(rider, elapsed, lean)

      snowPeaks.position.y = Math.sin(elapsed * 0.18) * 0.04 - 0.1

      setView(world, [x + 4.9, 3.4, 7.6], [x + 0.2, 1.5, carve])
    }
  }
}

function createExerciseChapter(THREE) {
  const group = new THREE.Group()

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 16),
    new THREE.MeshStandardMaterial({ color: 0x1a2430, roughness: 0.97 })
  )
  floor.rotation.x = -Math.PI / 2
  group.add(floor)

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 10),
    new THREE.MeshStandardMaterial({ color: 0x0f1721, roughness: 0.9 })
  )
  wall.position.set(0, 5, -4.2)
  group.add(wall)

  const rack = new THREE.Group()
  ;[-1.4, 1.4].forEach((x) => {
    const upright = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 3.4, 0.14),
      new THREE.MeshStandardMaterial({ color: 0xcfd8e2, roughness: 0.36 })
    )
    upright.position.set(x, 1.7, -0.2)
    rack.add(upright)
  })
  const crossbar = new THREE.Mesh(
    new THREE.BoxGeometry(3.1, 0.12, 0.14),
    new THREE.MeshStandardMaterial({ color: 0xcfd8e2, roughness: 0.36 })
  )
  crossbar.position.set(0, 3.3, -0.2)
  rack.add(crossbar)
  group.add(rack)

  const athlete = createCharacter(THREE, {
    torsoColor: 0x183047,
    pantsColor: 0x0d1219,
    accentColor: 0x72f0cf,
    helmet: false
  })
  athlete.group.position.set(0, 0.16, 0.18)
  group.add(athlete.group)

  const leftWeight = createDumbbell(THREE)
  const rightWeight = createDumbbell(THREE)
  leftWeight.group.position.set(0, -0.62, 0)
  rightWeight.group.position.set(0, -0.62, 0)
  athlete.leftHandSocket.add(leftWeight.group)
  athlete.rightHandSocket.add(rightWeight.group)

  const strips = []
  for (let index = 0; index < 6; index += 1) {
    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.08, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x72f0cf })
    )
    strip.position.set(-0.8 + index * 0.32, 3.9 - (index % 2) * 0.22, -4.08)
    strip.userData.baseY = strip.position.y
    strips.push(strip)
    group.add(strip)
  }

  return {
    group,
    update(world, phase, elapsed) {
      const press = (Math.sin(elapsed * 2.8) + 1) * 0.5
      poseLift(athlete, press)
      athlete.group.position.y = 0.14 + (1 - press) * 0.08

      leftWeight.group.rotation.z = 0.18
      rightWeight.group.rotation.z = -0.18

      strips.forEach((strip, index) => {
        strip.position.y = strip.userData.baseY + Math.sin(elapsed * 5 + index * 0.6) * 0.04
      })

      setView(world, [5.2, 3.6, 7.4], [0, 2.3, 0.15])
    }
  }
}

function createCodingChapter(THREE) {
  const group = new THREE.Group()

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 16),
    new THREE.MeshStandardMaterial({ color: 0x233343, roughness: 0.96 })
  )
  floor.rotation.x = -Math.PI / 2
  group.add(floor)

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 10),
    new THREE.MeshStandardMaterial({ color: 0x132030, roughness: 0.92 })
  )
  wall.position.set(0, 5, -4.3)
  group.add(wall)

  const desk = createDeskRig(THREE)
  desk.group.position.set(0.5, 0, 0)
  group.add(desk.group)

  const coder = createCharacter(THREE, {
    torsoColor: 0x182c40,
    pantsColor: 0x0f151c,
    accentColor: 0xff8f4d,
    helmet: false
  })
  coder.group.position.set(-0.55, 0.18, 0.78)
  coder.group.rotation.y = Math.PI
  group.add(coder.group)

  return {
    group,
    update(world, phase, elapsed) {
      desk.screen.material.emissiveIntensity = 1.18 + Math.sin(elapsed * 4.2) * 0.18
      desk.codeBars.forEach((bar, index) => {
        bar.scale.x = 0.72 + (Math.sin(elapsed * 4 + index) + 1) * 0.24
      })

      poseTyping(coder, elapsed)
      coder.group.position.y = 0.18 + Math.sin(elapsed * 3.2) * 0.03

      setView(world, [5.4, 3.2, 7.5], [0.7, 2.25, 0.06])
    }
  }
}

function createSleepChapter(THREE) {
  const group = new THREE.Group()

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 16),
    new THREE.MeshStandardMaterial({ color: 0x121a28, roughness: 0.95 })
  )
  floor.rotation.x = -Math.PI / 2
  group.add(floor)

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 10),
    new THREE.MeshStandardMaterial({ color: 0x0a111d, roughness: 0.92 })
  )
  wall.position.set(0, 5, -4.2)
  group.add(wall)

  const bed = createBedRig(THREE)
  group.add(bed.group)

  return {
    group,
    update(world, phase, elapsed) {
      const breath = Math.sin(elapsed * 1.5) * 0.03
      bed.sleeper.position.y = 1.02 + breath * 0.4
      bed.sleeper.scale.y = 1 + breath * 0.05
      bed.windowGlow.material.opacity = 0.3 + Math.sin(elapsed * 0.6) * 0.05
      bed.particles.children.forEach((particle, index) => {
        const lift = (elapsed * 0.22 + index * 0.28) % 1
        particle.position.y = 2.5 + lift * 1.2
        particle.material.opacity = 0.22 + (1 - lift) * 0.4
      })

      setView(world, [5.1, 3.4, 7.6], [0, 1.2, 0.05])
    }
  }
}

function createCharacter(THREE, options) {
  const palette = Object.assign({
    torsoColor: 0x274761,
    pantsColor: 0x0f1520,
    accentColor: 0xff8f4d,
    skinColor: 0xf2c39d,
    helmet: false
  }, options || {})

  const group = new THREE.Group()

  const skin = new THREE.MeshStandardMaterial({ color: palette.skinColor, roughness: 0.86 })
  const torsoMaterial = new THREE.MeshStandardMaterial({ color: palette.torsoColor, roughness: 0.68 })
  const pantsMaterial = new THREE.MeshStandardMaterial({ color: palette.pantsColor, roughness: 0.78 })
  const shoeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88 })

  const hips = new THREE.Group()
  hips.position.y = 0.95
  group.add(hips)

  const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.32, 0.34), pantsMaterial)
  hips.add(pelvis)

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.96, 1.18, 0.5), torsoMaterial)
  torso.position.y = 0.78
  hips.add(torso)

  const headPivot = new THREE.Group()
  headPivot.position.set(0, 1.56, 0.08)
  hips.add(headPivot)

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 18, 18), skin)
  head.position.y = 0.22
  headPivot.add(head)

  if (palette.helmet) {
    const helmet = new THREE.Mesh(
      new THREE.SphereGeometry(0.36, 18, 18, 0, Math.PI * 2, 0, Math.PI / 2.1),
      new THREE.MeshStandardMaterial({ color: palette.accentColor, roughness: 0.46 })
    )
    helmet.position.y = 0.3
    headPivot.add(helmet)
  }

  const leftArmPivot = createLimbPivot(THREE, skin, [-0.58, 1.18, 0.14], 0.82, 0.11)
  const rightArmPivot = createLimbPivot(THREE, skin, [0.58, 1.18, 0.14], 0.82, 0.11)
  hips.add(leftArmPivot.pivot)
  hips.add(rightArmPivot.pivot)

  const leftLegPivot = createLimbPivot(THREE, pantsMaterial, [-0.28, -0.1, 0], 0.98, 0.13)
  const rightLegPivot = createLimbPivot(THREE, pantsMaterial, [0.28, -0.1, 0], 0.98, 0.13)
  hips.add(leftLegPivot.pivot)
  hips.add(rightLegPivot.pivot)

  const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.58), shoeMaterial)
  const rightFoot = leftFoot.clone()
  leftFoot.position.set(-0.28, -1.08, 0.14)
  rightFoot.position.set(0.28, -1.08, 0.14)
  hips.add(leftFoot)
  hips.add(rightFoot)

  return {
    group,
    hips,
    headPivot,
    leftArmPivot: leftArmPivot.pivot,
    rightArmPivot: rightArmPivot.pivot,
    leftLegPivot: leftLegPivot.pivot,
    rightLegPivot: rightLegPivot.pivot,
    leftHandSocket: leftArmPivot.socket,
    rightHandSocket: rightArmPivot.socket,
    leftFoot,
    rightFoot
  }
}

function createLimbPivot(THREE, material, position, length, radius) {
  const pivot = new THREE.Group()
  pivot.position.set(position[0], position[1], position[2])

  const limb = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius * 1.06, length, 12),
    material
  )
  limb.position.y = -length / 2
  pivot.add(limb)

  const socket = new THREE.Group()
  socket.position.y = -length
  pivot.add(socket)

  return { pivot, socket }
}

function createOneWheelRig(THREE) {
  const group = new THREE.Group()
  const dark = new THREE.MeshStandardMaterial({ color: 0x11171d, roughness: 0.62 })
  const shell = new THREE.MeshStandardMaterial({ color: 0xff8f4d, roughness: 0.52 })
  const metal = new THREE.MeshStandardMaterial({ color: 0xd5dee7, roughness: 0.26 })

  const centerShell = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.6, 0.78), shell)
  centerShell.position.y = 0.28
  group.add(centerShell)

  const deck = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.12, 0.54), dark)
  deck.position.y = 0.42
  group.add(deck)

  const footPadA = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.62), dark)
  const footPadB = footPadA.clone()
  footPadA.position.set(0.74, 0.48, 0)
  footPadB.position.set(-0.74, 0.48, 0)
  group.add(footPadA)
  group.add(footPadB)

  const wheel = new THREE.Group()
  const tire = new THREE.Mesh(
    new THREE.TorusGeometry(0.52, 0.18, 18, 36),
    new THREE.MeshStandardMaterial({ color: 0x05070b, roughness: 0.84 })
  )
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.34, 18), metal)
  hub.rotation.x = Math.PI / 2
  const spokeA = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.06, 0.04), metal)
  const spokeB = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.84, 0.04), metal)
  wheel.add(tire)
  wheel.add(hub)
  wheel.add(spokeA)
  wheel.add(spokeB)
  wheel.position.y = 0.22
  group.add(wheel)

  return { group, wheel }
}

function createGliderRig(THREE) {
  const group = new THREE.Group()
  const body = new THREE.MeshStandardMaterial({ color: 0xf0e3cc, roughness: 0.46 })
  const accent = new THREE.MeshStandardMaterial({ color: 0xff8f4d, roughness: 0.46 })
  const glass = new THREE.MeshStandardMaterial({
    color: 0x8bcfff,
    transparent: true,
    opacity: 0.48,
    roughness: 0.12
  })

  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 6.2, 20), body)
  fuselage.rotation.z = Math.PI / 2
  group.add(fuselage)

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.8, 18), accent)
  nose.position.x = 3.45
  nose.rotation.z = -Math.PI / 2
  group.add(nose)

  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), glass)
  canopy.scale.set(1.7, 0.74, 1)
  canopy.position.set(0.8, 0.3, 0)
  group.add(canopy)

  const wing = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 9.2), body)
  wing.position.set(0.28, 0.1, 0)
  group.add(wing)

  const tailWing = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 2.1), body)
  tailWing.position.set(-2.8, 0.46, 0)
  group.add(tailWing)

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.86, 0.06), body)
  fin.position.set(-2.92, 0.82, 0)
  group.add(fin)

  const propeller = new THREE.Group()
  const bladeA = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 0.04), accent)
  const bladeB = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.06, 0.04), accent)
  propeller.add(bladeA)
  propeller.add(bladeB)
  propeller.position.set(3.62, 0, 0)
  group.add(propeller)

  return { group, propeller }
}

function createMotorcycleRig(THREE) {
  const group = new THREE.Group()
  const frame = new THREE.MeshStandardMaterial({ color: 0x171d23, roughness: 0.5 })
  const accent = new THREE.MeshStandardMaterial({ color: 0xff8f4d, roughness: 0.46 })
  const metal = new THREE.MeshStandardMaterial({ color: 0xcfd7e0, roughness: 0.26 })
  const rubber = new THREE.MeshStandardMaterial({ color: 0x06080c, roughness: 0.88 })

  const frontWheel = createWheel(THREE, 0.82, 0.12, rubber, metal)
  const backWheel = createWheel(THREE, 0.82, 0.12, rubber, metal)
  frontWheel.group.position.set(1.72, 0.82, 0)
  backWheel.group.position.set(-1.72, 0.82, 0)
  group.add(frontWheel.group)
  group.add(backWheel.group)

  const frameTop = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.11, 0.15), accent)
  frameTop.position.set(0.12, 1.58, 0)
  frameTop.rotation.z = -0.18
  group.add(frameTop)

  const frameDown = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.11, 0.15), frame)
  frameDown.position.set(0.18, 1.05, 0)
  frameDown.rotation.z = -0.78
  group.add(frameDown)

  const frameRear = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.1, 0.14), frame)
  frameRear.position.set(-0.52, 1.2, 0)
  frameRear.rotation.z = 0.54
  group.add(frameRear)

  const battery = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.04, 0.5), frame)
  battery.position.set(-0.06, 1.16, 0)
  group.add(battery)

  const tank = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.58, 0.44), accent)
  tank.position.set(0.42, 1.62, 0)
  tank.rotation.z = -0.18
  group.add(tank)

  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.2, 0.5), frame)
  seat.position.set(-0.32, 1.9, 0)
  seat.rotation.z = 0.08
  group.add(seat)

  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.14, 0.38), accent)
  tail.position.set(-1.2, 2.04, 0)
  tail.rotation.z = 0.18
  group.add(tail)

  const swingArm = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.12, 0.16), metal)
  swingArm.position.set(-0.94, 1.08, 0)
  swingArm.rotation.z = -0.18
  group.add(swingArm)

  const forkLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.36, 0.08), metal)
  const forkRight = forkLeft.clone()
  forkLeft.position.set(1.62, 1.52, 0.16)
  forkRight.position.set(1.62, 1.52, -0.16)
  forkLeft.rotation.z = -0.12
  forkRight.rotation.z = -0.12
  group.add(forkLeft)
  group.add(forkRight)

  const handlebar = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.08, 0.08), frame)
  handlebar.position.set(1.84, 2.1, 0)
  handlebar.rotation.z = 0.2
  group.add(handlebar)

  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.62, 0.08), accent)
  plate.position.set(1.62, 1.8, 0)
  plate.rotation.z = -0.06
  group.add(plate)

  const headlight = new THREE.PointLight(0xffddab, 0.3, 14)
  headlight.position.set(2.12, 1.94, 0)
  group.add(headlight)

  const lamp = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.22, 0.22),
    new THREE.MeshStandardMaterial({ color: 0xfff0c9, emissive: 0xffc56d, emissiveIntensity: 1.3 })
  )
  lamp.position.copy(headlight.position)
  group.add(lamp)

  return {
    group,
    frontWheel: frontWheel.spin,
    backWheel: backWheel.spin,
    headlight
  }
}

function createWheel(THREE, radius, thickness, tireMaterial, rimMaterial) {
  const group = new THREE.Group()
  const tire = new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 18, 36), tireMaterial)
  const rim = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.7, 0.04, 12, 24), rimMaterial)
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.16, radius * 0.16, 0.28, 16), rimMaterial)
  hub.rotation.x = Math.PI / 2
  const spokeA = new THREE.Mesh(new THREE.BoxGeometry(radius * 1.5, 0.06, 0.04), rimMaterial)
  const spokeB = new THREE.Mesh(new THREE.BoxGeometry(0.06, radius * 1.5, 0.04), rimMaterial)
  group.add(tire)
  group.add(rim)
  group.add(hub)
  group.add(spokeA)
  group.add(spokeB)
  return { group, spin: group }
}

function createSnowboardRig(THREE) {
  const group = new THREE.Group()
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.08, 0.34),
    new THREE.MeshStandardMaterial({ color: 0x16304a, roughness: 0.44 })
  )
  board.position.y = 0.08
  board.rotation.z = -0.06
  group.add(board)

  const nose = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.17, 0.12, 18),
    new THREE.MeshStandardMaterial({ color: 0xff8f4d, roughness: 0.4 })
  )
  nose.rotation.z = Math.PI / 2
  nose.position.set(0.94, 0.09, 0)
  group.add(nose)

  const tail = nose.clone()
  tail.position.x = -0.94
  group.add(tail)

  return { group }
}

function createDumbbell(THREE) {
  const group = new THREE.Group()
  const metal = new THREE.MeshStandardMaterial({ color: 0xc8d2dc, roughness: 0.26 })
  const weight = new THREE.MeshStandardMaterial({ color: 0x13181f, roughness: 0.78 })

  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.42, 12), metal)
  handle.rotation.z = Math.PI / 2
  group.add(handle)

  ;[-0.18, 0.18].forEach((x) => {
    const plateOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16), weight)
    const plateInner = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16), weight)
    plateOuter.rotation.z = Math.PI / 2
    plateInner.rotation.z = Math.PI / 2
    plateOuter.position.x = x
    plateInner.position.x = x * 0.62
    group.add(plateOuter)
    group.add(plateInner)
  })

  return { group }
}

function createDeskRig(THREE) {
  const group = new THREE.Group()

  const top = new THREE.Mesh(
    new THREE.BoxGeometry(3.3, 0.14, 1.18),
    new THREE.MeshStandardMaterial({ color: 0xb18a61, roughness: 0.72 })
  )
  top.position.set(0.86, 1.92, 0)
  group.add(top)

  ;[-0.66, 2.38].forEach((x) => {
    ;[-0.44, 0.44].forEach((z) => {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 1.72, 0.12),
        new THREE.MeshStandardMaterial({ color: 0xdde5ed, roughness: 0.4 })
      )
      leg.position.set(x, 1.06, z)
      group.add(leg)
    })
  })

  const monitorFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.95, 1.18, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x0d1218, roughness: 0.48 })
  )
  monitorFrame.position.set(1.1, 2.66, -0.08)
  group.add(monitorFrame)

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 0.9),
    new THREE.MeshStandardMaterial({
      color: 0x1f816d,
      emissive: 0x5dffe2,
      emissiveIntensity: 1.12,
      roughness: 0.16
    })
  )
  screen.position.set(1.1, 2.66, -0.03)
  group.add(screen)

  const stand = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.72, 0.12),
    new THREE.MeshStandardMaterial({ color: 0xcad5de, roughness: 0.34 })
  )
  stand.position.set(1.1, 2.05, -0.08)
  group.add(stand)

  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 0.05, 0.38),
    new THREE.MeshStandardMaterial({ color: 0x161d26, roughness: 0.48 })
  )
  keyboard.position.set(0.72, 1.99, 0.24)
  group.add(keyboard)

  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.04, 0.3),
    new THREE.MeshStandardMaterial({ color: 0xdde5ed, roughness: 0.36 })
  )
  mouse.position.set(1.42, 1.99, 0.24)
  group.add(mouse)

  const tower = new THREE.Mesh(
    new THREE.BoxGeometry(0.66, 1.42, 0.92),
    new THREE.MeshStandardMaterial({ color: 0x17212b, roughness: 0.58 })
  )
  tower.position.set(-1.08, 0.75, -0.16)
  group.add(tower)

  const lampLight = new THREE.PointLight(0xffd08a, 0.9, 18)
  lampLight.position.set(1.76, 4.3, 1.3)
  group.add(lampLight)

  const lamp = new THREE.Mesh(
    new THREE.ConeGeometry(0.34, 0.56, 18),
    new THREE.MeshStandardMaterial({ color: 0xf0c465, roughness: 0.48 })
  )
  lamp.position.copy(lampLight.position)
  lamp.rotation.z = Math.PI
  group.add(lamp)

  const codeBars = []
  for (let index = 0; index < 6; index += 1) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.06, 0.01),
      new THREE.MeshBasicMaterial({ color: 0xeafff9 })
    )
    bar.position.set(0.48 + index * 0.22, 2.78 - (index % 3) * 0.18, -0.025)
    codeBars.push(bar)
    group.add(bar)
  }

  return { group, screen, codeBars }
}

function createBedRig(THREE) {
  const group = new THREE.Group()

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.42, 1.92),
    new THREE.MeshStandardMaterial({ color: 0x5a4331, roughness: 0.76 })
  )
  base.position.set(0, 0.42, 0)
  group.add(base)

  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(3.56, 0.36, 1.72),
    new THREE.MeshStandardMaterial({ color: 0xf2ede4, roughness: 0.84 })
  )
  mattress.position.set(0, 0.8, 0)
  group.add(mattress)

  const blanket = new THREE.Mesh(
    new THREE.BoxGeometry(2.58, 0.2, 1.58),
    new THREE.MeshStandardMaterial({ color: 0x274761, roughness: 0.92 })
  )
  blanket.position.set(0.42, 1.02, 0)
  group.add(blanket)

  const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.18, 0.58),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 })
  )
  pillow.position.set(-1.26, 1.02, 0.24)
  group.add(pillow)

  const nightstand = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.84, 0.68),
    new THREE.MeshStandardMaterial({ color: 0x5a4331, roughness: 0.7 })
  )
  nightstand.position.set(2.04, 0.42, -0.32)
  group.add(nightstand)

  const lampLight = new THREE.PointLight(0xffd7a2, 0.16, 10)
  lampLight.position.set(2.04, 1.14, -0.32)
  group.add(lampLight)

  const lamp = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.22, 0.4, 14),
    new THREE.MeshStandardMaterial({ color: 0xf0c465, roughness: 0.46 })
  )
  lamp.position.copy(lampLight.position)
  group.add(lamp)

  const windowFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 2.1, 1.62),
    new THREE.MeshStandardMaterial({ color: 0x203046, roughness: 0.7 })
  )
  windowFrame.position.set(-4.1, 4.04, -3.9)
  group.add(windowFrame)

  const windowGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.34, 1.82),
    new THREE.MeshBasicMaterial({ color: 0x355c87, transparent: true, opacity: 0.32 })
  )
  windowGlow.position.set(-4.02, 4.04, -3.82)
  group.add(windowGlow)

  const sleeper = new THREE.Group()
  const pajamas = new THREE.MeshStandardMaterial({ color: 0x6b88a3, roughness: 0.82 })
  const skin = new THREE.MeshStandardMaterial({ color: 0xf2c39d, roughness: 0.82 })

  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.54, 0.26, 0.7), pajamas)
  torso.position.set(0, 0, 0)
  sleeper.add(torso)

  const legs = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.24, 0.62), pajamas)
  legs.position.set(1.18, -0.02, 0)
  sleeper.add(legs)

  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.16, 0.22), pajamas)
  arm.position.set(0.14, 0.1, 0.36)
  arm.rotation.z = 0.08
  sleeper.add(arm)

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), skin)
  head.position.set(-1.16, 0.14, 0.12)
  sleeper.add(head)

  sleeper.position.set(-0.24, 1.02, 0)
  group.add(sleeper)

  const particles = new THREE.Group()
  for (let index = 0; index < 4; index += 1) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.08 + index * 0.02, 12, 12),
      new THREE.MeshBasicMaterial({
        color: 0xcde7ff,
        transparent: true,
        opacity: 0.5
      })
    )
    particle.position.set(0.55, 2.6 + index * 0.28, 0)
    particles.add(particle)
  }
  group.add(particles)

  return { group, sleeper, particles, windowGlow }
}

function createCloudCluster(THREE, color) {
  const group = new THREE.Group()
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.95,
    transparent: true,
    opacity: 0.9
  })
  for (let index = 0; index < 4; index += 1) {
    const puff = new THREE.Mesh(
      new THREE.SphereGeometry(0.54 + index * 0.08, 12, 12),
      material
    )
    puff.position.set(index * 0.4, Math.sin(index * 0.8) * 0.16, 0)
    group.add(puff)
  }
  return group
}

function poseCommute(rig, elapsed) {
  rig.leftArmPivot.rotation.set(-1.12, 0, 0.82)
  rig.rightArmPivot.rotation.set(-1.12, 0, -0.82)
  rig.leftLegPivot.rotation.set(-0.82 + Math.sin(elapsed * 5.4) * 0.03, 0, 0.11)
  rig.rightLegPivot.rotation.set(-0.76 - Math.sin(elapsed * 5.4) * 0.03, 0, -0.11)
  rig.headPivot.rotation.set(0.08, 0, Math.sin(elapsed * 1.8) * 0.03)
  rig.leftFoot.rotation.z = -0.08
  rig.rightFoot.rotation.z = 0.08
}

function poseMoto(rig, elapsed) {
  rig.leftArmPivot.rotation.set(-1.08, 0, 0.36)
  rig.rightArmPivot.rotation.set(-1.02, 0, -0.36)
  rig.leftLegPivot.rotation.set(-1.08 + Math.sin(elapsed * 8.2) * 0.04, 0, 0.04)
  rig.rightLegPivot.rotation.set(-1.02 - Math.sin(elapsed * 8.2) * 0.04, 0, -0.04)
  rig.headPivot.rotation.set(0.1, 0, 0)
}

function poseSnowboard(rig, elapsed, lean) {
  rig.leftArmPivot.rotation.set(-0.82, 0, 0.54 + lean * 0.36)
  rig.rightArmPivot.rotation.set(-0.46, 0, -0.42 - lean * 0.3)
  rig.leftLegPivot.rotation.set(-1.18, 0, 0.12 + lean * 0.14)
  rig.rightLegPivot.rotation.set(-1.04, 0, -0.12 - lean * 0.14)
  rig.headPivot.rotation.set(0.02, 0, -lean * 0.24)
}

function poseLift(rig, press) {
  const angle = -0.82 - press * 1.36
  rig.leftArmPivot.rotation.set(angle, 0, 0.12)
  rig.rightArmPivot.rotation.set(angle, 0, -0.12)
  rig.leftLegPivot.rotation.set(-0.22 + (1 - press) * 0.18, 0, 0.03)
  rig.rightLegPivot.rotation.set(-0.22 + (1 - press) * 0.18, 0, -0.03)
  rig.headPivot.rotation.set(press * 0.12, 0, 0)
}

function poseTyping(rig, elapsed) {
  rig.leftArmPivot.rotation.set(-1.16 + Math.sin(elapsed * 6.4) * 0.06, 0, 0.24)
  rig.rightArmPivot.rotation.set(-1.14 - Math.sin(elapsed * 6.4) * 0.06, 0, -0.24)
  rig.leftLegPivot.rotation.set(-0.08, 0, 0)
  rig.rightLegPivot.rotation.set(0.08, 0, 0)
  rig.headPivot.rotation.set(-0.06, 0, Math.sin(elapsed * 1.8) * 0.02)
}

function setView(world, eye, target) {
  world.cameraGoal.set(eye[0], eye[1], eye[2])
  world.lookGoal.set(target[0], target[1], target[2])
}

function damp(goal, current, amount) {
  return current + (goal - current) * amount
}

function lerp(start, end, amount) {
  return start + (end - start) * amount
}

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2
}

function smoothstep(min, max, value) {
  if (value <= min) {
    return 0
  }

  if (value >= max) {
    return 1
  }

  const x = (value - min) / (max - min)
  return x * x * (3 - 2 * x)
}
