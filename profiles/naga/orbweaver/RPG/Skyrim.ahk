contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 2
return

Label_up_down:
HKPre()
ActionKey_w_Down("Key_up")
HKPost("Key_up")
return
Label_up_up:
HKUpPre()
ActionKey_w_Up("Key_up")
HKUpPost("Key_up")
return

Label_down_down:
HKPre()
ActionKey_s_Down("Key_down")
HKPost("Key_down")
return
Label_down_up:
HKUpPre()
ActionKey_s_Up("Key_down")
HKUpPost("Key_down")
return

Label_left_down:
HKPre()
ActionKey_a_Down("Key_left")
HKPost("Key_left")
return
Label_left_up:
HKUpPre()
ActionKey_a_Up("Key_left")
HKUpPost("Key_left")
return

Label_right_down:
HKPre()
ActionKey_d_Down("Key_right")
HKPost("Key_right")
return
Label_right_up:
HKUpPre()
ActionKey_d_Up("Key_right")
HKUpPost("Key_right")
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

Label_f_down:
HKPre()
ActionKey_e_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_e_Up("Key_f")
HKUpPost("Key_f")
return

Label_z_down:
HKPre()
ActionKey_tab_Down("Key_z")
HKPost("Key_z")
return
Label_z_up:
HKUpPre()
ActionKey_tab_Up("Key_z")
HKUpPost("Key_z")
return

Label_a_down:
HKPre()
ActionKey_r_Down("Key_a")
HKPost("Key_a")
return
Label_a_up:
HKUpPre()
ActionKey_r_Up("Key_a")
HKUpPost("Key_a")
return

Label_o_down:
HKPre()
ActionKey_lshift_Down("Key_o")
HKPost("Key_o")
return
Label_o_up:
HKUpPre()
ActionKey_lshift_Up("Key_o")
HKUpPost("Key_o")
return

Label_i_down:
HKPre()
ActionKey_lctrl_Down("Key_i")
HKPost("Key_i")
return
Label_i_up:
HKUpPre()
ActionKey_lctrl_Up("Key_i")
HKUpPost("Key_i")
return

Label_l_down:
HKPre()
ActionKey_lalt_Down("Key_l")
HKPost("Key_l")
return
Label_l_up:
HKUpPre()
ActionKey_lalt_Up("Key_l")
HKUpPost("Key_l")
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

Label_t_down:
HKPre()
ActionKey_numpad3_Down("Key_t")
HKPost("Key_t")
return
Label_t_up:
HKUpPre()
ActionKey_numpad3_Up("Key_t")
HKUpPost("Key_t")
return

Label_9_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_9_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_x_down:
HKPre()
ActionKey_h_Down("Key_x")
HKPost("Key_x")
return
Label_x_up:
HKUpPre()
ActionKey_h_Up("Key_x")
HKUpPost("Key_x")
return

LabelMap2_c_down:
HKPre()
ActionKey_m_Down("Key_c")
HKPost("Key_c")
return
LabelMap2_c_up:
HKUpPre()
ActionKey_m_Up("Key_c")
HKUpPost("Key_c")
return

LabelMap2_r_down:
HKPre()
ActionKey_t_Down("Key_r")
HKPost("Key_r")
return
LabelMap2_r_up:
HKUpPre()
ActionKey_t_Up("Key_r")
HKUpPost("Key_r")
return

