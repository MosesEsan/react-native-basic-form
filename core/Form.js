import React, {useMemo, useReducer} from 'react';
import {Alert, KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

import reducer, {SET_ERROR, TEXT_CHANGE} from "./reducer";
import TextInput from "../helpers/TextInput.js";
import DropDown from "../helpers/DropDown";

const FormContext = React.createContext();

export const TYPES = {Text: "default", Number: "numeric", Dropdown: "dropdown"};

export default function Form(props) {
    const {fields, onSubmit, title, loading} = props;
    const {style, keyboardShouldPersistTaps, buttonStyle} = props;
    let scrollViewProps = {style, keyboardShouldPersistTaps, showsVerticalScrollIndicator: false};

    //1 - CREATE INITIAL STATE - dynamically construct the reducer initial state by using the fierds name and value(if any)
    let error = {};
    const initialState = fields.reduce((obj, field) => {
        let arr = Array.isArray(field);

        if (arr === false) {
            obj[field.name] = field.value || "";
            error[field.name] = "";
            return obj;
        } else if (arr) {
            let obj_ = obj;

            field.map((fld) => {
                obj_[fld.name] = fld.value || "";
                error[fld.name] = "";
            });
            return obj_;
        }
    }, {});

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
        const keys = Object.keys(clone);
        const isValid = keys.every(key => !!state[key]);

        const error_ = keys.reduce((obj, key) => {
            obj[key] = (!state[key] || 0 === state[key].length) ? `${key} is required` : '';
            return obj;
        }, {});

        if (!isValid) handleError(error_);
        else await onSubmit(state);
    };

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
                        key={key}/>);

        //CHECK IF TYPE IS DROPDOWN
        if (type === TYPES.Dropdown) {
            Component =
                (<DropDown label={field.label}
                           items={field.options}
                           value={state[name]}
                           errorMessage={errorMessage}
                           onValueChange={onChangeText}
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
            <KeyboardAvoidingView behavior="padding">
                <ScrollView {...scrollViewProps} contentContainerStyle={{}}>


                    <View style={{justifyContent: "center"}}>
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
    onSubmit: null,
    title: "Submit",
    loading: false,
    style: {backgroundColor: 'transparent'},
    buttonStyle: {},
    keyboardShouldPersistTaps: 'handled'
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
        fontFamily: "HelveticaNeue-Medium"
    }
});
