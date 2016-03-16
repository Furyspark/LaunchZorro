contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 2
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

Label_d_down:
HKPre()
SendEvent {blind}{s downtemp}
HKPost()
return
Label_d_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

Label_s_down:
HKPre()
SendEvent {blind}{a downtemp}
HKPost()
return
Label_s_up:
HKUpPre()
SendEvent {blind}{a up}
HKUpPost()
return

Label_f_down:
HKPre()
SendEvent {blind}{d downtemp}
HKPost()
return
Label_f_up:
HKUpPre()
SendEvent {blind}{d up}
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

Label_tab_down:
HKPre()
SendEvent {blind}{tab downtemp}
HKPost()
return
Label_tab_up:
HKUpPre()
SendEvent {blind}{tab up}
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

Label_6_down:
HKPre()
SendEvent {blind}{6 downtemp}
HKPost()
return
Label_6_up:
HKUpPre()
SendEvent {blind}{6 up}
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

LabelMap2_1_down:
HKPre()
SendEvent {blind}{7 downtemp}
HKPost()
return
LabelMap2_1_up:
HKUpPre()
SendEvent {blind}{7 up}
HKUpPost()
return

LabelMap2_2_down:
HKPre()
SendEvent {blind}{8 downtemp}
HKPost()
return
LabelMap2_2_up:
HKUpPre()
SendEvent {blind}{8 up}
HKUpPost()
return

LabelMap2_3_down:
HKPre()
SendEvent {blind}{9 downtemp}
HKPost()
return
LabelMap2_3_up:
HKUpPre()
SendEvent {blind}{9 up}
HKUpPost()
return

LabelMap2_4_down:
HKPre()
SendEvent {blind}{0 downtemp}
HKPost()
return
LabelMap2_4_up:
HKUpPre()
SendEvent {blind}{0 up}
HKUpPost()
return

LabelMap2_5_down:
HKPre()
SendEvent {blind}{vkbd downtemp}
HKPost()
return
LabelMap2_5_up:
HKUpPre()
SendEvent {blind}{vkbd up}
HKUpPost()
return

LabelMap2_6_down:
HKPre()
SendEvent {blind}{vkbb downtemp}
HKPost()
return
LabelMap2_6_up:
HKUpPre()
SendEvent {blind}{vkbb up}
HKUpPost()
return

