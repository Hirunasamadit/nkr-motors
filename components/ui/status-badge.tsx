import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          variant: "secondary" as const,
          className: "status-badge-yellow",
          label: "Pending"
        };
      case 'approved':
        return {
          variant: "secondary" as const,
          className: "status-badge-green",
          label: "Approved"
        };
      case 'rejected':
        return {
          variant: "secondary" as const,
          className: "status-badge-red",
          label: "Rejected"
        };
      case 'completed':
        return {
          variant: "secondary" as const,
          className: "status-badge-blue",
          label: "Completed"
        };
      default:
        return {
          variant: "secondary" as const,
          className: "bg-gray-500/20 text-gray-300",
          label: status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant} 
      className={`${config.className} ${className || ''}`}
    >
      {config.label}
    </Badge>
  );
}
