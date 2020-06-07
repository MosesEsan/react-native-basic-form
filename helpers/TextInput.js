import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types'; // ES6
import {Icon, Input} from 'react-native-elements';

const TextInput = (props) => {
    let {label, value, errorMessage, placeholder, secure, onChangeText, testID} = props;

    //Other Props
    let {autoCapitalize, autoCorrect, clearButtonMode, editable, multiline, keyboardType} = props;
    let otherProps = {autoCapitalize, autoCorrect, clearButtonMode, editable, multiline, keyboardType};

    if (props.hasOwnProperty('maxLength')) otherProps['maxLength'] = props.maxLength;

    const [visible, setVisibility] = useState(secure);

    const {iconSize, iconColor} = props;

    const toggleVisibility = () => setVisibility(!visible);

    return (
        <View style={styles.container}>
            <Input
                label={label}
                value={value}
                placeholder={placeholder}
                errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={onChangeText}
                testID={testID}

                {...otherProps}

                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                errorProps={{testID: `${testID}InputError`}}
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
    testID: "",
    label: "",
    value: "",
    errorMessage: "",
    placeholder: null,
    secure: false,
    onChangeText: null,

    autoCapitalize: 'sentences',
    autoCorrect: false,
    clearButtonMode: 'never',
    editable: true,
    multiline: false,
    keyboardType: 'default',

    iconSize: 23,
    iconColor: "#222222",
};

TextInput.propTypes = {
    errorMessage: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginTop: 14
    },

    containerStyle: {
        paddingHorizontal: 0,
    },

    labelStyle: {
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
