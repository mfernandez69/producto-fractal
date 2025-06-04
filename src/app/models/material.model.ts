export interface Material {
  id?: string;
  title: string;
  description: string;
  fileName: string;   // Just the name of the file
  fileType: string;   // Still keeping file type (e.g., 'pdf')
  uploadDate: Date;
  cursoRef: string;
}