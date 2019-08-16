import React from 'react';
import './AnimeRow.css'
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
             <td className='personalThoughtsCol anime-table-data' id='personalThoughts' /*onMouseOver={this.handleReactionHover}*/ /*onMouseOut={this.handleReactionMouseOut}*/>
                {this.props.animeInfo.Personal_Thoughts}
             </td>,
        }
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleRowCreationOrUpdate = this.handleRowCreationOrUpdate.bind(this);
        this.handleDeleteBoxCheck  = this.handleDeleteBoxCheck.bind(this);
        this.dateConverter = this.dateConverter.bind(this);
        this.handleReactionHover = this.handleReactionHover.bind(this);
        this.handleReactionMouseOut = this.handleReactionMouseOut.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    handleStartDateChange = date =>{
        this.setState({
          startDate: date
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
                endDate: date
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
            <td className='personalThoughtsCol anime-table-data' id='personalThoughts' /*onMouseOver={this.handleReactionHover}*/ onMouseOut={this.handleReactionMouseOut}>
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
            console.log(dateInst)
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
     * @summary Hanldes when a table row for the anime's info is created
     * or the user is trying to add a new row so there is a new row of forms
     */
    handleRowCreationOrUpdate = () =>{
        if(!this.props.createNewRow){
            let dateStarted = this.dateConverter(this.props.animeInfo.Date_Started)
            let dateFinished = this.dateConverter(this.props.animeInfo.Date_Finished)

            let shouldPrepareToDelete = this.props.shouldPrepareToDelete;

            let deleteCheckbox = shouldPrepareToDelete[shouldPrepareToDelete.length-1] 
            ? 
            <td className='deleteCheckboxCol'><input onClick={this.handleDeleteBoxCheck} className='anime-table-data' type="checkbox" /></td> 
            : 
            <td style={{display:'none'}}></td>;

            this.row = <tr className='anime-info-row'>
                        {deleteCheckbox}
                        <td className='numberOrderCol anime-table-data'>{this.props.animeInfo.number}</td>
                        <td onClick={this.prepareUpdate} className='coverCol anime-table-data'>{this.props.animeInfo.cover}</td>
                        <td className='nameCol anime-table-data'>{this.props.animeInfo.Name}</td>
                        {this.state.personalThoughtsTD}
                        <td className='overallRatingCol anime-table-data'>{this.props.animeInfo.Overall_Rating}</td>
                        {/* <td>{this.props.animeInfo.ost_rating}</td> */}
                        <td className='opRatingCol anime-table-data'>{this.props.animeInfo.OP_Rating}</td>
                        {/* <td>{this.props.animeInfo.ed_rating}</td> */}
                        <td className = 'anime-table-data'>{dateStarted}</td>
                        <td className = 'anime-table-data'>{dateFinished}</td>
                    </tr>
                
        }else{
            this.row =  <tr className='anime-info-row'>
                            <td style={{fontSize: '14px'}}>{this.props.rowNumber}</td>
                            <td><input id='cover-filler' placeholder='filler' autoComplete="off"></input></td>
                            <td><input id='title-input' placeholder='title' autoComplete="off" required></input></td>
                            <td><textarea id='self_description_data_input' rows='9' ></textarea></td>
                            <td><input id='overall-rating-input' type='number' min='0' max='10' step='.1' onChange={this.handleNumberChange} className='number-input' autoComplete="off"></input></td>
                            {/* <td>{this.props.animeInfo.ost_rating}</td> */}
                            <td><input id='op-rating-input' type='number' min='0' max='10' step='.1' onChange={this.handleNumberChange} className='number-input' autoComplete="off"></input></td>
                            {/* <td>{this.props.animeInfo.ed_rating}</td> */}
                            <td>
                                <DatePicker 
                                    selected={this.state.startDate} 
                                    onChange={this.handleStartDateChange} 
                                />
                            </td>
                            <td>
                                <DatePicker 
                                    selected={this.state.endDate} 
                                    onChange={this.handleEndDateChange} 
                                />
                            </td>
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
        if(orderChangedOrReversed[orderChangedOrReversed.length-1]){
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
        
        this.handleRowCreationOrUpdate();
        return(
            <React.Fragment>
                {this.row}
            </React.Fragment>
        )
    }
}

const Row = connect(mapStateToProps)(AnimeRow);

export default Row;