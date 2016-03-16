contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 2
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

Label_escape_down:
HKPre()
ActionKey_escape_Down("Key_escape")
HKPost("Key_escape")
return
Label_escape_up:
HKUpPre()
ActionKey_escape_Up("Key_escape")
HKUpPost("Key_escape")
return

Label_scrolllock_down:
HKPre()
ActionKey_scrolllock_Down("Key_scrolllock")
HKPost("Key_scrolllock")
return
Label_scrolllock_up:
HKUpPre()
ActionKey_scrolllock_Up("Key_scrolllock")
HKUpPost("Key_scrolllock")
return

Label_v_down:
HKPre()
ActionKey_q_Down("Key_v")
HKPost("Key_v")
return
Label_v_up:
HKUpPre()
ActionKey_q_Up("Key_v")
HKUpPost("Key_v")
return

Label_x_down:
HKPre()
ActionKey_w_Down("Key_x")
HKPost("Key_x")
return
Label_x_up:
HKUpPre()
ActionKey_w_Up("Key_x")
HKUpPost("Key_x")
return

Label_w_down:
HKPre()
ActionKey_a_Down("Key_w")
HKPost("Key_w")
return
Label_w_up:
HKUpPre()
ActionKey_a_Up("Key_w")
HKUpPost("Key_w")
return

Label_r_down:
HKPre()
ActionKey_s_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_s_Up("Key_r")
HKUpPost("Key_r")
return

Label_f_down:
HKPre()
ActionKey_x_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_x_Up("Key_f")
HKUpPost("Key_f")
return

Label_d_down:
HKPre()
ActionKey_z_Down("Key_d")
HKPost("Key_d")
return
Label_d_up:
HKUpPre()
ActionKey_z_Up("Key_d")
HKUpPost("Key_d")
return

Label_s_down:
HKPre()
ActionKey_v_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_v_Up("Key_s")
HKUpPost("Key_s")
return

Label_a_down:
HKPre()
ActionKey_c_Down("Key_a")
HKPost("Key_a")
return
Label_a_up:
HKUpPre()
ActionKey_c_Up("Key_a")
HKUpPost("Key_a")
return

Label_8_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_8_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_i_down:
HKPre()
ActionKey_space_Down("Key_i")
HKPost("Key_i")
return
Label_i_up:
HKUpPre()
ActionKey_space_Up("Key_i")
HKUpPost("Key_i")
return

LabelMap2_f_down:
HKPre()
While GetKeyState("Key_f", "P") {
ActionKey_x_Down("Key_f")
Sleep, 10
ActionKey_x_Up("Key_f")
Sleep, 30
}
HKPost("Key_f")
return
LabelMap2_f_up:
HKUpPre()
ActionKey_x_Up("Key_f")
HKUpPost("Key_f")
return

LabelMap2_d_down:
HKPre()
While GetKeyState("Key_d", "P") {
ActionKey_z_Down("Key_d")
Sleep, 10
ActionKey_z_Up("Key_d")
Sleep, 30
}
HKPost("Key_d")
return
LabelMap2_d_up:
HKUpPre()
ActionKey_z_Up("Key_d")
HKUpPost("Key_d")
return

LabelMap2_s_down:
HKPre()
While GetKeyState("Key_s", "P") {
ActionKey_v_Down("Key_s")
Sleep, 10
ActionKey_v_Up("Key_s")
Sleep, 30
}
HKPost("Key_s")
return
LabelMap2_s_up:
HKUpPre()
ActionKey_v_Up("Key_s")
HKUpPost("Key_s")
return

LabelMap2_a_down:
HKPre()
While GetKeyState("Key_a", "P") {
ActionKey_c_Down("Key_a")
Sleep, 10
ActionKey_c_Up("Key_a")
Sleep, 30
}
HKPost("Key_a")
return
LabelMap2_a_up:
HKUpPre()
ActionKey_c_Up("Key_a")
HKUpPost("Key_a")
return

