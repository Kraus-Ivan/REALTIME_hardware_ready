#pins.touch_set_mode(TouchTarget.P1, TouchTargetMode.CAPACITIVE) # - KAPACITNÍ    
#pins.touch_set_mode(TouchTarget.P2, TouchTargetMode.CAPACITIVE) # - KAPACITNÍ

hra_zahajena = False
vysledek_int = 0
vysledek_str = "X"
klic = False
countA = 0
countB = 0

def startovac():
    global hra_zahajena, klic, countA, countB, vysledek_str, vysledek_int
    countA = 0
    countB = 0
    vysledek_int = 0
    vysledek_str = "X"
    basic.clear_screen()
    klic = True
    soundExpression.happy.play()
    nahodna_doba = randint(3000, 10000)
    basic.pause(nahodna_doba)
    hra_zahajena = True
    music.play_tone(Note.C, music.beat(1500))
control.in_background(startovac)

def on_forever():
    global hra_zahajena, vysledek_int, vysledek_str, klic, countA, countB
    
    #pin1 = pins.analog_read_pin(AnalogPin.P1)  # - ANALOG
    #pin2 = pins.analog_read_pin(AnalogPin.P2)  # - ANALOG

    #is_pin1 = input.pin_is_pressed(TouchPin.P1) # - TOUCH
    #is_pin2 = input.pin_is_pressed(TouchPin.P2) # - TOUCH

    #is_pin1 = pin1 < 500  # - ANALOG
    #is_pin2 = pin2 < 500  # - ANALOG

    is_pin1 = pins.digital_read_pin(DigitalPin.P1) == 0 # - DIGITÁLNÍ
    is_pin2 = pins.digital_read_pin(DigitalPin.P2) == 0 # - DIGITÁLNÍ

    #console.log_value("is_piN1", is_pin1)
    #console.log_value("is_piN2", is_pin1)
    
    #console.log_value("pin1", pin1) # - ANALOG
    #console.log_value("pin2", pin2) # - ANALOG

    if hra_zahajena and klic:
        if is_pin1  and is_pin2:
            vysledek_str = "R"
            klic = False
        if is_pin1:
            vysledek_int = 1
            klic = False
        if is_pin2:
            vysledek_int = 2
            klic = False
        
    else:
        if is_pin1:
            countA =+ 1
        if is_pin2:
            countB =+ 1
            
    vysledek()
basic.forever(on_forever)

def vysledek():
    global hra_zahajena, klic, vysledek_int, vysledek_str, countA, countB
    splneno = False
    if vysledek_str == "R":
        basic.show_string("R")
        splneno = True
    elif vysledek_int == 1:
        basic.show_number(1)
        splneno = True
    elif vysledek_int == 2:
        basic.show_number(2)
        splneno = True
    elif countB > 0 and countA > 0 and hra_zahajena and klic:
        basic.show_string("C")
        splneno = True
    elif countB > 0 and countA == 0 and hra_zahajena and klic:
        basic.show_string("A")
        splneno = True
    elif countA > 0 and countB == 0 and hra_zahajena and klic:
        basic.show_string("B")
        splneno = True

    if splneno:
        hra_zahajena = False
        basic.pause(3000)
        control.in_background(startovac)

