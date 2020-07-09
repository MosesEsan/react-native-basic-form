import React from 'react';
import {Platform, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function CTA({title, cta, onPress, style, titleStyle, ctaStyle}){
    return (
        <View style={[styles.footer, style]}>
            {
                title &&
                <Text style={[styles.footerText, titleStyle, cta && {marginRight: 5}]}>
                    {title}
                </Text>
            }

            {
                cta &&
                <TouchableOpacity onPress={onPress}>
                    <Text style={[styles.footerCTA, ctaStyle]}>
                        {cta}
                    </Text>
                </TouchableOpacity>
            }
        </View>
    )
};

CTA.defaultProps = {
    title: null,
    cta: null,
    onPress:{},
    style: {},
    titleStyle: {},
    ctaStyle: {},
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    footerText: {
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
        color: "#636466"
    },

    footerCTA: {
        fontSize: 16,
        color: "#733AC2",
        fontWeight: "500",
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
    }
});
