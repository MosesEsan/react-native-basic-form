import React, {useMemo, useReducer} from 'react';
import {Platform, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';

import reducer, {SET_ERROR, TEXT_CHANGE} from "./reducer";
import TextInput from "../helpers/TextInput.js";
import DropDown from "../helpers/DropDown";
import Image from "../helpers/Image";
import DateInput from "../helpers/DateInput";

const FormContext = React.createContext();

export const TYPES = {Text: "default", Number: "numeric", Dropdown: "dropdown", Image: "image", Date: "date", Email: "email-address"};

export default function Form(props) {
    const {fields, initialData, onSubmit, title, loading, showImagePicker} = props;
    const {keyboardShouldPersistTaps, buttonStyle} = props;
    let scrollViewProps = {keyboardShouldPersistTaps, showsVerticalScrollIndicator: false};

    //1 - CREATE INITIAL STATE - dynamically construct the reducer initial state by using the fierds name and value(if any)
    let error = {};
    let initialState = {};

    fields.map((field, idx) => {
        let arr = Array.isArray(field);

        if (!arr) {
            initialState[field.name] = initialData  && initialData[field.name]  ? String(initialData[field.name]) : "";
            error[field.name] = "";
        }
        else if (arr) {
            field.map((fld, index) => {
                initialState[fld.name] = initialData && initialData[fld.name]  ? String(initialData[fld.name]) : "";
                error[fld.name] = "";
            })
        }
    });

    initialState["error"] = error;
    const [state, dispatch] = useReducer(reducer, initialState);

    //2 - ON CHANGE TEXT - A function that returns a function
    const changeText = (name) => {
        return (text) => {
            dispatch({type: TEXT_CHANGE, name, text});
        }
    };

    //3 - ON PRESS - Validate before ssubmitting
    const onPress = async () => {
        const {error, ...clone} = state;

        const validateKeys = [];

        Object.keys(clone).map((key, idx) => {
            const index = fields.findIndex((obj) => obj.name === key);
            if (index !== -1 && fields[index]['required'] === true) {
                validateKeys.push(key)
            }
        });

        const isValid = validateKeys.every(key => !!state[key]);

        const error_ = validateKeys.reduce((obj, key) => {
            obj[key] = (!state[key] || 0 === state[key].length) ? `${capitalizeFirstLetter(key)} is required` : '';
            return obj;
        }, {});

        if (!isValid) handleError(error_);
        else await onSubmit(clone);
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleError = (error) => {
        Alert.alert('Input error', 'Please input all required fields.');
        dispatch({type: SET_ERROR, error});
    };


    const renderTextInput = (field, index, grouped = false) => {
        let {name} = field;
        let onChangeText = changeText(name);
        let errorMessage = state["error"].hasOwnProperty(name) ? state["error"][name] : null;
        let key = !grouped ? `${name}_${index}` : `${name}_arr_${index}`;

        let type = field.type || TYPES.Text;

        //TEXT is Default
        let Component =
            (<TextInput {...field}
                        value={state[name]}
                        errorMessage={errorMessage}
                        onChangeText={onChangeText}
                        keyboardType={type}
                        testID={field.testID || name}
                        key={key}/>);

        //CHECK IF TYPE IS DROPDOWN
        if (type === TYPES.Dropdown) {
            Component =
                (<DropDown label={field.label}
                           items={field.options}
                           value={state[name]}
                           errorMessage={errorMessage}
                           onValueChange={onChangeText}
                           testID={field.testID || name}
                           key={key}/>)
        } else if (type === TYPES.Image) {
            Component =
                (<View style={{
                        borderBottomWidth: 1,
                        borderColor: "#E2E2E2",
                        paddingVertical: 16,
                        justifyContent: "center"
                    }} key={key}>
                        {
                            !showImagePicker ?
                                <Text>{"Get Permission Props Not Passed"}</Text>
                                :
                                <Image
                                    image={state[name].length > 0 ? state[name] : null }
                                    size={100}
                                    borderWidth={0}
                                    getPermission={null}
                                    showImagePicker={showImagePicker}
                                    onImageSelected={onChangeText}
                                    testID={field.testID || name}
                                    key={key}/>
                        }
                    </View>
                )
        } else if (type === TYPES.Date) {
            Component =
                (<DateInput label={field.label}
                            value={state[name]}
                            errorMessage={errorMessage}
                            onDateSelected={onChangeText}
                            testID={field.testID || name}
                            key={key}/>)
        }

        if (grouped) {
            return (
                <View style={{marginLeft: index === 1 ? 16 : 0, flex: 1}} key={key}>
                    {Component}
                </View>
            )
        } else {
            return Component;
        }
    };
    //=================================================================================================

    const value = useMemo(() => [state, dispatch], [state]);
    return (
        <FormContext.Provider value={value}>
            <KeyboardAvoidingView behavior="padding" style={[{flex: 1}, props.style]}>
                <ScrollView {...scrollViewProps} contentContainerStyle={{}}>


                    <View style={{justifyContent: "center", flex: 1}} testID={"FormContainer"}>
                        {fields.map((field, idx) => {

                            let arr = Array.isArray(field);
                            if (!arr) return renderTextInput(field, idx);
                            else if (arr) {
                                return (
                                    <View style={{flex: 1, flexDirection: "row"}} key={`arr_${idx}`}>
                                        {field.map((fld, index) => renderTextInput(fld, index, true))}
                                    </View>
                                )
                            }
                        })}

                        <Button title={title}
                                onPress={onPress}
                                loading={loading}
                                containerStyle={styles.buttonContainer}
                                buttonStyle={[styles.button, buttonStyle]}
                                titleStyle={styles.buttonText}/>

                        {props.children}

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </FormContext.Provider>
    );
};


Form.defaultProps = {
    fields: [],
    initialData: null,
    onSubmit: null,
    title: "Submit",
    loading: false,
    style: {backgroundColor: 'transparent'},
    buttonStyle: {},
    keyboardShouldPersistTaps: 'handled',
    showImagePicker: null,
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 35
    },

    button: {
        height: 60,
        backgroundColor: "#733AC2"
    },

    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'Roboto',
    }
});
