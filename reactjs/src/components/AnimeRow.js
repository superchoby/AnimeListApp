import React from 'react';
import './AnimeRow.css'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
        shouldPrepareToDelete: state.shouldPrepareToDelete,
    };
}

class AnimeRow extends React.Component{
    /**
     * @constructor
     * @param {*} props 
     */
    constructor(props) {
        super(props)
        this.state = {
             dateStarted: '',
             dateFinished: '',
             row: '',
        }
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleRowCreationOrUpdate = this.handleRowCreationOrUpdate.bind(this);
        this.handleDeleteBoxCheck  = this.handleDeleteBoxCheck.bind(this);
    }

    handleDeleteBoxCheck = e =>{
        if(e.target.checked){
            this.props.addToDeleteList(this.props.animeInfo.Name, true)
        }else{
            this.props.addToDeleteList(this.props.animeInfo.Name, false)
        }
    }

    handleNumberChange = e =>{
        if(!e.target.value.includes('.')){
            e.target.value += '.0';
        }
    }

    handleRowCreationOrUpdate = () =>{
        if(!this.props.createNewRow){
            let split_date_started, split_date_finished, reformatted_date_started, reformatted_date_finished;

            if(this.props.animeInfo.Date_Started !== null){
                split_date_started = this.props.animeInfo.Date_Started.split('-')
                reformatted_date_started = `${split_date_started[1]}/${split_date_started[2]}/${split_date_started[0]}`;
                if(split_date_started[0] === 'undefined'){
                    reformatted_date_started = '';
                }
            }else{
                reformatted_date_started = '';
            }

            if(this.props.animeInfo.Date_Finished !== null){
                split_date_finished = this.props.animeInfo.Date_Finished.split('-')
                reformatted_date_finished = `${split_date_finished[1]}/${split_date_finished[2]}/${split_date_finished[0]}`;
                if(split_date_finished[0] === 'undefined'){
                    reformatted_date_finished = '';
                }
            }else{
                reformatted_date_finished = '';
            }

            let dateStarted = reformatted_date_started;
            let dateFinished = reformatted_date_finished;
            let shouldPrepareToDelete = this.props.shouldPrepareToDelete;

            let deleteCheckbox = shouldPrepareToDelete[shouldPrepareToDelete.length-1] ? <td><input onClick={this.handleDeleteBoxCheck} type="checkbox" /></td> 
            : 
            <td style={{display:'none'}}></td>;

            this.row = <tr id='anime-info-row'>
                            {deleteCheckbox}
                            <td>{this.props.animeInfo.number}</td>
                            <td>{this.props.animeInfo.cover}</td>
                            <td>{this.props.animeInfo.Name}</td>
                            <td>{this.props.animeInfo.Personal_Thoughts}</td>
                            <td>{this.props.animeInfo.Overall_Rating}</td>
                            {/* <td>{this.props.animeInfo.ost_rating}</td> */}
                            <td>{this.props.animeInfo.OP_Rating}</td>
                            {/* <td>{this.props.animeInfo.ed_rating}</td> */}
                            <td>{dateStarted}</td>
                            <td>{dateFinished}</td>
                        </tr>
        }else{
        this.row =  <tr id='anime-info-row'>
                        <td style={{fontSize: '14px'}}>{this.props.rowNumber}</td>
                        <td><input id='cover-filler' placeholder='filler'></input></td>
                        <td><input id='title-input' placeholder='title'></input></td>
                        <td><textarea id='self_description_data_input' rows='9' cols='55' ></textarea></td>
                        <td><input id='overall-rating-input' type='number' min='0' max='10' step='.5' onChange={this.handleNumberChange} className='number-input'></input></td>
                        {/* <td>{this.props.animeInfo.ost_rating}</td> */}
                        <td><input id='op-rating-input' type='number' min='0' max='10' step='.5' onChange={this.handleNumberChange} className='number-input'></input></td>
                        {/* <td>{this.props.animeInfo.ed_rating}</td> */}
                        <td><input id='date-start-input' className='date-input' placeholder='MM/DD/YYYY'></input></td>
                        <td><input id='date-end-input' className='date-input' placeholder='MM/DD/YYYY'></input></td>
                    </tr>
        }   
    }
    
    // componentDidMount = () =>{
    //     if(!this.props.createNewRow){
    //         this.handleRowCreationOrUpdate();
    //     }else{
    //         this.setState({
    //             row: <tr id='anime-info-row'>
    //                     <td style={{fontSize: '14px'}}>{this.props.rowNumber}</td>
    //                     <td><input id='cover-filler' placeholder='filler'></input></td>
    //                     <td><input id='title-input' placeholder='title'></input></td>
    //                     <td><textarea id='self_description_data_input' rows='9' cols='55' ></textarea></td>
    //                     <td><input id='overall-rating-input' type='number' min='0' max='10' step='.5' onChange={this.handleNumberChange} className='number-input'></input></td>
    //                     {/* <td>{this.props.animeInfo.ost_rating}</td> */}
    //                     <td><input id='op-rating-input' type='number' min='0' max='10' step='.5' onChange={this.handleNumberChange} className='number-input'></input></td>
    //                     {/* <td>{this.props.animeInfo.ed_rating}</td> */}
    //                     <td><input id='date-start-input' className='date-input' placeholder='MM/DD/YYYY'></input></td>
    //                     <td><input id='date-end-input' className='date-input' placeholder='MM/DD/YYYY'></input></td>
    //                 </tr>,
    //         })
    //     }
    // }

    render(){
        this.handleRowCreationOrUpdate()
        // let deleteCheckbox = shouldPrepareToDelete[shouldPrepareToDelete.length-1] ? <td><input onClick={this.handleDeleteBoxCheck} type="checkbox" /></td> 
        return(
            <React.Fragment>
                {/* {this.state.row} */}
                {this.row}
            </React.Fragment>
        )
    }
}

const Row = connect(mapStateToProps)(AnimeRow);

export default Row;