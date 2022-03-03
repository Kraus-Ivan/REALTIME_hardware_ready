pins.touch_set_mode(TouchTarget.P1, TouchTargetMode.CAPACITIVE) # - KAPACITNÍ - TOUCH
pins.touch_set_mode(TouchTarget.P2, TouchTargetMode.CAPACITIVE) # - KAPACITNÍ - TOUCH

hra_zahajena = False
klic = False
vysledek = ["lol"]

def startovac():
    global hra_zahajena, klic, vysledek
    basic.clear_screen()
    klic = True
    vysledek = []
    soundExpression.happy.play()
    nahodna_doba = randint(3000, 10000)
    basic.pause(nahodna_doba)
    hra_zahajena = True
    music.play_tone(Note.C, music.beat(1500))
control.in_background(startovac)

def on_forever():
    global hra_zahajena, klic, vysledek
    
    #pin1 = pins.analog_read_pin(AnalogPin.P1)  # - ANALOG
    #pin2 = pins.analog_read_pin(AnalogPin.P2)  # - ANALOG

    is_pin1 = input.pin_is_pressed(TouchPin.P1) # - TOUCH
    is_pin2 = input.pin_is_pressed(TouchPin.P2) # - TOUCH

    #is_pin1 = pin1 < 500  # - ANALOG
    #is_pin2 = pin2 < 500  # - ANALOG

    #is_pin1 = pins.digital_read_pin(DigitalPin.P1) == 0 # - DIGITÁLNÍ
    #is_pin2 = pins.digital_read_pin(DigitalPin.P2) == 0 # - DIGITÁLNÍ

    console.log_value("is_piN1", is_pin1)
    console.log_value("is_piN2", is_pin2)
    
    #console.log_value("pin1", pin1) # - ANALOG
    #console.log_value("pin2", pin2) # - ANALOG

    if hra_zahajena and klic:
        if is_pin1  and is_pin2:
            vysledek.append("R")
            klic = False
        if is_pin1:
            vysledek.append("1")
            klic = False
        if is_pin2:
            vysledek.append("2")
            klic = False
    else:
        if is_pin1:
            vysledek.append("B")
        if is_pin2:
            vysledek.append("A")
    vysledek_hry()
basic.forever(on_forever)

def vysledek_hry():
    global hra_zahajena, klic, vysledek
    splneno = False
    if "R" in vysledek:
        basic.show_string("R")
        splneno = True
    elif "1" in vysledek:
        basic.show_number(1)
        splneno = True
    elif "2" in vysledek:
        basic.show_number(2)
        splneno = True
    elif "A" in vysledek and "B" in vysledek and hra_zahajena and klic:
        basic.show_string("C")
        splneno = True
    elif "A" in vysledek and hra_zahajena and klic:
        basic.show_string("A")
        splneno = True
    elif "B" in vysledek and hra_zahajena and klic:
        basic.show_string("B")
        splneno = True

    if splneno:
        hra_zahajena = False
        basic.pause(3000)
        control.in_background(startovac)
