contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 3
return

Label_a_down:
HKPre()
ActionKey_1_Down("Key_a")
HKPost("Key_a")
return
Label_a_up:
HKUpPre()
ActionKey_1_Up("Key_a")
HKUpPost("Key_a")
return

Label_s_down:
HKPre()
ActionKey_2_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_2_Up("Key_s")
HKUpPost("Key_s")
return

Label_d_down:
HKPre()
ActionKey_3_Down("Key_d")
HKPost("Key_d")
return
Label_d_up:
HKUpPre()
ActionKey_3_Up("Key_d")
HKUpPost("Key_d")
return

Label_f_down:
HKPre()
ActionKey_4_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_4_Up("Key_f")
HKUpPost("Key_f")
return

Label_g_down:
HKPre()
ActionKey_5_Down("Key_g")
HKPost("Key_g")
return
Label_g_up:
HKUpPre()
ActionKey_5_Up("Key_g")
HKUpPost("Key_g")
return

Label_z_down:
HKPre()
ActionKey_6_Down("Key_z")
HKPost("Key_z")
return
Label_z_up:
HKUpPre()
ActionKey_6_Up("Key_z")
HKUpPost("Key_z")
return

Label_x_down:
HKPre()
ActionKey_7_Down("Key_x")
HKPost("Key_x")
return
Label_x_up:
HKUpPre()
ActionKey_7_Up("Key_x")
HKUpPost("Key_x")
return

Label_c_down:
HKPre()
ActionKey_8_Down("Key_c")
HKPost("Key_c")
return
Label_c_up:
HKUpPre()
ActionKey_8_Up("Key_c")
HKUpPost("Key_c")
return

Label_v_down:
HKPre()
ActionKey_9_Down("Key_v")
HKPost("Key_v")
return
Label_v_up:
HKUpPre()
ActionKey_9_Up("Key_v")
HKUpPost("Key_v")
return

Label_b_down:
HKPre()
ActionKey_0_Down("Key_b")
HKPost("Key_b")
return
Label_b_up:
HKUpPre()
ActionKey_0_Up("Key_b")
HKUpPost("Key_b")
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

Label_r_down:
HKPre()
ActionKey_w_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_w_Up("Key_r")
HKUpPost("Key_r")
return

Label_w_down:
HKPre()
ActionKey_tab_Down("Key_w")
HKPost("Key_w")
return
Label_w_up:
HKUpPre()
ActionKey_tab_Up("Key_w")
HKUpPost("Key_w")
return

Label_k_down:
MKPre()
SwitchKeymap(3)
MKPost()
return
Label_k_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

LabelMap2_a_down:
HKPre()
ActionKey_s_Down("Key_a")
HKPost("Key_a")
return
LabelMap2_a_up:
HKUpPre()
ActionKey_s_Up("Key_a")
HKUpPost("Key_a")
return

LabelMap2_d_down:
HKPre()
ActionKey_c_Down("Key_d")
HKPost("Key_d")
return
LabelMap2_d_up:
HKUpPre()
ActionKey_c_Up("Key_d")
HKUpPost("Key_d")
return

LabelMap2_f_down:
HKPre()
ActionKey_b_Down("Key_f")
HKPost("Key_f")
return
LabelMap2_f_up:
HKUpPre()
ActionKey_b_Up("Key_f")
HKUpPost("Key_f")
return

LabelMap2_s_down:
HKPre()
ActionKey_lshift_Down("Key_s")
ActionKey_b_Down("Key_s")
HKPost("Key_s")
return
LabelMap2_s_up:
HKUpPre()
ActionKey_b_Up("Key_s")
ActionKey_lshift_Up("Key_s")
HKUpPost("Key_s")
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

LabelMap2_g_down:
HKPre()
ActionKey_q_Down("Key_g")
HKPost("Key_g")
return
LabelMap2_g_up:
HKUpPre()
ActionKey_q_Up("Key_g")
HKUpPost("Key_g")
return

LabelMap3_w_down:
HKPre()
ActionKey_z_Down("Key_w")
HKPost("Key_w")
return
LabelMap3_w_up:
HKUpPre()
ActionKey_z_Up("Key_w")
HKUpPost("Key_w")
return

LabelMap3_r_down:
HKPre()
ActionKey_x_Down("Key_r")
HKPost("Key_r")
return
LabelMap3_r_up:
HKUpPre()
ActionKey_x_Up("Key_r")
HKUpPost("Key_r")
return

LabelMap3_q_down:
HKPre()
ActionKey_lshift_Down("Key_q")
ActionKey_z_Down("Key_q")
HKPost("Key_q")
return
LabelMap3_q_up:
HKUpPre()
ActionKey_z_Up("Key_q")
ActionKey_lshift_Up("Key_q")
HKUpPost("Key_q")
return

LabelMap3_t_down:
HKPre()
ActionKey_lshift_Down("Key_t")
ActionKey_x_Down("Key_t")
HKPost("Key_t")
return
LabelMap3_t_up:
HKUpPre()
ActionKey_x_Up("Key_t")
ActionKey_lshift_Up("Key_t")
HKUpPost("Key_t")
return

