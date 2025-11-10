import { TrackListDto } from "./Track";

export interface TagListDto {
    id: number;
    name: string;
    description: string;
}

export interface TagDto extends TagListDto {
    trackListDtos: TrackListDto[];
    
    
}