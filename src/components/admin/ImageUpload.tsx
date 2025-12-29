import { useState } from "react";
import { Upload, Button, message, Image } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { supabase } from "../../lib/supabaseClient";

interface ImageUploadProps {
  value?: string; // The form passes the current URL here
  onChange?: (url: string) => void; // The form listens for changes here
  bucket?: string;
}

export const ImageUpload = ({ value, onChange, bucket = "images" }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      setLoading(true);
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the Public URL
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      
      // Pass URL back to the form
      if (onChange) onChange(data.publicUrl);
      
      onSuccess("Ok");
      message.success("Image uploaded successfully");
    } catch (error: any) {
      console.error(error);
      message.error("Upload failed: " + error.message);
      onError({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
      if (onChange) onChange("");
  };

  return (
    <div className="flex flex-col gap-4 items-start">
        {value ? (
            <div className="relative inline-block border border-gray-200 rounded p-2 bg-gray-50">
                <Image 
                    src={value} 
                    alt="Preview" 
                    height={150} 
                    style={{ objectFit: 'contain' }} 
                />
                <Button 
                    danger 
                    type="primary"
                    shape="circle"
                    icon={<DeleteOutlined />} 
                    size="small" 
                    className="absolute -top-2 -right-2 shadow-sm" 
                    onClick={handleRemove}
                />
            </div>
        ) : (
             <Upload customRequest={handleUpload} showUploadList={false} accept="image/*">
                <Button icon={<UploadOutlined />} loading={loading}>
                    {loading ? "Uploading..." : "Click to Upload Image"}
                </Button>
            </Upload>
        )}
    </div>
  );
};