pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Capacitive)
//  - KAPACITNÍ - TOUCH
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Capacitive)
//  - KAPACITNÍ - TOUCH
let hra_zahajena = false
let klic = false
let vysledek = ["lol"]
function startovac() {
    
    basic.clearScreen()
    klic = true
    vysledek = []
    soundExpression.happy.play()
    basic.showLeds(`
    # # # # #
    . # # # .
    . . # . .
    . # # # .
    # # # # #
    `)
    let nahodna_doba = randint(3000, 10000)
    basic.pause(nahodna_doba)
    hra_zahajena = true
    music.playTone(Note.C, music.beat(1500))
}

control.inBackground(startovac)
basic.forever(function on_forever() {
    
    // pin1 = pins.analog_read_pin(AnalogPin.P1)  # - ANALOG
    // pin2 = pins.analog_read_pin(AnalogPin.P2)  # - ANALOG
    let is_pin1 = input.pinIsPressed(TouchPin.P1)
    //  - TOUCH
    let is_pin2 = input.pinIsPressed(TouchPin.P2)
    //  - TOUCH
    // is_pin1 = pin1 < 500  # - ANALOG
    // is_pin2 = pin2 < 500  # - ANALOG
    // is_pin1 = pins.digital_read_pin(DigitalPin.P1) == 0 # - DIGITÁLNÍ
    // is_pin2 = pins.digital_read_pin(DigitalPin.P2) == 0 # - DIGITÁLNÍ
    console.logValue("is_piN1", is_pin1)
    console.logValue("is_piN2", is_pin2)
    // console.log_value("pin1", pin1) # - ANALOG
    // console.log_value("pin2", pin2) # - ANALOG
    if (hra_zahajena && klic) {
        if (is_pin1 && is_pin2) {
            vysledek.push("R")
            klic = false
        }
        
        if (is_pin1) {
            vysledek.push("1")
            klic = false
        }
        
        if (is_pin2) {
            vysledek.push("2")
            klic = false
        }
        
    } else {
        if (is_pin1) {
            vysledek.push("B")
        }
        
        if (is_pin2) {
            vysledek.push("A")
        }
        
    }
    
    vysledek_hry()
})
function vysledek_hry() {
    
    let splneno = false
    if (vysledek.indexOf("R") >= 0) {
        basic.showString("R")
        splneno = true
    } else if (vysledek.indexOf("1") >= 0) {
        basic.showNumber(1)
        splneno = true
    } else if (vysledek.indexOf("2") >= 0) {
        basic.showNumber(2)
        splneno = true
    } else if (vysledek.indexOf("A") >= 0 && vysledek.indexOf("B") >= 0 && hra_zahajena && klic) {
        basic.showString("C")
        splneno = true
    } else if (vysledek.indexOf("A") >= 0 && hra_zahajena && klic) {
        basic.showString("A")
        splneno = true
    } else if (vysledek.indexOf("B") >= 0 && hra_zahajena && klic) {
        basic.showString("B")
        splneno = true
    }
    
    if (splneno) {
        hra_zahajena = false
        basic.pause(3000)
        control.inBackground(startovac)
    }
    
}

