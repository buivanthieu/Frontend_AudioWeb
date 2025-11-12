import { TrackList } from "./Track";

export interface OriginalStoryList {
    id: number;
    storyName: string;
    writerName: string;
}

export interface OriginalStory extends OriginalStoryList {
    writerId: number;
    trackLists: TrackList[];
}