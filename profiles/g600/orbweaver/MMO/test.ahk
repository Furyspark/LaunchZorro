contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
return

Label_vkbf_down:
HKPre()
ActionKey_a_Down("Key_vkbf")
HKPost("Key_vkbf")
return
Label_vkbf_up:
HKUpPre()
ActionKey_a_Up("Key_vkbf")
HKUpPost("Key_vkbf")
return

Label_vkbe_down:
HKPre()
ActionKey_s_Down("Key_vkbe")
HKPost("Key_vkbe")
return
Label_vkbe_up:
HKUpPre()
ActionKey_s_Up("Key_vkbe")
HKUpPost("Key_vkbe")
return

