import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNote, createNote } from '../actions';
import { Link } from 'react-router-dom';


class NotesNewForm extends Component {
    onSubmit(values) {
        values.preventDefault();
        var form = document.forms.notesForm;
        var values = {
            id:Number(this.props.match.params.id) || '',
            title: form.title.value,
            content:form.content.value,
            color:form.color.value
        }
       
        this.props.createNote(values, () => {
            this.props.history.push('/');
        });
    }

    componentDidMount() {
        if (!this.props.note && this.props.match.param) {
            const { id } = this.props.match.params;
            this.props.fetchNote(id);
        }
    }
    render() {
        const { note } = this.props;
       
        // if (!note) {
        //     return (<div> Loading...</div>);
        // }
        return (
            <div >
                <Link to="/">Back to Notes</Link>
                <form  name='notesForm' onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            defaultValue={ note && note.title || ''}
                            className="form-control"
                            name='title'
                        />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea className={`form-control ${note && note.color || 'yellow'}`} rows="3" defaultValue={note && note.content || ''}
                        name='content'
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Color</label>
                        <select className="form-control" defaultValue={note && note.color || 'yellow'}
                        name="color" >
                            <option value="red">Red</option>
                            <option value="greenyellow">Green</option>
                            <option value="plum">Purple</option>
                            <option value="yellow">Yellow</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Save/Update</button>
                    <Link to="/" className="btn btn-danger" > Cancel </Link>
                </form>

            </div>

        );
    }
}
function mapStateToProps({ notes }, ownProps) {
    return {
        note: notes[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { createNote, fetchNote })(NotesNewForm);
