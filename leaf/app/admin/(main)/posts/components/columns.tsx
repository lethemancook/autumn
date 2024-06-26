"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"

import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"
import { AmenityType } from "@prisma/client"

export type Column = {
  id: string
  title: string
  author: string
  createdAt: string
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "title",
    // header: "Title",
    header: "Tiêu đề",
  },
  {
    accessorKey: "author",
    // header: "Author",
    header: "Tác giả",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {/* Create date */}
        Ngày tạo
        {column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
]
