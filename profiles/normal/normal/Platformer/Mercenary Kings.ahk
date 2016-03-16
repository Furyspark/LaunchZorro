contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 2
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

Label_2_down:
HKPre()
ActionKey_lctrl_Down("Key_2")
HKPost("Key_2")
return
Label_2_up:
HKUpPre()
ActionKey_lctrl_Up("Key_2")
HKUpPost("Key_2")
return

Label_3_down:
HKPre()
ActionKey_lalt_Down("Key_3")
HKPost("Key_3")
return
Label_3_up:
HKUpPre()
ActionKey_lalt_Up("Key_3")
HKUpPost("Key_3")
return

Label_4_down:
HKPre()
ActionKey_lshift_Down("Key_4")
HKPost("Key_4")
return
Label_4_up:
HKUpPre()
ActionKey_lshift_Up("Key_4")
HKUpPost("Key_4")
return

Label_j_down:
HKPre()
ActionKey_z_Down("Key_j")
HKPost("Key_j")
return
Label_j_up:
HKUpPre()
ActionKey_z_Up("Key_j")
HKUpPost("Key_j")
return

Label_k_down:
HKPre()
ActionKey_x_Down("Key_k")
HKPost("Key_k")
return
Label_k_up:
HKUpPre()
ActionKey_x_Up("Key_k")
HKUpPost("Key_k")
return

Label_l_down:
HKPre()
ActionKey_c_Down("Key_l")
HKPost("Key_l")
return
Label_l_up:
HKUpPre()
ActionKey_c_Up("Key_l")
HKUpPost("Key_l")
return

Label_vkba_down:
HKPre()
ActionKey_v_Down("Key_vkba")
HKPost("Key_vkba")
return
Label_vkba_up:
HKUpPre()
ActionKey_v_Up("Key_vkba")
HKUpPost("Key_vkba")
return

Label_space_down:
HKPre()
ActionKey_a_Down("Key_space")
HKPost("Key_space")
return
Label_space_up:
HKUpPre()
ActionKey_a_Up("Key_space")
HKUpPost("Key_space")
return

Label_z_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_z_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
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

Label_o_down:
HKPre()
ActionKey_i_Down("Key_o")
HKPost("Key_o")
return
Label_o_up:
HKUpPre()
ActionKey_i_Up("Key_o")
HKUpPost("Key_o")
return

LabelMap2_e_down:
HKPre()
ActionKey_numpad8_Down("Key_e")
HKPost("Key_e")
return
LabelMap2_e_up:
HKUpPre()
ActionKey_numpad8_Up("Key_e")
HKUpPost("Key_e")
return

LabelMap2_d_down:
HKPre()
ActionKey_numpad5_Down("Key_d")
HKPost("Key_d")
return
LabelMap2_d_up:
HKUpPre()
ActionKey_numpad5_Up("Key_d")
HKUpPost("Key_d")
return

LabelMap2_s_down:
HKPre()
ActionKey_numpad4_Down("Key_s")
HKPost("Key_s")
return
LabelMap2_s_up:
HKUpPre()
ActionKey_numpad4_Up("Key_s")
HKUpPost("Key_s")
return

LabelMap2_f_down:
HKPre()
ActionKey_numpad6_Down("Key_f")
HKPost("Key_f")
return
LabelMap2_f_up:
HKUpPre()
ActionKey_numpad6_Up("Key_f")
HKUpPost("Key_f")
return

