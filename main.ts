/**
 * EletroBlocks block types
 */
enum ebBlockType {
    //% block="Motor Servo"
    eboServoMotor = 0,
    //% block="LED RGB"
    eboRGB = 1,
    //% block="Sensor Umidade"
    ebiHumiditySensor = 2,
    //% block="Sensor Infravermelho"
    ebiInfraredSensor = 3
}

/**
 * Shield Port 
 */
enum ebPort {
    //% block="Entrada 1"
    ebpInput1 = 0,
    //% block="Entrada 2"
    ebpInput2 = 1,
    //% block="Entrada 3"
    ebpInput3 = 2,
    //% block="Saída 1"
    ebpOutput1 = 3,
    //% block="Saída 2"
    ebpOutput2 = 4,
    //% block="Saída 3"
    ebpOutput3 = 5
}

//% color="#AA278D" weight=100 icon="\uf1b2" block="EletroBlocks"
//% groups=['Blocos', 'Funções']
namespace eletroblocks {
    /**
     * EletroBlocks Block
     */
    export class Block {
        _pin: AnalogPin;
        _type: ebBlockType;

        //% blockId="eletroblocks_setOutput" block="configura %bloco para %outputValue"
        //% this.outputValue.min=0 this.outputValue.max=180
        setOutput(outputValue: number): void {
            pins.analogWritePin(this._pin, outputValue);
        }

        //% blockId="eletroblocks_getInput" block="lê %bloco"
        getInput(): number {
            // const mavg = movingAverage(200);
            // let avg;

            // for (let i = 1; i <= 200; i++) {
            //     avg = mavg(pins.analogReadPin(this._pin))
            // }

            return pins.analogReadPin(this._pin);
        }
    }

    //% blockId="eletroblocks_createInput" block="%portNumber como %blockType"
    //% blockSetVariable=bloco
    export function create(port: ebPort, blockType: ebBlockType): Block {
        let block = new Block();

        switch (port) {
            case ebPort.ebpInput1: {
                block._pin = AnalogPin.P0;

                break;
            }
            case ebPort.ebpInput2: {
                block._pin = AnalogPin.P1;
                break;
            }
            case ebPort.ebpInput3: {
                block._pin = AnalogPin.P2;
                break;
            }
            case ebPort.ebpOutput1: block._pin = AnalogPin.P13;
                break;
            case ebPort.ebpOutput2: block._pin = AnalogPin.P14;
                break;
            case ebPort.ebpOutput3: block._pin = AnalogPin.P15;
                break;
        }

        return block;
    }

    function movingAverage(sample: number) {
        let window: number[] = [];

        return function (val: number) {
            let sum = 0;

            window.push(val);

            if (window.length > sample) {
                window.shift();
            }

            for (let i = 0; i < window.length; i++) {
                sum += window[i];
            }

            return sum / window.length;
        };
    }
}
