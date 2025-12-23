interface IMovie {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
  rating: number;
  mood: string;
}

interface IRecommendedMovie {
  recommendation: IMovie[];
  reason: string;
}

export { IMovie, IRecommendedMovie };
