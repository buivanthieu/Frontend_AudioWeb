import { TrackListDto } from "./Track";

export interface CategoryListDto {
    id: number;
    name: string;
    description: string;
}

export interface CategoryDto extends CategoryListDto {
    trackListDtos: TrackListDto[];
}