contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 3
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

Label_d_down:
HKPre()
ActionKey_x_Down("Key_d")
HKPost("Key_d")
return
Label_d_up:
HKUpPre()
ActionKey_x_Up("Key_d")
HKUpPost("Key_d")
return

Label_f_down:
HKPre()
ActionKey_z_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_z_Up("Key_f")
HKUpPost("Key_f")
return

Label_s_down:
HKPre()
ActionKey_c_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_c_Up("Key_s")
HKUpPost("Key_s")
return

Label_a_down:
HKPre()
ActionKey_v_Down("Key_a")
HKPost("Key_a")
return
Label_a_up:
HKUpPre()
ActionKey_v_Up("Key_a")
HKUpPost("Key_a")
return

Label_z_down:
HKPre()
ActionKey_a_Down("Key_z")
HKPost("Key_z")
return
Label_z_up:
HKUpPre()
ActionKey_a_Up("Key_z")
HKUpPost("Key_z")
return

Label_v_down:
HKPre()
ActionKey_q_Down("Key_v")
HKPost("Key_v")
return
Label_v_up:
HKUpPre()
ActionKey_q_Up("Key_v")
HKUpPost("Key_v")
return

Label_x_down:
HKPre()
ActionKey_w_Down("Key_x")
HKPost("Key_x")
return
Label_x_up:
HKUpPre()
ActionKey_w_Up("Key_x")
HKUpPost("Key_x")
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

Label_o_down:
MKPre()
SwitchKeymap(3)
MKPost()
return
Label_o_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_r_down:
HKPre()
ActionKey_i_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_i_Up("Key_r")
HKUpPost("Key_r")
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

LabelMap3_up_down:
HKPre()
ActionKey_numpad8_Down("Key_up")
HKPost("Key_up")
return
LabelMap3_up_up:
HKUpPre()
ActionKey_numpad8_Up("Key_up")
HKUpPost("Key_up")
return

LabelMap3_down_down:
HKPre()
ActionKey_numpad5_Down("Key_down")
HKPost("Key_down")
return
LabelMap3_down_up:
HKUpPre()
ActionKey_numpad5_Up("Key_down")
HKUpPost("Key_down")
return

LabelMap3_left_down:
HKPre()
ActionKey_numpad4_Down("Key_left")
HKPost("Key_left")
return
LabelMap3_left_up:
HKUpPre()
ActionKey_numpad4_Up("Key_left")
HKUpPost("Key_left")
return

LabelMap3_right_down:
HKPre()
ActionKey_numpad6_Down("Key_right")
HKPost("Key_right")
return
LabelMap3_right_up:
HKUpPre()
ActionKey_numpad6_Up("Key_right")
HKUpPost("Key_right")
return

