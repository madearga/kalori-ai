import * as React from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface UploadDropzoneProps {
  className?: string;
  onClientUpload?: (file: File) => void;
}

export function UploadDropzone({
  className,
  onClientUpload,
}: UploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        onClientUpload?.(acceptedFiles[0]);
      }
    },
  });

  return (
      <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors ${
        isDragActive ? "border-primary" : "border-muted-foreground/25"
      } ${className}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <div className="text-sm text-muted-foreground mb-2">
          Pastikan foto yang kamu posting jelas untuk akurasi yang lebih tinggi
        </div>
        <UploadCloud className="h-8 w-8 text-muted-foreground" />
        <div className="text-sm">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </div>
        <div className="text-xs text-muted-foreground">
          PNG, JPG or GIF (max. 10MB)
        </div>
      </div>
    </div>
  );
}
