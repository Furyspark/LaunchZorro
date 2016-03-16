contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
return

Label_up_down:
HKPre()
SendEvent {blind}{up downtemp}
HKPost()
return
Label_up_up:
HKUpPre()
SendEvent {blind}{up up}
HKUpPost()
return

Label_down_down:
HKPre()
SendEvent {blind}{down downtemp}
HKPost()
return
Label_down_up:
HKUpPre()
SendEvent {blind}{down up}
HKUpPost()
return

Label_left_down:
HKPre()
SendEvent {blind}{left downtemp}
HKPost()
return
Label_left_up:
HKUpPre()
SendEvent {blind}{left up}
HKUpPost()
return

Label_right_down:
HKPre()
SendEvent {blind}{right downtemp}
HKPost()
return
Label_right_up:
HKUpPre()
SendEvent {blind}{right up}
HKUpPost()
return

Label_t_down:
HKPre()
SendEvent {blind}{z downtemp}
HKPost()
return
Label_t_up:
HKUpPre()
SendEvent {blind}{z up}
HKUpPost()
return

Label_r_down:
HKPre()
SendEvent {blind}{x downtemp}
HKPost()
return
Label_r_up:
HKUpPre()
SendEvent {blind}{x up}
HKUpPost()
return

Label_m_down:
HKPre()
SendEvent {blind}{d downtemp}
HKPost()
return
Label_m_up:
HKUpPre()
SendEvent {blind}{d up}
HKUpPost()
return

Label_d_down:
HKPre()
SendEvent {blind}{a downtemp}
HKPost()
return
Label_d_up:
HKUpPre()
SendEvent {blind}{a up}
HKUpPost()
return

Label_e_down:
HKPre()
SendEvent {blind}{s downtemp}
HKPost()
return
Label_e_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

Label_a_down:
HKPre()
SendEvent {blind}{v downtemp}
HKPost()
return
Label_a_up:
HKUpPre()
SendEvent {blind}{v up}
HKUpPost()
return

Label_w_down:
HKPre()
SendEvent {blind}{c downtemp}
HKPost()
return
Label_w_up:
HKUpPre()
SendEvent {blind}{c up}
HKUpPost()
return

Label_5_down:
HKPre()
SendEvent {blind}{numpad6 downtemp}
HKPost()
return
Label_5_up:
HKUpPre()
SendEvent {blind}{numpad6 up}
HKUpPost()
return

Label_3_down:
HKPre()
SendEvent {blind}{numpad4 downtemp}
HKPost()
return
Label_3_up:
HKUpPre()
SendEvent {blind}{numpad4 up}
HKUpPost()
return

Label_6_down:
HKPre()
SendEvent {blind}{numpad8 downtemp}
HKPost()
return
Label_6_up:
HKUpPre()
SendEvent {blind}{numpad8 up}
HKUpPost()
return

Label_2_down:
HKPre()
SendEvent {blind}{numpad5 downtemp}
HKPost()
return
Label_2_up:
HKUpPre()
SendEvent {blind}{numpad5 up}
HKUpPost()
return

Label_f_down:
HKPre()
SendEvent {blind}{q downtemp}
HKPost()
return
Label_f_up:
HKUpPre()
SendEvent {blind}{q up}
HKUpPost()
return

