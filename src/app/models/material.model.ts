export interface Material {
  id?: string;
  title: string;
  description: string;
  fileId: string; // This stores the UploadThing file ID
  fileType: string;
  fileName: string;
  uploadDate: Date;
  cursoRef: string; // Reference to the course this material belongs to
}
