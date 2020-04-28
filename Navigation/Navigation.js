import 'react-native-gesture-handler';
import React from 'react'
import {NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites'
import {Image, StyleSheet, StatusBar } from 'react-native'
import FilmTrailer from '../Components/FilmTrailer';
import PopularFilm from '../Components/PopularFilm'
import UpcomingFilm from '../Components/UpcomingFilm'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import LoadingPage from '../Components/LoadingPage';



const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Tabs(){
    return(
       <Tab.Navigator 
            screenOptions={({ route }) =>({
                tabBarIcon:({ focused,color,size})=>{
                    let iconName;
                   
                    if(route.name == 'Search'){
                        iconName = focused
                            ? 'home'
                            : 'search';
                    }else if (route.name === 'Favorites'){
                        iconName = focused ? 'heart' : 'heart-o'
                    }else if(route.name === 'PopularFilm'){
                        iconName = focused ? 'film' : 'film'
                    }else if(route.name === 'UpcomingFilm'){
                        iconName = focused ? 'bell' : 'bell-o'
                    }

                    return <Icon name={iconName} size={size} color={color} />
                },
            })}
            tabBarOptions={{
                activeTintColor: '#ed070f',
                inactiveTintColor: 'black',
                showLabel:false,
                activeBackgroundColor:"#d9d4d4",
            }}
            >
                <Tab.Screen 
                    name="Search" 
                    component={Search}
                     />
                <Tab.Screen 
                    name="PopularFilm" 
                    component={PopularFilm}
                    
                    />
                <Tab.Screen name="UpcomingFilm" component={UpcomingFilm} />
                <Tab.Screen name="Favorites" component={Favorites} />
            </Tab.Navigator>
    )
}

function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                headerMode="float"
                
            >
                <Stack.Screen 
                    name="LoadingPage" 
                    component={LoadingPage}
                    options={{
                        headerShown:false
                    }}
                />
                <Stack.Screen 
                    name="Tabs" 
                    component={Tabs}
                    options={{
                        headerShown:false
                        
                    }}
                />
                <Stack.Screen 
                    name="FilmDetail" 
                    component={FilmDetail}
                    options={{
                        title:"Details du film",
                        headerTintColor:"#ed070f",
                        headerTitleAlign:"center",
                    }}
                />
                <Stack.Screen 
                    name="FilmTrailer" 
                    component={FilmTrailer}
                    options={{
                        title:"Bande d'annonce",
                        headerTintColor:"#ed070f",
                        headerTitleAlign:"center",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const styles= StyleSheet.create({
    icon:{
        width:30,
        height:30
    }
})
export default Navigation