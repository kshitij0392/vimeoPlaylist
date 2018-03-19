import React from 'react';
import VideoListItem from './videoListItem';
const isLoaded = false;
const VideoList = (props) => {
    // console.log(props.selectedVideo())

    const videoItems = props.videos.map((video) => {
        return <VideoListItem
            selectedVideo={props.selectedVideo}
            onVideoSelect={props.onVideoSelect}
            key={video.resource_key}
            video={video} />
    });


    return (
        <div className="list-div col-md-4">
            <ul className="list-group">
                {videoItems}
            </ul>
        </div>
    )
}

export default VideoList;