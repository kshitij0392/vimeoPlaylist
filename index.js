import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import VideoList from './src/components/videoList';
import VideoDetail from './src/components/videoDetail';
import Navbar from './src/components/navbar';

//create a new component
let playlist = [];
class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null,
        };
        //  this.videoSearch('Surfboards')
        this.getVideos();

    }

    getVideos() {
        self = this;

        var url = 'https://api.vimeo.com/channels/actionsports/videos';
        var accessToken = '9b52aedcdbfcc0d12362ad11e6bdef4c'
        $.ajax({
            type: "GET",
            url: url
            , beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + accessToken);
                xhr.setRequestHeader('Accept', "application/json");
            }
            , success: function (response) {
                response.data.forEach(element => {
                    var videoId = element.uri.split('/').slice(2);
                    videoId = videoId.toString();
                    element['videoId'] = videoId;
                    playlist.push(element['videoId']);
                });

                if (response) {

                    this.setState({
                        videos: response.data,
                        selectedVideo: response.data[0],
                    });
                    this.playVideo(response.data[0].videoId, response.data[0].resource_key);
                } else {

                }
            }.bind(this),
            error: function (response) {
                $('#alert').alert();
            }
        });

    }


    playVideo(videoId, id) {
        document.getElementById(id).scrollIntoView({
            behavior: "smooth"
        });
        let position = playlist.indexOf(videoId);
        let options = {
            id: videoId,
            width: 690,
            loop: false,
            autoplay: true
        };

        var player = new Vimeo.Player('videoPlayer', options);

        player.loadVideo(videoId).then(function (id) {
        })

        player.on('ended', function () {
            ++position;
            player.loadVideo(playlist[position]).then(function () {
                self.state.selectedVideo = self.state.videos[position];
                self.setState(self.state);
            });
        });

    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="app">
                    <VideoDetail video={this.state.selectedVideo} />
                    <VideoList
                        selectedVideo={selectedVideo => this.setState({ selectedVideo })}
                        onVideoSelect={this.playVideo}
                        videos={this.state.videos} />
                </div>
                <div className="alert alert-warning alert-dismissible fade hide" id="alert" role="alert">
                    <strong>Error</strong> Playlist is not reachable! Please Try again in sometime.Sorry for inconvinence.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );
    }
}


// render it to dom.

ReactDOM.render(<App />, document.querySelector('.main'));
