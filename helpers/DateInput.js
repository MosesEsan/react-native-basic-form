import React, {useState, useMemo, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
// import {Appearance} from 'react-native-appearance';

export default function DatePicker_(props) {
    const [date, setDate] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    let {label, mode, onDateSelected, value} = props;

    let dateProps = {
        mode,
        placeholder,
        format,
        minDate,
        maxDate,
        confirmBtnText,
        cancelBtnText,
        customStyles,
        style, showIcon
    } = props;


    useEffect(() => {
        if (value && value !== undefined && value !== 'undefined'){
            dateProps['date'] = value;
            setDate(value)
        }
    }, []);


    function onTap(){
        setIsVisible(true)
    }

    function onDatePicked(date) {
        setDate(date);
        onDateSelected(date);
        setIsVisible(false)
    }

    const dateFormatted = useMemo(() => {
        if (date){
            let date_ = moment(date).format("DD MMM");
            let time_ = moment(date).format("HH:mm");

            return `${date_} at ${time_}`
        }

        return ""

    }, [date])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableHighlight onPress={onTap} underlayColor="rgba(0, 0, 0, 0)" >
                <View style={styles.input}>
                    <Text style={styles.text}>{`${dateFormatted}`}</Text>
                    <DateTimePicker
                        isVisible={isVisible}
                        onConfirm={onDatePicked}
                        {...dateProps}
                        // isDarkModeEnabled={Appearance.getColorScheme() === 'dark'}
                        onCancel={() => setIsVisible(false)}/>
                </View>
            </TouchableHighlight>
            {(props.errorMessage !== null) ? <Text style={styles.error}>{props.errorMessage}</Text> : null}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginTop: 19,
        marginBottom:0,
        borderBottomWidth: 1,
        borderColor: '#86939e',
        height: 60
    },

    label: {color: "#86939e", fontSize: 16},

    input: {height: 40, justifyContent:"center", color: "black"},
    text: {fontSize: 18, color: "black"},
    error:{color:"#ff190c", fontSize: 12, },

});


DatePicker_.defaultProps = {
    label: "",
    mode:"datetime",
    placeholder: "select date",
    minDate: "2019-01-01",
    maxDate: new Date(),
    confirmBtnText: "Confirm",
    cancelBtnText: "Cancel",
    customStyles: {
        dateInput: styles.input
    },
    onDateChange: null,
    style: {},
    showIcon:false,
};