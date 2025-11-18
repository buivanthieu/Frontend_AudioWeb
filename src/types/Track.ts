import { CategoryList } from "./Category";
import { ChannelList } from "./Channel";
import { OriginalStoryList } from "./OriginalStory";
import { TagList } from "./Tag";

export interface TrackList {
    id: number;
    title: string;
    audioUrl: string;
    thumbnail?: string;
    uploadedAt: string; 

    categoryName: string;
    channelName: string;
    originalStoryName: string;

    tagNames: string[];
}

export interface Track extends TrackList {

    categoryList: CategoryList;
    channelList: ChannelList;
    originalStoryList: OriginalStoryList;

    tagLists: TagList[];

}