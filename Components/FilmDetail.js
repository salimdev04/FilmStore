// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button ,TouchableOpacity, Share, Platform} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi  } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import EnlargeShrink from '../Animations/EnlargeShrink'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item=> item.id === this.props.route.params.idFilm)
    if(favoriteFilmIndex !== -1){
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      })
      return
    }
    this.setState({isLoading: true})
    getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })

  }


  _toggleFavorite(){
    const action = { type:'TOGGLE_FAVORITE', value: this.state.film}
    this.props.dispatch(action)
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


  _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png')
    var shouldEnlarge = false // Par défaut, si le film n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../Images/ic_favorite.png')
      shouldEnlarge = true // Si le film est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se rétrécisse => shouldEnlarge à false
    }
    return (
          <Image
            style={styles.favorite_image}
            source={sourceImage}
          />
    )
  }

  _displayFilmTrailer=(idFilm)=>{
      this.props.navigation.navigate("FilmTrailer",{idFilm:idFilm})
  }

  _displayFilm() {
    const { film } = this.state
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.image}
              source={{uri: getImageFromApi(film.backdrop_path)}}
            />
            <Text style={styles.title_text}>{film.title}</Text>
          </View>
          

        <View style={styles.iconContainer}>
        <TouchableOpacity
            style={styles.iconButton}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
            <Text style={styles.iconText}>Ajouter Favoris</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Icon
              style={styles.iconButton}
              size={40}
              name="play-circle"
              onPress={()=>this._displayFilmTrailer(this.state.film.id)}
            />
            <Text style={styles.iconText}>Bande d'annonce</Text>
            </TouchableOpacity>
        </View>
          <Text style={styles.description_text}>{film.overview}</Text>

          <View style={styles.infoContainer}>
            <Text  style={styles.default_text}>
                Date de plublication :
            </Text>
            <Text  style={styles.default_text}>
            {moment(new Date(film.release_date)).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text  style={styles.default_text}>
                Note du film :
            </Text>
            <Text  style={styles.default_text}>
            {film.vote_average} / 10
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text  style={styles.default_text}>
                Budget du film :
            </Text>
            <Text  style={styles.default_text}>
              {numeral(film.budget).format('0,0[.]00 $')}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text  style={styles.default_text}>
              Nombre de votes :
            </Text>
            <Text  style={styles.default_text}>
              {film.vote_count}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text  style={styles.default_text}>
                Genre(s) :
            </Text>
            <Text  style={styles.default_text}>
              {film.genres.map(function(genre){
                return genre.name;
              }).join(" / ")}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text  style={styles.default_text}>
                Companie(s) :
            </Text>
            <Text  style={styles.default_text}>
              {film.production_companies.map(function(company){
                return company.name;
              }).join(" / ")}
            </Text>
          </View>

        </ScrollView>
      )
    }
  }

  _shareFilm(){
    const { film } = this.state
    Share.share({title: film.title, message: film.overview})
  }

  _displayFloatingActionButton(){
    const {film} = this.state
    if(film != undefined && Platform.OS === 'android'){
      return(
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={()=> this._shareFilm()}
          >
         <Icon name="send-o" color="#fff" size={30}/>
        </TouchableOpacity>
      )
    }
  }

  render() {
      
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding:5,
    backgroundColor:"#f7f5f5",
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 300,
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 25,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#ed070f',
    textAlign: 'center'
  },
  description_text: {
    //fontStyle: 'italic',
    //color: '#666666',
    fontSize:18,
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    fontSize:17,
    color:'#666363'
  },
  favorite_container:{
    flexDirection:"column",
   backgroundColor:"#666363",
  },
  favorite_image:{
    alignSelf:"center",
    width:40,
    height:40,
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#ed3e3e',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 20,
    height: 20
  },
  infoContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:5,
    borderBottomColor:'#cbd1d1',
    borderBottomWidth:0.5
  },
  headerContainer:{
    borderColor:'#cbd1d1',
    borderWidth:0.5,
    borderRadius:10
  },
  iconContainer:{
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignContent:'center',
      margin:20,
  },
  iconButton:{
    alignSelf:"center"
  },
  iconText:{
    fontSize:18,
    fontWeight:'bold',
    alignSelf:"center"
  },
  favoriteText:{
    fontSize:18
  }
})


const mapStoreToProps=(state)=>{
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStoreToProps)(FilmDetail)