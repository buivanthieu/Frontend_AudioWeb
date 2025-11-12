import { Playlist } from "./Playlist";
import { TrackList } from "./Track";

export interface ChannelList {
    id : number;
    name : string;
}

export interface Channel extends ChannelList {
    trackLists: TrackList[];
    playlistes: Playlist[];
}