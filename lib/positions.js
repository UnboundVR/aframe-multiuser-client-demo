export function getEntityState(entity) {
  let position = entity.getAttribute('position');
  let rotation = entity.getAttribute('rotation');

  return {position, rotation};
}

export function updateEntityState(entity, state) {
  let pos = state.position;
  if(pos) {
    entity.setAttribute('position', pos);
  }

  let rot = state.rotation;
  if(rot) {
    entity.setAttribute('rotation', rot);
  }
}
