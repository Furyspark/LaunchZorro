contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 2
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

Label_w_down:
HKPre()
SendEvent {blind}{tab downtemp}
HKPost()
return
Label_w_up:
HKUpPre()
SendEvent {blind}{tab up}
HKUpPost()
return

Label_t_down:
HKPre()
SendEvent {blind}{numpadenter downtemp}
HKPost()
return
Label_t_up:
HKUpPre()
SendEvent {blind}{numpadenter up}
HKUpPost()
return

Label_sc029_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_sc029_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

LabelMap2_1_down:
HKPre()
SendEvent {blind}{f1 downtemp}
HKPost()
return
LabelMap2_1_up:
HKUpPre()
SendEvent {blind}{f1 up}
HKUpPost()
return

LabelMap2_2_down:
HKPre()
SendEvent {blind}{f2 downtemp}
HKPost()
return
LabelMap2_2_up:
HKUpPre()
SendEvent {blind}{f2 up}
HKUpPost()
return

LabelMap2_3_down:
HKPre()
SendEvent {blind}{f3 downtemp}
HKPost()
return
LabelMap2_3_up:
HKUpPre()
SendEvent {blind}{f3 up}
HKUpPost()
return

LabelMap2_4_down:
HKPre()
SendEvent {blind}{f4 downtemp}
HKPost()
return
LabelMap2_4_up:
HKUpPre()
SendEvent {blind}{f4 up}
HKUpPost()
return

LabelMap2_5_down:
HKPre()
SendEvent {blind}{f5 downtemp}
HKPost()
return
LabelMap2_5_up:
HKUpPre()
SendEvent {blind}{f5 up}
HKUpPost()
return

LabelMap2_6_down:
HKPre()
SendEvent {blind}{f6 downtemp}
HKPost()
return
LabelMap2_6_up:
HKUpPre()
SendEvent {blind}{f6 up}
HKUpPost()
return

LabelMap2_q_down:
HKPre()
SendEvent {blind}{f7 downtemp}
HKPost()
return
LabelMap2_q_up:
HKUpPre()
SendEvent {blind}{f7 up}
HKUpPost()
return

LabelMap2_w_down:
HKPre()
SendEvent {blind}{f8 downtemp}
HKPost()
return
LabelMap2_w_up:
HKUpPre()
SendEvent {blind}{f8 up}
HKUpPost()
return

LabelMap2_e_down:
HKPre()
SendEvent {blind}{f9 downtemp}
HKPost()
return
LabelMap2_e_up:
HKUpPre()
SendEvent {blind}{f9 up}
HKUpPost()
return

LabelMap2_r_down:
HKPre()
SendEvent {blind}{f10 downtemp}
HKPost()
return
LabelMap2_r_up:
HKUpPre()
SendEvent {blind}{f10 up}
HKUpPost()
return

LabelMap2_t_down:
HKPre()
SendEvent {blind}{f11 downtemp}
HKPost()
return
LabelMap2_t_up:
HKUpPre()
SendEvent {blind}{f11 up}
HKUpPost()
return

LabelMap2_y_down:
HKPre()
SendEvent {blind}{f12 downtemp}
HKPost()
return
LabelMap2_y_up:
HKUpPre()
SendEvent {blind}{f12 up}
HKUpPost()
return

