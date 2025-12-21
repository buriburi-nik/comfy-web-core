import { Product } from '@/data/mockProducts';
import { getStatusColor } from '@/utils/productUtils';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: Product['status'];
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        getStatusColor(status),
        className
      )}
    >
      {status}
    </span>
  );
};
