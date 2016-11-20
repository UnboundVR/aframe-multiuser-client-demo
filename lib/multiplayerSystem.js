import io from 'socket.io-client';
import equals from 'deep-equal';

import { buildAvatarEntity } from './avatars';
import { getFirstPersonState, updatePlayerState } from './positions';

let zeroVec = {x: 0, y: 0, z: 0};

export default {
  schema: {},
  init() {
    this._scene = document.querySelector('a-scene');
    this._socket = io('http://localhost:1338');

    this._joinMe();

    this._socket.on('join', (user) => this._spawnUser(user));

    this._socket.on('leave', (id) => this._removeUser(id));

    this._socket.on('state', updatePlayerState);
  },
  tick() {
    this._updateState();

    if(this._stateChanged()) {
      this._sendState();
    }
  },

  // Spawn and remove users
  _joinMe() {
    let userData = {guest: true, state: {position: zeroVec, rotation: zeroVec}};
    this._socket.emit('join', userData, (users) => this._spawnInitialUsers(users));
  },
  _spawnInitialUsers(users) {
    for(let user of users) {
      this._spawnUser(user);
    }
  },
  _spawnUser(user) {
    let entity = buildAvatarEntity(user);
    entity.setAttribute('position', user.state ? user.state.position : zeroVec);
    entity.setAttribute('rotation', user.state ? user.state.rotation : zeroVec);
    entity.setAttribute('user-id', user.id);

    this._scene.appendChild(entity);
  },
  _removeUser(id) {
    let user = document.querySelector(`[user-id='${id}']`);
    this._scene.removeChild(user);
  },

  // Position & rotation synchronization
  _updateState() {
    this._lastState = this._currentState;
    this._currentState = getFirstPersonState();
  },
  _stateChanged() {
    return !equals(this._lastState, this._currentState);
  },
  _sendState() {
    this._socket.emit('state', this._currentState);
  }
};
