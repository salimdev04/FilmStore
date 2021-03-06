//Components/UpcomingFilm
import React from 'react'
import { View,StyleSheet, ActivityIndicator ,Text} from 'react-native'
import { getUpcomingFilm } from '../API/TMDBApi'
import FilmList from './FilmList'


class UpcomingFilm extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
          films: [],
          isLoading: false
        }
        this._loadFilms = this._loadFilms.bind(this)
      }
    
      componentDidMount() {
        this._loadFilms()
      }
    
      _loadFilms() {
        this.setState({ isLoading: true })
        getUpcomingFilm(this.page+1).then(data => {
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({
              films: [ ...this.state.films, ...data.results ],
              isLoading: false
            })
        })
      }

      _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <View style={{backgroundColor:"#d6d2d3", padding:5, borderRadius:5}}>
                <ActivityIndicator size='large' color="#f24b53" />
              </View>
            </View>
          )
        }
    }

    render(){
        return(
            <View style={styles.main_container}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}> Upcoming films </Text>
                  <Text style={{ fontWeight:"bold", fontSize:18}}> 2020-2021 </Text>
                </View>
                <FilmList
                films={this.state.films}
                navigation={this.props.navigation}
                loadFilms={this._loadFilms}
                page={this.page}
                totalPages={this.totalPages}
                favoriteList={false}
            
                />
                {this._displayLoading()}
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
    flex:1,
    backgroundColor:"#f7f5f5",
    },
    loading_container:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    },
    textContainer:{
      justifyContent:"center",
      alignItems:"center",
      elevation:2,
      padding:20,
      backgroundColor:"#f7f5f5"
    },
    text:{
      textAlign:"center",
      fontSize:26,
      color:"#ed070f",
      fontWeight:'bold'
    }
})




export default UpcomingFilm