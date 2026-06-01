import { Converters } from "./../babele/script/converters.js";

const MODULE_ID = "shadowdark-rpg-it";

Hooks.on("init", () => {
  if (typeof Babele === "undefined") {
    return;
  }

  game.babele.register({
    module: MODULE_ID,
    lang: "it",
    dir: "compendium/it-IT",
  });

  game.babele.registerConverters({
    fromPackWithCustomMapping: Converters.fromPack({
      description: "system.description",
      special: "system.damage.special",
    }),
  });
});

/*
 * IMPORT ADVENTURE HOOK
 */
Hooks.on("importAdventure", async (adventure) => {
  ui.notifications.notify(
    "Importazione in corso! Si prega di attendere il completamento dell'importazione di tutte le scene!",
    {
      permanent: true,
    },
  );

  let updates = [];

  for (let scene of adventure.scenes) {
    let sceneId = scene._id;
    let sceneImported = game.scenes.get(sceneId);
    const { thumb } = await sceneImported.createThumbnail();
    updates.push({
      _id: scene.id,
      thumb,
    });
  }
  Scene.updateDocuments(updates);
});
