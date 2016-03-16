contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 3
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
SendEvent {blind}{x downtemp}
HKPost()
return
Label_t_up:
HKUpPre()
SendEvent {blind}{x up}
HKUpPost()
return

Label_r_down:
HKPre()
SendEvent {blind}{z downtemp}
HKPost()
return
Label_r_up:
HKUpPre()
SendEvent {blind}{z up}
HKUpPost()
return

Label_e_down:
HKPre()
SendEvent {blind}{v downtemp}
HKPost()
return
Label_e_up:
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

Label_3_down:
HKPre()
SendEvent {blind}{a downtemp}
HKPost()
return
Label_3_up:
HKUpPre()
SendEvent {blind}{a up}
HKUpPost()
return

Label_5_down:
HKPre()
SendEvent {blind}{s downtemp}
HKPost()
return
Label_5_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

Label_s_down:
HKPre()
SendEvent {blind}{w downtemp}
HKPost()
return
Label_s_up:
HKUpPre()
SendEvent {blind}{w up}
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

Label_i_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_i_up:
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

Label_m_down:
HKPre()
SendEvent {blind}{space downtemp}
HKPost()
return
Label_m_up:
HKUpPre()
SendEvent {blind}{space up}
HKUpPost()
return

LabelMap2_r_down:
HKPre()
SendEvent {blind}{f2 downtemp}
HKPost()
return
LabelMap2_r_up:
HKUpPre()
SendEvent {blind}{f2 up}
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

LabelMap2_e_down:
HKPre()
SendEvent {blind}{f6 downtemp}
HKPost()
return
LabelMap2_e_up:
HKUpPre()
SendEvent {blind}{f6 up}
HKUpPost()
return

LabelMap2_t_down:
HKPre()
SendEvent {blind}{f7 downtemp}
HKPost()
return
LabelMap2_t_up:
HKUpPre()
SendEvent {blind}{f7 up}
HKUpPost()
return

LabelMap3_r_down:
HKPre()
While GetKeyState("r", "P") {
SendEvent {blind}{z downtemp}
Sleep, 10
SendEvent {blind}{z up}
Sleep, 30
}
HKPost()
return
LabelMap3_r_up:
HKUpPre()
SendEvent {blind}{z up}
HKUpPost()
return

LabelMap3_t_down:
HKPre()
While GetKeyState("t", "P") {
SendEvent {blind}{x downtemp}
Sleep, 10
SendEvent {blind}{x up}
Sleep, 30
}
HKPost()
return
LabelMap3_t_up:
HKUpPre()
SendEvent {blind}{x up}
HKUpPost()
return

LabelMap3_w_down:
HKPre()
While GetKeyState("w", "P") {
SendEvent {blind}{c downtemp}
Sleep, 10
SendEvent {blind}{c up}
Sleep, 30
}
HKPost()
return
LabelMap3_w_up:
HKUpPre()
SendEvent {blind}{c up}
HKUpPost()
return

LabelMap3_e_down:
HKPre()
While GetKeyState("e", "P") {
SendEvent {blind}{v downtemp}
Sleep, 10
SendEvent {blind}{v up}
Sleep, 30
}
HKPost()
return
LabelMap3_e_up:
HKUpPre()
SendEvent {blind}{v up}
HKUpPost()
return

LabelMap3_3_down:
HKPre()
While GetKeyState("3", "P") {
SendEvent {blind}{a downtemp}
Sleep, 10
SendEvent {blind}{a up}
Sleep, 30
}
HKPost()
return
LabelMap3_3_up:
HKUpPre()
SendEvent {blind}{a up}
HKUpPost()
return

LabelMap3_5_down:
HKPre()
While GetKeyState("5", "P") {
SendEvent {blind}{s downtemp}
Sleep, 10
SendEvent {blind}{s up}
Sleep, 30
}
HKPost()
return
LabelMap3_5_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

