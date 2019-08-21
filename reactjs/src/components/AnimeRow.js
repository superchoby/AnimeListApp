import React from 'react';
import './AnimeRow.css'
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

/**
 * @file AnimeRow is a React Component is a row that stores
 * the info of the anime
 * @extends React.Component
 */

/**
 * @method
 * @summary Passes the shouldPrepareToDelete boolean as props
 * @param {object} state - The global state of the program
 * @return {shouldPrepareToDelete} determines if the AnimeRows should prepare for 
 * potential deletion 
 */
const mapStateToProps = state => {
    return { 
        shouldPrepareToDelete: state.shouldPrepareToDelete,
        orderChangedOrReversed: state.orderChangedOrReversed,
        shouldPrepareToEdit: state.shouldPrepareToEdit,
    };
}

// let animeCount = 0;
let firstRow = '';
class AnimeRow extends React.Component{
    /**
     * @constructor
     * @param {props} props - the props for the class
     */
    constructor(props) {
        super(props)
        this.state = {
            dateStarted: '',
            dateFinished: '',
            row: '',
            personalThoughtsTD: 
                <td className='personalThoughtsCol anime-table-data' id='personalThoughts'>
                    {this.props.animeInfo.Personal_Thoughts}
                </td>,
            editButtonClicked: false,
            newName: '',
            newPersonalThoughts: '',
            newOverallRating: '',
            newOPRating: '',
            newStartDate: this.props.animeInfo.data ? new Date(this.props.animeInfo.data.Date_Started) : '',
            newEndDate: this.props.animeInfo.data ? new Date(this.props.animeInfo.data.Date_Finished) : '',
        }

        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleRowCreationOrUpdate = this.handleRowCreationOrUpdate.bind(this);
        this.handleDeleteBoxCheck  = this.handleDeleteBoxCheck.bind(this);
        this.dateConverter = this.dateConverter.bind(this);
        this.handleReactionHover = this.handleReactionHover.bind(this);
        this.handleReactionMouseOut = this.handleReactionMouseOut.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.saveEditedRow = this.saveEditedRow.bind(this);
        this.tryingToEditRow = false;
        this.setNewName = this.setNewName.bind(this);
        this.setNewPersonalThoughts = this.setNewPersonalThoughts.bind(this);
        this.setNewOverallRating = this.setNewOverallRating.bind(this);
        this.setNewOPRating = this.setNewOPRating.bind(this);
        this.setNewStartDate = this.setNewStartDate.bind(this);
        this.setNewEndDate = this.setNewEndDate.bind(this);
        this.needToUpdateForEdit = true;
        this.thisRowIsEdited = false;
        this.newData = {}
    }

    setNewStartDate = date =>{
        this.setState({
            newStartDate: date,
        })
        if(date){
            let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
            let day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()
            let year = date.getFullYear()
            document.getElementById('date-start-input-edit').value = month + '/' + day + '/' + year
        }else{
            document.getElementById('date-start-input-edit').value = '';
        }
    }

    setNewEndDate = date =>{
        //I set the date equal to date object but create a seperate variable for the MM/DD/YYYY date because 
        //I need to have a date object for reactjs datepicker to work
        this.setState({
            newEndDate: date,
        })
        if(date){
            let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
            let day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()
            let year = date.getFullYear()
            document.getElementById('date-end-input-edit').value = month + '/' + day + '/' + year
        }else{
            document.getElementById('date-end-input-edit').value = '';
        }   
    }

    setNewName = e =>{
        this.setState({
            newName: e.target.value,
        })
    }

    setNewPersonalThoughts = e =>{
        this.setState({
            newPersonalThoughts: e.target.value,
        })
    }

    setNewOverallRating = e =>{
        this.setState({
            newOverallRating: e.target.value,
        })
    }

    setNewOPRating = e =>{
        this.setState({
            newOPRating: e.target.value,
        })
    }

    saveEditedRow = newData =>{
        let url = 'http://127.0.0.1:8000/animes/v1/anime/' + this.props.animeInfo.id + '/';
        axios.patch(url, 
            newData,
            {
                headers: this.props.headers
            })
            .then(res=>{
                console.log('good')
            })
            .catch(error=>{
                console.log('bad')
            })
            
        this.thisRowIsEdited = true;
        this.setState({
            editButtonClicked: false,
        })
    }

    handleEditClick = () =>{
        this.row =  <tr className='anime-info-row'>
                            <td className='save-edit-link' onClick={()=>{
                                this.newData = {
                                    data:{},
                                };
                                if(this.state.newName !== ''){
                                    this.newData.Name = this.state.newName
                                }
                                if(this.state.newPersonalThoughts !== ''){
                                    this.newData.data.Personal_Thoughts = this.state.newPersonalThoughts
                                }
                                if(this.state.newOverallRating !== ''){
                                    this.newData.data.Overall_Rating = this.state.newOverallRating
                                }
                                if(this.state.newOPRating !== ''){
                                    this.newData.data.OP_Rating = this.state.newOPRating
                                }
                                if(document.getElementById('date-start-input-edit').value !== this.props.animeInfo.data.Date_Started){
                                    this.newData.data.Date_Started = document.getElementById('date-start-input-edit').value
                                }
                                if(document.getElementById('date-end-input-edit').value  !== this.props.animeInfo.data.Date_Finished){
                                    this.newData.data.Date_Finished = document.getElementById('date-end-input-edit').value
                                }

                                this.saveEditedRow(this.newData);
                            }}>save</td>
                            <td style={{fontSize: '14px'}}>{this.props.animeInfo.number}</td>
                            <td><input id='title-input' defaultValue={this.props.animeInfo.Name} autoComplete="off" onChange={this.setNewName} required></input></td>
                            <td><textarea id='self_description_data_input' defaultValue={this.props.animeInfo.Personal_Thoughts} onChange={this.setNewPersonalThoughts} rows='9' ></textarea></td>
                            <td><input id='overall-rating-input' defaultValue={this.props.animeInfo.Overall_Rating} onChange={this.setNewOverallRating} type='number' min='0' max='10' step='.1' className='number-input' autoComplete="off"></input></td>
                            <td><input id='op-rating-input' defaultValue={this.props.animeInfo.OP_Rating} onChange={this.setNewOPRating} type='number' min='0' max='10' step='.1' className='number-input' autoComplete="off"></input></td>
                            <td>
                                <DatePicker 
                                    selected={this.state.newStartDate} 
                                    onChange={this.setNewStartDate} 
                                />
                            </td>
                            <td>
                                <DatePicker 
                                    selected={this.state.newEndDate} 
                                    onChange={this.setNewEndDate} 
                                />
                            </td>
                            <td style={{'display':'none'}}>
                                 <p id='date-start-input-edit'></p>   
                            </td>
                            <td style={{'display':'none'}}>
                                 <p id='date-end-input-edit'></p>                           
                            </td>
                        </tr>
        // even if row was previously edited, I set this to false to show that the row is currently
        // in editing mode
        this.thisRowIsEdited = false;
        this.tryingToEditRow = true;
        if(!this.state.editButtonClicked){
            this.setState({
                editButtonClicked: true,
            })
        }
    }

    handleStartDateChange = date =>{
        this.setState({
            startDate: date,
          });
        if(date){
            let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
            let day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()
            let year = date.getFullYear()
            document.getElementById('date-start-input').value = month + '/' + day + '/' + year
        }else{
            document.getElementById('date-start-input').value = '';
        }
    }

    handleEndDateChange = date =>{
        this.setState({
            endDate: date,
        });
        if(date){
            let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
            let day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()
            let year = date.getFullYear()
            document.getElementById('date-end-input').value = month + '/' + day + '/' + year
        }else{
            document.getElementById('date-end-input').value = ''
        }
    }

    /**
     * @method
     * @summary Hides the personal thoughts section by changing the text overflow 
     * to ellipsis
     * @param {event} e - The parameter passed for functions triggered by events
     */
    handleReactionMouseOut = e =>{
        this.setState({
            personalThoughtsTD: 
            <td className='personalThoughtsCol anime-table-data' id='personalThoughts' onMouseOut={this.handleReactionMouseOut}>
                {this.props.animeInfo.Personal_Thoughts}
            </td>,
        })
    }

    /**
     * @method
     * @summary Shows the entire information for the Personal Thoughts section
     * when the user hovers the mouse over it
     * @param {event} e - The parameter passed for functions triggered by events
     */
    handleReactionHover = e =>{
        this.setState({
            personalThoughtsTD: 
            <td className='personalThoughtsCol' id='personalThoughts' onMouseOver={this.handleReactionHover} onMouseOut={this.handleReactionMouseOut}>
                <br />
                {this.props.animeInfo.Personal_Thoughts}
                <br />
                <br />
            </td>,
        })
    }

    /**
     * @method
     * @summary Converts the ISO date format from the server into
     * MON DD, YYYY format for better readability
     * @param {string} date - the date to be converted
     * @return {string} The date converted to MON DD, YYYY format
     */
    dateConverter = date =>{
        if(date !== null && date !== ''){
            const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let dateInst = new Date(date);
            let month = shortMonths[dateInst.getMonth()];
            let day = dateInst.getDate() < 10 ? '0' + dateInst.getDate().toString() : dateInst.getDate().toString();
            let year = dateInst.getFullYear();
            let finalDate = month + ' ' + day + ', ' + year;
            return finalDate;
        }else{
            return '';
        }
    }

    /**
     * @method
     * @summary If during the deletion preparing state, the rows checkbox is clicked,
     * then the anime will be added or removed from the delete list
     */
    handleDeleteBoxCheck = e =>{
        if(e.target.checked){
            this.props.addToDeleteList(this.props.animeInfo, true)
        }else{
            this.props.addToDeleteList(this.props.animeInfo, false)
        }
    }

    /**
     * @method
     * @summary Handles when a numberical property of an anime
     * row is changed
     * @param {event} e - the process that triggered the function
     */
    handleNumberChange = e =>{
        if(!e.target.value.includes('.')){
            e.target.value += '.0';
        }
    }

    /**
     * @method
     * @summary Handles when a table row for the anime's info is created
     * or the user is trying to add a new row so there is a new row of forms
     */
    handleRowCreationOrUpdate = () =>{
        if(!this.props.createNewRow && !this.thisRowIsEdited){
            let dateStarted = this.dateConverter(this.props.animeInfo.Date_Started)
            let dateFinished = this.dateConverter(this.props.animeInfo.Date_Finished)

            let shouldPrepareToDelete = this.props.shouldPrepareToDelete;

            let deleteCheckbox = shouldPrepareToDelete[shouldPrepareToDelete.length-1] 
            ? 
            <td id='delete-checkbox'><input onClick={this.handleDeleteBoxCheck} className='anime-table-data' type="checkbox" /></td> 
            : 
            <td style={{display:'none'}}></td>;

            let shouldPrepareToEdit = this.props.shouldPrepareToEdit;

            let editButton = shouldPrepareToEdit[shouldPrepareToEdit.length-1]
            ?
            <td className='save-edit-link' onClick={this.handleEditClick}>edit</td> 
            : 
            <td style={{display:'none'}}></td>;

            this.row = <tr className='anime-info-row'>
                        {deleteCheckbox}
                        {editButton}
                        <td className='numberOrderCol anime-table-data'>{this.props.animeInfo.number}</td>
                        <td className='nameCol anime-table-data'>{this.props.animeInfo.Name}</td>
                        {this.state.personalThoughtsTD}
                        <td className='overallRatingCol anime-table-data'>{this.props.animeInfo.Overall_Rating}</td>
                        {/* <td>{this.props.animeInfo.ost_rating}</td> */}
                        <td className='opRatingCol anime-table-data'>{this.props.animeInfo.OP_Rating}</td>
                        {/* <td>{this.props.animeInfo.ed_rating}</td> */}
                        <td className = 'anime-table-data dateStartCol'>{dateStarted}</td>
                        <td className = 'anime-table-data dateFinishCol'>{dateFinished}</td>
                    </tr>
                
        }else if(this.thisRowIsEdited){
            let shouldPrepareToDelete = this.props.shouldPrepareToDelete;

            let deleteCheckbox = shouldPrepareToDelete[shouldPrepareToDelete.length-1] 
            ? 
            <td id='delete-checkbox'><input onClick={this.handleDeleteBoxCheck} className='anime-table-data' type="checkbox" /></td> 
            : 
            <td style={{display:'none'}}></td>;

            let shouldPrepareToEdit = this.props.shouldPrepareToEdit;

            let editButton = shouldPrepareToEdit[shouldPrepareToEdit.length-1]
            ?
            <td className='save-edit-link' onClick={this.handleEditClick}>edit</td> 
            : 
            <td style={{display:'none'}}></td>;

            let newName = this.newData.Name ? this.newData.Name : this.props.animeInfo.Name;
            let newPersonalThoughts = this.newData.data.Personal_Thoughts ? this.newData.data.Personal_Thoughts : this.props.animeInfo.Personal_Thoughts;   
            let newPersonalThoughtsTD = <td className='personalThoughtsCol anime-table-data' id='personalThoughts'>
                                            {newPersonalThoughts}
                                        </td>
            let newOverallRating = this.newData.data.Overall_Rating ? this.newData.data.Overall_Rating : this.props.animeInfo.Overall_Rating;
            let newOPRating = this.newData.data.OP_Rating ? this.newData.data.OP_Rating : this.props.animeInfo.OP_Rating;
            let newDateStarted =  this.newData.data.Date_Started ? this.newData.data.Date_Started : this.props.animeInfo.data.Date_Started;
            let newDateFinished = this.newData.data.Date_Finished ? this.newData.data.Date_Finished : this.props.animeInfo.data.Date_Finished;
            
            this.row = <tr className='anime-info-row'>
                        {deleteCheckbox}
                        {editButton}
                        <td className='numberOrderCol anime-table-data'>{this.props.animeInfo.number}</td>
                        <td className='nameCol anime-table-data'>{newName}</td>
                        {newPersonalThoughtsTD}
                        <td className='overallRatingCol anime-table-data'>{newOverallRating}</td>
                        <td className='opRatingCol anime-table-data'>{newOPRating}</td>
                        <td className = 'anime-table-data dateStartCol'>{this.dateConverter(newDateStarted)}</td>
                        <td className = 'anime-table-data dateFinishCol'>{this.dateConverter(newDateFinished)}</td>
                    </tr>
        }else{
            this.row =  <tr className='anime-info-row'>
                            <td style={{fontSize: '14px'}} className='numberOrderCol'>{this.props.rowNumber}</td>
                            <td><input id='title-input' className='nameCol' placeholder='title' autoComplete="off" required></input></td>
                            <td><textarea id='self_description_data_input' className='personalThoughtsCol' rows='9' ></textarea></td>
                            <td><input id='overall-rating-input' className='overallRatingCol' type='number' min='0' max='10' step='.1' onChange={this.handleNumberChange} autoComplete="off"></input></td>
                            {/* <td>{this.props.animeInfo.ost_rating}</td> */}
                            <td><input id='op-rating-input' className='opRatingCol' type='number' min='0' max='10' step='.1' onChange={this.handleNumberChange} autoComplete="off"></input></td>
                            {/* <td>{this.props.animeInfo.ed_rating}</td> */}
                            <td className='dateStartCol'>
                                <DatePicker 
                                    selected={this.state.startDate} 
                                    onChange={this.handleStartDateChange} 
                                />
                            </td>
                            <td className='dateFinishCol'>
                                <DatePicker 
                                    selected={this.state.endDate} 
                                    onChange={this.handleEndDateChange} 
                                />
                            </td>
                            {/*I have these store the values of the dates in hte MM/DD/YYY form */}
                            <td style={{'display':'none'}}>
                                 <p id='date-start-input'></p>   
                            </td>
                            <td style={{'display':'none'}}>
                                 <p id='date-end-input'></p>                           
                            </td>
                        </tr>
        }   
    }

    componentDidUpdate(){
        let orderChangedOrReversed = this.props.orderChangedOrReversed;
        if(orderChangedOrReversed[orderChangedOrReversed.length-1] || this.thisRowIsEdited){
            if (firstRow){
                for(let i=0; i<firstRow.getElementsByTagName('TD').length; i++){
                    firstRow.getElementsByTagName('TD')[i].classList.remove('first-row-td');
                }
            }
            for(let i=0; i<document.getElementsByClassName('anime-info-row')[0].getElementsByTagName('TD').length; i++){
                document.getElementsByClassName('anime-info-row')[0].getElementsByTagName('TD')[i].classList.add('first-row-td');
            }
            firstRow = document.getElementsByClassName('anime-info-row')[0];            
        }
    }

    componentDidMount(){
        for(let i=0; i<document.getElementsByClassName('anime-info-row')[0].getElementsByTagName('TD').length; i++){
            document.getElementsByClassName('anime-info-row')[0].getElementsByTagName('TD')[i].classList.add('first-row-td');
        }
        firstRow = document.getElementsByClassName('anime-info-row')[0];            
    }

    render(){
        //if the row shouldnt prepare to edit, then,
        //this.trying to edit row is false
        if(!this.props.shouldPrepareToEdit[this.props.shouldPrepareToEdit.length-1]){
            this.tryingToEditRow = false;
        }

        if(!this.tryingToEditRow || this.thisRowIsEdited){
            this.handleRowCreationOrUpdate();
        }else if(this.tryingToEditRow){
            this.handleEditClick();
        }
        
        return(
            <React.Fragment>
                {this.row}
            </React.Fragment>
        )
    }
}

const Row = connect(mapStateToProps)(AnimeRow);

export default Row;