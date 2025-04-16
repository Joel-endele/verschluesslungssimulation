function macheEtwas () {
    basic.pause(1000)
    Send = randint(0, 1)
    basic.showNumber(Send)
    Ready = 1
}
radio.onReceivedNumber(function (receivedNumber) {
    if (Go == 0) {
        if (Mode == 1) {
            basic.showLeds(`
                . . # . .
                # . . . #
                . # # # .
                # . . . #
                . # # # .
                `)
            Ready_messen = 1
            Empfangen = receivedNumber
        }
    }
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (Go == 0) {
        if (Mode == 0 && Ready == 1) {
            basic.showString("A")
            radio.sendNumber(Send)
            Ready = 0
            basic.pause(100)
            radio.sendString("A")
        }
        if (Ready_messen == 1 && Mode == 1) {
            basic.pause(100)
            if (Messung == "A") {
                basic.showIcon(IconNames.Yes)
                Verschlüsselung.push(Empfangen)
                radio.sendString("T")
            } else {
                basic.showIcon(IconNames.No)
                radio.sendString("F")
            }
        }
    }
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (Go == 0) {
        if (Mode == 0) {
            basic.showLeds(`
                . . . . #
                . # . # #
                . . # # .
                . # # # #
                # # . . #
                `)
            Mode = 1
        } else {
            basic.showLeds(`
                . # # # .
                # . . . #
                . # # # .
                # . . . #
                . . # . .
                `)
            Mode = 0
        }
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (Go == 0) {
        if (Mode == 0 && Ready == 1) {
            basic.showString("B")
            radio.sendNumber(Send + 2)
            Ready = 0
            basic.pause(100)
            radio.sendString("B")
        }
        if (Ready_messen == 1 && Mode == 1) {
            basic.pause(100)
            if (Messung == "B") {
                basic.showIcon(IconNames.Yes)
                Verschlüsselung.push(Empfangen - 2)
                radio.sendString("T")
            } else {
                basic.showIcon(IconNames.No)
                radio.sendString("F")
            }
        }
    }
})
radio.onReceivedString(function (receivedString) {
    if (Go == 0) {
        if (Mode == 0) {
            if (receivedString == "T") {
                basic.showIcon(IconNames.Yes)
                Verschlüsselung.push(Send)
                if (Verschlüsselung.length < 5) {
                    macheEtwas()
                } else {
                    basic.showString("G")
                    radio.sendString("G")
                    Go = 1
                }
            }
            if (receivedString == "F") {
                basic.showIcon(IconNames.No)
                macheEtwas()
            }
        }
        if (Ready_messen == 1 && (Mode == 1 && (receivedString == "A" || receivedString == "B"))) {
            Messung = receivedString
        }
        if (receivedString == "G" && Mode == 1) {
            basic.showString("G")
            Go = 1
        }
    }
})
let Messung = ""
let Empfangen = 0
let Ready_messen = 0
let Mode = 0
let Go = 0
let Ready = 0
let Send = 0
let Verschlüsselung: number[] = []
Verschlüsselung = []
macheEtwas()
radio.sendString("H")
basic.forever(function () {
	
})
