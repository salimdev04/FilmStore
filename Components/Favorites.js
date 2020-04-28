import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FilmList from './FilmList'
import Avatar from './Avatar'
import { connect } from 'react-redux'


class Favorites  extends React.Component {


  render() {
    
    return (
      <View style={styles.main_container}>
        <View style={styles.textContainer}>
          <Avatar />
          <Text style={styles.text}> Mes favoris </Text>
        </View>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  avatar_container: {
    alignItems: 'center'
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
    padding:20,
    color:"#ed070f",
    fontWeight:'bold'
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)