# React Native Basic Form
React Native Components

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
import Form from 'react-native-basic-form';

export default function Example(props) {
    const [loading, setLoading] = useState(false);

    const fields = [
        {name: 'email', label: 'Email Address', required: true},
        {name: 'password', label: 'Password', required: true, secure: true}
    ];

    async function onSubmit(data) {
        setLoading(true);

        console.log(data)
        ....
    }

    render() {
        return (
            <View>
                <Form
                    title={"Login"} //this is the button title
                    fields={fields}
                    onSubmit={onSubmit}
                    loading={loading}/>
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
| loading | boolean | optional | if true, button is disabled and shows a loading icon | false |
| style | object | optional | the style for the container | {} |
| buttonStyle | object | optional | the style for the button | {} |
| keyboardShouldPersistTaps | string | optional | Determines when the keyboard should stay visible after a tap.| 'handled' |

keyboardShouldPersistTaps:https://facebook.github.io/react-native/docs/scrollview#keyboardshouldpersisttaps
