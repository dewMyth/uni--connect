import React, { Component } from 'react';
import axios from 'axios';

class Faculty extends Component {
    constructor( props ) {
        super( props );

        this.onChangeFacultyTitle = this.onChangeFacultyTitle.bind(this);
        this.onChangeFacultyImage = this.onChangeFacultyImage.bind(this);
        this.onChangeFacultyDescription = this.onChangeFacultyDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        this.state = {
            facultyTitle : '',
            facultyImage : '',
            facultyDescription : ''
        }
    }

    onChangeFacultyTitle(e) {
        this.setState({
            facultyTitle : e.target.value
        });
    }

    onChangeFacultyImage(e) {
        this.setState({
            facultyImage : e.target.value
        });
    }

    onChangeFacultyDescription(e) {
        this.setState({
            facultyDescription : e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const faculty = {
            facultyTitle: this.state.facultyTitle,
            facultyImage: this.state.facultyImage,
            facultyDescription: this.state.facultyDescription
        }

        console.log(faculty);

        this.setState({
            facultyTitle : '',
            facultyImage : '',
            facultyDescription : ''
        });

        axios.post('/faculties/add' , faculty)
        .then(res => console.log(res.data));
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <input 
                            required
                            className="form-Control"
                            placeholder = "Title"
                            value = { this.state.facultyTitle }
                            onChange = { this.onChangeFacultyTitle}
                        />
                        <br />
                        <br />
                        <input 
                            required
                            className="form-Control"
                            placeholder = "Image"
                            value = { this.state.facultyImage }
                            onChange = { this.onChangeFacultyImage}
                        />
                        <br />
                        <br />
                        <input 
                            required
                            className="form-Control"
                            placeholder = "Description"
                            value = { this.state.facultyDescription }
                            onChange = {this.onChangeFacultyDescription }
                        />
                    </div>
                    <div className="form-group">
                        <input type='submit' value="Add Faculty" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        )
    }
}

export default Faculty;