import React from 'react';
import './AnimeList.css';
import axios from 'axios';
import Row from './AnimeRow';
import { connect } from 'react-redux';
import { prepareToDelete } from '../actions/index';

/**
 * @file AnimeList is a React Component that let's the user see
 * the anime that they have watched
 * 
 * @extends React.Component
 */

/**
 * mapDispatchToProps
 * @method
 * @summary Let's the component change the boolean variable 
 * about whether the program should prepare to delete anime
 * rows
 * @param {function} dispatch - Triggers a change in the store
 * by dispatching an action
 * @return {function} prepareToDelete - a function that will be passed 
 * down as props and will allow the component to update the
 * shouldPrepare to delete boolean
 */
function mapDispatchToProps(dispatch) {
    return {
        prepareToDelete: shouldPrepareToDelete => dispatch(prepareToDelete(shouldPrepareToDelete)),
    }
}

/**
 * mapStateToProps
 * @method
 * @summary Goes to the central store and retrieves those variables
 * and passses them down as props for this component
 * 
 * @param {Object} state - An object of arrays that store all
 * the state changes
 * @return {Object} UnnamedObject - the props to be passed down 
 */
const mapStateToProps = state => {
    return { 
        token: state.token[state.token.length-1],
        username: state.username[state.username.length-1]
    };
}

class AnimeList extends React.Component {

    /**
     * constructor
     * @summary default constructor that binds methods and sets the state
     * @param {*} props - Class that constructor inherits from
     * @constructor
     */
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
        this.handleDeleteButtonSubmit = this.handleDeleteButtonSubmit.bind(this);
        this.deleteRows = this.deleteRows.bind(this);
        this.addToDeleteList = this.addToDeleteList.bind(this);
        
        this.animeToDelete = [];
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.props.token,
        }
    }

    /**
     * @method
     * @summary function to pass down as props so when 
     * an anime checkbox is filled they are added
     * to list of anime's name to delete
     * @param {string} animeToDelete - Object containing the anime to delete's info
     * @param {boolean} addToList - Determines whether or not the anime's name  
     * should be added or removed from the list depending on if the
     * anime has been checkmarked or uncheckmarked
     */
    addToDeleteList = (animeToDelete, addToList) =>{
        if(addToList){
            this.animeToDelete.push(animeToDelete);
        }else{
            this.animeToDelete.splice(this.animeToDelete.indexOf(animeToDelete), 1);
        }
    }

    /**
     * @method
     * @summary final delete function that actually deletes the anime
     */
    deleteRows = () =>{
        let animeToDeleteNames = []
        for(let i=0; i<this.animeToDelete.length; i++){
            animeToDeleteNames.push(this.animeToDelete[i].Name)
        }
        let filteredArray = this.state.anime_info.filter(anime =>{
            // filters out all anime who's name matches the anime to delete
            // only one should be selected as names are unique
            return !animeToDeleteNames.includes(anime.Name)
        })
        
        for (let i=0; i<this.animeToDelete.length; i++){
            let url = 'http://127.0.0.1:8000/animes/v1/anime/' + this.animeToDelete[i].id + '/';
            console.log(url)
            axios.delete(url,
            {
                headers: this.headers,
            })
            .then(res =>{
                console.log('good')
            })
            .catch(err =>{
                console.log('bad')
            })
        }
        

        for (let i=0; i<filteredArray.length; i++){
            filteredArray[i].number = i+1;
        }

        this.setState({
            anime_info: filteredArray,
            deleteCheckboxHeader: <td style={{display: 'none'}}></td>,
        }, function(){
            this.createRows(this.state.anime_info);
        })
    }

    /**
     * @method
     * @summary Handles when the delete button is submitted
     * this method will change the text of the delete button to 
     * confirmed and will add checkmark boxes in the table that 
     * the user can click to delete the anime
     * @param {event} e - paramter that gets passed in button click 
     */
    handleDeleteButtonSubmit = e =>{
        if(document.getElementById('delete-button').innerHTML === 'Delete'){
            document.getElementById('delete-button').innerHTML = 'Confirm';
            this.props.prepareToDelete(true);
            // this.props.startDeletingProcess(false);
            this.setState({
                //adds an extra empty table header for the delete checkboxesy
                deleteCheckboxHeader: <th></th>,
            })
        }else{// the innerHTML === 'Confirm'
            document.getElementById('delete-button').innerHTML = 'Delete';
            this.props.prepareToDelete(false);
            this.deleteRows();
        }
    }

    /**
     * @method
     * @summary Adds a new row to the table that allows users to
     * input new anime information, if this is the user's first anime then
     * the else is triggered as the rowNumber needs to be set to one
     */
    addRows = () =>{
        if(this.state.anime_rows){
            this.setState({
                addNewAnimeTableRow: <Row createNewRow={true} rowNumber={this.state.anime_rows.length + 1} />,
                addOrSubmit: <button id='submit-anime-row' onClick={this.handleRowSubmit}>submit</button>,
            })
        }else{
            this.setState({
                addNewAnimeTableRow: <Row createNewRow={true} rowNumber={1} />,
                addOrSubmit: <button id='submit-anime-row' onClick={this.handleRowSubmit}>submit</button>,
            })
        }
    }

    /**
     * @method
     * @summary When an anime's info is added and user presses submit,
     * this function activates. This grabs the values of all the inputs and 
     * sends a post request to the server containing the anime's info.
     * Finally, the anime is stored in the list containing the anime
     * 
     * @param {event} e - The event paramter passed when button is clicked
     */
    handleRowSubmit = e =>{
        if(document.getElementById('title-input').value !== ''){
            if(document.getElementById('reverse-button').innerHTML === 'Revert'){
                document.getElementById('reverse-button').innerHTML = 'Reverse';
            } 
            let split_date_started = document.getElementById('date-start-input').value.split('/');
            let split_date_finished = document.getElementById('date-end-input').value.split('/');
            let formattted_date_started = split_date_started.length === 1 ? null : `${split_date_started[2]}-${split_date_started[1]}-${split_date_started[0]}`
            let formattted_date_finished = split_date_finished.length === 1 ? null : `${split_date_finished[2]}-${split_date_finished[1]}-${split_date_finished[0]}`
            let newAnime = {
                Name: document.getElementById('title-input').value ? document.getElementById('title-input').value : null,
                cover: document.getElementById('cover-filler').value ? document.getElementById('cover-filler').value : null,
                Personal_Thoughts: document.getElementById('self_description_data_input').value ? document.getElementById('self_description_data_input').value : null,
                Date_Started: formattted_date_started,
                Date_Finished: formattted_date_finished,
                OP_Rating: document.getElementById('op-rating-input').value ? document.getElementById('op-rating-input').value : null,
                Overall_Rating: document.getElementById('overall-rating-input').value ? document.getElementById('overall-rating-input').value : null,
                username: this.props.username,
            }
            axios.post('http://127.0.0.1:8000/animes/v1/anime/', 
            newAnime,
            {
                headers: this.headers,
            })
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
            // console.log(this.state.anime_info)
            // let newAnimeArray = this.state.anime_info;
            let newAnimeArray = this.state.anime_info ? this.state.anime_info : []
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

    /**
     * @method
     * @summary Reverses the order that the anime is listed
     * @param {event} e - The event paramter passed when button is clicked
     */
    handleReverse = e =>{
        document.getElementById('reverse-button').innerHTML = document.getElementById('reverse-button').innerHTML === 'Reverse' ? 'Revert' : 'Reverse';
        this.setState({
            anime_rows: this.state.anime_rows.reverse(),
        })
    }

    /**
     * @method
     * @summary turns the date into a single numerical value that
     * is used when ordering the animes by date
     * @param {string} date - the date the anime was either started or finished
     */
    dateConverter = date =>{
        let splitDate = date.split('-');
        let totalDateValue = 0;
        totalDateValue += splitDate[0] * 365 + splitDate[1] * 30 + splitDate[2];
        return totalDateValue;
    }

    /**
     * @method
     * @summary Returns the reverse buttons text to 'Reverse' and 
     * sorts the order of the anime depending on the category chosen 
     * by the use
     * @param {event} e - The event paramter passed when button is clicked
     */
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

    /**
     * @method
     * @summary Creates the anime rows by parsing the anime info passed
     * and passing down the information as props to the AnimeRow component
     * changes the part of the site that says "currently ordered by" 
     * @param {array} animeInfo - An array of objects that store the anime's info
     * @param {string} currentCategory - The current category that the table is
     * sorted by
     */
    createRows = (animeInfo, currentCategory='Time Entered') =>{
        if(animeInfo.length !== 0){//if the user has any anime at all recorded
            //Takes an array of anime objects and a category
            let categoryOptions = [];
            let copyList = [];
            const firstAnimeObject = animeInfo[0];
            //creates category options array
            for(let i=0; i<Object.keys(firstAnimeObject).length; i++){
                if(Object.keys(firstAnimeObject)[i] !== 'Personal_Thoughts' && Object.keys(firstAnimeObject)[i] !== 'cover'){
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
        }else{//if the user has no anime at all
            this.setState({
                anime_rows: [], //array of AnimeRow components
                category_sort_rows_names: [],
                anime_info: [],
                copyList: [],
            })
        }
    }
      
    /**
     * @method
     * @summary - Activates after the component mounts, performs a post
     * request to the server and with the info creates the user's anime table
     */
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/users/v1/user/',
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
            console.log('There was an error blue');
        })

    }
    
    render() {
        return(
            <div id='anime-list'>

                <div id='welcome-sign'>
                    <h1>MitaAnime</h1>
                    <h2>e youkouso!</h2>
                    <div id='category-title'>
                        <p id='current-filter'>Currently ordered by {this.state.currentCategory}</p>
                        <div id='button-options'>
                            <form id='category-form'>
                                <div id='category-dropdown'>
                                    <select onChange={this.changeOrder}>
                                        {this.state.category_sort_rows_options}
                                    </select>
                                </div>
                            </form>
                            <button id='reverse-button' className='option-buttons' onClick={this.handleReverse}>Reverse</button>
                            <button id='delete-button' className='option-buttons' onClick={this.handleDeleteButtonSubmit}>Delete</button>
                        </div>
                    </div>
                </div>

                <table id='anime-table'>
                    <thead>
                        <tr>
                            {this.state.deleteCheckboxHeader}
                            <th className='numberOrderCol'>&nbsp;&nbsp;#&nbsp;&nbsp;</th>
                            <th className='coverCol'>&nbsp;Cover&nbsp;</th>
                            <th className='nameCol' id='name-category'>Name</th>


                            {/* DO TEXT-OVERFLOW: ELLISPIS */}
                            <th className='personalThoughtsCol'>Personal Thoughts</th>




                            <th>Overall Rating</th>
                            {/* <th>OST Rating</th> */}
                            <th>OP Rating</th>
                            {/* <th>ED Rating</th> */}
                            <th>Date Started</th>
                            <th>Date Finished</th>
                            {/* <th>Add/Remove a Category</th> */}
                        </tr>
                    </thead>

                    <tbody id='anime-rows' style={{marginTop: '20px'}}>
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