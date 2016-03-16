contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 3
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

Label_space_down:
HKPre()
ActionKey_space_Down("Key_space")
HKPost("Key_space")
return
Label_space_up:
HKUpPre()
ActionKey_space_Up("Key_space")
HKUpPost("Key_space")
return

Label_j_down:
HKPre()
ActionKey_x_Down("Key_j")
HKPost("Key_j")
return
Label_j_up:
HKUpPre()
ActionKey_x_Up("Key_j")
HKUpPost("Key_j")
return

Label_k_down:
HKPre()
ActionKey_z_Down("Key_k")
HKPost("Key_k")
return
Label_k_up:
HKUpPre()
ActionKey_z_Up("Key_k")
HKUpPost("Key_k")
return

Label_l_down:
HKPre()
ActionKey_v_Down("Key_l")
HKPost("Key_l")
return
Label_l_up:
HKUpPre()
ActionKey_v_Up("Key_l")
HKUpPost("Key_l")
return

Label_vkba_down:
HKPre()
ActionKey_c_Down("Key_vkba")
HKPost("Key_vkba")
return
Label_vkba_up:
HKUpPre()
ActionKey_c_Up("Key_vkba")
HKUpPost("Key_vkba")
return

Label_i_down:
HKPre()
ActionKey_a_Down("Key_i")
HKPost("Key_i")
return
Label_i_up:
HKUpPre()
ActionKey_a_Up("Key_i")
HKUpPost("Key_i")
return

Label_o_down:
HKPre()
ActionKey_s_Down("Key_o")
HKPost("Key_o")
return
Label_o_up:
HKUpPre()
ActionKey_s_Up("Key_o")
HKUpPost("Key_o")
return

Label_r_down:
HKPre()
ActionKey_q_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_q_Up("Key_r")
HKUpPost("Key_r")
return

Label_w_down:
HKPre()
ActionKey_w_Down("Key_w")
HKPost("Key_w")
return
Label_w_up:
HKUpPre()
ActionKey_w_Up("Key_w")
HKUpPost("Key_w")
return

Label_a_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_a_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_q_down:
MKPre()
SwitchKeymap(3)
MKPost()
return
Label_q_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
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

LabelMap2_j_down:
HKPre()
While GetKeyState("Key_j", "P") {
ActionKey_x_Down("Key_j")
Sleep, 10
ActionKey_x_Up("Key_j")
Sleep, 30
}
HKPost("Key_j")
return
LabelMap2_j_up:
HKUpPre()
ActionKey_x_Up("Key_j")
HKUpPost("Key_j")
return

LabelMap2_k_down:
HKPre()
While GetKeyState("Key_k", "P") {
ActionKey_z_Down("Key_k")
Sleep, 10
ActionKey_z_Up("Key_k")
Sleep, 30
}
HKPost("Key_k")
return
LabelMap2_k_up:
HKUpPre()
ActionKey_z_Up("Key_k")
HKUpPost("Key_k")
return

LabelMap2_l_down:
HKPre()
While GetKeyState("Key_l", "P") {
ActionKey_v_Down("Key_l")
Sleep, 10
ActionKey_v_Up("Key_l")
Sleep, 30
}
HKPost("Key_l")
return
LabelMap2_l_up:
HKUpPre()
ActionKey_v_Up("Key_l")
HKUpPost("Key_l")
return

LabelMap2_vkba_down:
HKPre()
While GetKeyState("Key_vkba", "P") {
ActionKey_c_Down("Key_vkba")
Sleep, 10
ActionKey_c_Up("Key_vkba")
Sleep, 30
}
HKPost("Key_vkba")
return
LabelMap2_vkba_up:
HKUpPre()
ActionKey_c_Up("Key_vkba")
HKUpPost("Key_vkba")
return

LabelMap2_i_down:
HKPre()
While GetKeyState("Key_i", "P") {
ActionKey_a_Down("Key_i")
Sleep, 10
ActionKey_a_Up("Key_i")
Sleep, 30
}
HKPost("Key_i")
return
LabelMap2_i_up:
HKUpPre()
ActionKey_a_Up("Key_i")
HKUpPost("Key_i")
return

LabelMap2_o_down:
HKPre()
While GetKeyState("Key_o", "P") {
ActionKey_s_Down("Key_o")
Sleep, 10
ActionKey_s_Up("Key_o")
Sleep, 30
}
HKPost("Key_o")
return
LabelMap2_o_up:
HKUpPre()
ActionKey_s_Up("Key_o")
HKUpPost("Key_o")
return

LabelMap3_j_down:
HKPre()
ActionKey_f6_Down("Key_j")
HKPost("Key_j")
return
LabelMap3_j_up:
HKUpPre()
ActionKey_f6_Up("Key_j")
HKUpPost("Key_j")
return

LabelMap3_vkba_down:
HKPre()
ActionKey_f7_Down("Key_vkba")
HKPost("Key_vkba")
return
LabelMap3_vkba_up:
HKUpPre()
ActionKey_f7_Up("Key_vkba")
HKUpPost("Key_vkba")
return

LabelMap3_k_down:
HKPre()
ActionKey_f2_Down("Key_k")
HKPost("Key_k")
return
LabelMap3_k_up:
HKUpPre()
ActionKey_f2_Up("Key_k")
HKUpPost("Key_k")
return

LabelMap3_l_down:
HKPre()
ActionKey_f4_Down("Key_l")
HKPost("Key_l")
return
LabelMap3_l_up:
HKUpPre()
ActionKey_f4_Up("Key_l")
HKUpPost("Key_l")
return

