import { useState } from 'react';
import { Upload, FileSpreadsheet, Check, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface BulkUploadModalProps {
  open: boolean;
  onClose: () => void;
}

interface ParsedRow {
  name: string;
  sku: string;
  price: string;
  category: string;
  stock: string;
  valid: boolean;
  errors: string[];
}

const mockParsedData: ParsedRow[] = [
  { name: 'Wireless Mouse', sku: 'WM-001', price: '29.99', category: 'Electronics', stock: '100', valid: true, errors: [] },
  { name: 'USB-C Cable', sku: 'USC-002', price: '12.99', category: 'Electronics', stock: '250', valid: true, errors: [] },
  { name: 'Laptop Stand', sku: 'LS-003', price: '49.99', category: 'Electronics', stock: '75', valid: true, errors: [] },
  { name: 'Invalid Product', sku: '', price: 'abc', category: '', stock: '-5', valid: false, errors: ['Missing SKU', 'Invalid price', 'Missing category', 'Invalid stock'] },
  { name: 'Keyboard', sku: 'KB-004', price: '79.99', category: 'Electronics', stock: '45', valid: true, errors: [] },
];

export const BulkUploadModal = ({ open, onClose }: BulkUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<'upload' | 'preview' | 'result'>('upload');
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['.csv', '.xls', '.xlsx', '.xlsm'];
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (!validTypes.includes(fileExtension)) {
        toast.error('Invalid file type. Please upload CSV, XLS, XLSX, or XLSM file.');
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleParse = () => {
    setUploading(true);
    // Simulate parsing
    setTimeout(() => {
      setParsedData(mockParsedData);
      setStep('preview');
      setUploading(false);
    }, 1500);
  };

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setStep('result');
      setUploading(false);
    }, 2000);
  };

  const handleClose = () => {
    setFile(null);
    setStep('upload');
    setParsedData([]);
    onClose();
  };

  const validCount = parsedData.filter((row) => row.valid).length;
  const errorCount = parsedData.filter((row) => !row.valid).length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Bulk Upload Products</DialogTitle>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-6">
            <div
              className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">
                {file ? file.name : 'Drop your file here or click to browse'}
              </p>
              <p className="text-sm text-muted-foreground">
                Supports CSV, XLS, XLSX, XLSM files
              </p>
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xls,.xlsx,.xlsm"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">File Format Requirements:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Column headers: name, sku, price, category, stock, description, images</li>
                <li>• Price should be numeric (e.g., 29.99)</li>
                <li>• Stock should be a positive integer</li>
                <li>• Multiple images separated by semicolons</li>
              </ul>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleParse} disabled={!file || uploading}>
                {uploading ? 'Processing...' : 'Parse File'}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                <span>{validCount} valid rows</span>
              </div>
              {errorCount > 0 && (
                <div className="flex items-center gap-2 text-destructive">
                  <X className="h-5 w-5" />
                  <span>{errorCount} rows with errors</span>
                </div>
              )}
            </div>

            <ScrollArea className="h-[400px] border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Status</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Errors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedData.map((row, index) => (
                    <TableRow key={index} className={!row.valid ? 'bg-destructive/10' : ''}>
                      <TableCell>
                        {row.valid ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.sku || '-'}</TableCell>
                      <TableCell>${row.price}</TableCell>
                      <TableCell>{row.category || '-'}</TableCell>
                      <TableCell>{row.stock}</TableCell>
                      <TableCell className="text-destructive text-sm">
                        {row.errors.join(', ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep('upload')}>
                Back
              </Button>
              <Button onClick={handleUpload} disabled={uploading || validCount === 0}>
                {uploading ? 'Uploading...' : `Upload ${validCount} Products`}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Upload Complete!</h3>
              <p className="text-muted-foreground">
                Successfully uploaded {validCount} products.
                {errorCount > 0 && ` ${errorCount} rows were skipped due to errors.`}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <h4 className="font-medium text-foreground mb-2">Summary:</h4>
              <ul className="text-sm space-y-1">
                <li className="text-green-600">✓ {validCount} products added successfully</li>
                {errorCount > 0 && (
                  <li className="text-destructive">✗ {errorCount} rows skipped</li>
                )}
                <li className="text-muted-foreground">• Products are pending admin approval</li>
              </ul>
            </div>

            <DialogFooter className="justify-center">
              <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
