import React from "react";
import { connect } from "react-redux"
import auditionActions from '../Actions/auditionActions'
import pageActions from '../Actions/pageActions'

class AuditionForm extends React.Component {

    state = {
        user_id: this.props.user.id,
        musical_title: "",
        style: "Contemporary",
        time: "",
        date: "",
        song_id: "",
        song_length: "8 Bars",
        casting_office_id: 1,
        audition_location_id: 1,
        appointment: false,
        sides: false,
        sides_performed: false,
        callback: false,
        booked: false,
        notes: "",
        outfit_img: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createNewAuditionToDB(this.state)
        this.props.updatePage("view_edit_audition")
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheck = (e) => {
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }

    songs = () => {
        return this.props.songs.map(song => {
            return <option name="song_id" value={song.id}>{song.title}</option>
        })
    }

    casting_offices = () => {
        return this.props.casting_offices.map(office => {
            return <option name="casting_office_id" key={office.id} value={office.id}>{office.name}</option>
        })
    }

    audition_locations = () => {
        return this.props.audition_locations.map(location => {
            return <option name="audition_location_id" key={location.id} value={location.id}>{location.name}</option>
        })
    }

    render(){
        
        return(
            <form className="audition-form"  onSubmit={this.handleSubmit}>
                <label>Title of Show: <input type="text" name="musical_title" value={this.state.musical_title} onChange={this.onChange} placeholder="title of show"/></label>
                <label>Style of Show: <select name="style" value={this.state.style} onChange={this.onChange}>
                    <option name="style" value="Contemporary">Contemporary</option>
                    <option name="style" value="Disney">Disney</option>
                    <option name="style" value="Doo Wop">Doo Wop</option>
                    <option name="style" value="Golden Age">Golden Age</option>
                    <option name="style" value="Jazz Standard">Jazz Standard(American SongBook)</option>
                    <option name="style" value="Jukebox">Jukebox</option>
                    <option name="style" value="Musical Theatre Pop/Rock">Musical Theatre Pop/Rock</option>
                    <option name="style" value="Operetta">Operetta</option>
                    <option name="style" value="Pop">Pop</option>
                    <option name="style" value="Rock">Rock</option>
                    <option name="style" value="Sondheim">Sondheim</option>
                </select></label>
                <label>Time of Audition: <input type="time" name="time" value={this.state.time} onChange={this.onChange} /></label>
                <label>Date of Audition: <input type="date" name="date" value={this.state.date} onChange={this.onChange} /></label>
                <label>Song Performed from Song Book: <select name="song_id" value={this.state.song_id} onChange={this.onChange}>
                    <option name="song_id" value="">Other</option>
                    { this.songs() }
                </select></label>
                <span>(If "Other" please add song to your song book, or make a note at the bottom of the page regarding the sides you sang)</span>
                <label>If you sang from your book, what was the cut length you performed? <select name="song_length" value={this.state.song_length} onChange={this.onChange}>
                    <option name="song_length" value="8 Bars">8 Bars</option>
                    <option name="song_length" value="16 Bars">16 Bars</option>
                    <option name="song_length" value="32 Bars">32 Bars</option>
                    <option name="song_length" value="Full Song">Full Song</option>
                </select></label>
                <label>Casting Office: <select name="casting_office_id" value={this.state.casting_office_id} onChange={this.onChange}>
                    {this.casting_offices()}
                </select></label>
                <label>Audition Location: <select name="audition_location_id" value={this.state.audition_location_id} onChange={this.onChange}>
                    {this.audition_locations()}
                </select></label>
                <label>Was this an Appointment?<input type="checkbox" name="appointment" value={this.state.appointment} defaultChecked={this.state.appointment} onChange={this.handleCheck} /></label>
                <label>Were you given sides? <input type="checkbox" name="sides" value={this.state.sides} defaultChecked={this.state.sides} onChange={this.handleCheck} /></label>
                <label>Did you perform those sides? <input type="checkbox" name="sides_performed" value={this.state.sides_performed} defaultChecked={this.state.sides_performed} onChange={this.handleCheck} /></label>
                <label>Did you get a callback? <input type="checkbox" name="callback" value={this.state.callback} defaultChecked={this.state.callback} onChange={this.handleCheck} /></label>
                <label>Did you book it? <input type="checkbox" name="booked" value={this.state.booked} defaultChecked={this.state.booked} onChange={this.handleCheck} /></label>
                <label>Notes: <input type="text-area" name="notes" value={this.state.notes} onChange={this.onChange} /></label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    songs: state.songBookReducer.song_book,
    casting_offices: state.castingOfficeReducer.all_casting_offices,
    audition_locations: state.auditionLocationReducer.all_audition_locations,
    user: state.userReducer
})

const mapDispatchToProps = {
    createNewAuditionToDB: auditionActions.createNewAuditionToDB,
    updatePage: pageActions.updatePage
};

export default connect(mapStateToProps, mapDispatchToProps)(AuditionForm)