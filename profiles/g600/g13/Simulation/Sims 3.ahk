contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 4
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

Label_w_down:
HKPre()
SendEvent {blind}{sc029 downtemp}
HKPost()
return
Label_w_up:
HKUpPre()
SendEvent {blind}{sc029 up}
HKUpPost()
return

Label_e_down:
HKPre()
SendEvent {blind}{1 downtemp}
HKPost()
return
Label_e_up:
HKUpPre()
SendEvent {blind}{1 up}
HKUpPost()
return

Label_r_down:
HKPre()
SendEvent {blind}{2 downtemp}
HKPost()
return
Label_r_up:
HKUpPre()
SendEvent {blind}{2 up}
HKUpPost()
return

Label_t_down:
HKPre()
SendEvent {blind}{3 downtemp}
HKPost()
return
Label_t_up:
HKUpPre()
SendEvent {blind}{3 up}
HKUpPost()
return

Label_y_down:
HKPre()
SendEvent {blind}{4 downtemp}
HKPost()
return
Label_y_up:
HKUpPre()
SendEvent {blind}{4 up}
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

Label_9_down:
MKPre()
SwitchKeymap(3)
MKPost()
return
Label_9_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_4_down:
HKPre()
SendEvent {blind}{f2 downtemp}
HKPost()
return
Label_4_up:
HKUpPre()
SendEvent {blind}{f2 up}
HKUpPost()
return

Label_8_down:
MKPre()
SwitchKeymap(4)
MKPost()
return
Label_8_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_3_down:
HKPre()
SendEvent {blind}{vkbc downtemp}
HKPost()
return
Label_3_up:
HKUpPre()
SendEvent {blind}{vkbc up}
HKUpPost()
return

Label_5_down:
HKPre()
SendEvent {blind}{vkbe downtemp}
HKPost()
return
Label_5_up:
HKUpPre()
SendEvent {blind}{vkbe up}
HKUpPost()
return

LabelMap2_5_down:
HKPre()
SendEvent {blind}{pgup downtemp}
HKPost()
return
LabelMap2_5_up:
HKUpPre()
SendEvent {blind}{pgup up}
HKUpPost()
return

LabelMap2_t_down:
HKPre()
SendEvent {blind}{pgdn downtemp}
HKPost()
return
LabelMap2_t_up:
HKUpPre()
SendEvent {blind}{pgdn up}
HKUpPost()
return

LabelMap2_e_down:
HKPre()
SendEvent {blind}{end downtemp}
HKPost()
return
LabelMap2_e_up:
HKUpPre()
SendEvent {blind}{end up}
HKUpPost()
return

LabelMap2_3_down:
HKPre()
SendEvent {blind}{home downtemp}
HKPost()
return
LabelMap2_3_up:
HKUpPre()
SendEvent {blind}{home up}
HKUpPost()
return

LabelMap2_4_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{enter downtemp}
HKPost()
return
LabelMap2_4_up:
HKUpPre()
SendEvent {blind}{enter up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap2_r_down:
HKPre()
SendEvent {blind}{enter downtemp}
HKPost()
return
LabelMap2_r_up:
HKUpPre()
SendEvent {blind}{enter up}
HKUpPost()
return

LabelMap3_t_down:
HKPre()
SendEvent {blind}{i downtemp}
HKPost()
return
LabelMap3_t_up:
HKUpPre()
SendEvent {blind}{i up}
HKUpPost()
return

LabelMap3_e_down:
HKPre()
SendEvent {blind}{j downtemp}
HKPost()
return
LabelMap3_e_up:
HKUpPre()
SendEvent {blind}{j up}
HKUpPost()
return

LabelMap4_f_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
SendEvent {blind}{y downtemp}
HKPost()
return
LabelMap4_f_up:
HKUpPre()
SendEvent {blind}{y up}
SendEvent {blind}{lctrl up}
HKUpPost()
return

LabelMap4_s_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
SendEvent {blind}{z downtemp}
HKPost()
return
LabelMap4_s_up:
HKUpPre()
SendEvent {blind}{z up}
SendEvent {blind}{lctrl up}
HKUpPost()
return

LabelMap4_q_down:
HKPre()
SendEvent {blind}{delete downtemp}
HKPost()
return
LabelMap4_q_up:
HKUpPre()
SendEvent {blind}{delete up}
HKUpPost()
return

LabelMap4_t_down:
HKPre()
SendEvent {blind}{h downtemp}
HKPost()
return
LabelMap4_t_up:
HKUpPre()
SendEvent {blind}{h up}
HKUpPost()
return

LabelMap4_e_down:
HKPre()
SendEvent {blind}{e downtemp}
HKPost()
return
LabelMap4_e_up:
HKUpPre()
SendEvent {blind}{e up}
HKUpPost()
return

LabelMap4_r_down:
HKPre()
SendEvent {blind}{r downtemp}
HKPost()
return
LabelMap4_r_up:
HKUpPre()
SendEvent {blind}{r up}
HKUpPost()
return

LabelMap4_w_down:
HKPre()
SendEvent {blind}{k downtemp}
HKPost()
return
LabelMap4_w_up:
HKUpPre()
SendEvent {blind}{k up}
HKUpPost()
return

