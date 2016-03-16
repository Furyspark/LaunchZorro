contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 1
return

Label_escape_down:
HKPre()
ActionKey_escape_Down("Key_escape")
HKPost("Key_escape")
return
Label_escape_up:
HKUpPre()
ActionKey_escape_Up("Key_escape")
HKUpPost("Key_escape")
return

Label_scrolllock_down:
HKPre()
ActionKey_scrolllock_Down("Key_scrolllock")
HKPost("Key_scrolllock")
return
Label_scrolllock_up:
HKUpPre()
ActionKey_scrolllock_Up("Key_scrolllock")
HKUpPost("Key_scrolllock")
return

Label_up_down:
HKPre()
ActionKey_up_Down("Key_up")
HKPost("Key_up")
return
Label_up_up:
HKUpPre()
ActionKey_up_Up("Key_up")
HKUpPost("Key_up")
return

Label_down_down:
HKPre()
ActionKey_down_Down("Key_down")
HKPost("Key_down")
return
Label_down_up:
HKUpPre()
ActionKey_down_Up("Key_down")
HKUpPost("Key_down")
return

Label_left_down:
HKPre()
ActionKey_left_Down("Key_left")
HKPost("Key_left")
return
Label_left_up:
HKUpPre()
ActionKey_left_Up("Key_left")
HKUpPost("Key_left")
return

Label_right_down:
HKPre()
ActionKey_right_Down("Key_right")
HKPost("Key_right")
return
Label_right_up:
HKUpPre()
ActionKey_right_Up("Key_right")
HKUpPost("Key_right")
return

Label_r_down:
HKPre()
ActionKey_vkbe_Down("Key_r")
HKPost("Key_r")
return
Label_r_up:
HKUpPre()
ActionKey_vkbe_Up("Key_r")
HKUpPost("Key_r")
return

Label_w_down:
HKPre()
ActionKey_vkbc_Down("Key_w")
HKPost("Key_w")
return
Label_w_up:
HKUpPre()
ActionKey_vkbc_Up("Key_w")
HKUpPost("Key_w")
return

Label_a_down:
HKPre()
ActionKey_v_Down("Key_a")
HKPost("Key_a")
return
Label_a_up:
HKUpPre()
ActionKey_v_Up("Key_a")
HKUpPost("Key_a")
return

Label_s_down:
HKPre()
ActionKey_n_Down("Key_s")
HKPost("Key_s")
return
Label_s_up:
HKUpPre()
ActionKey_n_Up("Key_s")
HKUpPost("Key_s")
return

Label_2_down:
HKPre()
ActionKey_lctrl_Down("Key_2")
HKPost("Key_2")
return
Label_2_up:
HKUpPre()
ActionKey_lctrl_Up("Key_2")
HKUpPost("Key_2")
return

Label_3_down:
HKPre()
ActionKey_lalt_Down("Key_3")
HKPost("Key_3")
return
Label_3_up:
HKUpPre()
ActionKey_lalt_Up("Key_3")
HKUpPost("Key_3")
return

Label_4_down:
HKPre()
ActionKey_lshift_Down("Key_4")
HKPost("Key_4")
return
Label_4_up:
HKUpPre()
ActionKey_lshift_Up("Key_4")
HKUpPost("Key_4")
return

