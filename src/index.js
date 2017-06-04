import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YouTubeSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = '<your_youtube_api_key_here>';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('supersymmetry');
    }

    videoSearch(searchTerm){
        YouTubeSearch({ key: API_KEY, term: searchTerm }, (videos) => {
            this.setState({ videos: videos, selectedVideo: videos[0] });
        });
    }

    render() {

        const videoSearch = _.debounce( (searchTerm) => { this.videoSearch(searchTerm) }, 300)
        return (
            <div>
                <SearchBar onSearchTermChange={ videoSearch }/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));