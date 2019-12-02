import React, {useState} from 'react';
import {View, TouchableHighlight, Image, StyleSheet, Alert, ActionSheetIOS, Linking} from 'react-native';
import {Icon} from 'react-native-elements';

//CONFIG
export const AVATAR_SIZE = 100;
export const BORDER_WIDTH = 6;

export const placeholder = "data:image/png;base64,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";

export default function AuthImage(props) {
    let {getPermission, onImageSelected} = props;

    //1 - DECLARE VARIABLES
    const [image, setImage] = useState(null);
    let size = props.size - (props.borderWidth * 2);
    let imageProps = {width: size, height: size};

    function onSelectPhoto() {
        let options = ['Take Photo', 'Select from library', 'Cancel'];
        let cancelButtonIndex = 2;

        ActionSheetIOS.showActionSheetWithOptions({options, cancelButtonIndex}, selectPhoto);
    }

    async function selectPhoto(index) {
        if (index < 2) {
            let camera = (index === 0);
            try {
                const result = await getPermission(camera);

                if (!result.isGranted) showPermissionAlert();
                else await handleImagePicked(result);

            } catch (e) {
                Alert.alert("Error Occurred", "Something went wrong. please try again.",
                    [{text: 'Cancel', style: 'cancel'}],
                    {cancelable: false}
                );
            }
        }
    }

    //SHOW PERMISSION ALERT
    function showPermissionAlert(camera = true) {
        let title = "Photo access";
        let message = (camera) ? "'In order to use your camera, " : "In order to upload from Camera Roll, ";

        let {bundleIdentifier} = props;
        let onPress = () => Linking.openURL(`app-settings://notification/${bundleIdentifier}`);

        Alert.alert(title, message,
            [{text: 'Cancel', style: 'cancel'}, {text: 'Allow', onPress}],
            {cancelable: false}
        );
    }

    //HANDLE IMAGE PICKER
    async function handleImagePicked(result) {
        try {
            if (!result.cancelled) {
                const name = '_' + Math.random().toString(36).substr(2, 9);
                let image = {uri: result.uri, type: 'image/jpeg', name: name + '.jpg'};
                setImage(image);
                onImageSelected(image);
            }
        } catch (e) {
            alert('Upload failed, sorry :(');
        }
    }

    if (props.children){
       return(
           <View style={styles.avatarContainer}>
               <TouchableHighlight style={[{}]} onPress={onSelectPhoto} underlayColor="rgba(0, 0, 0, 0)">
                   <View style={[styles.avatarWrapper, {
                       borderRadius: props.size / 2,
                       width: props.size,
                       height: props.size
                   }]}>
                       {props.children}
                       <Icon name={"camera"}
                             type={"entypo"}
                             size={15}
                             containerStyle={styles.editButton}
                             iconStyle={{height: 15}}
                             color={"#F1F2F2"}/>
                   </View>
               </TouchableHighlight>
           </View>
       )
    }


    return (
        <View style={styles.avatarContainer}>
            <TouchableHighlight style={[{}]} onPress={onSelectPhoto} underlayColor="rgba(0, 0, 0, 0)">
                <View style={[styles.avatarWrapper, {
                    borderRadius: props.size / 2,
                    width: props.size,
                    height: props.size
                }]}>
                    {
                        props.image ?
                            <Image style={[styles.avatar, {borderRadius: size / 2}]}
                                   source={{uri: !props.image ? props.placeholder : props.image, ...imageProps}}/>
                            :
                            <Image style={[styles.avatar, {borderRadius: size / 2}]}
                                   source={{uri: !image ? props.placeholder : image.uri, ...imageProps}}/>
                    }
                    <Icon name={"camera"}
                          type={"entypo"}
                          size={15}
                          containerStyle={styles.editButton}
                          iconStyle={{height: 15}}
                          color={"#F1F2F2"}/>
                </View>
            </TouchableHighlight>
        </View>
    )
};

AuthImage.defaultProps = {
    image: null,
    style: {},
    bundleIdentifier: "expo",
    size: AVATAR_SIZE,
    placeholder: placeholder,
    borderWidth: BORDER_WIDTH,
    getPermission:null,
    onImageSelected: () => alert("onImageSelected not set"),
};

let center = {
    justifyContent: "center",
    alignItems: "center",
};

const styles = StyleSheet.create({
    avatarContainer: {
        paddingVertical: 25,
        ...center
    },

    avatarWrapper: {
        backgroundColor: "#e7e7e7",
        borderWidth: BORDER_WIDTH,
        borderColor: "#F4F4F4",
    },

    avatar: {
        resizeMode: "stretch",
    },

    editButton: {
        position: "absolute",
        bottom: 5, right: 0,
        borderRadius: 35 / 2,
        backgroundColor: "grey",
        height: 35, width: 35,
        ...center
    }
});