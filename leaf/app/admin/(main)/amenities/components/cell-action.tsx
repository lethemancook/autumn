"use client"

import axios from "axios"
import { useState } from "react"
import { EditIcon, TrashIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface CellActionProps {
  id: string
}

export const CellAction: React.FC<CellActionProps> = ({ id }) => {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    try {
      await axios.delete(`/api/amenities/${id}`)
      toast.success("Đã xóa thành công")
    } catch (error) {
      toast.error("Đã xảy ra lỗi")
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <div className="flex gap-3">
        <Button
          className="p-2 h-8 w-8 bg-emerald-600 hover:bg-emerald-600/90"
          size="sm"
          onClick={() => router.push(`${pathname}/${id}`)}
        >
          <EditIcon className="w-4 h-4 text-white" />
        </Button>

        <Button className="p-2 h-8 w-8 bg-rose-600 hover:bg-rose-600/90" size="sm" onClick={() => setOpen(true)}>
          <TrashIcon className="w-4 h-4 text-white" />
        </Button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription> */}
            <AlertDialogTitle>Bạn thật sự muốn xóa?</AlertDialogTitle>
            {/* <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription> */}
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm} className="bg-rose-500 hover:bg-rose-500/90 text-white">
              Delete
            </AlertDialogAction> */}
            <AlertDialogCancel>Đóng</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm} className="bg-rose-500 hover:bg-rose-500/90 text-white">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
