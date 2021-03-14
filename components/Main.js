import React, { Component } from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUser, fetchUserPosts,fetchUserFollowing, clearData} from '../redux/action/index'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import FeedScreen from './main/Feed'
import SearchScreen from './main/Search'
import ProfileScreen from './main/Profile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
const Tab=createBottomTabNavigator();
const EmptyScreen=()=>{return (null)}
export class Main extends Component {
    componentDidMount(){
        this.props.clearData()
        this.props.fetchUser()
        this.props.fetchUserPosts()
        this.props.fetchUserFollowing()

    }
    render() {
        const {currentUser}=this.props
        if(currentUser==undefined)
        {
            return (<View><Text>No User</Text></View>)
        }
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen} options={{
                    tabBarIcon: ({color,size})=>(
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    )
                }}/>
                <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
                 options={{
                    tabBarIcon: ({color,size})=>(
                        <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                    )
                }}/>
                <Tab.Screen name="Add Picture" component={EmptyScreen}
                listeners={({navigation})=>({
                    tabPress:event=>{
                        event.preventDefault();
                        navigation.navigate("Add")
                    }
                })}
                 options={{
                    tabBarIcon: ({color,size})=>(
                        <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                    )
                }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} 
                 listeners={({navigation})=>({
                    tabPress:event=>{
                        event.preventDefault();
                        navigation.navigate("Profile",{uid: firebase.auth().currentUser.uid})
                    }
                })}options={{
                    tabBarIcon: ({color,size})=>(
                        <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    )
                }}/>
            </Tab.Navigator>
           )
        
    }
}
const mapStateToProps=(store)=>({currentUser:store.userState.currentUser})
const mapDispatchProps=(dispatch)=>bindActionCreators({fetchUser,fetchUserPosts,fetchUserFollowing,clearData},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(Main)
