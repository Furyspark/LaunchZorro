contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 4
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

Label_u_down:
HKPre()
ActionKey_lctrl_Down("Key_u")
HKPost("Key_u")
return
Label_u_up:
HKUpPre()
ActionKey_lctrl_Up("Key_u")
HKUpPost("Key_u")
return

Label_j_down:
HKPre()
ActionKey_lshift_Down("Key_j")
HKPost("Key_j")
return
Label_j_up:
HKUpPre()
ActionKey_lshift_Up("Key_j")
HKUpPost("Key_j")
return

Label_m_down:
HKPre()
ActionKey_lalt_Down("Key_m")
HKPost("Key_m")
return
Label_m_up:
HKUpPre()
ActionKey_lalt_Up("Key_m")
HKUpPost("Key_m")
return

Label_f_down:
HKPre()
ActionKey_f_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_f_Up("Key_f")
HKUpPost("Key_f")
return

Label_s_down:
HKPre()
ActionKey_e_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_e_Up("Key_s")
HKUpPost("Key_s")
return

Label_q_down:
HKPre()
ActionKey_r_Down("Key_q")
HKPost("Key_q")
return
Label_q_up:
HKUpPre()
ActionKey_r_Up("Key_q")
HKUpPost("Key_q")
return

Label_p_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_p_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_r_down:
HKPre()
ActionKey_x_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_x_Up("Key_r")
HKUpPost("Key_r")
return

Label_8_down:
MKPre()
SwitchKeymap(3)
MKPost()
return
Label_8_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
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

Label_9_down:
MKPre()
SwitchKeymap(4)
MKPost()
return
Label_9_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

LabelMap2_a_down:
HKPre()
ActionKey_sc029_Down("Key_a")
HKPost("Key_a")
return
LabelMap2_a_up:
HKUpPre()
ActionKey_sc029_Up("Key_a")
HKUpPost("Key_a")
return

LabelMap2_f_down:
HKPre()
ActionKey_vkdc_Down("Key_f")
HKPost("Key_f")
return
LabelMap2_f_up:
HKUpPre()
ActionKey_vkdc_Up("Key_f")
HKUpPost("Key_f")
return

LabelMap2_s_down:
HKPre()
ActionKey_g_Down("Key_s")
HKPost("Key_s")
return
LabelMap2_s_up:
HKUpPre()
ActionKey_g_Up("Key_s")
HKUpPost("Key_s")
return

LabelMap3_q_down:
HKPre()
ActionKey_numpad1_Down("Key_q")
HKPost("Key_q")
return
LabelMap3_q_up:
HKUpPre()
ActionKey_numpad1_Up("Key_q")
HKUpPost("Key_q")
return

LabelMap3_w_down:
HKPre()
ActionKey_numpad2_Down("Key_w")
HKPost("Key_w")
return
LabelMap3_w_up:
HKUpPre()
ActionKey_numpad2_Up("Key_w")
HKUpPost("Key_w")
return

LabelMap3_e_down:
HKPre()
ActionKey_numpad3_Down("Key_e")
HKPost("Key_e")
return
LabelMap3_e_up:
HKUpPre()
ActionKey_numpad3_Up("Key_e")
HKUpPost("Key_e")
return

LabelMap3_r_down:
HKPre()
ActionKey_numpad4_Down("Key_r")
HKPost("Key_r")
return
LabelMap3_r_up:
HKUpPre()
ActionKey_numpad4_Up("Key_r")
HKUpPost("Key_r")
return

LabelMap4_d_down:
HKPre()
ActionKey_c_Down("Key_d")
HKPost("Key_d")
return
LabelMap4_d_up:
HKUpPre()
ActionKey_c_Up("Key_d")
HKUpPost("Key_d")
return

LabelMap4_f_down:
HKPre()
ActionKey_i_Down("Key_f")
HKPost("Key_f")
return
LabelMap4_f_up:
HKUpPre()
ActionKey_i_Up("Key_f")
HKUpPost("Key_f")
return

LabelMap4_v_down:
HKPre()
ActionKey_p_Down("Key_v")
HKPost("Key_v")
return
LabelMap4_v_up:
HKUpPre()
ActionKey_p_Up("Key_v")
HKUpPost("Key_v")
return

LabelMap4_g_down:
HKPre()
ActionKey_q_Down("Key_g")
HKPost("Key_g")
return
LabelMap4_g_up:
HKUpPre()
ActionKey_q_Up("Key_g")
HKUpPost("Key_g")
return

LabelMap4_x_down:
HKPre()
ActionKey_l_Down("Key_x")
HKPost("Key_x")
return
LabelMap4_x_up:
HKUpPre()
ActionKey_l_Up("Key_x")
HKUpPost("Key_x")
return

