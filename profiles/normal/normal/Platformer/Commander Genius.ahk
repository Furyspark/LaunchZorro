contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
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

Label_j_down:
HKPre()
SendEvent {blind}{z downtemp}
HKPost()
return
Label_j_up:
HKUpPre()
SendEvent {blind}{z up}
HKUpPost()
return

Label_k_down:
HKPre()
SendEvent {blind}{x downtemp}
HKPost()
return
Label_k_up:
HKUpPre()
SendEvent {blind}{x up}
HKUpPost()
return

Label_l_down:
HKPre()
SendEvent {blind}{c downtemp}
HKPost()
return
Label_l_up:
HKUpPre()
SendEvent {blind}{c up}
HKUpPost()
return

Label_r_down:
HKPre()
SendEvent {blind}{enter downtemp}
HKPost()
return
Label_r_up:
HKUpPre()
SendEvent {blind}{enter up}
HKUpPost()
return

