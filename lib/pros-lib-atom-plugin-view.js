'use babel';
const {shell} = require('electron')


/* TO DO
- Add new Custom Elements (classes) for:
    o Plugin title        [DONE]
    o Function title      [DONE]
    o Explaination text   [generalText]
    o Example             [generalText]

- Add Library:  [Partially DONE]

    MOTOR FUNCTIONS (large) [DONE]

      void motorSet(int chan, int speed) (bold) [DONE]

      motorSet does such and such... (italicized) [DONE]
      Perams:   []
      Returns:  []

      Example:  []


- Add Drop-down to filter by type []
  AND/OR
- Add Search bar  []

- Add ability to switch between PROS 2 Cortex and PROS 3 C/C++ functions  []

- Finalize alert window text  [DONE]

*/

/* copyToClipboard() by Ricardo Canelas
// From https://stackoverflow.com/questions/45071353/javascript-copy-text-string-on-click
*/
function copyToClipboard(text) {
    var selected = false;
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    if (document.getSelection().rangeCount > 0) {
        selected = document.getSelection().getRangeAt(0)
    }
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
    atom.notifications.addInfo("Text copied");
};

//var myJSON = JSON.stringify(obj);
var pluginVersion = "0.2.0"//JSON.parse(myJSON);


var aboutText = "This plugin was created in 2018 by PYRO Robotics students from Arizona State University. Its purpose is to help VEX Robotics students who use the Purdue Robotics Operating System (PROS) by providing them with a visual library. The inspiration for the UI design and layout came from the VEX Coding Studio (VCS) sidebar library.\n\nHow to use:\nEach of the white functions are copied to the user's clipboard when clicked on.\n\nPYRO Robotics would like to thank the PROS creators, the students from Purdue University, for their amazing coding platform. More information about PROS can be found at https://pros.cs.purdue.edu/.\n\nPYRO Robotics GitHub: https://github.com/PYRORobotics\n\nThis plugin was developed with no intent of copyright infringement.\nVersion: " + pluginVersion;

function pluginTitle(text)
{
  var pluginTitle = document.createElement('div');
  pluginTitle.textContent = text;
  pluginTitle.style.textAlign = "center";
  pluginTitle.style.textDecoration = "underline";
  pluginTitle.style.fontSize = "large";
  pluginTitle.style.fontFamily = "Verdana, Geneva, sans-serif";
  pluginTitle.style.fontWeight = "bold";
  pluginTitle.style.width = "100%";
  pluginTitle.style.color = "yellow";

  pluginTitle.style.border = "thick solid transparent";

  pluginTitle.addEventListener('click', function(e) {
    atom.confirm({
      message: 'About the PROS Library Plugin for Atom',
      detail: aboutText,
      buttons: ['Go to the PROS Website', 'Go to the PYRO Robotics GitHub Page', 'Close']
    }, response => {
      if (response == 0) {
        shell.openExternal("https://pros.cs.purdue.edu")
      } else if(response == 1) {
        shell.openExternal("https://github.com/PYRORobotics")
      } else {
        // Close window
      }
    })
  });

  return pluginTitle;
}

function functionType(text)
{
  var functionType = document.createElement('div');
  functionType.textContent = text;
  functionType.style.textAlign = "";
  functionType.style.textDecoration = "";
  functionType.style.fontSize = "large";
  functionType.style.fontFamily = "Trebuchet MS, Helvetica, sans-serif";
  functionType.style.fontWeight = "normal";
  //functionType.style.width = "";
  functionType.style.color = "yellow";

  functionType.style.border = "thick solid transparent";
  //functionType.style.borderLeftWidth = "10px";

  return functionType;
}

function functionTitle(text)
{
  var functionTitle = document.createElement('div');
  functionTitle.textContent = text;
  functionTitle.style.textAlign = "";
  functionTitle.style.textDecoration = "";
  functionTitle.style.fontSize = "medium";
  functionTitle.style.fontFamily = "Trebuchet MS, Helvetica, sans-serif";
  functionTitle.style.fontWeight = "bold";
  //functionTitle.style.width = "";
  functionTitle.style.color = "#FFFFFF";

  functionTitle.style.border = "thick solid transparent";
  functionTitle.style.borderLeftWidth = "12px";
  functionTitle.style.borderBottomWidth = "0px";

  functionTitle.addEventListener('click', function(e) {
    copyToClipboard(functionTitle.textContent);
  });
  return functionTitle;
}

function generalText(text)
{
  var generalText = document.createElement('div');
  generalText.textContent = text;
  generalText.style.textAlign = "";
  generalText.style.textDecoration = "";
  generalText.style.fontSize = "small";
  generalText.style.fontFamily = "Trebuchet MS, Helvetica, sans-serif";
  generalText.style.fontWeight = "normal";
  generalText.style.width = "";
  generalText.style.color = "#DDDDDD";

  generalText.style.border = "thin solid transparent";
  generalText.style.borderLeftWidth = "18px";

  return generalText;
}

export default class ProsLibAtomPluginView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.setAttribute("id", "MAINELE")
    this.element.classList.add('pros-lib-atom-plugin');

    this.element.appendChild(pluginTitle('____________PROS 2 Library____________'));

    /*
    const message2 = document.createElement("BUTTON");
    message2.textContent = 'MOTOR FUNCTIONS';
    message2.addEventListener('click', function(e) {
      //alert('Thanks!');
      var textnode = document.createTextNode("Water");
      var item = document.getElementById("MAINELE").childNodes[0];
      item.replaceChild(textnode, item.childNodes[0]);
    });
    //message2.onclick = addEventListener("click", alert("I am an alert box!"));
    this.element.appendChild(message2);*/

    this.element.appendChild(functionType('Brain Functions'));
    this.element.appendChild(functionTitle('void delay ( long time );'));
    this.element.appendChild(generalText('\"Wait\" command, stops all tasks for amount of time (milliseconds).'));
    this.element.appendChild(document.createElement('br'));

    this.element.appendChild(functionTitle('void taskDelay ( long msToDelay );'));
    this.element.appendChild(generalText('Similar to delay() but only pauses the current task.'));
    this.element.appendChild(document.createElement('br'));

    this.element.appendChild(functionType('Joystick Functions'));

    this.element.appendChild(functionTitle('int joystickGetAnalog( char joystickNum, char axis );'));
    this.element.appendChild(generalText('Returns the joystick’s axis value.'));
    this.element.appendChild(document.createElement('br'));

    this.element.appendChild(functionTitle('int joystickGetDigital( char joyNum, char bGroup, char bDir );'));
    this.element.appendChild(generalText('Returns whether or not a button is pressed.'));
    this.element.appendChild(document.createElement('br'));

    this.element.appendChild(functionType('Motor Functions'));

    this.element.appendChild(functionTitle('int motorGet ( char channel );'));
    this.element.appendChild(generalText('Returns the last set speed of the motor.'));
    this.element.appendChild(document.createElement('br'));

    this.element.appendChild(functionTitle('void motorSet( char channel, int speed );'));
    this.element.appendChild(generalText('Sets the speed of the motor.'));
    this.element.appendChild(document.createElement('br'));

    this.element.appendChild(functionType('Sensor Functions'));

    this.element.appendChild(functionTitle('int analogRead ( char channel );'));
    this.element.appendChild(generalText('Returns the value of the uncalibrated analog sensor.'));
    this.element.appendChild(document.createElement('br'));

    this.element.appendChild(functionTitle('bool digitalRead ( char pin );'));
    this.element.appendChild(generalText('Returns the value of the digital sensor.'));
    this.element.appendChild(document.createElement('br'));

    this.element.appendChild(functionTitle('void pinMode ( char pin, char mode );'));
    this.element.appendChild(generalText('Sets the port (ADI/3-wire) up as a custom port.'));
    this.element.appendChild(generalText('Perameter: mode = INPUT, INPUT_ANALOG, or OUTPUT'));


    /*
    var x = document.createElement("SELECT");
    x.setAttribute("id", "selectid");
    var option = document.createElement("option");
    option.text = "Kiwi";
    x.add(option);
    var option2 = document.createElement("option");
    option2.setAttribute("id", "2option");
    option2.text = "iwiK";
    x.add(option2);
    //x.onclick = addEventListener("click", alert("I am an alert box!"));

    if(document.getElementById('x').value == "2option") {
         notifications.addInfo("YAY");
    }
    */


  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
