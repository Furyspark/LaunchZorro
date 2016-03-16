contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 3
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

Label_z_down:
HKPre()
ActionKey_lctrl_Down("Key_z")
HKPost("Key_z")
return
Label_z_up:
HKUpPre()
ActionKey_lctrl_Up("Key_z")
HKUpPost("Key_z")
return

Label_x_down:
HKPre()
ActionKey_lalt_Down("Key_x")
HKPost("Key_x")
return
Label_x_up:
HKUpPre()
ActionKey_lalt_Up("Key_x")
HKUpPost("Key_x")
return

Label_c_down:
HKPre()
ActionKey_lshift_Down("Key_c")
HKPost("Key_c")
return
Label_c_up:
HKUpPre()
ActionKey_lshift_Up("Key_c")
HKUpPost("Key_c")
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

Label_m_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_m_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_9_down:
MKPre()
SwitchKeymap(3)
MKPost()
return
Label_9_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_r_down:
HKPre()
ActionKey_space_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_space_Up("Key_r")
HKUpPost("Key_r")
return

Label_5_down:
HKPre()
ActionKey_e_Down("Key_5")
HKPost("Key_5")
return
Label_5_up:
HKUpPre()
ActionKey_e_Up("Key_5")
HKUpPost("Key_5")
return

Label_s_down:
HKPre()
ActionKey_q_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_q_Up("Key_s")
HKUpPost("Key_s")
return

Label_g_down:
HKPre()
ActionKey_tab_Down("Key_g")
HKPost("Key_g")
return
Label_g_up:
HKUpPre()
ActionKey_tab_Up("Key_g")
HKUpPost("Key_g")
return

LabelMap2_w_down:
HKPre()
ActionKey_1_Down("Key_w")
HKPost("Key_w")
return
LabelMap2_w_up:
HKUpPre()
ActionKey_1_Up("Key_w")
HKUpPost("Key_w")
return

LabelMap2_e_down:
HKPre()
ActionKey_2_Down("Key_e")
HKPost("Key_e")
return
LabelMap2_e_up:
HKUpPre()
ActionKey_2_Up("Key_e")
HKUpPost("Key_e")
return

LabelMap2_t_down:
HKPre()
ActionKey_3_Down("Key_t")
HKPost("Key_t")
return
LabelMap2_t_up:
HKUpPre()
ActionKey_3_Up("Key_t")
HKUpPost("Key_t")
return

LabelMap2_y_down:
HKPre()
ActionKey_4_Down("Key_y")
HKPost("Key_y")
return
LabelMap2_y_up:
HKUpPre()
ActionKey_4_Up("Key_y")
HKUpPost("Key_y")
return

LabelMap2_a_down:
HKPre()
ActionKey_5_Down("Key_a")
HKPost("Key_a")
return
LabelMap2_a_up:
HKUpPre()
ActionKey_5_Up("Key_a")
HKUpPost("Key_a")
return

LabelMap2_s_down:
HKPre()
ActionKey_6_Down("Key_s")
HKPost("Key_s")
return
LabelMap2_s_up:
HKUpPre()
ActionKey_6_Up("Key_s")
HKUpPost("Key_s")
return

LabelMap2_f_down:
HKPre()
ActionKey_7_Down("Key_f")
HKPost("Key_f")
return
LabelMap2_f_up:
HKUpPre()
ActionKey_7_Up("Key_f")
HKUpPost("Key_f")
return

LabelMap2_g_down:
HKPre()
ActionKey_8_Down("Key_g")
HKPost("Key_g")
return
LabelMap2_g_up:
HKUpPre()
ActionKey_8_Up("Key_g")
HKUpPost("Key_g")
return

LabelMap2_2_down:
HKPre()
ActionKey_9_Down("Key_2")
HKPost("Key_2")
return
LabelMap2_2_up:
HKUpPre()
ActionKey_9_Up("Key_2")
HKUpPost("Key_2")
return

LabelMap2_3_down:
HKPre()
ActionKey_0_Down("Key_3")
HKPost("Key_3")
return
LabelMap2_3_up:
HKUpPre()
ActionKey_0_Up("Key_3")
HKUpPost("Key_3")
return

LabelMap2_5_down:
HKPre()
ActionKey_vkbd_Down("Key_5")
HKPost("Key_5")
return
LabelMap2_5_up:
HKUpPre()
ActionKey_vkbd_Up("Key_5")
HKUpPost("Key_5")
return

LabelMap2_6_down:
HKPre()
ActionKey_vkbb_Down("Key_6")
HKPost("Key_6")
return
LabelMap2_6_up:
HKUpPre()
ActionKey_vkbb_Up("Key_6")
HKUpPost("Key_6")
return

LabelMap3_e_down:
HKPre()
ActionKey_f3_Down("Key_e")
HKPost("Key_e")
return
LabelMap3_e_up:
HKUpPre()
ActionKey_f3_Up("Key_e")
HKUpPost("Key_e")
return

LabelMap3_t_down:
HKPre()
ActionKey_f7_Down("Key_t")
HKPost("Key_t")
return
LabelMap3_t_up:
HKUpPre()
ActionKey_f7_Up("Key_t")
HKUpPost("Key_t")
return

LabelMap3_d_down:
HKPre()
ActionKey_j_Down("Key_d")
HKPost("Key_d")
return
LabelMap3_d_up:
HKUpPre()
ActionKey_j_Up("Key_d")
HKUpPost("Key_d")
return

