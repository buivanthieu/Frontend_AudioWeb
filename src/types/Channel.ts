import { PlaylistDto } from "./Playlist";
import { TrackListDto } from "./Track";

export interface ChannelListDto {
    id : number;
    name : string;
}

export interface ChannelDto extends ChannelListDto {
    trackListDtos: TrackListDto[];
    playlistDtoes: PlaylistDto[];
}