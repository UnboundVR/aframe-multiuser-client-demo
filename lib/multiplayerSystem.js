import io from 'socket.io-client';

export default {
  schema: {
    spawnPoint: { type: 'vec3' }
  },
  _buildUserEntity(user) {
    let entity = document.createElement('a-entity');

    entity.setAttribute('position', this.data.spawnPoint);
    entity.setAttribute('user-id', user.id);

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
  },
  _spawnUser(user) {
    let entity = this._buildUserEntity(user);
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
