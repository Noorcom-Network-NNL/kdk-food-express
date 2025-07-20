import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface StatusConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderNumber: string;
  currentStatus: string;
  newStatus: string;
}

export function StatusConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  orderNumber,
  currentStatus,
  newStatus
}: StatusConfirmationDialogProps) {
  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'pending': return 'Waiting for confirmation';
      case 'confirmed': return 'Order confirmed, ready for kitchen';
      case 'preparing': return 'Being prepared in kitchen';
      case 'ready': return 'Ready for pickup/delivery';
      case 'delivered': return 'Order completed';
      case 'cancelled': return 'Order cancelled';
      default: return status;
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'ready': return '🍽️';
      case 'delivered': return '🚚';
      case 'cancelled': return '❌';
      default: return '📝';
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <div>
              Are you sure you want to change the status of order <strong>{orderNumber}</strong>?
            </div>
            
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Status:</span>
                <div className="flex items-center gap-2">
                  <span>{getStatusEmoji(currentStatus)}</span>
                  <span className="font-medium capitalize">{currentStatus}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center text-muted-foreground">
                ↓
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">New Status:</span>
                <div className="flex items-center gap-2">
                  <span>{getStatusEmoji(newStatus)}</span>
                  <span className="font-medium capitalize text-primary">{newStatus}</span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <strong>Note:</strong> {getStatusDescription(newStatus)}
            </div>

            {newStatus === 'cancelled' && (
              <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                ⚠️ This action will cancel the order. The customer will be notified.
              </div>
            )}

            {newStatus === 'delivered' && (
              <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                🎉 This will mark the order as completed. The customer will be notified.
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={newStatus === 'cancelled' ? 'bg-destructive hover:bg-destructive/90' : ''}
          >
            {newStatus === 'cancelled' ? 'Yes, Cancel Order' : 'Yes, Update Status'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}