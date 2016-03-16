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

Label_f_down:
HKPre()
ActionKey_r_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_r_Up("Key_f")
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

Label_4_down:
HKPre()
ActionKey_q_Down("Key_4")
HKPost("Key_4")
return
Label_4_up:
HKUpPre()
ActionKey_q_Up("Key_4")
HKUpPost("Key_4")
return

Label_x_down:
HKPre()
ActionKey_x_Down("Key_x")
HKPost("Key_x")
return
Label_x_up:
HKUpPre()
ActionKey_x_Up("Key_x")
HKUpPost("Key_x")
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

Label_vkbc_down:
HKPre()
ActionKey_lctrl_Down("Key_vkbc")
HKPost("Key_vkbc")
return
Label_vkbc_up:
HKUpPre()
ActionKey_lctrl_Up("Key_vkbc")
HKUpPost("Key_vkbc")
return

Label_vkbe_down:
HKPre()
ActionKey_lshift_Down("Key_vkbe")
HKPost("Key_vkbe")
return
Label_vkbe_up:
HKUpPre()
ActionKey_lshift_Up("Key_vkbe")
HKUpPost("Key_vkbe")
return

Label_vkbf_down:
HKPre()
ActionKey_lctrl_Down("Key_vkbf")
ActionKey_lalt_Down("Key_vkbf")
HKPost("Key_vkbf")
return
Label_vkbf_up:
HKUpPre()
ActionKey_lctrl_Up("Key_vkbf")
ActionKey_lalt_Up("Key_vkbf")
HKUpPost("Key_vkbf")
return

LabelMap2_q_down:
HKPre()
ActionKey_1_Down("Key_q")
HKPost("Key_q")
return
LabelMap2_q_up:
HKUpPre()
ActionKey_1_Up("Key_q")
HKUpPost("Key_q")
return

LabelMap2_w_down:
HKPre()
ActionKey_2_Down("Key_w")
HKPost("Key_w")
return
LabelMap2_w_up:
HKUpPre()
ActionKey_2_Up("Key_w")
HKUpPost("Key_w")
return

LabelMap2_e_down:
HKPre()
ActionKey_3_Down("Key_e")
HKPost("Key_e")
return
LabelMap2_e_up:
HKUpPre()
ActionKey_3_Up("Key_e")
HKUpPost("Key_e")
return

LabelMap2_r_down:
HKPre()
ActionKey_4_Down("Key_r")
HKPost("Key_r")
return
LabelMap2_r_up:
HKUpPre()
ActionKey_4_Up("Key_r")
HKUpPost("Key_r")
return

LabelMap2_t_down:
HKPre()
ActionKey_5_Down("Key_t")
HKPost("Key_t")
return
LabelMap2_t_up:
HKUpPre()
ActionKey_5_Up("Key_t")
HKUpPost("Key_t")
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

