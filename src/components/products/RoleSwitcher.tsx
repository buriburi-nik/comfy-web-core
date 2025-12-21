import { UserRole, useProducts } from '@/contexts/ProductContext';
import { User, Store, Shield } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const roles: { value: UserRole; label: string; icon: React.ReactNode }[] = [
  { value: 'public', label: 'Public User', icon: <User className="h-4 w-4" /> },
  { value: 'vendor', label: 'Vendor', icon: <Store className="h-4 w-4" /> },
  { value: 'admin', label: 'Admin', icon: <Shield className="h-4 w-4" /> },
];

export const RoleSwitcher = () => {
  const { role, setRole } = useProducts();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Role:</span>
      <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {roles.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              <div className="flex items-center gap-2">
                {r.icon}
                {r.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
