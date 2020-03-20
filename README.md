# React Native Basic Form

A simple React Native Form component with TextInput (including multiline), DropDown and Image fields.",


### Installation

```bash
$ npm install --save react-native-basic-form

//dependencies (Reat Native CLI only)
npm i --save react-native-vector-icons  
react-native link react-native-vector-icon
```

### Form
Shows a form

```javascript
import React from 'react';
import {View} from 'react-native';
import Form, {TYPES} from 'react-native-basic-form';

export default function Example(props) {
    const [loading, setLoading] = useState(false);

    const options = [
        {label:"Music", value:1},
        {label:"Concert", value:2}
    ];
    
    const fields = [
        {name: 'image', label: 'Profile Image', required: true, type: TYPES.Image},
        {name: 'email', label: 'Email Address', required: true},
        {name: 'password', label: 'Password', required: true, secure: true},
        {name: 'account_type', label: 'Account Type', required: true, type: TYPES.Dropdown, options: options},
        {name: 'price', label: 'ENTRANCE FEE', required: true, type:TYPES.Number},
        {name: 'about_me', label: 'About Me', required: true, multiline: true},
        [
            //group to appear side by side
            {name: 'start_date', label: 'START DATE', required: true, type: TYPES.Date},
            {name: 'end_date', label: 'END DATE', required: true, type: TYPES.Date}
        ]
    ];

    async function onSubmit(data) {
        setLoading(true);

        console.log(data)
        ....
    }
    
    async function showImagePicker() {
        try{
            //return - cancelled or error or uri
            //return {cancelled:true}
            //return {error:"error message}
            //return {uri:...}
        }catch(e){
            return {error:e}
        }
    }

    render() {
        return (
            <View>
                <Form
                    title={"Register"} //this is the button title
                    fields={fields}
                    onSubmit={onSubmit}
                    loading={loading}
                    showImagePicker={showImagePicker}
                    style={{}}/>
            </View>
        );
    };
};
```

| prop | value | required/optional | description | default |
| ---- | ----- | ----------------- | ----------- | ----------- |
| title | string | optional | The button title | "Submit" |
| fields | object | required | the fields to show | [] |
| onSubmit | function | required | the function to call when the submit button is pressed | null |
| showImagePicker | function | optional | the function to call when the image is tapped | null |
| loading | boolean | optional | if true, button is disabled and shows a loading icon | false |
| style | object | optional | the style for the container | {} |
| buttonStyle | object | optional | the style for the button | {} |
| keyboardShouldPersistTaps | string | optional | Determines when the keyboard should stay visible after a tap.| 'handled' |

keyboardShouldPersistTaps:https://facebook.github.io/react-native/docs/scrollview#keyboardshouldpersisttaps
