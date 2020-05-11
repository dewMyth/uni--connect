import React,{Component} from 'react';
import CreatePost from "../elements/CreatePost/CreatePost";
import Post from "../elements/Post/Post";

class Feed extends Component{
    render(){
        return(
            <div>
                    <CreatePost />
                    <Post />
            </div>
        )
    }
}

export default Feed;