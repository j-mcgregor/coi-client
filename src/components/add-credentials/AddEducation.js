import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileAction';

// Components
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddEducation extends Component {
  constructor(props){
    super(props);

    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onSubmit(e){
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    // this.props.history is available withRouter
    this.props.addEducation(eduData, this.props.history);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCheck(e){
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  render(){

    const { errors } = this.state;
    return(
      <div className="add-education">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Go back</Link>
              <h1 class="display-4 text-center">Add Education</h1>
              <p class="lead text-center">What schools, colleges and universities did you go to?</p>
              <small class="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={ this.state.disabled ? 'disabled' : '' }
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={ this.state.current }
                    checked={ this.state.current }
                    onChange={ this.onCheck }
                    id="current"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="current"
                  >
                    Current school?
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={ this.state.description}
                  onChange={ this.onChange }
                  error={ errors.description }
                  info="Tell us a bit about your educational experience here"
                />
                <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
