import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFilesSelected: (files: Array<{ name: string; url: string; type: string; size: number }>) => void;
}

export function FileUpload({ onFilesSelected }: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file sizes (20MB max per file)
    const oversizedFiles = files.filter(f => f.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "File too large",
        description: "Maximum file size is 20MB",
        variant: "destructive",
      });
      return;
    }

    // Limit to 10 files
    if (files.length > 10) {
      toast({
        title: "Too many files",
        description: "Maximum 10 files per message",
        variant: "destructive",
      });
      return;
    }

    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const uploadedFiles = [];

      for (const file of selectedFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from("chat-files")
          .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from("chat-files")
          .getPublicUrl(data.path);

        uploadedFiles.push({
          name: file.name,
          url: publicUrl,
          type: file.type,
          size: file.size,
        });
      }

      onFilesSelected(uploadedFiles);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "Files uploaded",
        description: `${uploadedFiles.length} file(s) uploaded successfully`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-accent px-3 py-1.5 rounded-lg text-sm"
            >
              <Paperclip className="h-3 w-3" />
              <span className="truncate max-w-[150px]">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt,.zip"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Paperclip className="h-4 w-4 mr-2" />
          Select Files
        </Button>
        {selectedFiles.length > 0 && (
          <Button
            size="sm"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Upload {selectedFiles.length} file(s)
          </Button>
        )}
      </div>
    </div>
  );
}
