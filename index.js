require('aframe');
require('aframe-text-component');
import multiplayerSystem from './lib/multiplayerSystem';

AFRAME.registerSystem('multiplayer', multiplayerSystem);

// https://github.com/scenevr/interpolation-component
// https://github.com/ngokevin/aframe-firebase-component
