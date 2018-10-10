export const  FETCH_NOTES = 'FETCH_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE';
export const  FETCH_NOTE = 'FETCH_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = "UPDATE_NOTE";
import notesList from '../store';

export function fetchNotes(notes) {
    if(!notes){
        notes = notesList;
    }
    return {
        type:FETCH_NOTES,
        payload :notes
    }    
}

export function createNote(value,cb){
    var noteMap = _.mapKeys(notesList, 'id');
    value.created_at = new Date().getTime();
    if(!value.id){
        var sortedArray = Object.keys(noteMap).sort(function(a,b){return b-a});
        value.id = Number(sortedArray[0]) + 1;
        noteMap[value.id] = value;
        notesList.push(value);
        cb();
        return {
            type: ADD_NOTE,
            payload:value
        }
    }else{
        noteMap[value.id] = value;
        var notes = _.values(noteMap);
        cb();
        return {
            type: UPDATE_NOTE,
            payload:value
        }
    }
}

export function fetchNote(id){
    return {
        type:FETCH_NOTE,
        payload :id
    }    
}
export function deleteNote(id){
    return {
        type:DELETE_NOTE,
        payload:id
    }
}

export function sortNotes(color){
    var notes ;
    if(color === 'all'){
        notes = notesList;
    }else{
       notes = notesList.filter(function(obj){
            return obj.color === color;
        });
    }
    return {
        type:FETCH_NOTES,
        payload :notes
    }    

}