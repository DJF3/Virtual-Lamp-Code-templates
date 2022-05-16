// ---> This is a CUSTOM macro that includes YOUR virtual lamp ID.
//    Webex Video Device Macro to control a Virtual Lamp
//    by  DJ Uittenbogaard - duittenb@cisco.com
//    version 0.4 - May 16th 2022
// ---> INSTRUCTIONS
// 1. Talk to the virtuallamp@webex.bot to create your virtual lamp and get this code.
// 2. Import this macro on a Webex video device
// 3. Save the macro
// 4. Enable this macro (you could also rename it)
// 5. Congratulations! if it fails, check the lamp ID in the variable below. 
const myVLamp = "XXXXXXX";


// for API calls to the virtual lamp
function lampToggle(lamp_id){
    var myUrl = 'https://vlamp.nldj.com/api/toggle/' + lamp_id;
    xapi.command('HttpClient Get', { Url: myUrl })
    .then((result) => {
      console.log("** lampTOGGLE **  success:" + result.StatusCode)
    })
    .catch((err) => {
      console.log("** lampTOGGLE **  ERROR: " + err.message)
    });
  }

// Auto add Button to the touch panel
const xapi = require('xapi');
xapi.command('UserInterface Extensions Panel Save', {
    PanelId: 'virtual_lamp'
    }, `<Extensions>
      <Version>1.8</Version>
      <Panel>
        <Type>Statusbar</Type>
        <Icon>Lightbulb</Icon>
        <Color>#F5E761</Color>
        <Name>Virtual Lamp</Name>
        <ActivityType>Custom</ActivityType>
      </Panel>
    </Extensions>`);

// listener for the generated panel button
xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if(event.PanelId == 'virtual_lamp'){
      lampToggle(myVLamp);
    }
});

// If you put buttons in the GUI and give them the ID "virtual_lamp_button" they 
// will also control the lamp because of the code below:
xapi.Event.UserInterface.Extensions.Widget.Action.on((event) => {
  if (event.WidgetId == 'virtual_lamp_button') {
    lampToggle(myVLamp);
    }
});


// Copyright (c) 2021 Cisco and/or its affiliates.
// This software is licensed to you under the terms of the Cisco Sample
// Code License, Version 1.1 (the "License"). You may obtain a copy of the
// License at  https://developer.cisco.com/docs/licenses
// All use of the material herein must be in accordance with the terms of
// the License. All rights not expressly granted by the License are
// reserved. Unless required by applicable law or agreed to separately in
// writing, software distributed under the License is distributed on an "AS
// IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied.