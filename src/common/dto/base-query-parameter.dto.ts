import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class BaseQueryParameterDTO {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsBoolean()
  paginationMeta: boolean;
}
