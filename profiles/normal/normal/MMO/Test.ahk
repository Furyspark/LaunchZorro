contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
return

Label_d_down:
HKPre()
ActionKey_space_Down("Key_d")
HKPost("Key_d")
return
Label_d_up:
HKUpPre()
ActionKey_space_Up("Key_d")
HKUpPost("Key_d")
return

