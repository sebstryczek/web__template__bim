import './style.css'

import { Actions, State } from "./types";
import { createUI } from "./createUI";
import { createOBC } from "./createOBC";
import { createOBCIfcLoader } from "./createOBCIfcLoader";
import { getElement } from './utils/browser/getElement';

const container = getElement<HTMLDivElement>("#app");
const obcApp = await createOBC({ appElement: container });
const ifcLoader = await createOBCIfcLoader({ obcInstance: obcApp.obcInstance });

const state: State = {
  ifcFilesIds: [],
};

import * as OBC from "@thatopen/components";
const casters = obcApp.obcInstance.get(OBC.Raycasters);
casters.get(obcApp.world);

const clipper = obcApp.obcInstance.get(OBC.Clipper);
// clipper.enabled = true;

container.ondblclick = () => {
  if (clipper.enabled) {
    const plane = clipper.create(obcApp.world);

    if (plane !== null) {
      plane.size = 100;
    }
  }
};

window.onkeydown = (event) => {
  if (event.code === "Delete" || event.code === "Backspace") {
    if (clipper.enabled) {
      clipper.delete(obcApp.world);
    }
  }
};

import * as OBCF from "@thatopen/components-front";
const dimensions = obcApp.obcInstance.get(OBCF.LengthMeasurement);
dimensions.world = obcApp.world;
dimensions.enabled = true;
dimensions.snapDistance = 1;

container.ondblclick = () => dimensions.create();

window.onkeydown = (event) => {
  if (event.code === "Delete" || event.code === "Backspace") {
    dimensions.delete();
  }
};

const actions: Actions = {
  loadIfc: async () => {
    const file = await fetch("AC-20-Smiley-West-10-Bldg.ifc");
    const data = await file.arrayBuffer();
    const buffer = new Uint8Array(data);
    const model = await ifcLoader.load(buffer);

    obcApp.scene.add(model);
    model.items.forEach((item) => {
      obcApp.world.meshes.add(item.mesh);
    });
  }
};

const ui = createUI({state, actions});

ifcLoader.onLoaded.add((model) => {
  state.ifcFilesIds.push(model.uuid);
  ui.update();
});
