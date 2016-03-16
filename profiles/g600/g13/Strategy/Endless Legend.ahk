contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 2
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
SendEvent {blind}{lctrl downtemp}
SendEvent {blind}{lalt downtemp}
HKPost()
return
Label_vkbf_up:
HKUpPre()
SendEvent {blind}{lalt up}
SendEvent {blind}{lctrl up}
HKUpPost()
return

Label_4_down:
HKPre()
SendEvent {blind}{numpadenter downtemp}
HKPost()
return
Label_4_up:
HKUpPre()
SendEvent {blind}{numpadenter up}
HKUpPost()
return

LabelMap2_2_down:
HKPre()
SendEvent {blind}{f1 downtemp}
HKPost()
return
LabelMap2_2_up:
HKUpPre()
SendEvent {blind}{f1 up}
HKUpPost()
return

LabelMap2_3_down:
HKPre()
SendEvent {blind}{f2 downtemp}
HKPost()
return
LabelMap2_3_up:
HKUpPre()
SendEvent {blind}{f2 up}
HKUpPost()
return

LabelMap2_4_down:
HKPre()
SendEvent {blind}{f3 downtemp}
HKPost()
return
LabelMap2_4_up:
HKUpPre()
SendEvent {blind}{f3 up}
HKUpPost()
return

LabelMap2_5_down:
HKPre()
SendEvent {blind}{f4 downtemp}
HKPost()
return
LabelMap2_5_up:
HKUpPre()
SendEvent {blind}{f4 up}
HKUpPost()
return

LabelMap2_6_down:
HKPre()
SendEvent {blind}{f5 downtemp}
HKPost()
return
LabelMap2_6_up:
HKUpPre()
SendEvent {blind}{f5 up}
HKUpPost()
return

LabelMap2_a_down:
HKPre()
SendEvent {blind}{f6 downtemp}
HKPost()
return
LabelMap2_a_up:
HKUpPre()
SendEvent {blind}{f6 up}
HKUpPost()
return

LabelMap2_s_down:
HKPre()
SendEvent {blind}{f7 downtemp}
HKPost()
return
LabelMap2_s_up:
HKUpPre()
SendEvent {blind}{f7 up}
HKUpPost()
return

LabelMap2_d_down:
HKPre()
SendEvent {blind}{f8 downtemp}
HKPost()
return
LabelMap2_d_up:
HKUpPre()
SendEvent {blind}{f8 up}
HKUpPost()
return

LabelMap2_f_down:
HKPre()
SendEvent {blind}{f9 downtemp}
HKPost()
return
LabelMap2_f_up:
HKUpPre()
SendEvent {blind}{f9 up}
HKUpPost()
return

LabelMap2_g_down:
HKPre()
SendEvent {blind}{f10 downtemp}
HKPost()
return
LabelMap2_g_up:
HKUpPre()
SendEvent {blind}{f10 up}
HKUpPost()
return

