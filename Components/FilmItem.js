// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image,TouchableOpacity, Animated, Dimensions } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

class FilmItem extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      positionLeft: new Animated.Value(Dimensions.get('window').width)
    }
  }
  

  _displayFavoriteImage(){
    if(this.props.isFilmFavorite){
      return(
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }
    
  render() {
      const {film, displayDetailForFilm} = this.props
    return (
      <FadeIn >
          <TouchableOpacity 
            style={styles.main_container}
            onPress={()=>displayDetailForFilm(film.id)}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            {this._displayFavoriteImage()}
    <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}> {film.vote_average} </Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={5}> {film.overview} </Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>
          <View style={styles.date_container}>
    <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: '#c7c3c3',
    borderRadius:10
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#f04630'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    color: '#211f1f',
    fontSize:15
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 12,
    color: "#8f8a89"
  },
  favorite_image:{
    width:20,
    height:20,
    margin:5
  }
})

export default FilmItem