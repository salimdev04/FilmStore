//components/FilmTrailer
import React from 'react'
import { View, PixelRatio,StyleSheet,Text } from 'react-native'
import YouTube from 'react-native-youtube'
import { getFilmsTrailer } from '../API/TMDBApi'
import  Icon  from 'react-native-vector-icons/FontAwesome'


class FilmTrailer extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isReady: false,
            status: null,
            quality: null,
            error: null,
            isPlaying: true,
            isLooping: true,
            duration:0,
            currentTime:0,
            fullscreen:false,
            containerWidth:null,
            containerMounted:true,
            filmTrailer: [],
            idTrailer:undefined,
        }
    }


    componentDidMount(){
        getFilmsTrailer(this.props.route.params.idFilm).then((data)=>{
            this.setState({
                filmTrailer:data.results,
                idTrailer: data.results[0].key
            })
            
        })  
    }

    _displayYoutube(){
        if(this.state.idTrailer !== undefined){
            return(
                    <YouTube
                    ref={component =>{
                        this._youTubeRef = component
                    }}
                    apiKey="AIzaSyAjHD6ZYTXsTNguofk-Dly8gYUNGNBiPLY"
                    videoId={this.state.idTrailer}
                    play={this.state.isPlaying}
                    loop={this.state.isLooping}
                    fullscreen={this.state.fullscreen}
                    controls={1}
                    style={[
                        {
                            height: PixelRatio.roundToNearestPixel(
                                this.state.containerWidth/(16/12)
                            )
                        },
                        styles.player
                    ]}
                    onError={e => this.setState({ error: e.error})}
                    onReady={e => this.setState({isReady: true})}
                    onchangeState={e => this.setState({status: e.state})}
                    onChangeQuality={e=> this.setState({quality: e.quality})}
                    onChangeFullscreen={e=> this.setState({fullscreen: e.fullscreen})}
                    onProgress={e=>
                        this.setState({
                            duration:e.duration,
                            currentTime: e.currentTime
                        })}
                />
                   
            )
            
            
        }else{
            return(
                <View style={styles.errorContainer}>
                    <Icon name="minus-square" color="#edc132" size={30} style={{padding:10}}/>
                    <Text>Pas de Bande d'annonce</Text>
                </View>
            )
        }
    }
    

    render(){
        return(
            <View 
                style={styles.container}
                onLayout={({
                    nativeEvent: {
                        layout:{width}
                    },
                })=>{
                    if(! this.state.containerMounted)
                        this.setState({containerMounted: true})
                    if(this.state.containerWidth !== width)
                        this.setState({ containerWidth: width})
                }}
            > 
               {this._displayYoutube()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'black',
      justifyContent:'center',
      alignItems:'center'
    },
    player: {
      borderColor:'#fff',
      borderWidth:1,
      alignSelf: 'stretch',
      marginVertical: 10,
      padding:10
    },
    errorContainer:{
        backgroundColor:'gray',
        padding:30,
        flexDirection:'row'
    }
  });


export default FilmTrailer