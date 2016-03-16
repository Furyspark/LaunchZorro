contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 2
return

Label_e_down:
HKPre()
ActionKey_w_Down("Key_e")
HKPost("Key_e")
return
Label_e_up:
HKUpPre()
ActionKey_w_Up("Key_e")
HKUpPost("Key_e")
return

Label_d_down:
HKPre()
ActionKey_s_Down("Key_d")
HKPost("Key_d")
return
Label_d_up:
HKUpPre()
ActionKey_s_Up("Key_d")
HKUpPost("Key_d")
return

Label_s_down:
HKPre()
ActionKey_a_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_a_Up("Key_s")
HKUpPost("Key_s")
return

Label_f_down:
HKPre()
ActionKey_d_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_d_Up("Key_f")
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

Label_r_down:
HKPre()
ActionKey_e_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_e_Up("Key_r")
HKUpPost("Key_r")
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

Label_f3_down:
HKPre()
ActionKey_f3_Down("Key_f3")
HKPost("Key_f3")
return
Label_f3_up:
HKUpPre()
ActionKey_f3_Up("Key_f3")
HKUpPost("Key_f3")
return

Label_f4_down:
HKPre()
ActionKey_f4_Down("Key_f4")
HKPost("Key_f4")
return
Label_f4_up:
HKUpPre()
ActionKey_f4_Up("Key_f4")
HKUpPost("Key_f4")
return

Label_f5_down:
HKPre()
ActionKey_f5_Down("Key_f5")
HKPost("Key_f5")
return
Label_f5_up:
HKUpPre()
ActionKey_f5_Up("Key_f5")
HKUpPost("Key_f5")
return

Label_f6_down:
HKPre()
ActionKey_f6_Down("Key_f6")
HKPost("Key_f6")
return
Label_f6_up:
HKUpPre()
ActionKey_f6_Up("Key_f6")
HKUpPost("Key_f6")
return

Label_f7_down:
HKPre()
ActionKey_f7_Down("Key_f7")
HKPost("Key_f7")
return
Label_f7_up:
HKUpPre()
ActionKey_f7_Up("Key_f7")
HKUpPost("Key_f7")
return

Label_f2_down:
HKPre()
ActionKey_f2_Down("Key_f2")
HKPost("Key_f2")
return
Label_f2_up:
HKUpPre()
ActionKey_f2_Up("Key_f2")
HKUpPost("Key_f2")
return

Label_f8_down:
HKPre()
ActionKey_f8_Down("Key_f8")
HKPost("Key_f8")
return
Label_f8_up:
HKUpPre()
ActionKey_f8_Up("Key_f8")
HKUpPost("Key_f8")
return

Label_f9_down:
HKPre()
ActionKey_f9_Down("Key_f9")
HKPost("Key_f9")
return
Label_f9_up:
HKUpPre()
ActionKey_f9_Up("Key_f9")
HKUpPost("Key_f9")
return

Label_f10_down:
HKPre()
ActionKey_f10_Down("Key_f10")
HKPost("Key_f10")
return
Label_f10_up:
HKUpPre()
ActionKey_f10_Up("Key_f10")
HKUpPost("Key_f10")
return

Label_n_down:
HKPre()
ActionKey_q_Down("Key_n")
HKPost("Key_n")
return
Label_n_up:
HKUpPre()
ActionKey_q_Up("Key_n")
HKUpPost("Key_n")
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

Label_lshift_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_lshift_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_a_down:
HKPre()
ActionKey_lshift_Down("Key_a")
HKPost("Key_a")
return
Label_a_up:
HKUpPre()
ActionKey_lshift_Up("Key_a")
HKUpPost("Key_a")
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

Label_5_down:
HKPre()
ActionKey_tab_Down("Key_5")
HKPost("Key_5")
return
Label_5_up:
HKUpPre()
ActionKey_tab_Up("Key_5")
HKUpPost("Key_5")
return

LabelMap2_a_down:
HKPre()
ActionKey_1_Down("Key_a")
HKPost("Key_a")
return
LabelMap2_a_up:
HKUpPre()
ActionKey_1_Up("Key_a")
HKUpPost("Key_a")
return

LabelMap2_s_down:
HKPre()
ActionKey_2_Down("Key_s")
HKPost("Key_s")
return
LabelMap2_s_up:
HKUpPre()
ActionKey_2_Up("Key_s")
HKUpPost("Key_s")
return

LabelMap2_d_down:
HKPre()
ActionKey_3_Down("Key_d")
HKPost("Key_d")
return
LabelMap2_d_up:
HKUpPre()
ActionKey_3_Up("Key_d")
HKUpPost("Key_d")
return

LabelMap2_f_down:
HKPre()
ActionKey_4_Down("Key_f")
HKPost("Key_f")
return
LabelMap2_f_up:
HKUpPre()
ActionKey_4_Up("Key_f")
HKUpPost("Key_f")
return

LabelMap2_g_down:
HKPre()
ActionKey_5_Down("Key_g")
HKPost("Key_g")
return
LabelMap2_g_up:
HKUpPre()
ActionKey_5_Up("Key_g")
HKUpPost("Key_g")
return

LabelMap2_z_down:
HKPre()
ActionKey_6_Down("Key_z")
HKPost("Key_z")
return
LabelMap2_z_up:
HKUpPre()
ActionKey_6_Up("Key_z")
HKUpPost("Key_z")
return

LabelMap2_x_down:
HKPre()
ActionKey_7_Down("Key_x")
HKPost("Key_x")
return
LabelMap2_x_up:
HKUpPre()
ActionKey_7_Up("Key_x")
HKUpPost("Key_x")
return

LabelMap2_c_down:
HKPre()
ActionKey_8_Down("Key_c")
HKPost("Key_c")
return
LabelMap2_c_up:
HKUpPre()
ActionKey_8_Up("Key_c")
HKUpPost("Key_c")
return

LabelMap2_v_down:
HKPre()
ActionKey_9_Down("Key_v")
HKPost("Key_v")
return
LabelMap2_v_up:
HKUpPre()
ActionKey_9_Up("Key_v")
HKUpPost("Key_v")
return

LabelMap2_b_down:
HKPre()
ActionKey_0_Down("Key_b")
HKPost("Key_b")
return
LabelMap2_b_up:
HKUpPre()
ActionKey_0_Up("Key_b")
HKUpPost("Key_b")
return

