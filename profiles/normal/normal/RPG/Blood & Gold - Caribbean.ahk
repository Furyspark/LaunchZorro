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

Label_capslock_down:
HKPre()
ActionKey_scrolllock_Down("Key_capslock")
HKPost("Key_capslock")
return
Label_capslock_up:
HKUpPre()
ActionKey_scrolllock_Up("Key_capslock")
HKUpPost("Key_capslock")
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

Label_r_down:
HKPre()
ActionKey_f_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_f_Up("Key_r")
HKUpPost("Key_r")
return

Label_g_down:
HKPre()
ActionKey_vkdc_Down("Key_g")
HKPost("Key_g")
return
Label_g_up:
HKUpPre()
ActionKey_vkdc_Up("Key_g")
HKUpPost("Key_g")
return

Label_t_down:
HKPre()
ActionKey_g_Down("Key_t")
HKPost("Key_t")
return
Label_t_up:
HKUpPre()
ActionKey_g_Up("Key_t")
HKUpPost("Key_t")
return

Label_x_down:
HKPre()
ActionKey_z_Down("Key_x")
HKPost("Key_x")
return
Label_x_up:
HKUpPre()
ActionKey_z_Up("Key_x")
HKUpPost("Key_x")
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

Label_1_down:
HKPre()
ActionKey_backspace_Down("Key_1")
HKPost("Key_1")
return
Label_1_up:
HKUpPre()
ActionKey_backspace_Up("Key_1")
HKUpPost("Key_1")
return

Label_tab_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_tab_up:
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

Label_y_down:
HKPre()
ActionKey_sc029_Down("Key_y")
HKPost("Key_y")
return
Label_y_up:
HKUpPre()
ActionKey_sc029_Up("Key_y")
HKUpPost("Key_y")
return

Label_h_down:
HKPre()
ActionKey_r_Down("Key_h")
HKPost("Key_h")
return
Label_h_up:
HKUpPre()
ActionKey_r_Up("Key_h")
HKUpPost("Key_h")
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
ActionKey_i_Down("Key_f")
HKPost("Key_f")
return
LabelMap2_f_up:
HKUpPre()
ActionKey_i_Up("Key_f")
HKUpPost("Key_f")
return

