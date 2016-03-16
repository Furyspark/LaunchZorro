contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
return

Label_up_down:
HKPre()
ActionKey_up_Down("Key_up")
HKPost("Key_up")
return
Label_up_up:
HKUpPre()
ActionKey_up_Up("Key_up")
HKUpPost("Key_up")
return

Label_down_down:
HKPre()
ActionKey_down_Down("Key_down")
HKPost("Key_down")
return
Label_down_up:
HKUpPre()
ActionKey_down_Up("Key_down")
HKUpPost("Key_down")
return

Label_left_down:
HKPre()
ActionKey_left_Down("Key_left")
HKPost("Key_left")
return
Label_left_up:
HKUpPre()
ActionKey_left_Up("Key_left")
HKUpPost("Key_left")
return

Label_right_down:
HKPre()
ActionKey_right_Down("Key_right")
HKPost("Key_right")
return
Label_right_up:
HKUpPre()
ActionKey_right_Up("Key_right")
HKUpPost("Key_right")
return

Label_d_down:
HKPre()
ActionKey_lctrl_Down("Key_d")
HKPost("Key_d")
return
Label_d_up:
HKUpPre()
ActionKey_lctrl_Up("Key_d")
HKUpPost("Key_d")
return

Label_f_down:
HKPre()
ActionKey_lalt_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_lalt_Up("Key_f")
HKUpPost("Key_f")
return

Label_a_down:
HKPre()
While GetKeyState("Key_a", "P") {
ActionKey_lalt_Down("Key_a")
Sleep, 10
ActionKey_lalt_Up("Key_a")
ActionKey_lalt_Up("Key_a")
Sleep, 30
}
HKPost("Key_a")
return
Label_a_up:
HKUpPre()
ActionKey_lalt_Up("Key_a")
HKUpPost("Key_a")
return

Label_4_down:
HKPre()
ActionKey_pgup_Down("Key_4")
HKPost("Key_4")
return
Label_4_up:
HKUpPre()
ActionKey_pgup_Up("Key_4")
HKUpPost("Key_4")
return

Label_r_down:
HKPre()
ActionKey_pgdn_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_pgdn_Up("Key_r")
HKUpPost("Key_r")
return

