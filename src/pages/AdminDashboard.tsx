import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Flag, Eye } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { auditLogs, bulkUploadLogs } from '@/data/mockProducts';
import { StatusBadge } from '@/components/products/StatusBadge';
import { formatPrice, formatDate } from '@/utils/productUtils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const { products, vendors, approveProduct, rejectProduct, flagProduct, loading } = useProducts();

  const pendingProducts = useMemo(() => products.filter((p) => p.status === 'pending'), [products]);
  const flaggedProducts = useMemo(() => products.filter((p) => p.status === 'flagged'), [products]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/products"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingProducts.length})</TabsTrigger>
            <TabsTrigger value="flagged">Flagged ({flaggedProducts.length})</TabsTrigger>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="uploads">Bulk Uploads</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="border rounded-lg bg-card">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{vendors.find((v) => v.id === product.vendorId)?.name}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{formatDate(product.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => approveProduct(product.id)} disabled={loading}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => rejectProduct(product.id)} disabled={loading}>
                              <X className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => flagProduct(product.id)} disabled={loading}>
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pendingProducts.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No pending products</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="flagged">
            <div className="border rounded-lg bg-card">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flaggedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{vendors.find((v) => v.id === product.vendorId)?.name}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => approveProduct(product.id)}>Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => rejectProduct(product.id)}>Reject</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {flaggedProducts.length === 0 && (
                      <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No flagged products</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="border rounded-lg bg-card">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{vendors.find((v) => v.id === product.vendorId)?.name}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell><StatusBadge status={product.status} /></TableCell>
                        <TableCell>{product.stock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="audit">
            <div className="border rounded-lg bg-card">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell><Badge variant="outline">{log.action}</Badge></TableCell>
                        <TableCell>{log.productName}</TableCell>
                        <TableCell>{log.userName}</TableCell>
                        <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="uploads">
            <div className="border rounded-lg bg-card">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Rows</TableHead>
                      <TableHead>Success</TableHead>
                      <TableHead>Errors</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bulkUploadLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.fileName}</TableCell>
                        <TableCell>{log.uploadedBy}</TableCell>
                        <TableCell>{log.totalRows}</TableCell>
                        <TableCell className="text-green-600">{log.successCount}</TableCell>
                        <TableCell className="text-destructive">{log.errorCount}</TableCell>
                        <TableCell>
                          <Badge variant={log.status === 'completed' ? 'default' : log.status === 'failed' ? 'destructive' : 'secondary'}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
