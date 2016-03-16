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

Label_a_down:
HKPre()
ActionKey_sc029_Down("Key_a")
HKPost("Key_a")
return
Label_a_up:
HKUpPre()
ActionKey_sc029_Up("Key_a")
HKUpPost("Key_a")
return

Label_s_down:
HKPre()
ActionKey_1_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_1_Up("Key_s")
HKUpPost("Key_s")
return

Label_d_down:
HKPre()
ActionKey_2_Down("Key_d")
HKPost("Key_d")
return
Label_d_up:
HKUpPre()
ActionKey_2_Up("Key_d")
HKUpPost("Key_d")
return

Label_f_down:
HKPre()
ActionKey_3_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_3_Up("Key_f")
HKUpPost("Key_f")
return

Label_g_down:
HKPre()
ActionKey_4_Down("Key_g")
HKPost("Key_g")
return
Label_g_up:
HKUpPre()
ActionKey_4_Up("Key_g")
HKUpPost("Key_g")
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

Label_2_down:
HKPre()
ActionKey_home_Down("Key_2")
HKPost("Key_2")
return
Label_2_up:
HKUpPre()
ActionKey_home_Up("Key_2")
HKUpPost("Key_2")
return

Label_w_down:
HKPre()
ActionKey_end_Down("Key_w")
HKPost("Key_w")
return
Label_w_up:
HKUpPre()
ActionKey_end_Up("Key_w")
HKUpPost("Key_w")
return

Label_z_down:
HKPre()
ActionKey_delete_Down("Key_z")
HKPost("Key_z")
return
Label_z_up:
HKUpPre()
ActionKey_delete_Up("Key_z")
HKUpPost("Key_z")
return

Label_q_down:
HKPre()
ActionKey_vkbc_Down("Key_q")
HKPost("Key_q")
return
Label_q_up:
HKUpPre()
ActionKey_vkbc_Up("Key_q")
HKUpPost("Key_q")
return

Label_t_down:
HKPre()
ActionKey_vkbe_Down("Key_t")
HKPost("Key_t")
return
Label_t_up:
HKUpPre()
ActionKey_vkbe_Up("Key_t")
HKUpPost("Key_t")
return

Label_3_down:
HKPre()
ActionKey_lshift_Down("Key_3")
ActionKey_enter_Down("Key_3")
HKPost("Key_3")
return
Label_3_up:
HKUpPre()
ActionKey_enter_Up("Key_3")
ActionKey_lshift_Up("Key_3")
HKUpPost("Key_3")
return

Label_e_down:
HKPre()
ActionKey_m_Down("Key_e")
HKPost("Key_e")
return
Label_e_up:
HKUpPre()
ActionKey_m_Up("Key_e")
HKUpPost("Key_e")
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

Label_x_down:
HKPre()
ActionKey_f1_Down("Key_x")
HKPost("Key_x")
return
Label_x_up:
HKUpPre()
ActionKey_f1_Up("Key_x")
HKUpPost("Key_x")
return

Label_c_down:
HKPre()
ActionKey_f2_Down("Key_c")
HKPost("Key_c")
return
Label_c_up:
HKUpPre()
ActionKey_f2_Up("Key_c")
HKUpPost("Key_c")
return

Label_v_down:
HKPre()
ActionKey_f3_Down("Key_v")
HKPost("Key_v")
return
Label_v_up:
HKUpPre()
ActionKey_f3_Up("Key_v")
HKUpPost("Key_v")
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
ActionKey_lctrl_Down("Key_m")
ActionKey_lalt_Down("Key_m")
HKPost("Key_m")
return
Label_m_up:
HKUpPre()
ActionKey_lctrl_Up("Key_m")
ActionKey_lalt_Up("Key_m")
HKUpPost("Key_m")
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

LabelMap2_x_down:
HKPre()
ActionKey_lctrl_Down("Key_x")
ActionKey_z_Down("Key_x")
HKPost("Key_x")
return
LabelMap2_x_up:
HKUpPre()
ActionKey_z_Up("Key_x")
ActionKey_lctrl_Up("Key_x")
HKUpPost("Key_x")
return

LabelMap2_v_down:
HKPre()
ActionKey_lctrl_Down("Key_v")
ActionKey_y_Down("Key_v")
HKPost("Key_v")
return
LabelMap2_v_up:
HKUpPre()
ActionKey_y_Up("Key_v")
ActionKey_lctrl_Up("Key_v")
HKUpPost("Key_v")
return

LabelMap2_f_down:
HKPre()
ActionKey_h_Down("Key_f")
HKPost("Key_f")
return
LabelMap2_f_up:
HKUpPre()
ActionKey_h_Up("Key_f")
HKUpPost("Key_f")
return

LabelMap2_a_down:
HKPre()
ActionKey_r_Down("Key_a")
HKPost("Key_a")
return
LabelMap2_a_up:
HKUpPre()
ActionKey_r_Up("Key_a")
HKUpPost("Key_a")
return

LabelMap2_d_down:
HKPre()
ActionKey_e_Down("Key_d")
HKPost("Key_d")
return
LabelMap2_d_up:
HKUpPre()
ActionKey_e_Up("Key_d")
HKUpPost("Key_d")
return

LabelMap2_s_down:
HKPre()
ActionKey_k_Down("Key_s")
HKPost("Key_s")
return
LabelMap2_s_up:
HKUpPre()
ActionKey_k_Up("Key_s")
HKUpPost("Key_s")
return

