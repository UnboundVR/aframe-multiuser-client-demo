require('aframe');
require('aframe-text-component');

let io = require('socket.io-client');

// https://github.com/scenevr/interpolation-component
// https://github.com/ngokevin/aframe-firebase-component

AFRAME.registerSystem('multiplayer', {
  schema: {
    spawnPoint: { type: 'vec3' }
  },
  init() {
    this._scene = document.querySelector('a-scene');

    let socket = io('http://localhost:1338');
    socket.on('join', (id) => {
      let entity = document.createElement('a-entity');
      entity.setAttribute('position', this.data.spawnPoint);
      entity.setAttribute('text', `text: ${id}`);
      entity.setAttribute('material', 'color: #880000');
      entity.setAttribute('id', id);

      this._scene.appendChild(entity);
    });

    socket.on('leave', (id) => {
      let user = document.querySelector(`#${id}`);
      this._scene.removeChild(user);
    });
  }
});
