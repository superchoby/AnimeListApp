import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { 
      token: state.token[state.token.length-1],
      username: state.username[state.username.length-1]
  };
}

class Home extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       anime_rows: [],
    }
    this.createRows = this.createRows.bind(this);
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.props.token,
    }
  }
  
  createRows = (animeInfo, currentCategory='Time Entered') =>{
    if(animeInfo.length !== 0){//if the user has any anime at all recorded
        //Takes an array of anime objects and a category
        let categoryOptions = [];
        let copyList = [];
        const firstAnimeObject = animeInfo[0];
        let animeAmount = animeInfo.length
        //creates category options array
        for(let i=0; i<Object.keys(firstAnimeObject).length; i++){
            if(Object.keys(firstAnimeObject)[i] !== 'Personal_Thoughts' && Object.keys(firstAnimeObject)[i] !== 'cover' && Object.keys(firstAnimeObject)[i] !== 'username' && Object.keys(firstAnimeObject)[i] !== 'id'){
                categoryOptions.push(Object.keys(firstAnimeObject)[i]);
            }
        }
        
        //removes the underscore from the options and replaces it with a space
        for(let i=0; i<categoryOptions.length; i++){
            let temp = categoryOptions[i].split('_');
            categoryOptions[i] = temp.join(' ')
        }
        
        let categoryOptionsName = categoryOptions;

        categoryOptions = categoryOptions.map((options) => 
            <option key={options} value={options}>{options}</option>
        )

        categoryOptions.unshift(<option key='none' value=''>none</option>)

        for(let i=0; i<animeAmount; i++){
            animeInfo[i]['number'] = i + 1;
            copyList.push(Object.assign({}, animeInfo[i]))
        }

        let tempAnimeList = animeInfo.map((anime)=>
            <View key={anime.Name}>
              <Text>{anime.Name}</Text>
            </View>
        )

        if(this.firstTimeLoading){
            this.setState({
                anime_rows: tempAnimeList, //array of AnimeRow components
                category_sort_rows_options: categoryOptions, 
                category_sort_rows_names: categoryOptionsName,
                anime_info: animeInfo,
                copyList: copyList,
            })
            this.firstTimeLoading = false;
        }else{
            this.setState({
                anime_rows: tempAnimeList,
                currentCategory: currentCategory,
            })
        }
        
        return animeInfo;
    }else{//if the user has no anime at all
        this.setState({
            anime_rows: [], //array of AnimeRow components
            category_sort_rows_names: [],
            anime_info: [],
            copyList: [],
        })
    }
}

  componentDidMount(){
    axios.get('http://58fc8356.ngrok.io/users/v1/user/',
    {
        headers: this.headers,
    })
    .then(res => {
        let anime_set = res.data.anime_set
        for(let i=0; i<anime_set.length; i++){
            for(let j=0; j<Object.keys(anime_set[0].data).length; j++){
                anime_set[i][Object.keys(anime_set[0].data)[j]] = anime_set[i].data[Object.keys(anime_set[0].data)[j]]
            }
        }
        this.createRows(anime_set);
        let animeListNames = [];
        for(let i=0; i<anime_set.length; i++){
            animeListNames.push(anime_set[i].Name)
        }
        this.setState({
            'animeNamesList': animeListNames,
        })
    })
    .catch(error => {
        console.log('There was an error');
    })
}

  render() {
    return (
      <ScrollView>
        {this.state.anime_rows}
      </ScrollView>
    );
  }
}

const HomeScreen = connect(mapStateToProps)(Home)
export default HomeScreen;