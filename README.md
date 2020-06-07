# React Native Basic Form

A simple React Native Form component with TextInput (including multiline), DropDown and Image fields.",


### Installation

```bash
$ npm install --save react-native-basic-form

#dependencies (Reat Native CLI only < v0.16)
npm i --save react-native-vector-icons  
react-native link react-native-vector-icon
```

## Dependencies Setup (for Expo projects)

```bash
expo install @react-native-community/datetimepicker
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
        {label:"Basic", value:1},
        {label:"Premium", value:2}
    ];
    
    //Used in EDIT MODE
    const initialData = {
        "image": "http://res.cloudinary.com/ddv9bxonm/image/upload/v1585512850/ib9c0dml4dlksi8xgvob.jpg"
        "email": "Johnsmith@yahoo.com",
        "password": "thispasswordisencrypted",
        "account_type": 1, //Basic account, see options
        "price": 20,
        "about_me": "Blah blah blah.....",
        "start_date": "2020-04-17T21:00:00.000Z",
        "end_date": "2020-04-17T21:00:00.000Z",
    };

    const fields = [
        {name: 'image', label: 'Profile Image', required: true, type: TYPES.Image},
        {name: 'email', label: 'Email Address', required: true, type: TYPES.Email},
        {name: 'username', label: 'Username', required: true, autoCapitalize: "none", autoCorrect: false},
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
                    initialData={initialData} //used in edit mode
                    onSubmit={onSubmit}
                    loading={loading}
                    showImagePicker={showImagePicker}
                    style={{}}/>
            </View>
        );
    };
};
```
#### Field Types
| Type | Notes |
| ---- | ----- |
| Text | Default|
| Number | |
| Dropdown | |
| Image | |
| Email | Sets the keyboard to display email-address type |


#### Field Props
| Prop | Value | Required/Optional | Description | Default |
| ---- | ----- | ----------------- | ----------- | ----------- |
| name | string | optional | The field title | "" |
| label | string | optional | The field label | "" |
| required | bool | optional | Whether the field is required | false |
| secure | bool | optional | Whether the value should be masked | false |
| type | string | optional | The field type | TYPES.Text (see above) |
| autoCapitalize | string | optional | The field auto capitalize setting | "sentences" |
| autoCorrect | bool | optional | The field auto correct setting | true |
| clearButtonMode | bool | optional | When the clear button should appear on the right side of the text view. | never |
| editable | bool | optional | If false, text is not editable. | true |



#### Props
| prop | value | required/optional | description | default |
| ---- | ----- | ----------------- | ----------- | ----------- |
| title | string | optional | The button title | "Submit" |
| fields | object | required | the fields to show | [] |
| initialData | object | option | the initial data, can be used in EDIT mode, the keys should match the fields key | [] |
| onSubmit | function | required | the function to call when the submit button is pressed | null |
| showImagePicker | function | optional | the function to call when the image is tapped | null |
| loading | boolean | optional | if true, button is disabled and shows a loading icon | false |
| style | object | optional | the style for the container | {} |
| buttonStyle | object | optional | the style for the button | {} |
| keyboardShouldPersistTaps | string | optional | Determines when the keyboard should stay visible after a tap.| 'handled' |

keyboardShouldPersistTaps:https://facebook.github.io/react-native/docs/scrollview#keyboardshouldpersisttaps
