import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import React, { ReactNode } from "react";

interface DialogCRUDProps {
  isOpen: boolean
  title?: string
  description?: string
  onOpenChange: (open: boolean) => void
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

export function DialogCRUD({ 
  children, 
  isOpen, 
  onOpenChange, 
  description, 
  title,
  size = "md"
}: DialogCRUDProps) {
  
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-7xl"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          {title && (
            <DialogTitle>{title}</DialogTitle>
          )}
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}