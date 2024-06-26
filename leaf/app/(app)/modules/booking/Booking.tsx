"use client"

import { FC } from "react"
import { format } from "date-fns"

import Client from "./client"
import { Column } from "./columns"
import { Booking as BookingVm, Booking_Room, Hotel, Review, Room, RoomType } from "@prisma/client"

export type BookingCol = BookingVm & {
  booking_rooms: BookingRoom[]
}

export type BookingRoom = Booking_Room & {
  room: Room & { roomType: RoomType & { hotel: Hotel } }
  booking: BookingVm
  review: Review | null
}

interface BookingProps {
  bookings: BookingCol[]
}

// TODO: add reviews, vote, complain, feedback,....
const Booking: FC<BookingProps> = ({ bookings }) => {
  const formattedBookings: Column[] = bookings.map((item) => {
    return {
      id: item.id,
      // startDate: format(new Date(item.startDate), "MMMM do, yyyy"),
      // endDate: format(new Date(item.endDate), "MMMM do, yyyy"),
      startDate: format(new Date(item.startDate), "dd-MM-yyyy"),
      endDate: format(new Date(item.endDate), "dd-MM-yyyy"),
      roomName: item.booking_rooms.map((b) => b.room.name).join(", "),
      roomCharge: item.roomCharge,
      booking: item,
    }
  })

  return (
    <div>
      <Client data={formattedBookings} />
    </div>
  )
}

export default Booking
