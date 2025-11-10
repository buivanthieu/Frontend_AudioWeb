import { CategoryListDto } from "./Category";
import { ChannelListDto } from "./Channel";
import { OriginalStoryListDto } from "./OriginalStory";
import { TagListDto } from "./Tag";

export interface TrackListDto {
    id: number;
    title: string;
    audioUrl: string;

    uploadedAt: string; 

    categoryName: string;
    channelName: string;
    originalStoryName: string;

    tagNames: string[];
}

export interface TrackDto extends TrackListDto {

    categoryListDto: CategoryListDto;
    channelListDto: ChannelListDto;
    originalStoryListDto: OriginalStoryListDto;

    tagListDtos: TagListDto[];

}