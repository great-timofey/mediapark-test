export type BreedImageType = {
  height: number;
  id: string;
  url: string;
  width: number;
};

export type BreedType = {
  id: string;
  name: string;
  description: string;
  image: BreedImageType;
  wikipediaUrl: string;
};
