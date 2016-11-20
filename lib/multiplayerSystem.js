import io from 'socket.io-client';
import { buildAvatarEntity } from './avatars';

export default {
  schema: {
    spawnPoint: { type: 'vec3' }
  },
  _spawnUser(user) {
    let entity = buildAvatarEntity(user);
    entity.setAttribute('position', this.data.spawnPoint);
    
    this._scene.appendChild(entity);
  },
  _removeUser(id) {
    let user = document.querySelector(`[user-id='${id}']`);
    this._scene.removeChild(user);
  },
  init() {
    this._scene = document.querySelector('a-scene');

    let socket = io('http://localhost:1338');

    let userData = {guest: true};

    socket.emit('join', userData, (onlineUsers) => {
      for(let user of onlineUsers) {
        this._spawnUser(user);
      }
    });

    socket.on('join', (user) => this._spawnUser(user));

    socket.on('leave', (id) => this._removeUser(id));
  }
};
