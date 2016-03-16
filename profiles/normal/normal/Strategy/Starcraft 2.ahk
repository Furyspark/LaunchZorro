contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
return

Label_e_down:
HKPre()
SendEvent {blind}{up downtemp}
HKPost()
return
Label_e_up:
HKUpPre()
SendEvent {blind}{up up}
HKUpPost()
return

Label_d_down:
HKPre()
SendEvent {blind}{down downtemp}
HKPost()
return
Label_d_up:
HKUpPre()
SendEvent {blind}{down up}
HKUpPost()
return

Label_s_down:
HKPre()
SendEvent {blind}{left downtemp}
HKPost()
return
Label_s_up:
HKUpPre()
SendEvent {blind}{left up}
HKUpPost()
return

Label_f_down:
HKPre()
SendEvent {blind}{right downtemp}
HKPost()
return
Label_f_up:
HKUpPre()
SendEvent {blind}{right up}
HKUpPost()
return

Label_r_down:
HKPre()
SendEvent {blind}{a downtemp}
HKPost()
return
Label_r_up:
HKUpPre()
SendEvent {blind}{a up}
HKUpPost()
return

Label_w_down:
HKPre()
SendEvent {blind}{s downtemp}
HKPost()
return
Label_w_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

Label_lshift_down:
HKPre()
ShiftDown()
HKPost()
return
Label_lshift_up:
HKUpPre()
ShiftUp()
HKUpPost()
return

Label_lctrl_down:
HKPre()
CtrlDown()
HKPost()
return
Label_lctrl_up:
HKUpPre()
CtrlUp()
HKUpPost()
return

Label_lalt_down:
HKPre()
AltDown()
HKPost()
return
Label_lalt_up:
HKUpPre()
AltUp()
HKUpPost()
return

Label_space_down:
HKPre()
SendEvent {blind}{space downtemp}
HKPost()
return
Label_space_up:
HKUpPre()
SendEvent {blind}{space up}
HKUpPost()
return

Label_t_down:
HKPre()
SendEvent {blind}{w downtemp}
HKPost()
return
Label_t_up:
HKUpPre()
SendEvent {blind}{w up}
HKUpPost()
return

Label_1_down:
HKPre()
SendEvent {blind}{1 downtemp}
HKPost()
return
Label_1_up:
HKUpPre()
SendEvent {blind}{1 up}
HKUpPost()
return

Label_2_down:
HKPre()
SendEvent {blind}{2 downtemp}
HKPost()
return
Label_2_up:
HKUpPre()
SendEvent {blind}{2 up}
HKUpPost()
return

Label_3_down:
HKPre()
SendEvent {blind}{3 downtemp}
HKPost()
return
Label_3_up:
HKUpPre()
SendEvent {blind}{3 up}
HKUpPost()
return

Label_4_down:
HKPre()
SendEvent {blind}{4 downtemp}
HKPost()
return
Label_4_up:
HKUpPre()
SendEvent {blind}{4 up}
HKUpPost()
return

Label_5_down:
HKPre()
SendEvent {blind}{5 downtemp}
HKPost()
return
Label_5_up:
HKUpPre()
SendEvent {blind}{5 up}
HKUpPost()
return

Label_x_down:
HKPre()
SendEvent {blind}{b downtemp}
HKPost()
return
Label_x_up:
HKUpPre()
SendEvent {blind}{b up}
HKUpPost()
return

Label_c_down:
HKPre()
SendEvent {blind}{v downtemp}
HKPost()
return
Label_c_up:
HKUpPre()
SendEvent {blind}{v up}
HKUpPost()
return

Label_v_down:
HKPre()
SendEvent {blind}{r downtemp}
HKPost()
return
Label_v_up:
HKUpPre()
SendEvent {blind}{r up}
HKUpPost()
return

Label_b_down:
HKPre()
SendEvent {blind}{r downtemp}
HKPost()
return
Label_b_up:
HKUpPre()
SendEvent {blind}{r up}
HKUpPost()
return

Label_f13_down:
HKPre()
SendEvent {blind}{f13 downtemp}
HKPost()
return
Label_f13_up:
HKUpPre()
SendEvent {blind}{f13 up}
HKUpPost()
return

