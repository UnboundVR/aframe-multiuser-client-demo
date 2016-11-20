export function buildAvatarEntity(user) {
  let entity = document.createElement('a-entity');

  let textEntity = document.createElement('a-entity');
  textEntity.setAttribute('text', `text: ${user.id}`);
  textEntity.setAttribute('material', 'color: #880000');
  textEntity.setAttribute('position', '-3 1 1');

  let boxEntity = document.createElement('a-box');
  boxEntity.setAttribute('material', 'color: #880000');
  // boxEntity.setAttribute('color', '#880000');

  entity.appendChild(textEntity);
  entity.appendChild(boxEntity);

  return entity;
}
