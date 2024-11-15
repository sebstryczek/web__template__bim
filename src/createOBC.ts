import * as OBC from "@thatopen/components";
import * as OBCF from "@thatopen/components-front";

import Stats from "three/addons/libs/stats.module.js";

const createOBC = async ({ appElement }: { appElement: HTMLElement }) => {
  const components = new OBC.Components();

  const worlds = components.get(OBC.Worlds);
  const world = worlds.create<
    OBC.SimpleScene,
    OBC.SimpleCamera,
    OBC.SimpleRenderer
  >();

  world.scene = new OBC.SimpleScene(components);
  // world.renderer = new OBC.SimpleRenderer(components, appElement);
  world.renderer = new OBCF.PostproductionRenderer(components, appElement);
  world.camera = new OBC.SimpleCamera(components);

  components.init();

  world.scene.setup();
  world.scene.three.background = null;

  world.renderer.three.domElement.id = "app-canvas";

  world.camera.controls.infinityDolly = false;
  world.camera.controls.distance = 3;
  world.camera.controls.minDistance = 2;
  world.camera.controls.maxDistance = 200;
  world.camera.controls.dollySpeed = 1;
  world.camera.controls.truckSpeed = 1;
  world.camera.controls.polarRotateSpeed = 1;
  world.camera.controls.azimuthRotateSpeed = 1;
  world.camera.controls.smoothTime = 0;
  world.camera.controls.draggingSmoothTime = 0;

  const stats = new Stats();
  stats.showPanel(0);
  document.body.append(stats.dom);
  stats.dom.style.left = "0px";
  stats.dom.style.zIndex = "unset";
  world.renderer.onBeforeUpdate.add(() => stats.begin());
  world.renderer.onAfterUpdate.add(() => stats.end());

  const obcGrids = components.get(OBC.Grids);
  const grid = obcGrids.create(world);

  return {
    obcInstance: components,
    world,
    scene: world.scene.three,
  };
};

export { createOBC };
