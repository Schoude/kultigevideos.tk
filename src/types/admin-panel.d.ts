import { Video } from './models/video';

export interface VideoOverViewData {
  videosNotApprovedNotListed: Video[];
  videosApprovedNotListed: Video[];
  videosApprovedAndListed: Video[];
}
