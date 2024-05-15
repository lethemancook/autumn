"use client"

import { FC } from "react"

import { DataTable } from "@/components/ui/data-table"
import { Column, columns } from "./columns"

interface ClientProps {
  data: Column[]
}

const Client: FC<ClientProps> = ({ data }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          {/* <h1 className="tracking-tight text-3xl font-semibold">Order ({data.length})</h1>
          <p>List of all your orders</p> */}
          <h1 className="tracking-tight text-3xl font-semibold">Đơn hàng ({data.length})</h1>
          <p>Danh sách đơn hàng đã đặt</p>
        </div>
      </div>

      <hr className="my-6" />
      <DataTable columns={columns} data={data} searchKey="name" newButton={false} />
    </div>
  )
}

export default Client
