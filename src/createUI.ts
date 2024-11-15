import * as BUI from "@thatopen/ui";
import { Actions, State } from "./types";

BUI.Manager.init();

const createUI = ({ state, actions }: { state: State; actions: Actions }) => {
  const [panel, updatePanel] = BUI.Component.create<
    BUI.PanelSection,
    { ifcFilesIds: Array<string> }
  >(
    ({ ifcFilesIds }) => {
      return BUI.html`
        <bim-panel class="navigation-panel">
          <bim-panel-section fixed label="IFC">
            ${ifcFilesIds.map((id) => BUI.html`
              <bim-panel style="border: 1px solid silver">
                <bim-panel-section collapsed label="${id}">
                  <bim-button label="Hide" @click="${() => console.log("hide:", id)}}"></bim-button>
                </bim-panel-section>
              </bim-panel>
            `)}

            <bim-button label="Load IFC" @click="${actions.loadIfc}"></bim-button>
          </bim-panel-section>
        </bim-panel>
    `;
    },
    { ifcFilesIds: [] }
  );

  document.body.append(panel);

  return {
    update: () => {
      updatePanel({ ifcFilesIds: state.ifcFilesIds });
    },
  };
};

export { createUI };
