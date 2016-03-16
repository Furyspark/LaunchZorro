contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 3
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

Label_e_down:
HKPre()
ActionKey_lctrl_Down("Key_e")
ActionKey_space_Down("Key_e")
HKPost("Key_e")
return
Label_e_up:
HKUpPre()
ActionKey_space_Up("Key_e")
ActionKey_lctrl_Up("Key_e")
HKUpPost("Key_e")
return

Label_s_down:
HKPre()
ActionKey_f_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_f_Up("Key_s")
HKUpPost("Key_s")
return

Label_a_down:
HKPre()
ActionKey_h_Down("Key_a")
HKPost("Key_a")
return
Label_a_up:
HKUpPre()
ActionKey_h_Up("Key_a")
HKUpPost("Key_a")
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

LabelMap2_a_down:
HKPre()
ActionKey_f1_Down("Key_a")
HKPost("Key_a")
return
LabelMap2_a_up:
HKUpPre()
ActionKey_f1_Up("Key_a")
HKUpPost("Key_a")
return

LabelMap2_s_down:
HKPre()
ActionKey_f2_Down("Key_s")
HKPost("Key_s")
return
LabelMap2_s_up:
HKUpPre()
ActionKey_f2_Up("Key_s")
HKUpPost("Key_s")
return

LabelMap2_f_down:
HKPre()
ActionKey_f3_Down("Key_f")
HKPost("Key_f")
return
LabelMap2_f_up:
HKUpPre()
ActionKey_f3_Up("Key_f")
HKUpPost("Key_f")
return

LabelMap2_g_down:
HKPre()
ActionKey_f4_Down("Key_g")
HKPost("Key_g")
return
LabelMap2_g_up:
HKUpPre()
ActionKey_f4_Up("Key_g")
HKUpPost("Key_g")
return

LabelMap2_z_down:
HKPre()
ActionKey_f5_Down("Key_z")
HKPost("Key_z")
return
LabelMap2_z_up:
HKUpPre()
ActionKey_f5_Up("Key_z")
HKUpPost("Key_z")
return

LabelMap2_x_down:
HKPre()
ActionKey_f6_Down("Key_x")
HKPost("Key_x")
return
LabelMap2_x_up:
HKUpPre()
ActionKey_f6_Up("Key_x")
HKUpPost("Key_x")
return

LabelMap2_v_down:
HKPre()
ActionKey_f7_Down("Key_v")
HKPost("Key_v")
return
LabelMap2_v_up:
HKUpPre()
ActionKey_f7_Up("Key_v")
HKUpPost("Key_v")
return

LabelMap2_b_down:
HKPre()
ActionKey_f8_Down("Key_b")
HKPost("Key_b")
return
LabelMap2_b_up:
HKUpPre()
ActionKey_f8_Up("Key_b")
HKUpPost("Key_b")
return

LabelMap2_q_down:
HKPre()
ActionKey_f9_Down("Key_q")
HKPost("Key_q")
return
LabelMap2_q_up:
HKUpPre()
ActionKey_f9_Up("Key_q")
HKUpPost("Key_q")
return

LabelMap2_w_down:
HKPre()
ActionKey_f10_Down("Key_w")
HKPost("Key_w")
return
LabelMap2_w_up:
HKUpPre()
ActionKey_f10_Up("Key_w")
HKUpPost("Key_w")
return

LabelMap2_r_down:
HKPre()
ActionKey_f11_Down("Key_r")
HKPost("Key_r")
return
LabelMap2_r_up:
HKUpPre()
ActionKey_f11_Up("Key_r")
HKUpPost("Key_r")
return

LabelMap2_t_down:
HKPre()
ActionKey_f12_Down("Key_t")
HKPost("Key_t")
return
LabelMap2_t_up:
HKUpPre()
ActionKey_f12_Up("Key_t")
HKUpPost("Key_t")
return

LabelMap3_f_down:
HKPre()
ActionKey_n_Down("Key_f")
HKPost("Key_f")
return
LabelMap3_f_up:
HKUpPre()
ActionKey_n_Up("Key_f")
HKUpPost("Key_f")
return

LabelMap3_d_down:
HKPre()
ActionKey_t_Down("Key_d")
HKPost("Key_d")
return
LabelMap3_d_up:
HKUpPre()
ActionKey_t_Up("Key_d")
HKUpPost("Key_d")
return

LabelMap3_s_down:
HKPre()
ActionKey_i_Down("Key_s")
HKPost("Key_s")
return
LabelMap3_s_up:
HKUpPre()
ActionKey_i_Up("Key_s")
HKUpPost("Key_s")
return

LabelMap3_a_down:
HKPre()
ActionKey_h_Down("Key_a")
HKPost("Key_a")
return
LabelMap3_a_up:
HKUpPre()
ActionKey_h_Up("Key_a")
HKUpPost("Key_a")
return

LabelMap3_z_down:
HKPre()
ActionKey_p_Down("Key_z")
HKPost("Key_z")
return
LabelMap3_z_up:
HKUpPre()
ActionKey_p_Up("Key_z")
HKUpPost("Key_z")
return

LabelMap3_g_down:
HKPre()
ActionKey_q_Down("Key_g")
HKPost("Key_g")
return
LabelMap3_g_up:
HKUpPre()
ActionKey_q_Up("Key_g")
HKUpPost("Key_g")
return

LabelMap3_b_down:
HKPre()
ActionKey_o_Down("Key_b")
HKPost("Key_b")
return
LabelMap3_b_up:
HKUpPre()
ActionKey_o_Up("Key_b")
HKUpPost("Key_b")
return

LabelMap3_v_down:
HKPre()
ActionKey_l_Down("Key_v")
HKPost("Key_v")
return
LabelMap3_v_up:
HKUpPre()
ActionKey_l_Up("Key_v")
HKUpPost("Key_v")
return

LabelMap3_r_down:
HKPre()
ActionKey_r_Down("Key_r")
HKPost("Key_r")
return
LabelMap3_r_up:
HKUpPre()
ActionKey_r_Up("Key_r")
HKUpPost("Key_r")
return

LabelMap3_e_down:
HKPre()
ActionKey_lalt_Down("Key_e")
ActionKey_r_Down("Key_e")
HKPost("Key_e")
return
LabelMap3_e_up:
HKUpPre()
ActionKey_r_Up("Key_e")
ActionKey_lalt_Up("Key_e")
HKUpPost("Key_e")
return

