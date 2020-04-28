//Components/Avatar

import React from 'react'
import ImagePicker from 'react-native-image-picker'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'


class Avatar extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            avatar:require('../Images/ic_tag_faces.png')
        }
        this._avatarClicked = this._avatarClicked.bind(this)
    }

    _avatarClicked(){
        ImagePicker.showImagePicker({},(response)=>{
            if(response.didCancel){
                console.log('User a annuler')
            }
            else if(response.error){
                console.log('Erreur : ',response.error)
            }
            else{
                console.log('Photo :', response.uri)
                let requireSource ={ uri: response.uri }
                const action = { type: "SET_AVATAR", value: requireSource}
                this.props.dispatch(action)
            }
        })
    }

    render(){
        return(
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={this._avatarClicked}
            >
                <Image style={styles.avatar} source={this.props.avatar}/>
            </TouchableOpacity>
        )
    }
    
}

const styles = StyleSheet.create({
    touchableOpacity:{
        margin:5,
        width:100,
        height:100,
        justifyContent:'center',
        alignItems:'center'

    },
    avatar:{
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:2,
        borderColor: "#9B9B9B",
        margin:100
    }
})

const mapStoreToProps=(state)=>{
    return {
      avatar: state.setAvatar.avatar
    }
}
  
export default connect(mapStoreToProps)(Avatar)
