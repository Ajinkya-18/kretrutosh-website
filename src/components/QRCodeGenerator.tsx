
import { useEffect, useState } from 'react';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

const QRCodeGenerator = ({ url, size = 200 }: QRCodeGeneratorProps) => {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    // Using a reliable public API for QR codes (GoQR or similar)
    // api.qrserver.com is standard.
    const encoded = encodeURIComponent(url);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&bgcolor=ffffff&color=0b1c3e`);
  }, [url, size]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-border inline-block">
      <img 
        src={qrUrl} 
        alt={`QR Code for ${url}`} 
        width={size} 
        height={size}
        className="rounded-lg mix-blend-multiply" 
      />
    </div>
  );
};

export default QRCodeGenerator;
