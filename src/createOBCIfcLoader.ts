import * as OBC from "@thatopen/components";
import * as WEBIFC from "web-ifc";

const createOBCIfcLoader = async ({
  obcInstance,
}: {
  obcInstance: OBC.Components;
}) => {
  const obcFragmentsManager = obcInstance.get(OBC.FragmentsManager);
  const obcIfcLoader = obcInstance.get(OBC.IfcLoader);

  obcIfcLoader.settings.excludedCategories.add(WEBIFC.IFCTENDONANCHOR);
  obcIfcLoader.settings.excludedCategories.add(WEBIFC.IFCREINFORCINGBAR);
  obcIfcLoader.settings.excludedCategories.add(WEBIFC.IFCREINFORCINGELEMENT);

  await obcIfcLoader.setup();

  return {
    load: async (data: Uint8Array) => {
      return obcIfcLoader.load(data);
    },
    onLoaded: obcFragmentsManager.onFragmentsLoaded
  };
};

export { createOBCIfcLoader };
