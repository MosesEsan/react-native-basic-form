import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {Input, Icon} from 'react-native-elements';

const TextInput = (props) => {
    let {label, value, errorMessage, placeholder, secure, onChangeText, keyboardType, testID} = props;

    const [visible, setVisibility] = useState(secure);

    const { iconSize, iconColor} = props;

    const toggleVisibility = () => setVisibility(!visible);

    return (
        <View style={styles.container}>
            <Input
                label={label}
                value={value}
                placeholder={placeholder}
                errorMessage={errorMessage}
                secureTextEntry={visible}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                testID={testID}
            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                      name={visible ? "visibility" : "visibility-off"}
                      size={iconSize}
                      color={iconColor}
                      onPress={toggleVisibility}
                />
            }
        </View>
    )
};

TextInput.defaultProps = {
    testID:"",
    label: "",
    value: "",
    errorMessage: "",
    placeholder: null,
    password: false,
    onChangeText: null,
    keyboardType: 'default',


    iconSize: 23,
    iconColor: "#222222",
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 16
    },

    containerStyle: {
        paddingHorizontal: 0,
    },

    labelStyle:{
        fontWeight: "400"
    },

    icon: {
        position: 'absolute',
        paddingHorizontal: 8,
        paddingVertical: 4,
        top: 25,
        right: 0
    }
});

export default TextInput;