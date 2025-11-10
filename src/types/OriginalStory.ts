import { TrackListDto } from "./Track";

export interface OriginalStoryListDto {
    id: number;
    storyName: string;
    writerName: string;
}

export interface OriginalStoryDto extends OriginalStoryListDto {
    writerId: number;
    trackListDtos: TrackListDto[];
}