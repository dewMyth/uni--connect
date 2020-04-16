import React, { Component } from 'react';
import axios from 'axios';

class Degree extends Component{
    constructor(props){
        super(props);

        this.onChangeDegreeTitle = this.onChangeDegreeTitle.bind(this);
        this.onChangeFaculty = this.onChangeFaculty.bind(this);
        this.onChangeDepartment= this.onChangeDepartment.bind(this);
        this.onChangeDegreeDescription = this.onChangeDegreeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            degreeTitle : '',
            faculty : '',
            department : '',
            degreeDescription : '',
            faculties : [],
            departments : []
        }
    }

    componentDidMount() {
        axios.get('/faculties')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        faculties : response.data.map(faculty => faculty.facultyTitle),
                        facultyTitle : response.data[0].facultyTitle
                    })
                }
            });

            axios.get('/departments')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        departments : response.data.map(department => department.departmentTitle),
                        departmentTitle : response.data[0].departmentTitle
                    })
                }
            });

    }

    onChangeDegreeTitle(e){
        this.setState({
            degreeTitle : e.target.value
        });
    }

    onChangeFaculty(e){
        this.setState({
            faculty : e.target.value
        });
    }


    onChangeDepartment(e){
        this.setState({
            department : e.target.value
        });
    }

    onChangeDegreeDescription(e){
        this.setState({
            degreeDescription : e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const degree = {
            degreeTitle: this.state.degreeTitle,
            faculty: this.state.faculty,
            department: this.state.department,
            degreeDescription: this.state.degreeDescription
        }

        console.log(degree);

        this.setState({
            degreeTitle: '',
            faculty : '',
            department: '',
            degreeDescription : ''
        });

        axios.post('/degrees/add' , degree)
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
                        value = { this.state.degreeTitle }
                        onChange = { this.onChangeDegreeTitle }
                    />
                    <br />
                    <br />

                    <select
                            required
                            className="form-control"
                            value={ this.state.faculty }
                            placeholder="Faculty"
                            onChange={this.onChangeFaculty}>
                                                            {
                                this.state.faculties.map(function(faculty){
                                    return < option
                                        key={faculty}
                                        value={faculty}>
                                            {faculty}
                                            </option>
                                })
                            }
                        </select>
                        <br />
                        <br />
                        <select
                            required
                            className="form-control"
                            value={ this.state.department }
                            placeholder="Department"
                            onChange={this.onChangeDepartment}>
                                                            {
                                this.state.departments.map(function(department){
                                    return < option
                                        key={department}
                                        value={department}>
                                            {department}
                                            </option>
                                })
                            }

                        </select>


                    <br />
                    <br />
                    <div>
                    <input 
                        required
                        className="form-Control"
                        placeholder = "Description"
                        value = { this.state.degreeDescription }
                        onChange = {this.onChangeDegreeDescription }
                    />

                    </div>
                </div>
                <div className="form-group">
                    <input type='submit' value="Add Degree" className="btn btn-primary" />
                </div>
            </form>
        </div>

        );
    }
}

export default Degree;