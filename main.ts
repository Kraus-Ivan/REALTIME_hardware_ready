// pins.touch_set_mode(TouchTarget.P1, TouchTargetMode.CAPACITIVE) # - KAPACITNÍ    
// pins.touch_set_mode(TouchTarget.P2, TouchTargetMode.CAPACITIVE) # - KAPACITNÍ
let hra_zahajena = false
let vysledek_int = 0
let vysledek_str = "X"
let klic = false
let countA = 0
let countB = 0
function startovac() {
    
    countA = 0
    countB = 0
    vysledek_int = 0
    vysledek_str = "X"
    basic.clearScreen()
    klic = true
    soundExpression.happy.play()
    let nahodna_doba = randint(3000, 10000)
    basic.pause(nahodna_doba)
    hra_zahajena = true
    music.playTone(Note.C, music.beat(1500))
}

control.inBackground(startovac)
basic.forever(function on_forever() {
    
    let pin1 = pins.analogReadPin(AnalogPin.P1)
    //  - ANALOG
    let pin2 = pins.analogReadPin(AnalogPin.P2)
    //  - ANALOG
    // is_pin1 = input.pin_is_pressed(TouchPin.P1) # - TOUCH
    // is_pin2 = input.pin_is_pressed(TouchPin.P2) # - TOUCH
    let is_pin1 = pin1 < 500
    //  - ANALOG
    let is_pin2 = pin2 < 500
    //  - ANALOG
    // is_pin1 = pins.digital_read_pin(DigitalPin.P1) == 0 # - DIGITÁLNÍ
    // is_pin2 = pins.digital_read_pin(DigitalPin.P2) == 0 # - DIGITÁLNÍ
    console.logValue("is_piN1", is_pin1)
    console.logValue("is_piN2", is_pin2)
    console.logValue("pin1", pin1)
    //  - ANALOG
    console.logValue("pin2", pin2)
    //  - ANALOG
    if (hra_zahajena && klic) {
        if (is_pin1 && is_pin2) {
            vysledek_str = "R"
            klic = false
        }
        
        if (is_pin1) {
            vysledek_int = 1
            klic = false
        }
        
        if (is_pin2) {
            vysledek_int = 2
            klic = false
        }
        
    } else {
        if (is_pin1) {
            countA = +1
        }
        
        if (is_pin2) {
            countB = +1
        }
        
    }
    
    vysledek()
})
function vysledek() {
    
    let splneno = false
    if (vysledek_str == "R") {
        basic.showString("R")
        splneno = true
    } else if (vysledek_int == 1) {
        basic.showNumber(1)
        splneno = true
    } else if (vysledek_int == 2) {
        basic.showNumber(2)
        splneno = true
    } else if (countB > 0 && countA > 0 && hra_zahajena && klic) {
        basic.showString("C")
        splneno = true
    } else if (countB > 0 && countA == 0 && hra_zahajena && klic) {
        basic.showString("A")
        splneno = true
    } else if (countA > 0 && countB == 0 && hra_zahajena && klic) {
        basic.showString("B")
        splneno = true
    }
    
    if (splneno) {
        hra_zahajena = false
        basic.pause(3000)
        control.inBackground(startovac)
    }
    
}

