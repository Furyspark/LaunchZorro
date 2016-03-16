contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
return

Label_e_down:
HKPre()
ActionKey_up_Down("Key_e")
HKPost("Key_e")
return
Label_e_up:
HKUpPre()
ActionKey_up_Up("Key_e")
HKUpPost("Key_e")
return

Label_d_down:
HKPre()
ActionKey_down_Down("Key_d")
HKPost("Key_d")
return
Label_d_up:
HKUpPre()
ActionKey_down_Up("Key_d")
HKUpPost("Key_d")
return

Label_s_down:
HKPre()
ActionKey_left_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_left_Up("Key_s")
HKUpPost("Key_s")
return

Label_f_down:
HKPre()
ActionKey_right_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_right_Up("Key_f")
HKUpPost("Key_f")
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

Label_f13_down:
HKPre()
ActionKey_f13_Down("Key_f13")
HKPost("Key_f13")
return
Label_f13_up:
HKUpPre()
ActionKey_f13_Up("Key_f13")
HKUpPost("Key_f13")
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

Label_j_down:
HKPre()
ActionKey_enter_Down("Key_j")
HKPost("Key_j")
return
Label_j_up:
HKUpPre()
ActionKey_enter_Up("Key_j")
HKUpPost("Key_j")
return

Label_k_down:
HKPre()
ActionKey_escape_Down("Key_k")
HKPost("Key_k")
return
Label_k_up:
HKUpPre()
ActionKey_escape_Up("Key_k")
HKUpPost("Key_k")
return

Label_l_down:
HKPre()
ActionKey_lshift_Down("Key_l")
HKPost("Key_l")
return
Label_l_up:
HKUpPre()
ActionKey_lshift_Up("Key_l")
HKUpPost("Key_l")
return

Label_vkba_down:
HKPre()
ActionKey_lctrl_Down("Key_vkba")
HKPost("Key_vkba")
return
Label_vkba_up:
HKUpPre()
ActionKey_lctrl_Up("Key_vkba")
HKUpPost("Key_vkba")
return

Label_i_down:
HKPre()
ActionKey_q_Down("Key_i")
HKPost("Key_i")
return
Label_i_up:
HKUpPre()
ActionKey_q_Up("Key_i")
HKUpPost("Key_i")
return

Label_o_down:
HKPre()
ActionKey_w_Down("Key_o")
HKPost("Key_o")
return
Label_o_up:
HKUpPre()
ActionKey_w_Up("Key_o")
HKUpPost("Key_o")
return

Label_m_down:
HKPre()
While GetKeyState("Key_m", "P") {
ActionKey_enter_Down("Key_m")
Sleep, 10
ActionKey_enter_Up("Key_m")
Sleep, 30
}
HKPost("Key_m")
return
Label_m_up:
HKUpPre()
ActionKey_enter_Up("Key_m")
HKUpPost("Key_m")
return

