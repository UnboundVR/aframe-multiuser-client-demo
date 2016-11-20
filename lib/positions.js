export function getFirstPersonState() {
  let camera = document.querySelector('a-scene').systems['camera'].activeCameraEl;

  let position = camera.getAttribute('position');
  let rotation = camera.getAttribute('rotation');

  return {position, rotation};
}

export function updatePlayerState(id, state) {
  let user = document.querySelector(`[user-id='${id}']`).object3D;

  let pos = state.position;
  if(pos) {
    user.position.set(pos.x, pos.y, pos.z);
  }

  let rot = state.rotation;
  if(rot) {
    user.rotation.set(rot.x, rot.y, rot.z);
  }
}
