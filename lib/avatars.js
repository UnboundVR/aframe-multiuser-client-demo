export function buildAvatarEntity(user) {
  let userMarkup = `<a-entity>
    <a-box color="#880000"></a-box>
    <a-entity text="text: ${user.id}" material="color: #880000" position="-3 1 1"></a-entity>
  </a-entity>`;

  return buildEntityFromString(userMarkup);
}

function buildEntityFromString(markupString) {
  let entity = document.createElement('a-entity');
  entity.insertAdjacentHTML('afterbegin', markupString);
  return entity.firstChild;
}
