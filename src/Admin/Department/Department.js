import React, { Component } from 'react';
import axios from 'axios';

class Department extends Component{
    constructor(props){
        super(props);

        this.onChangeDepartmentTitle = this.onChangeDepartmentTitle.bind(this);
        this.onChangeFaculty = this.onChangeFaculty.bind(this);
        this.onChangeDepartmentImage = this.onChangeDepartmentImage.bind(this);
        this.onChangeDepartmentDescription = this.onChangeDepartmentDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            departmentTitle : '',
            faculty : '',
            departmentImage : '',
            departmentDescription : '',
            faculties : []
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
            })
    }

    onChangeDepartmentTitle(e){
        this.setState({
            departmentTitle : e.target.value
        });
    }

    onChangeFaculty(e){
        this.setState({
            faculty : e.target.value
        });
    }


    onChangeDepartmentImage(e){
        this.setState({
            departmentImage : e.target.value
        });
    }

    onChangeDepartmentDescription(e){
        this.setState({
            departmentDescription : e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const department = {
            departmentTitle: this.state.departmentTitle,
            faculty: this.state.faculty,
            departmentImage: this.state.departmentImage,
            departmentDescription: this.state.departmentDescription
        }

        console.log(department);

        this.setState({
            departmentTitle: '',
            faculty : '',
            departmentImage: '',
            departmentDescription : ''
        });

        axios.post('/departments/add' , department)
        .then(res => console.log(res.data));

    }

    render(){
        return(
            <div className="container">
            <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                    <input 
                        required
                        className="dg form-control"
                        placeholder = "Title"
                        value = { this.state.departmentTitle }
                        onChange = { this.onChangeDepartmentTitle }
                    />
                    <br />

                    <select
                            required
                            className="dg form-control"
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
 
                    <input 
                        required
                        className="dg form-control"
                        placeholder = "Image"
                        value = { this.state.departmentImage }
                        onChange = { this.onChangeDepartmentImage }
                    />
                    <br />

                    <div>
                    <input 
                        required
                        className="form-control"
                        placeholder = "Description"
                        value = { this.state.departmentDescription }
                        onChange = {this.onChangeDepartmentDescription }
                    />

                    </div>
                </div>
                <div className="form-group">
                    <input type='submit' value="Add Department" className="btn btn-primary" />
                </div>
            </form>
        </div>

        );
    }
}

export default Department;