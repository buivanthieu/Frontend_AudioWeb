import { TrackList } from "./Track";

export interface CategoryList {
    id: number;
    name: string;
    description: string;
}

export interface Category extends CategoryList {
    trackLists: TrackList[];
}