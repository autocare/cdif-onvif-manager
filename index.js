var util = require('util');
var events = require('events');
var onvif = require('onvif');
var OnvifDevice = require('./lib/onvif-device')

function OnvifManager() {
  this.on('discover',     this.discoverDevices.bind(this));
  this.on('stopdiscover', this.stopDiscoverDevices.bind(this));
}

util.inherits(OnvifManager, events.EventEmitter);

OnvifManager.prototype.discoverDevices = function() {
  //TODO: add only one event listener
  onvif.Discovery.on('device', function(cam) {
    cam.getDeviceInformation(function(err, info) {
      if (!err) {
        device = new OnvifDevice(cam, info);
        this.emit('deviceonline', device, this);
      } else {
        console.warn('cannot get cam info');
      }
    }.bind(this));
  }.bind(this));
  onvif.Discovery.probe();
};

OnvifManager.prototype.stopDiscoverDevices = function() {
};

module.exports = OnvifManager;
