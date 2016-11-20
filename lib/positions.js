export function getFirstPersonState() {
  let camera = document.querySelector('a-scene').systems['camera'].activeCameraEl;

  let position = camera.getAttribute('position');
  let rotation = camera.getAttribute('rotation');

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
