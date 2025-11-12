import { FileText, Image as ImageIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileAttachmentProps {
  name: string;
  url: string;
  type: string;
  size: number;
}

export function FileAttachment({ name, url, type, size }: FileAttachmentProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImage = type.startsWith("image/");

  const handleDownload = () => {
    window.open(url, "_blank");
  };

  if (isImage) {
    return (
      <div className="mt-2 group relative rounded-lg overflow-hidden border border-border/50 max-w-sm">
        <img
          src={url}
          alt={name}
          className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => window.open(url, "_blank")}
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            className="h-8 w-8 p-0"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mt-2 flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer max-w-sm"
      )}
      onClick={handleDownload}
    >
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <FileText className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{formatSize(size)}</p>
      </div>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}
