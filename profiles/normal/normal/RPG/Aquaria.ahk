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

Label_lalt_down:
HKPre()
ActionKey_lalt_Down("Key_lalt")
HKPost("Key_lalt")
return
Label_lalt_up:
HKUpPre()
ActionKey_lalt_Up("Key_lalt")
HKUpPost("Key_lalt")
return

Label_lctrl_down:
HKPre()
ActionKey_lctrl_Down("Key_lctrl")
HKPost("Key_lctrl")
return
Label_lctrl_up:
HKUpPre()
ActionKey_lctrl_Up("Key_lctrl")
HKUpPost("Key_lctrl")
return

Label_lshift_down:
HKPre()
ActionKey_lshift_Down("Key_lshift")
HKPost("Key_lshift")
return
Label_lshift_up:
HKUpPre()
ActionKey_lshift_Up("Key_lshift")
HKUpPost("Key_lshift")
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

Label_1_down:
HKPre()
ActionKey_1_Down("Key_1")
HKPost("Key_1")
return
Label_1_up:
HKUpPre()
ActionKey_1_Up("Key_1")
HKUpPost("Key_1")
return

Label_2_down:
HKPre()
ActionKey_2_Down("Key_2")
HKPost("Key_2")
return
Label_2_up:
HKUpPre()
ActionKey_2_Up("Key_2")
HKUpPost("Key_2")
return

Label_3_down:
HKPre()
ActionKey_3_Down("Key_3")
HKPost("Key_3")
return
Label_3_up:
HKUpPre()
ActionKey_3_Up("Key_3")
HKUpPost("Key_3")
return

Label_4_down:
HKPre()
ActionKey_4_Down("Key_4")
HKPost("Key_4")
return
Label_4_up:
HKUpPre()
ActionKey_4_Up("Key_4")
HKUpPost("Key_4")
return

Label_5_down:
HKPre()
ActionKey_5_Down("Key_5")
HKPost("Key_5")
return
Label_5_up:
HKUpPre()
ActionKey_5_Up("Key_5")
HKUpPost("Key_5")
return

Label_6_down:
HKPre()
ActionKey_6_Down("Key_6")
HKPost("Key_6")
return
Label_6_up:
HKUpPre()
ActionKey_6_Up("Key_6")
HKUpPost("Key_6")
return

Label_tab_down:
HKPre()
ActionKey_tab_Down("Key_tab")
HKPost("Key_tab")
return
Label_tab_up:
HKUpPre()
ActionKey_tab_Up("Key_tab")
HKUpPost("Key_tab")
return

Label_a_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_a_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_r_down:
HKPre()
ActionKey_r_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_r_Up("Key_r")
HKUpPost("Key_r")
return

Label_w_down:
HKPre()
ActionKey_e_Down("Key_w")
HKPost("Key_w")
return
Label_w_up:
HKUpPre()
ActionKey_e_Up("Key_w")
HKUpPost("Key_w")
return

Label_g_down:
HKPre()
ActionKey_x_Down("Key_g")
HKPost("Key_g")
return
Label_g_up:
HKUpPre()
ActionKey_x_Up("Key_g")
HKUpPost("Key_g")
return

Label_b_down:
HKPre()
ActionKey_q_Down("Key_b")
HKPost("Key_b")
return
Label_b_up:
HKUpPre()
ActionKey_q_Up("Key_b")
HKUpPost("Key_b")
return

LabelMap2_1_down:
HKPre()
ActionKey_7_Down("Key_1")
HKPost("Key_1")
return
LabelMap2_1_up:
HKUpPre()
ActionKey_7_Up("Key_1")
HKUpPost("Key_1")
return

LabelMap2_2_down:
HKPre()
ActionKey_8_Down("Key_2")
HKPost("Key_2")
return
LabelMap2_2_up:
HKUpPre()
ActionKey_8_Up("Key_2")
HKUpPost("Key_2")
return

LabelMap2_3_down:
HKPre()
ActionKey_9_Down("Key_3")
HKPost("Key_3")
return
LabelMap2_3_up:
HKUpPre()
ActionKey_9_Up("Key_3")
HKUpPost("Key_3")
return

LabelMap2_4_down:
HKPre()
ActionKey_0_Down("Key_4")
HKPost("Key_4")
return
LabelMap2_4_up:
HKUpPre()
ActionKey_0_Up("Key_4")
HKUpPost("Key_4")
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

