import React, { Component } from 'react';
import { getPost, editPost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tagline: '',
      body: '',
      images: [],
      errors: {},
      ready: true
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const { match, history } = this.props;
    e.preventDefault();

    const updatedPost = {
      title: this.state.title,
      tagline: this.state.tagline,
      body: this.state.body,
      images: this.state.images
    };

    this.props.editPost(updatedPost, match.params.id, history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeBody(value) {
    this.setState({ body: value });
  }

  addPhoto(e) {
    var formData = new FormData();

    formData.append('file', e.target.files[0]);
    formData.append('name', 'test');
    this.setState({ ready: false });

    axios
      .post('/api/posts/files', formData)
      .then(res => {
        let arr = [];
        arr.push(res.data.url);
        this.setState({ images: arr, ready: true });
      })
      .catch(errors => this.setState({ errors }));
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
    axios
      .get(`/api/posts/${id}`)
      .then(post => {
        this.setState({
          title: post.data.title,
          tagline: post.data.tagline,
          body: post.data.body,
          images: post.data.images
        });
      })
      .catch(err => this.setState({ errors: err }));
  }

  render() {
    const { post, comments } = this.props.posts;
    const { title, tagline, body, images } = this.state;

    return (
      <div className="editPost">
        <div className="jumbotron-fluid">
          <div className="container">
            <h1 className="display-5 py-5 text-center">Edit Post</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter a title for your post"
                    onChange={this.onChange}
                    defaultValue={title}
                  />
                </div>
                <div className="form-group">
                  <label>Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    className="form-control"
                    placeholder="Give your post a tagline"
                    onChange={this.onChange}
                    defaultValue={tagline}
                  />
                </div>

                <div className="form-group">
                  <ReactQuill
                    className=""
                    value={body}
                    onChange={this.onChangeBody}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Upload an image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="image"
                    onChange={this.addPhoto}
                  />
                </div>
                {this.state.ready ? (
                  <input type="submit" value="Submit" />
                ) : (
                  <input type="submit" value="Uploading..." disabled />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth,
  comments: state.comments
});

export default connect(
  mapStateToProps,
  {
    getPost,
    editPost
  }
)(EditPost);
