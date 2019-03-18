import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
//import axios from 'axios';
import axios from '../../axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedId: null,
        error: false
    }
    componentDidMount() {
        axios.get('/posts/').then((response)=> {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            });
            this.setState({
                posts: updatedPosts
            })
        }).catch(error => this.setState({error: true}));
    }
    postSelected = ( id => {
        this.setState({
            selectedId: id
        })
    });
    render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
    if(!this.state.error){
        posts = this.state.posts.map(el => 
            <Post title={el.title}
             author={el.author}
              key={el.id}
              clicked={()=> this.postSelected(el.id)}/>);
    }
      const selectedPost =  <FullPost id={this.state.selectedId}/>;
        return (
            <div>
                <section className="Posts"> 
                {posts}
                </section>
                <section>
                   {selectedPost}
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;