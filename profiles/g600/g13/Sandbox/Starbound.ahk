contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 4
return

Label_up_down:
HKPre()
SendEvent {blind}{w downtemp}
HKPost()
return
Label_up_up:
HKUpPre()
SendEvent {blind}{w up}
HKUpPost()
return

Label_down_down:
HKPre()
SendEvent {blind}{s downtemp}
HKPost()
return
Label_down_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

Label_left_down:
HKPre()
SendEvent {blind}{a downtemp}
HKPost()
return
Label_left_up:
HKUpPre()
SendEvent {blind}{a up}
HKUpPost()
return

Label_right_down:
HKPre()
SendEvent {blind}{d downtemp}
HKPost()
return
Label_right_up:
HKUpPre()
SendEvent {blind}{d up}
HKUpPost()
return

Label_r_down:
HKPre()
SendEvent {blind}{space downtemp}
HKPost()
return
Label_r_up:
HKUpPre()
SendEvent {blind}{space up}
HKUpPost()
return

Label_o_down:
HKPre()
SendEvent {blind}{lshift downtemp}
HKPost()
return
Label_o_up:
HKUpPre()
SendEvent {blind}{lshift up}
HKUpPost()
return

Label_t_down:
HKPre()
SendEvent {blind}{e downtemp}
HKPost()
return
Label_t_up:
HKUpPre()
SendEvent {blind}{e up}
HKUpPost()
return

Label_z_down:
HKPre()
SendEvent {blind}{q downtemp}
HKPost()
return
Label_z_up:
HKUpPre()
SendEvent {blind}{q up}
HKUpPost()
return

Label_a_down:
HKPre()
SendEvent {blind}{f downtemp}
HKPost()
return
Label_a_up:
HKUpPre()
SendEvent {blind}{f up}
HKUpPost()
return

Label_s_down:
HKPre()
SendEvent {blind}{g downtemp}
HKPost()
return
Label_s_up:
HKUpPre()
SendEvent {blind}{g up}
HKUpPost()
return

Label_f_down:
HKPre()
SendEvent {blind}{h downtemp}
HKPost()
return
Label_f_up:
HKUpPre()
SendEvent {blind}{h up}
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

Label_3_down:
HKPre()
SendEvent {blind}{z downtemp}
HKPost()
return
Label_3_up:
HKUpPre()
SendEvent {blind}{z up}
HKUpPost()
return

Label_5_down:
HKPre()
SendEvent {blind}{x downtemp}
HKPost()
return
Label_5_up:
HKUpPre()
SendEvent {blind}{x up}
HKUpPost()
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

Label_i_down:
MKPre()
SwitchKeymap(4)
MKPost()
return
Label_i_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

LabelMap2_t_down:
HKPre()
SendEvent {blind}{i downtemp}
HKPost()
return
LabelMap2_t_up:
HKUpPre()
SendEvent {blind}{i up}
HKUpPost()
return

LabelMap2_y_down:
HKPre()
SendEvent {blind}{j downtemp}
HKPost()
return
LabelMap2_y_up:
HKUpPre()
SendEvent {blind}{j up}
HKUpPost()
return

LabelMap2_r_down:
HKPre()
SendEvent {blind}{c downtemp}
HKPost()
return
LabelMap2_r_up:
HKUpPre()
SendEvent {blind}{c up}
HKUpPost()
return

LabelMap2_a_down:
HKPre()
SendEvent {blind}{l downtemp}
HKPost()
return
LabelMap2_a_up:
HKUpPre()
SendEvent {blind}{l up}
HKUpPost()
return

LabelMap2_s_down:
HKPre()
SendEvent {blind}{n downtemp}
HKPost()
return
LabelMap2_s_up:
HKUpPre()
SendEvent {blind}{n up}
HKUpPost()
return

LabelMap3_2_down:
HKPre()
SendEvent {blind}{1 downtemp}
HKPost()
return
LabelMap3_2_up:
HKUpPre()
SendEvent {blind}{1 up}
HKUpPost()
return

LabelMap3_3_down:
HKPre()
SendEvent {blind}{2 downtemp}
HKPost()
return
LabelMap3_3_up:
HKUpPre()
SendEvent {blind}{2 up}
HKUpPost()
return

LabelMap3_4_down:
HKPre()
SendEvent {blind}{3 downtemp}
HKPost()
return
LabelMap3_4_up:
HKUpPre()
SendEvent {blind}{3 up}
HKUpPost()
return

LabelMap3_5_down:
HKPre()
SendEvent {blind}{4 downtemp}
HKPost()
return
LabelMap3_5_up:
HKUpPre()
SendEvent {blind}{4 up}
HKUpPost()
return

LabelMap3_6_down:
HKPre()
SendEvent {blind}{5 downtemp}
HKPost()
return
LabelMap3_6_up:
HKUpPre()
SendEvent {blind}{5 up}
HKUpPost()
return

LabelMap3_a_down:
HKPre()
SendEvent {blind}{6 downtemp}
HKPost()
return
LabelMap3_a_up:
HKUpPre()
SendEvent {blind}{6 up}
HKUpPost()
return

LabelMap3_s_down:
HKPre()
SendEvent {blind}{7 downtemp}
HKPost()
return
LabelMap3_s_up:
HKUpPre()
SendEvent {blind}{7 up}
HKUpPost()
return

LabelMap3_d_down:
HKPre()
SendEvent {blind}{8 downtemp}
HKPost()
return
LabelMap3_d_up:
HKUpPre()
SendEvent {blind}{8 up}
HKUpPost()
return

LabelMap3_f_down:
HKPre()
SendEvent {blind}{9 downtemp}
HKPost()
return
LabelMap3_f_up:
HKUpPre()
SendEvent {blind}{9 up}
HKUpPost()
return

LabelMap3_g_down:
HKPre()
SendEvent {blind}{0 downtemp}
HKPost()
return
LabelMap3_g_up:
HKUpPre()
SendEvent {blind}{0 up}
HKUpPost()
return

LabelMap3_t_down:
HKPre()
SendEvent {blind}{r downtemp}
HKPost()
return
LabelMap3_t_up:
HKUpPre()
SendEvent {blind}{r up}
HKUpPost()
return

LabelMap3_e_down:
HKPre()
SendEvent {blind}{t downtemp}
HKPost()
return
LabelMap3_e_up:
HKUpPre()
SendEvent {blind}{t up}
HKUpPost()
return

LabelMap3_w_down:
HKPre()
SendEvent {blind}{y downtemp}
HKPost()
return
LabelMap3_w_up:
HKUpPre()
SendEvent {blind}{y up}
HKUpPost()
return

LabelMap3_q_down:
HKPre()
SendEvent {blind}{sc029 downtemp}
HKPost()
return
LabelMap3_q_up:
HKUpPre()
SendEvent {blind}{sc029 up}
HKUpPost()
return

LabelMap4_2_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{1 downtemp}
HKPost()
return
LabelMap4_2_up:
HKUpPre()
SendEvent {blind}{1 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_3_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{2 downtemp}
HKPost()
return
LabelMap4_3_up:
HKUpPre()
SendEvent {blind}{2 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_4_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{3 downtemp}
HKPost()
return
LabelMap4_4_up:
HKUpPre()
SendEvent {blind}{3 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_5_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{4 downtemp}
HKPost()
return
LabelMap4_5_up:
HKUpPre()
SendEvent {blind}{4 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_6_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{5 downtemp}
HKPost()
return
LabelMap4_6_up:
HKUpPre()
SendEvent {blind}{5 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_a_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{6 downtemp}
HKPost()
return
LabelMap4_a_up:
HKUpPre()
SendEvent {blind}{6 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_s_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{7 downtemp}
HKPost()
return
LabelMap4_s_up:
HKUpPre()
SendEvent {blind}{7 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_f_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{9 downtemp}
HKPost()
return
LabelMap4_f_up:
HKUpPre()
SendEvent {blind}{9 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_g_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{0 downtemp}
HKPost()
return
LabelMap4_g_up:
HKUpPre()
SendEvent {blind}{0 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_d_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{8 downtemp}
HKPost()
return
LabelMap4_d_up:
HKUpPre()
SendEvent {blind}{8 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_q_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{sc029 downtemp}
HKPost()
return
LabelMap4_q_up:
HKUpPre()
SendEvent {blind}{sc029 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_t_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{r downtemp}
HKPost()
return
LabelMap4_t_up:
HKUpPre()
SendEvent {blind}{r up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_e_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{t downtemp}
HKPost()
return
LabelMap4_e_up:
HKUpPre()
SendEvent {blind}{t up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap4_w_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{y downtemp}
HKPost()
return
LabelMap4_w_up:
HKUpPre()
SendEvent {blind}{y up}
SendEvent {blind}{lshift up}
HKUpPost()
return

