import io from 'socket.io-client';

export default {
  schema: {
    spawnPoint: { type: 'vec3' }
  },
  _buildUserEntity(user) {
    let entity = document.createElement('a-entity');

    entity.setAttribute('position', this.data.spawnPoint);
    entity.setAttribute('text', `text: ${user.id}`);
    entity.setAttribute('material', 'color: #880000');
    entity.setAttribute('user-id', user.id);

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
