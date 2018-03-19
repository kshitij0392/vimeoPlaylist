import React from 'react';

const VideoDetail = ({ video, selectedVideo }) => {
    if (!video) {
        return (
            <div className="loading">
                <i className="fa fa-cog fa-spin loading-icon"></i> <br /> <br />
                <div> <h4> Loading </h4>  </div>
            </div>
        )
    }
    const url = video.link;
    return (
        <div className="video-details col-md-6">
            <div id="videoPlayer" className="video-player"> </div>
            <div className="details">
                <h3>{video.name}</h3><hr/>
                <span>{video.description}</span>
            </div>
        </div>

    )
};

export default VideoDetail;