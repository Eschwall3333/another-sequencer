    STEP ROUGE

Are you a starving artist who just bought a cool new midi controller but doesn't want to screw around with getting it all setup in your DAW??  Don't you wish there was some sort of website you could go to to allow you to play with your new midi controller and maybe hash out some weird musical ideas at the same time?.......have no fear my friend/friends......I'VE GOT YOU COVERED

Welcome to Step Rouge.
 
Step Rouge is a simple web based rhythm sequencer that I built using ReactJS, the Web Audio api, and the Web Midi api.  

To get started, simply select one ofthe 8 boxes in each of the columns.  Each row of boxes corresponds to a musical note which is displayed on the left of the page.  Note that only one note can be played per column.

All you have to do now is press The PLAY button!

Feel free to tweak the bpm using the up and down arrows (or just type it in), change the wave of the synth (altering the sound), increase or decrease the octave, adjust the release of the notes(altering the amount of time the note plays for) and last but not least toggle the DELAY button for some spacey effects.



Step Rouge also supports midi control (currently the only supported controller is the Novation launchpad and Launchpad Pro).
To utilize this function, download the "Jazz-Midi" chrome extension and install. Allow the extension to run on all sites

[-right click the Jazz-midi extension icon
    -hover over the listed option that says "This can read and change site data"
    -check the box in the hover menu that says "on all sites"]


Not using the deployed link?? No problem, just clone the repository, run npm start and you should be golden.  You still need the Jazz-Midi extension though if you plan on using midi.
