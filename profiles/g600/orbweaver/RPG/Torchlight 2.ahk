contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 3
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

Label_a_down:
HKPre()
SendEvent {blind}{1 downtemp}
HKPost()
return
Label_a_up:
HKUpPre()
SendEvent {blind}{1 up}
HKUpPost()
return

Label_s_down:
HKPre()
SendEvent {blind}{2 downtemp}
HKPost()
return
Label_s_up:
HKUpPre()
SendEvent {blind}{2 up}
HKUpPost()
return

Label_f_down:
HKPre()
SendEvent {blind}{3 downtemp}
HKPost()
return
Label_f_up:
HKUpPre()
SendEvent {blind}{3 up}
HKUpPost()
return

Label_g_down:
HKPre()
SendEvent {blind}{4 downtemp}
HKPost()
return
Label_g_up:
HKUpPre()
SendEvent {blind}{4 up}
HKUpPost()
return

Label_z_down:
HKPre()
SendEvent {blind}{5 downtemp}
HKPost()
return
Label_z_up:
HKUpPre()
SendEvent {blind}{5 up}
HKUpPost()
return

Label_x_down:
HKPre()
SendEvent {blind}{6 downtemp}
HKPost()
return
Label_x_up:
HKUpPre()
SendEvent {blind}{6 up}
HKUpPost()
return

Label_v_down:
HKPre()
SendEvent {blind}{7 downtemp}
HKPost()
return
Label_v_up:
HKUpPre()
SendEvent {blind}{7 up}
HKUpPost()
return

Label_b_down:
HKPre()
SendEvent {blind}{8 downtemp}
HKPost()
return
Label_b_up:
HKUpPre()
SendEvent {blind}{8 up}
HKUpPost()
return

Label_w_down:
HKPre()
SendEvent {blind}{9 downtemp}
HKPost()
return
Label_w_up:
HKUpPre()
SendEvent {blind}{9 up}
HKUpPost()
return

Label_r_down:
HKPre()
SendEvent {blind}{0 downtemp}
HKPost()
return
Label_r_up:
HKUpPre()
SendEvent {blind}{0 up}
HKUpPost()
return

Label_q_down:
HKPre()
SendEvent {blind}{z downtemp}
HKPost()
return
Label_q_up:
HKUpPre()
SendEvent {blind}{z up}
HKUpPost()
return

Label_t_down:
HKPre()
SendEvent {blind}{x downtemp}
HKPost()
return
Label_t_up:
HKUpPre()
SendEvent {blind}{x up}
HKUpPost()
return

Label_m_down:
MKPre()
SwitchKeymap(3)
MKPost()
return
Label_m_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_2_down:
HKPre()
SendEvent {blind}{m downtemp}
HKPost()
return
Label_2_up:
HKUpPre()
SendEvent {blind}{m up}
HKUpPost()
return

Label_3_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{m downtemp}
HKPost()
return
Label_3_up:
HKUpPre()
SendEvent {blind}{m up}
SendEvent {blind}{lshift up}
HKUpPost()
return

Label_4_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
SendEvent {blind}{m downtemp}
HKPost()
return
Label_4_up:
HKUpPre()
SendEvent {blind}{m up}
SendEvent {blind}{lctrl up}
HKUpPost()
return

Label_e_down:
HKPre()
SendEvent {blind}{w downtemp}
HKPost()
return
Label_e_up:
HKUpPre()
SendEvent {blind}{w up}
HKUpPost()
return

Label_c_down:
HKPre()
SendEvent {blind}{tab downtemp}
HKPost()
return
Label_c_up:
HKUpPre()
SendEvent {blind}{tab up}
HKUpPost()
return

Label_vkbc_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
HKPost()
return
Label_vkbc_up:
HKUpPre()
SendEvent {blind}{lctrl up}
HKUpPost()
return

Label_vkbe_down:
HKPre()
SendEvent {blind}{lshift downtemp}
HKPost()
return
Label_vkbe_up:
HKUpPre()
SendEvent {blind}{lshift up}
HKUpPost()
return

Label_vkbf_down:
HKPre()
SendEvent {blind}{lalt downtemp}
HKPost()
return
Label_vkbf_up:
HKUpPre()
SendEvent {blind}{lalt up}
HKUpPost()
return

Label_i_down:
HKPre()
SendEvent {blind}{lshift downtemp}
HKPost()
return
Label_i_up:
HKUpPre()
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap2_f_down:
HKPre()
SendEvent {blind}{i downtemp}
HKPost()
return
LabelMap2_f_up:
HKUpPre()
SendEvent {blind}{i up}
HKUpPost()
return

LabelMap2_s_down:
HKPre()
SendEvent {blind}{c downtemp}
HKPost()
return
LabelMap2_s_up:
HKUpPre()
SendEvent {blind}{c up}
HKUpPost()
return

LabelMap2_a_down:
HKPre()
SendEvent {blind}{s downtemp}
HKPost()
return
LabelMap2_a_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

LabelMap2_q_down:
HKPre()
SendEvent {blind}{p downtemp}
HKPost()
return
LabelMap2_q_up:
HKUpPre()
SendEvent {blind}{p up}
HKUpPost()
return

LabelMap2_g_down:
HKPre()
SendEvent {blind}{q downtemp}
HKPost()
return
LabelMap2_g_up:
HKUpPre()
SendEvent {blind}{q up}
HKUpPost()
return

LabelMap3_q_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{z downtemp}
HKPost()
return
LabelMap3_q_up:
HKUpPre()
SendEvent {blind}{z up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap3_t_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{x downtemp}
HKPost()
return
LabelMap3_t_up:
HKUpPre()
SendEvent {blind}{x up}
SendEvent {blind}{lshift up}
HKUpPost()
return

