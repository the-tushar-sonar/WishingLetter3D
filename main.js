window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = async () => {
    const scene = new BABYLON.Scene(engine);

    // Lighting
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.9;

    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 20, height: 20 },
      scene
    );

    // Enable collisions for ground
    ground.checkCollisions = true;

    // Enable gravity + collisions globally
    scene.gravity = new BABYLON.Vector3(0, -0.2, 0);
    scene.collisionsEnabled = true;

    // Camera
    const camera = new BABYLON.UniversalCamera(
      "camera",
      new BABYLON.Vector3(0, 1.8, -5),
      scene
    );
    camera.attachControl(canvas, true);
    camera.speed = 0.5;

    // First-person keyboard controls
    camera.keysUp.push(87); // W
    camera.keysDown.push(83); // S
    camera.keysLeft.push(65); // A
    camera.keysRight.push(68); // D

    // Enable camera collisions
    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 1.8, 1); // user "capsule"

    // Load house model
    await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "./objects/",
      "house.glb",
      scene
    );

    return scene;
  };

  createScene().then((scene) => {
    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });
  });
});
