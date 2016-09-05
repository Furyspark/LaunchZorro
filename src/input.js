function Input() {
  console.log("This is a static class.");
}

Input.indexToString = function(index, e0) {
  switch(index) {
    case 1: return "escape"; break;
    case 2: return "1"; break;
    case 3: return "2"; break;
    case 4: return "3"; break;
    case 5: return "4"; break;
    case 6: return "5"; break;
    case 7: return "6"; break;
    case 8: return "7"; break;
    case 9: return "8"; break;
    case 10: return "9"; break;
    case 11: return "0"; break;
    case 12: return "vkbd"; break;
    case 13: return "vkbb"; break;
    case 14: return "backspace"; break;
    case 15: return "tab"; break;
    case 16: return "q"; break;
    case 17: return "w"; break;
    case 18: return "e"; break;
    case 19: return "r"; break;
    case 20: return "t"; break;
    case 21: return "y"; break;
    case 22: return "u"; break;
    case 23: return "i"; break;
    case 24: return "o"; break;
    case 25: return "p"; break;
    case 26: return "vkdb"; break;
    case 27: return "vkdd"; break;
    case 28: if(e0) return "numpadenter"; return "enter"; break;
    case 29: return "lctrl"; break;
    case 30: return "a"; break;
    case 31: return "s"; break;
    case 32: return "d"; break;
    case 33: return "f"; break;
    case 34: return "g"; break;
    case 35: return "h"; break;
    case 36: return "j"; break;
    case 37: return "k"; break;
    case 38: return "l"; break;
    case 39: return "vkba"; break;
    case 40: return "vkde"; break;
    case 41: return "sc029"; break;
    case 42: return "lshift"; break;
    case 43: return "vkdc"; break;
    case 44: return "z"; break;
    case 45: return "x"; break;
    case 46: return "c"; break;
    case 47: return "v"; break;
    case 48: return "b"; break;
    case 49: return "n"; break;
    case 50: return "m"; break;
    case 51: return "vkbc"; break;
    case 52: return "vkbe"; break;
    case 53: if(e0) return "vkbf"; return "numpaddiv"; break;
    case 55: if(e0) return ""; return "numpadmult"; break;
    case 56: return "lalt"; break;
    case 57: return "space"; break;
    case 58: return "capslock"; break;
    case 59: return "f1"; break;
    case 60: return "f2"; break;
    case 61: return "f3"; break;
    case 62: return "f4"; break;
    case 63: return "f5"; break;
    case 64: return "f6"; break;
    case 65: return "f7"; break;
    case 66: return "f8"; break;
    case 67: return "f9"; break;
    case 68: return "f10"; break;
    case 69: return "pause"; break;
    case 70: return "scrolllock"; break;
    case 71: if(e0) return "home"; return "numpad7"; break;
    case 72: if(e0) return "up"; return "numpad8"; break;
    case 73: if(e0) return "pgup"; return "numpad9"; break;
    case 74: if(e0) return ""; return "numpadsub"; break;
    case 75: if(e0) return "left"; return "numpad4"; break;
    case 76: if(e0) return ""; return "numpad5"; break;
    case 77: if(e0) return "right"; return "numpad6"; break;
    case 78: if(e0) return ""; return "numpadplus"; break;
    case 79: if(e0) return "end"; return "numpad1"; break;
    case 80: if(e0) return "down"; return "numpad2"; break;
    case 81: if(e0) return "pgdn"; return "numpad3"; break;
    case 82: if(e0) return "insert"; return "numpad0"; break;
    case 83: if(e0) return "delete"; return ""; break;
    case 87: return "f11"; break;
    case 88: return "f12"; break;
  }
}

Input.mouseIndexToString = function(index) {
  switch(index) {
    case 1:
    case 2:
      return "mousebuttonleft";
      break;
    case 4:
    case 8:
      return "mousebuttonright";
      break;
    case 16:
    case 32:
      return "mousebuttonmiddle";
      break;
    case 64:
    case 128:
      return "mousebutton4";
      break;
    case 256:
    case 512:
      return "mousebutton5";
      break;
  }
}
