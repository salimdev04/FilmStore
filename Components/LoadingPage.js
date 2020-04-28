//Components/LoadingPage

import React from 'react'
import { View, StatusBar, Image, StyleSheet } from 'react-native'


class LoadingPage extends React.Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
        setTimeout(()=> {
            this.props.navigation.navigate('Tabs')
        },2000)
    }
    
    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle="default" backgroundColor="#fff" />
                <Image style={styles.logo} source={require('../Images/ic_filmstore.png')} />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#fff"
    },
    logo:{
        width:150,
        height:150,
        alignSelf:'center'
    },
    statusbar:{
        backgroundColor:"#fff"
    }
})


export default LoadingPage