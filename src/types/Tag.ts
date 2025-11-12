import { TrackList } from "./Track";

export interface TagList {
    id: number;
    name: string;
    description: string;
}

export interface Tag extends TagList {
    trackLists: TrackList[];
    
    
}