contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 2
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

Label_d_down:
HKPre()
SendEvent {blind}{space downtemp}
HKPost()
return
Label_d_up:
HKUpPre()
SendEvent {blind}{space up}
HKUpPost()
return

Label_s_down:
HKPre()
SendEvent {blind}{q downtemp}
HKPost()
return
Label_s_up:
HKUpPre()
SendEvent {blind}{q up}
HKUpPost()
return

Label_f_down:
HKPre()
SendEvent {blind}{e downtemp}
HKPost()
return
Label_f_up:
HKUpPre()
SendEvent {blind}{e up}
HKUpPost()
return

Label_a_down:
HKPre()
SendEvent {blind}{j downtemp}
HKPost()
return
Label_a_up:
HKUpPre()
SendEvent {blind}{j up}
HKUpPost()
return

Label_g_down:
HKPre()
SendEvent {blind}{m downtemp}
HKPost()
return
Label_g_up:
HKUpPre()
SendEvent {blind}{m up}
HKUpPost()
return

Label_w_down:
HKPre()
SendEvent {blind}{r downtemp}
HKPost()
return
Label_w_up:
HKUpPre()
SendEvent {blind}{r up}
HKUpPost()
return

Label_r_down:
HKPre()
SendEvent {blind}{f downtemp}
HKPost()
return
Label_r_up:
HKUpPre()
SendEvent {blind}{f up}
HKUpPost()
return

Label_e_down:
HKPre()
SendEvent {blind}{h downtemp}
HKPost()
return
Label_e_up:
HKUpPre()
SendEvent {blind}{h up}
HKUpPost()
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

Label_i_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
HKPost()
return
Label_i_up:
HKUpPre()
SendEvent {blind}{lctrl up}
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

LabelMap2_q_down:
HKPre()
SendEvent {blind}{1 downtemp}
HKPost()
return
LabelMap2_q_up:
HKUpPre()
SendEvent {blind}{1 up}
HKUpPost()
return

LabelMap2_w_down:
HKPre()
SendEvent {blind}{2 downtemp}
HKPost()
return
LabelMap2_w_up:
HKUpPre()
SendEvent {blind}{2 up}
HKUpPost()
return

LabelMap2_e_down:
HKPre()
SendEvent {blind}{3 downtemp}
HKPost()
return
LabelMap2_e_up:
HKUpPre()
SendEvent {blind}{3 up}
HKUpPost()
return

LabelMap2_r_down:
HKPre()
SendEvent {blind}{4 downtemp}
HKPost()
return
LabelMap2_r_up:
HKUpPre()
SendEvent {blind}{4 up}
HKUpPost()
return

LabelMap2_t_down:
HKPre()
SendEvent {blind}{5 downtemp}
HKPost()
return
LabelMap2_t_up:
HKUpPre()
SendEvent {blind}{5 up}
HKUpPost()
return

LabelMap2_z_down:
HKPre()
SendEvent {blind}{6 downtemp}
HKPost()
return
LabelMap2_z_up:
HKUpPre()
SendEvent {blind}{6 up}
HKUpPost()
return

LabelMap2_x_down:
HKPre()
SendEvent {blind}{7 downtemp}
HKPost()
return
LabelMap2_x_up:
HKUpPre()
SendEvent {blind}{7 up}
HKUpPost()
return

LabelMap2_c_down:
HKPre()
SendEvent {blind}{8 downtemp}
HKPost()
return
LabelMap2_c_up:
HKUpPre()
SendEvent {blind}{8 up}
HKUpPost()
return

LabelMap2_v_down:
HKPre()
SendEvent {blind}{9 downtemp}
HKPost()
return
LabelMap2_v_up:
HKUpPre()
SendEvent {blind}{9 up}
HKUpPost()
return

LabelMap2_b_down:
HKPre()
SendEvent {blind}{0 downtemp}
HKPost()
return
LabelMap2_b_up:
HKUpPre()
SendEvent {blind}{0 up}
HKUpPost()
return

