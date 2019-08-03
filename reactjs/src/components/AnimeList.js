import React from 'react';
import './AnimeList.css';
import axios from 'axios';
import Row from './AnimeRow';
import { connect } from 'react-redux';
import { prepareToDelete } from '../actions/index';

function mapDispatchToProps(dispatch) {
    return {
        prepareToDelete: shouldPrepareToDelete => dispatch(prepareToDelete(shouldPrepareToDelete)),
    }
}

const mapStateToProps = state => {
    // username: state.username[state.username.length-1]
    return { 
        token: state.token[state.token.length-1],
    };
}

class AnimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category_sort_rows_options: [],
            currentCategory: 'Time Entered',
            addNewAnimeTableRow: '',
            addOrSubmit: <div id='add-anime-icon' className='add-icon' onClick={this.addRows}>&#43;</div>,
            deleteCheckboxHeader: <td style={{display: 'none'}}></td>,
        }
        this.changeOrder = this.changeOrder.bind(this);
        this.createRows = this.createRows.bind(this);
        this.dateConverter = this.dateConverter.bind(this);
        this.firstTimeLoading = true;
        this.handleReverse = this.handleReverse.bind(this);
        this.addRows = this.addRows.bind(this);
        this.handleRowSubmit = this.handleRowSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteRows = this.deleteRows.bind(this);
        this.addToDeleteList = this.addToDeleteList.bind(this);
        this.animeToDelete = [];
    }

    addToDeleteList = (animeToDeleteName, addToList) =>{
        //function to pass down as props so when 
        //an anime checkbox is filled they are added
        //to list of anime's name to delete
        if(addToList){
            this.animeToDelete.push(animeToDeleteName);
        }else{
            this.animeToDelete.splice(this.animeToDelete.indexOf(animeToDeleteName), 1);
        }
    }

    deleteRows = () =>{
        //final delete function that actually deletes the anime
        let filteredArray = this.state.anime_info.filter(anime =>{
            // filters out all anime who's name matches the anime to delete
            // only one should be selected as names are unique
            return !this.animeToDelete.includes(anime.Name)
        })

        for (let i=0; i<filteredArray.length; i++){
            filteredArray[i].number = i+1;
        }

        this.setState({
            anime_info: filteredArray,
            deleteCheckboxHeader: <td style={{display: 'none'}}></td>,
        }, function(){
            this.createRows(this.state.anime_info);
        })
        // for(let i=0; i<this.state.animeInfo.length; i++){
        //     if(animeToDeleteName === this.state.animeInfo[i].Name){
        //     }
        // }
    }

    handleDelete = e =>{
        if(document.getElementById('delete-button').innerHTML === 'Delete'){
            document.getElementById('delete-button').innerHTML = 'Confirm';
            this.props.prepareToDelete(true);
            this.props.startDeletingProcess(false);
            this.setState({
                //adds an extra empty table header for the delete checkboxesy
                deleteCheckboxHeader: <th></th>,
            })
        }else{// the innerHTML === 'Confirm'
            document.getElementById('delete-button').innerHTML = 'Delete';
            this.props.prepareToDelete(false);
            this.deleteRows();
            this.setState({

            })
        }
    }

    addRows = () =>{
        this.setState({
            addNewAnimeTableRow: <Row createNewRow={true} rowNumber={this.state.anime_rows.length + 1} />,
            addOrSubmit: <button id='submit-anime-row' onClick={this.handleRowSubmit}>submit</button>,
        })
    }

    handleRowSubmit = e =>{
        if(document.getElementById('title-input').value !== ''){
            let split_date_started = document.getElementById('date-start-input').value.split('/');
            let split_date_finished = document.getElementById('date-end-input').value.split('/');
            if(document.getElementById('reverse-button').innerHTML === 'Revert'){
                document.getElementById('reverse-button').innerHTML = 'Reverse';
            } 
            let newAnime = {
                Name: document.getElementById('title-input').value,
                cover: document.getElementById('cover-filler').value,
                Personal_Thoughts: document.getElementById('self_description_data_input').value,
                Date_Started: `${split_date_started[2]}-${split_date_started[1]}-${split_date_started[0]}`,
                Date_Finished: `${split_date_finished[2]}-${split_date_finished[1]}-${split_date_finished[0]}`,
                OP_Rating: document.getElementById('op-rating-input').value,
                Overall_Rating: document.getElementById('overall-rating-input').value,
            }
            
            axios.post('http://127.0.0.1:8000/animes/api/post-anime', newAnime)
            .then(res =>{
                console.log(res);
            })
            .catch(error =>{
                console.log(error);
            })
            document.getElementById('title-input').value = '';
            document.getElementById('cover-filler').value = '';
            document.getElementById('self_description_data_input').value = '';
            document.getElementById('date-start-input').value = '';
            document.getElementById('date-end-input').value = '';
            document.getElementById('op-rating-input').value = 0;
            document.getElementById('overall-rating-input').value = 0;
            let newAnimeArray = this.state.anime_info;
            newAnimeArray.push(newAnime);
            this.setState({
                addOrSubmit: <div id='add-anime-icon' className='add-icon' onClick={this.addRows}>&#43;</div>,
                addNewAnimeTableRow: '',
                anime_info: newAnimeArray,
            }, function(){
                this.createRows(this.state.anime_info)
            })
        }else{
            this.setState({
                addOrSubmit: 
                    <React.Fragment>
                        <button id='submit-anime-row' onClick={this.handleRowSubmit}>submit</button>
                        <div style={{textAlign: 'center'}}>The name is required.</div>
                    </React.Fragment>
            })
        }
    }

    handleReverse = e =>{
        document.getElementById('reverse-button').innerHTML = document.getElementById('reverse-button').innerHTML === 'Reverse' ? 'Revert' : 'Reverse';
        this.setState({
            anime_rows: this.state.anime_rows.reverse(),
        })
    }

    dateConverter = date =>{
        let splitDate = date.split('-');
        let totalDateValue = 0;
        totalDateValue += splitDate[0] * 365 + splitDate[1] * 30 + splitDate[2];
        return totalDateValue;
    }

    changeOrder(e){
        document.getElementById('reverse-button').innerHTML = 'Reverse';
        if(e.target.value){
            let category = e.target.value.split(' ');
            category = category.join('_');
            let sortedByCategoryAnimeInfoList = this.state.copyList;
            let global = this;
            sortedByCategoryAnimeInfoList.sort(function(firstAnime, secondAnime){
                let checkIfDecimal = parseFloat(firstAnime[category])
                if(typeof firstAnime[category] === 'string' && isNaN(checkIfDecimal)){
                    if(firstAnime[category].includes('-')){
                        let formattedDateOne = global.dateConverter(firstAnime[category]);
                        let formattedDateTwo = global.dateConverter(firstAnime[category]);
                        return formattedDateTwo - formattedDateOne;
                    }else{
                        let firstString = firstAnime[category].toLowerCase()
                        let secondString = secondAnime[category].toLowerCase()
                        if (firstString < secondString) //sort string ascending
                            return -1; 
                        else if (firstString > secondString)
                            return 1;
                        return 0; //default return value (no sorting)
                    }
                }else{
                    console.log('hi')
                    return parseFloat(secondAnime[category]) - parseFloat(firstAnime[category]);
                    // return parseFloat(firstAnime[category]) - parseFloat(secondAnime[category]);
                }
            })
            this.createRows(sortedByCategoryAnimeInfoList, e.target.value)
        }else{
            // console.log(this.state.anime_info)
            this.createRows(this.state.anime_info)
        }   
    }

    createRows = (animeInfo, currentCategory='Time Entered') =>{
        //Takes an array of anime objects and a category
        let categoryOptions = [];
        let copyList = [];
        const firstObject = animeInfo[0];

        //creates category options array
        for(let i=0; i<Object.keys(firstObject).length; i++){
            if(Object.keys(firstObject)[i] !== 'Personal_Thoughts' && Object.keys(firstObject)[i] !== 'cover'){
                categoryOptions.push(Object.keys(firstObject)[i]);
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

        for(let i=0; i<animeInfo.length; i++){
            animeInfo[i]['number'] = i + 1;
            copyList.push(Object.assign({}, animeInfo[i]))
        }

        let tempAnimeList = animeInfo.map((anime)=>
            <Row addToDeleteList={this.addToDeleteList} createNewRow={false} key={anime.Name} animeInfo={anime} />
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
    }
      
    //   axios.post(Helper.getUserAPI(), data, {
    //       headers: headers
    //     })
    componentDidMount(){
        console.log(this.props.token)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.props.token,
        }
        const data = {
            username: this.props.username,
        }
        axios.post('http://127.0.0.1:8000/animes/api/animelist/',
        data,
        {
            headers: headers,
        })
        .then(res => {
            this.createRows(res.data.anime_set);
            let animeListNames = [];
            for(let i=0; i<res.data.anime_set.length; i++){
                animeListNames.push(res.data.anime_set[i].Name)
            }
            this.setState({
                'animeNamesList': animeListNames,
            })
        })
        .catch(error => {
            console.log('There was an error blue');
        })

    }
    
    render() {
        return(
            // <React.Fragment>
            // It's a combination of things
            // So you would create your pseudo element
            // Then make parent container position: relative;, and the pseudo element position: absolute
            // To put it next to the left border, you would do left: 0; width: 2px;
            // Then to give it a margin from top/bottom border you do top: 5px; bottom: 5px
            // And finally give it your desired background color, background-color: #999 or the like
            // But to make pseudo elements show up you need to also set content: ''; and display: block
            // I think that should do it
            
            <div id='anime-list'>
                <div id='welcome-sign'>
                    <h1>Youkoso</h1>
                    <h2>anata no AnimeLog</h2>
                </div>
                <div id='category-title'>
                    <p id='current-filter'>Currently ordered by {this.state.currentCategory}</p>
                    <div id='button-options'>
                        <form id='category-form'>
                            <select name='category-filter' onChange={this.changeOrder}>
                                {this.state.category_sort_rows_options}
                            </select>
                        </form>
                        <button id='reverse-button' onClick={this.handleReverse}>Reverse</button>
                        <button id='delete-button' onClick={this.handleDelete}>Delete</button>
                    </div>
                </div>
                
                <table id='anime-table'>
                    <tbody>
                        <tr>
                            {this.state.deleteCheckboxHeader}
                            <th>&nbsp;&nbsp;#&nbsp;&nbsp;</th>
                            <th>&nbsp;Cover&nbsp;</th>
                            <th id='name-category'>Name</th>
                            <th>Personal Thoughts/Reaction</th>
                            <th>Overall Rating</th>
                            {/* <th>OST Rating</th> */}
                            <th>OP Rating</th>
                            {/* <th>ED Rating</th> */}
                            <th>Date Started</th>
                            <th>Date Finished</th>
                            {/* <th>Add/Remove a Category</th> */}
                        </tr>
                    </tbody>
                    <tbody id='anime-rows'>
                        {this.state.anime_rows}
                    </tbody>
                    <tbody id='add-row'>
                        {this.state.addNewAnimeTableRow}
                    </tbody>
                </table>
                {this.state.addOrSubmit}
            </div>
            //</React.Fragment>
        )
    }
}

const List = connect(mapStateToProps, mapDispatchToProps)(AnimeList)

export default List;