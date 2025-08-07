
Hooks.once("init", () => {
  game.settings.register("character-achievements", "achievements", {
    name: "Achievements Config",
    scope: "world",
    config: true,
    type: String,
    default: "[]",
    onChange: value => console.log("Achievements updated!", value),
    filePicker: false,
    hint: "Configure os achievements como JSON. Ex: [{\"id\":\"firstKill\",\"label\":\"Primeiro Abate\",\"icon\":\"icons/firstkill.png\"}]"
  });
});
