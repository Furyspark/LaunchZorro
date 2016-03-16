contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
return

Label_e_down:
HKPre()
ActionKey_up_Down("Key_e")
HKPost("Key_e")
return
Label_e_up:
HKUpPre()
ActionKey_up_Up("Key_e")
HKUpPost("Key_e")
return

Label_d_down:
HKPre()
ActionKey_down_Down("Key_d")
HKPost("Key_d")
return
Label_d_up:
HKUpPre()
ActionKey_down_Up("Key_d")
HKUpPost("Key_d")
return

Label_s_down:
HKPre()
ActionKey_left_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_left_Up("Key_s")
HKUpPost("Key_s")
return

Label_f_down:
HKPre()
ActionKey_right_Down("Key_f")
HKPost("Key_f")
return
Label_f_up:
HKUpPre()
ActionKey_right_Up("Key_f")
HKUpPost("Key_f")
return

Label_k_down:
HKPre()
ActionKey_lctrl_Down("Key_k")
HKPost("Key_k")
return
Label_k_up:
HKUpPre()
ActionKey_lctrl_Up("Key_k")
HKUpPost("Key_k")
return

Label_j_down:
HKPre()
ActionKey_lalt_Down("Key_j")
HKPost("Key_j")
return
Label_j_up:
HKUpPre()
ActionKey_lalt_Up("Key_j")
HKUpPost("Key_j")
return

Label_vkba_down:
HKPre()
While GetKeyState("Key_vkba", "P") {
ActionKey_lalt_Down("Key_vkba")
Sleep, 10
ActionKey_lalt_Up("Key_vkba")
ActionKey_lalt_Up("Key_vkba")
Sleep, 30
}
HKPost("Key_vkba")
return
Label_vkba_up:
HKUpPre()
ActionKey_lalt_Up("Key_vkba")
HKUpPost("Key_vkba")
return

Label_t_down:
HKPre()
ActionKey_pgup_Down("Key_t")
HKPost("Key_t")
return
Label_t_up:
HKUpPre()
ActionKey_pgup_Up("Key_t")
HKUpPost("Key_t")
return

Label_g_down:
HKPre()
ActionKey_pgdn_Down("Key_g")
HKPost("Key_g")
return
Label_g_up:
HKUpPre()
ActionKey_pgdn_Up("Key_g")
HKUpPost("Key_g")
return

