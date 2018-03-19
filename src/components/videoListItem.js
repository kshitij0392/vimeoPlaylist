import React from 'react';
import VideoDetail from './videoDetail';

const VideoListItem = ({ video, onVideoSelect, selectedVideo }) => {

    const imageUrl = video.pictures.sizes[1].link;
    return (


        <li className="list-group-item" id={video.resource_key}>
            <div onClick={(event) => { onVideoSelect(video.videoId, video.resource_key); selectedVideo(video) }} className="video-list media">
                <div className="media-left">
                    <img className="media-object" src={imageUrl} /> &nbsp; &nbsp;
                </div>

                <div className="media-body">
                    <h5 className="media-heading">{video.name}
                    </h5>
                    <i className="fa fa-play"></i> {video.stats.plays} Plays <br />
                    <i className="fa fa-heart"></i> {video.metadata.connections.likes.total} Likes <br />
                    {/* <button className="btn btn-primary" src={video.link} target="_blank"> Watch On Vimeo </button> */}
                </div>

            </div>

        </li>


    );
};

export default VideoListItem;