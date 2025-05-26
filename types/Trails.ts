export interface Trail {
  _id: string;
  description: string;
  video_description: string;
  name: string;
  references: string;
  subtitle: string;
  video_title: string;
  iframe_references: string;
}

export interface TrailsResponse {
    success: boolean,
    message: string,
    data: Trail[]
}