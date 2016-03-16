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

Label_a_down:
HKPre()
SendEvent {blind}{tab downtemp}
HKPost()
return
Label_a_up:
HKUpPre()
SendEvent {blind}{tab up}
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

LabelMap2_2_down:
HKPre()
SendEvent {blind}{1 downtemp}
HKPost()
return
LabelMap2_2_up:
HKUpPre()
SendEvent {blind}{1 up}
HKUpPost()
return

LabelMap2_3_down:
HKPre()
SendEvent {blind}{2 downtemp}
HKPost()
return
LabelMap2_3_up:
HKUpPre()
SendEvent {blind}{2 up}
HKUpPost()
return

LabelMap2_4_down:
HKPre()
SendEvent {blind}{3 downtemp}
HKPost()
return
LabelMap2_4_up:
HKUpPre()
SendEvent {blind}{3 up}
HKUpPost()
return

LabelMap2_5_down:
HKPre()
SendEvent {blind}{4 downtemp}
HKPost()
return
LabelMap2_5_up:
HKUpPre()
SendEvent {blind}{4 up}
HKUpPost()
return

LabelMap2_6_down:
HKPre()
SendEvent {blind}{5 downtemp}
HKPost()
return
LabelMap2_6_up:
HKUpPre()
SendEvent {blind}{5 up}
HKUpPost()
return

LabelMap2_a_down:
HKPre()
SendEvent {blind}{6 downtemp}
HKPost()
return
LabelMap2_a_up:
HKUpPre()
SendEvent {blind}{6 up}
HKUpPost()
return

LabelMap2_s_down:
HKPre()
SendEvent {blind}{7 downtemp}
HKPost()
return
LabelMap2_s_up:
HKUpPre()
SendEvent {blind}{7 up}
HKUpPost()
return

LabelMap2_d_down:
HKPre()
SendEvent {blind}{8 downtemp}
HKPost()
return
LabelMap2_d_up:
HKUpPre()
SendEvent {blind}{8 up}
HKUpPost()
return

LabelMap2_f_down:
HKPre()
SendEvent {blind}{9 downtemp}
HKPost()
return
LabelMap2_f_up:
HKUpPre()
SendEvent {blind}{9 up}
HKUpPost()
return

LabelMap2_g_down:
HKPre()
SendEvent {blind}{0 downtemp}
HKPost()
return
LabelMap2_g_up:
HKUpPre()
SendEvent {blind}{0 up}
HKUpPost()
return

LabelMap2_1_down:
HKPre()
SendEvent {blind}{vkbd downtemp}
HKPost()
return
LabelMap2_1_up:
HKUpPre()
SendEvent {blind}{vkbd up}
HKUpPost()
return

LabelMap2_7_down:
HKPre()
SendEvent {blind}{vkbb downtemp}
HKPost()
return
LabelMap2_7_up:
HKUpPre()
SendEvent {blind}{vkbb up}
HKUpPost()
return

