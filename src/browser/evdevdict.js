let EvDevDict = {};

EvDevDict.initialize = function() {
  this._usableKeyCodes = [];
  for(let key in this.codes.key) {
    let keyCode = this.codes.key[key];
    this._usableKeyCodes.push(keyCode);
  }
  // Translate interception keycodes to evdev keycodes
};

EvDevDict.events = {
  syn: 0x00,
  key: 0x01,
  rel: 0x02,
  abs: 0x03
};

EvDevDict.codes = {
  // For EV_SYN
  syn: {
    syn_report: 0
  },
  // For EV_REL
  rel: {
    rel_x: 0x00,
    rel_y: 0x01,
    rel_z: 0x02,
    rel_rx: 0x03,
    rel_ry: 0x04,
    rel_rz: 0x05,
    rel_hwheel: 0x06,
    rel_dial: 0x07,
    rel_wheel: 0x08,
    rel_misc: 0x09,
  },
  // For EV_KEY
  key: {
    // key_reserved: 0,
    key_esc: 1,
    key_1: 2,
    key_2: 3,
    key_3: 4,
    key_4: 5,
    key_5: 6,
    key_6: 7,
    key_7: 8,
    key_8: 9,
    key_9: 10,
    key_0: 11,
    key_minus: 12,
    key_equal: 13,
    key_backspace: 14,
    key_tab: 15,
    key_q: 16,
    key_w: 17,
    key_e: 18,
    key_r: 19,
    key_t: 20,
    key_y: 21,
    key_u: 22,
    key_i: 23,
    key_o: 24,
    key_p: 25,
    key_leftbrace: 26,
    key_rightbrace: 27,
    key_enter: 28,
    key_leftctrl: 29,
    key_rightctrl: 97,
    key_a: 30,
    key_s: 31,
    key_d: 32,
    key_f: 33,
    key_g: 34,
    key_h: 35,
    key_j: 36,
    key_k: 37,
    key_l: 38,
    key_semicolon: 39,
    key_apostrophe: 40,
    key_grave: 41,
    key_leftshift: 42,
    key_rightshift: 54,
    key_backslash: 43,
    key_z: 44,
    key_x: 45,
    key_c: 46,
    key_v: 47,
    key_b: 48,
    key_n: 49,
    key_m: 50,
    key_comma: 51,
    key_dot: 52,
    key_slash: 53,
    key_kpasterisk: 55,
    key_leftalt: 56,
    key_rightalt: 100,
    key_space: 57,
    key_capslock: 58,
    key_f1: 59,
    key_f2: 60,
    key_f3: 61,
    key_f4: 62,
    key_f5: 63,
    key_f6: 64,
    key_f7: 65,
    key_f8: 66,
    key_f9: 67,
    key_f10: 68,
    key_numlock: 69,
    key_scrolllock: 70,
    key_kp7: 71,
    key_kp8: 72,
    key_kp9: 73,
    key_kpminus: 74,
    key_kp4: 75,
    key_kp5: 76,
    key_kp6: 77,
    key_kpplus: 78,
    key_kp1: 79,
    key_kp2: 80,
    key_kp3: 81,
    key_kp0: 82,
    key_kpdot: 83,
    // key_zenkakuhankaku: 85,
    // key_102nd: 86,
    key_f11: 87,
    key_f12: 88,
    // key_ro: 89,
    // key_katakana: 90,
    // key_hiragana: 91,
    // key_henkan: 92,
    // key_katakanahiragana: 93,
    // key_muhenkan: 94,
    // key_kpjpcomma: 95,
    key_kpenter: 96,
    key_kpslash: 98,
    // key_sysrq: 99,
    // key_linefeed: 101,
    key_home: 102,
    key_up: 103,
    key_pageup: 104,
    key_left: 105,
    key_right: 106,
    key_end: 107,
    key_down: 108,
    key_pagedown: 109,
    key_insert: 110,
    key_delete: 111,
    // key_macro: 112,
    // key_mute: 113,
    // key_volumedown: 114,
    // key_volumeup: 115,
    // key_power: 116,
    // key_kpequal: 117,
    // key_kpplusminus: 118,
    key_pause: 119,
    key_kpcomma: 121,
    key_leftmeta: 125,
    key_rightmeta: 126,
    // key_scrollup: 177,
    // key_scrolldown: 178,
    key_kpleftparen: 179,
    key_kprightparen: 180,
    key_f13: 183,
    key_f14: 184,
    key_f15: 185,
    key_f16: 186,
    key_f17: 187,
    key_f18: 188,
    key_f19: 189,
    key_f20: 190,
    key_f21: 191,
    key_f22: 192,
    key_f23: 193,
    key_f24: 194
  },
  btn: {
    btn_left: 0x110,
    btn_right: 0x111,
    btn_middle: 0x112,
    btn_forward: 0x115,
    btn_back: 0x116
  }
};

EvDevDict.values = {
  key: {
    released: 0,
    pressed: 1,
    repeat: 2
  }
};

EvDevDict.isSuitableEvent = function(ev, code, value) {
  // Check keyboard events
  if(ev === this.events.key) {
    // if(value === this.values.key.pressed || value === this.values.key.released) {
    if(this._usableKeyCodes.indexOf(code) !== -1) {
      return true;
    }
    else if(this.isMouseButton(code)) {
      return true;
    }
    // }
  }
  // Check mouse events
  if(ev === this.events.rel) {
    switch(code) {
      case this.codes.rel.rel_x:
      case this.codes.rel.rel_y:
      case this.codes.rel.rel_wheel:
        return true;
        break;
    }
  }
  return false;
};

EvDevDict.isMouseButton = function(code) {
  switch(code) {
    case this.codes.btn.btn_left:
    case this.codes.btn.btn_right:
    case this.codes.btn.btn_middle:
    case this.codes.btn.btn_forward:
    case this.codes.btn.btn_back:
      return true;
      break;
  }
  return false;
};

module.exports = EvDevDict;
