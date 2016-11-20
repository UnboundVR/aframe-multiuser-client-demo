import io from 'socket.io-client';
import equals from 'deep-equal';

import { buildAvatarEntity } from './avatars';
import { getFirstPersonState, updateEntityState } from './positions';

let zeroVec = {x: 0, y: 0, z: 0};

export default {
  schema: {},
  init() {
    this._scene = document.querySelector('a-scene');
    this._socket = io('http://localhost:1338');
    this._joinMe();

    this._socket.on('join', (user) => this._spawnUser(user));

    this._socket.on('leave', (id) => this._removeUser(id));

    this._socket.on('state', (id, state) => updateEntityState(this._getUserEntity(id), state));
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
    let userEntity = buildAvatarEntity(user);
    userEntity.setAttribute('user-id', user.id);
    updateEntityState(userEntity, user.state);

    this._scene.appendChild(userEntity);
  },
  _removeUser(id) {
    let userEntity = this._getUserEntity(id);
    this._scene.removeChild(userEntity);
  },
  _getUserEntity(id) {
    return document.querySelector(`[user-id='${id}']`);
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
