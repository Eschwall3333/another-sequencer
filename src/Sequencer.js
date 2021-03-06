import React, { Component } from 'react'
import cx from 'classnames'
import Synth from './Synth'
import WebMIDI from './midi.js';
import NOTES from './notes'
import { getKeyByValue } from './helpers.js'
import { tsConstructorType } from '@babel/types';




// const GRID_SIZE = 8
// const CIRCLE_PAD_POSITIONS = 'ABCDEFGH12345678'
// // const TOP_CIRCLE_BUTTON_VALUE = 176
// const NOT_TOP_CIRCLE_BUTTON_VALUE = 144
// const PRESSED_DOWN_VALUE = 127

const COLORS = {
  blue: 49,
  blank: 0
}

let midi = onMIDISuccess;
let midiHook = null

if (navigator.requestMIDIAccess) {
  console.log('This browser supports WebMIDI!');
} else {
  console.log('WebMIDI is not supported in this browser.');
}  
navigator.requestMIDIAccess()
  .then(midi, console.log);

function onMIDISuccess(midiAccess) {
  // var outputs = midiAccess.outputs;
  console.log(midiAccess.outputs.values());
  for (var input of midiAccess.inputs.values())
    input.onmidimessage = getMIDIMessage;
}
function midiOut(midiAccess) {
  for (var output of midiAccess.outputs.value())
  output.onmidimessage = getMIDIMessage;
  // console.log(midiAccess)
}
// function onMIDISuccess2(midiAccess) {
//   for (var output of midiAccess.outputs.values())
//     output.onmidimessage = getMIDIMessage;
//     console.log(output.values);
    
// }



function getMIDIMessage(midiMessage) {
    console.log(midiMessage);
    const number = midiMessage.data[1]
    console.log(number);
    const x = number % 10 -1;
    const y = Math.floor(number / 10) - 1 
    const gridPosition = { x, y }
    console.log(x, y);

    if (midiMessage.data[2] === 127)
    midiHook && midiHook(x,y);
    // const cc = [];
    // const arr = cc.push(midiMessage.data[2]);
    // // const index = arr[1]
    // console.log(cc);
    } 

    // function mapMessageToData(message) {
    //   const color = COLORS[message.value]
      
      
    //   if (typeof color === 'undefined') {
    //     return console.error(message.value, 'is not a valid colour')
    //   }
      
    //   const isGridPosition = message.gridPosition
    //     if (isGridPosition) {
    //       return [
    //         gridPosition,
    //         mapGridPositionToNumber(message.position),
    //         color
    //       ]
    //     }
      
    //   }
    // function mapMidiDataToMessage (midiData) {
    //   const number = midiData[1]
    //   const isPressedDown = midiData[2] === PRESSED_DOWN_VALUE
    //   const value = isPressedDown ? 'down' : 'up'
    
    //   const hasTopCircleButtonBeenPressed = midiData[0] === TOP_CIRCLE_BUTTON_VALUE
    
    //   if (hasTopCircleButtonBeenPressed) {
    //     return {
    //       circle: true,
    //       position: topCircleButtons[number],
    //       value
    //     }
    //   }
    
    //   if (rightCircleButtons.hasOwnProperty(number)) {
    //     return {
    //       circle: true,
    //       position: rightCircleButtons[number],
    //       value
    //     }
    //   }
    
    //   return {
    //     grid: true,
    //     position: mapNumberToGridPosition(number),
    //     value
    //   }
    // }
    
    // let inputs = midiMessage.data[1];
    // let grid = Array(128).fill(0.5)

    // getMIDIMessage = function(midiMessage) {
    //   var arr = midiMessage.data
    //   var index = arr[1]
    //   console.log(arr[1]);
    // }
  // const cmd = midiMessage.data[1];



const bottomRow = {
  11: '1',
  12: '2',
  13: '3',
  14: '4',
  15: '5',
  16: '6',
  17: '7',
  18: '8'
}

const leftCol = {
  11: 'A',
  21: 'B',
  31: 'C',
  41: 'D',
  51: 'E',
  61: 'F',
  71: 'G',
  81: 'H'
}

const launchGrid =[
  [81, 82, 83, 84, 85, 86, 87, 88],
  [71, 72, 73, 74, 75, 76, 77, 78],
  [61, 62, 63, 64, 65, 66, 67, 68],
  [51, 52, 53, 54, 55, 56, 57, 58],
  [41, 42, 43, 44, 45, 46, 47, 48],
  [31, 32, 33, 34, 35, 36, 37, 38],
  [21, 22, 23, 24, 25, 26, 27, 28],
  [11, 12, 13, 14, 15, 16, 17, 18]
]
console.log(launchGrid);
// const launchGrid = [
//   [11, 21, 31, 41, 51, 61, 71, 81],
//   [12, 22, 32, 42, 52, 62, 72, 82],
//   [13, 23, 33, 43, 53, 63, 73, 83],
//   [14, 24, 34, 44, 54, 64, 74, 84],
//   [15, 25, 35, 45, 55, 65, 75, 85],
//   [16, 26, 36, 46, 56, 66, 76, 86],
//   [17, 27, 37, 47, 57, 67, 77, 87],
//   [18, 28, 38, 48, 58, 68, 78, 88]
// ]
 





const getNotesForOctave = octave =>
  Object.keys(NOTES).reduce((state, note) => {
    if (note.split('').pop() === String(octave)) state[note] = NOTES[note]
    return state
  }, {})

const defaultPads = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0]
]

class Sequencer extends Component {
  state = {
    type: 'sine',
    pads: defaultPads, launchGrid,
    bpm: 150,
    release: 100,
    step: 0,
    steps: 8,
    playing: false,
    octave: 4,
    delay: false,
    notes: getNotesForOctave(4)
  }

  componentDidMount(){

    midiHook = (x,y)=>{
      this.togglePad(x,y);
      // console.log('mounted');
    }
    
  }
  
  componentWillUnmount(){
    midiHook = null


  }


  changeRelease(release) {
    this.setState(
      {
        release
      },
      () => {
        this.pause()

        if (this.state.playing) this.play()
      }
    )
  }

  changeBPM(bpm) {
    if (bpm > 300 || bpm < 60) return

    this.setState(
      () => ({
        bpm
      }),
      () => {
        this.pause()

        if (this.state.playing) this.play()
      }
    )
  }

  changeWaveType(type) {
    this.setState(
      () => ({
        type
      }),
      () => {
        this.pause()

        if (this.state.playing) this.play()
      }
    )
  }

  changeOctave(octave) {
    this.setState(
      {
        octave: Number(octave),
        notes: getNotesForOctave(Number(octave))
      },
      () => {
        this.pause()

        if (this.state.playing) this.play()
      }
    )
  }

  play() {
    this.synth = new Synth()

    const { bpm, notes, type, release, delay } = this.state
    const notesArray = Object.keys(notes).map(key => notes[key])

    this.setState(() => ({
      playing: true
    }))

    this.interval = setInterval(() => {
      this.setState(
        state => ({
          step: state.step < state.steps - 1 ? state.step + 1 : 0
        }),
        () => {
          const next = this.state.pads[this.state.step]
            .map((pad, i) => (pad === 1 ? notesArray[i] : null))
            .filter(x => x)

          this.synth.playNotes(next, {
            release,
            bpm,
            type,
            delay
          })
        }
      )
    }, (60 * 1000) / this.state.bpm / 2)
  }

  pause() {
    this.setState(() => ({
      playing: false,
      step: 0
    }))

    clearInterval(this.interval)
  }

  // convertPad(row, fromBottom) {
  //   const incoming = row + fromBottom + "";

  //   switch (incoming) {
  //     case '00':
  //       return [7,0];
  //     case '01':
  //       return [7,1];
  //     default:
  //       break;
  //   }

  // }

  togglePad(group, pad, group2) {
    this.setState(state => {
      
    // const cc = [];
    // const arr = cc.push(MIDIMessageEvent.data[1]);
    // // const index = arr[1]
    // console.log(cc);
      const clonedPads = state.pads.slice(0)
      // const launchPad = state.pads.launchGrid.slice(0)
      const padState = clonedPads[group][pad]
      // const gridish = this.convertPad(group, pad);

      // defaultPads[gridish[0], gridish[1]];
      clonedPads[group] = [0, 0, 0, 0, 0, 0, 0, 0]
      //  launchGrid [group2] = [cc]
      // console.log(launchPad);
      clonedPads[group][pad] = padState === 1 ? 0 : 1
      return {
        pads: clonedPads
      }
    })
  }

  render() {
    const { pads, step, notes } = this.state

    return (
      <React.StrictMode>
        <div className="container">
          <header>
            <h1>Step Rouge</h1>
          </header>

          <div className="Sequencer">
            <div className="buttons">
              <button
                type="button"
                className={this.state.playing ? 'active' : ''}
                onClick={() => {
                  if (this.state.playing) this.pause()
                  else this.play()
                }}
              >
                Play
              </button>

              <div className="select-wrapper">
                <span>BPM</span>
                <input
                  type="number"
                  min="80"
                  max="200"
                  step="1"
                  defaultValue={this.state.bpm}
                  onChange={e => this.changeBPM(e.target.value)}
                />
              </div>

              <div className="select-wrapper">
                <span>Wave</span>
                <select
                  value={this.state.type}
                  data-label="wave"
                  className="wave"
                  onChange={e => this.changeWaveType(e.target.value)}
                >
                  <option>Sine</option>
                  <option>Square</option>
                  <option>Sawtooth</option>
                  <option>Triangle</option>
                </select>
              </div>

              <div className="select-wrapper">
                <span>Octave</span>
                <select
                  value={this.state.octave}
                  data-label="octave"
                  className="octave"
                  onChange={e => this.changeOctave(e.target.value)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                </select>
              </div>

              <div className="select-wrapper">
                <span>Release</span>
                <input
                  type="number"
                  min="0"
                  max="400"
                  step="1"
                  defaultValue={this.state.release}
                  onChange={e => this.changeRelease(e.target.value)}
                />
              </div>

              <button
                type="button"
                className={cx({ active: this.state.delay })}
                onClick={() => {
                  this.setState(
                    state => ({
                      delay: !state.delay
                    }),
                    () => {
                      this.pause()
                      if (this.state.playing) this.play()
                    }
                  )
                }}
              >
                Delay
              </button>
            </div>

            <ul className="notes">
              {Object.keys(notes)
                .slice(0, 8)
                .reverse()
                .map(note => (
                  <li key={`note-${note}`}>{note.slice(0, note.length - 1)}</li>
                ))}
            </ul>

            <div className="flex">
              {pads.map((group, groupIndex) => (
                <div key={`pad-${groupIndex}`} className="pads">
                  {group.map((pad, i) => (
                    <div
                      key={`pad-group-${i}`}
                      className={cx('pad', {
                        active: groupIndex === step,
                        on: pad === 1
                      })}
                      onClick={() => {
                        // debugger;
                        this.togglePad(groupIndex, i);
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.StrictMode>
    )
  }
}

export default Sequencer