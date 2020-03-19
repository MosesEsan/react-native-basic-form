import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function DropDown(props) {
    let {label, items, value, onValueChange, containerStyle, innerContainerStyle, labelStyle, textStyle, testID} = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.innerContainer, innerContainerStyle]}>
                <Text style={[styles.label, labelStyle]}>{label}</Text>
                <RNPickerSelect onValueChange={onValueChange} items={items} value={value} testID={testID}
                                style={{inputIOS: {...styles.input, ...textStyle}}}/>
            </View>
            {(props.errorMessage !== null) ? <Text style={styles.error}>{props.errorMessage}</Text> : null}
        </View>
    );
}

DropDown.defaultProps = {
    testID:"",
    label: "",
    items: [],
    value:null,
    onValueChange: null,

    containerStyle: {},
    innerContainerStyle: {},
    labelStyle: {},
    textStyle: {}
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginTop: 19,
        marginBottom:0
    },

    innerContainer: {
        borderBottomWidth: 1,
        borderColor:'#86939e'
    },

    label:{color:"#86939e", fontSize: 16},
    error:{color:"#ff190c", fontSize: 12, },

    input:{minHeight:40, fontSize: 18, color: "black"}
});