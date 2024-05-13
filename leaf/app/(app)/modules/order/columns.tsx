"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { OrderCol } from "./Booking"

export type Column = {
  id: string
  startDate: string
  endDate: string
  roomName: string
  roomCharge: number
  order: OrderCol
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "roomName",
    header: "Room Name",
    cell: ({ row }) => <div className="font-bold">{row.original.roomName}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "roomCharge",
    header: "Room Charge",
    cell: ({ row }) => <div className="text-bold">$ {row.original.roomCharge}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original.id} booking={row.original.booking} />,
  },
]