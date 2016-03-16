contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
return

Label_lalt_down:
HKPre()
ActionKey_a_Down("Key_lalt")
HKPost("Key_lalt")
return
Label_lalt_up:
HKUpPre()
ActionKey_a_Up("Key_lalt")
HKUpPost("Key_lalt")
return

Label_scrolllock_down:
HKPre()
ActionKey_f13_Down("Key_scrolllock")
HKPost("Key_scrolllock")
return
Label_scrolllock_up:
HKUpPre()
ActionKey_f13_Up("Key_scrolllock")
HKUpPost("Key_scrolllock")
return

