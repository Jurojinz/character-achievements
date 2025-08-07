
Hooks.on("renderActorSheet", (app, html, data) => {
  const actor = app.actor;
  const achievements = JSON.parse(game.settings.get("character-achievements", "achievements"));
  const actorBadges = actor.getFlag("character-achievements", "badges") || [];

  const badgeContainer = $(`<div class="badge-container"></div>`);
  actorBadges.forEach(badgeId => {
    const badge = achievements.find(a => a.id === badgeId);
    if (badge) {
      badgeContainer.append(`<img class="badge-icon" src="\${badge.icon}" title="\${badge.label}" />`);
    }
  });

  html.find(".window-title").append(badgeContainer);
});

Hooks.on("renderChatMessage", (app, html, data) => {
  const speaker = game.actors.get(data.message.speaker.actor);
  if (!speaker) return;

  const achievements = JSON.parse(game.settings.get("character-achievements", "achievements"));
  const actorBadges = speaker.getFlag("character-achievements", "badges") || [];

  const badgeIcons = actorBadges.map(badgeId => {
    const badge = achievements.find(a => a.id === badgeId);
    return badge ? `<img class="badge-chat-icon" src="\${badge.icon}" title="\${badge.label}" />` : '';
  }).join("");

  html.find(".message-sender").prepend(badgeIcons);
});

Hooks.on("ready", () => {
  game.actors.forEach(actor => {
    if (!actor.getFlag("character-achievements", "badges")) {
      actor.setFlag("character-achievements", "badges", []);
    }
  });
});

game.characterAchievements = {
  grantBadge: async (actor, badgeId) => {
    const badges = actor.getFlag("character-achievements", "badges") || [];
    if (!badges.includes(badgeId)) {
      badges.push(badgeId);
      await actor.setFlag("character-achievements", "badges", badges);
      ui.notifications.info(`Badge "\${badgeId}" concedida a \${actor.name}`);
    }
  },
  removeBadge: async (actor, badgeId) => {
    const badges = actor.getFlag("character-achievements", "badges") || [];
    const newBadges = badges.filter(b => b !== badgeId);
    await actor.setFlag("character-achievements", "badges", newBadges);
    ui.notifications.info(`Badge "\${badgeId}" removida de \${actor.name}`);
  }
};
