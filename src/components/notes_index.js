import _ from 'lodash';
import React, { Component } from 'react';
import { fetchNotes ,deleteNote ,sortNotes } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';
class NotesIndex extends Component {

    componentDidMount() {
        debugger;
        if(Object.keys(this.props.notes).length>0){
            this.props.fetchNotes(this.props.notes);
        }else{
            this.props.fetchNotes();
        }
        
    }
    onDeleteClick(id){
        this.props.deleteNote(id,()=>{
            this.props.history.push('/');
        })
    }
    renderPosts() {
        return _.map(this.props.notes, note => {
            
            return (
                <tr className={note.color} key={note.id}>
                    <td>{note.title}</td>
                    <td>
                        {Moment(note.created_at).format('YYYY-MMM-DD hh:MM')}
                    </td>
                    <td>
                    <Link to={`/notes/${note.id}`} >
                        Edit
                    </Link>
                    </td>
                    <td  onClick={this.onDeleteClick.bind(this,note.id)} >Delete Note</td>
                </tr>
            )
        });
    }
    sortDataByColor(event){
        
        this.props.sortNotes(event.target.value,()=>{
            this.props.history.push('/');
        })
    }
    render() {
        if(!this.props.notes){
            return  (<div className="loading">Loading..</div>);
        }else{
            return (<div className="mt10">
                <div className="row">
                    <h3 className="col-md-7">Notes</h3>
                    <div className="col-md-3">
                        <label>Sort by color</label>
                        <select  defaultValue={'yellow'}
                        name="color"
                        onChange={this.sortDataByColor.bind(this)} >
                            <option value="red">Red</option>
                            <option value="greenyellow">Green</option>
                            <option value="plum">Purple</option>
                            <option value="yellow">Yellow</option>
                            <option value="all">Show All</option>
                        </select>
                    </div>
                    <Link className="btn btn-info col-md-2" to="/notes/new">
                     <strong>+</strong> Add a Note</Link>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Creation/Updation Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderPosts()}
                    </tbody>
                </table>
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return { notes: state.notes };
}

export default connect(mapStateToProps, { fetchNotes,deleteNote,sortNotes })(NotesIndex);