"use client"

import { FC } from "react"
import Rating from "react-star-ratings"

import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { objToQuery } from "@/lib/query"
import ImageCarousel from "@/components/ui/image-carousel"
import { HotelVm } from "../hotel/services/HotelService"
import { useReservation } from "../search-input/context/reservation"
import { useDateRange } from "../search-input/context/dateRange"
import { useLocation } from "../search-input/context/location"
import HotelDetails from "../hotel/HotelDetails"

interface HotelItemProps {
  hotel: HotelVm
}

const HotelItem: FC<HotelItemProps> = ({ hotel }) => {
  const reservationInfo = useReservation()
  const dateRange = useDateRange()
  const location = useLocation()

  const handleClickVewRate = () => {
    const url = objToQuery({
      baseUrl: "/reservation",
      date: dateRange.date,
      roomResInfo: reservationInfo.rooms,
      hotel: hotel.id,
      location: location.location,
    })

    window.open(url, "_blank")
  }

  return (
    <div className="flex gap-3 py-3">
      <div className="xl:w-[200px] w-1/3 h-full">
        <AspectRatio ratio={16 / 9}>
          <ImageCarousel images={hotel.images} />
        </AspectRatio>
      </div>
      <div className="flex-1">
        <div className="font-bold">{hotel.name}</div>
        <HotelDetails hotel={hotel}>
          <Button variant="link" className="text-xs text-teal-600" size="inline">
            {/* Hotel Details */}
            Chi tiết khách sạn
            <span aria-hidden="true">&nbsp;&gt;</span>
          </Button>
        </HotelDetails>

        <div className="flex justify-between">
          <div>
            {/* <div className="text-xs text-zinc-700 font-bold">Rating 4.0 out of 5.0d</div> */}
            <div className="text-xs text-zinc-700 font-bold">Điểm 4.0 / 5.0</div>
            <Rating numberOfStars={5} starDimension="14px" starSpacing="0px" />
            {/* <div className="text-xs text-neutral-500">Based on 804 reviews</div> */}
            <div className="text-xs text-neutral-500">Dụa trên 804 lượt đánh giá</div>
          </div>

          <div className="flex flex-col justify-end">
            <div>
              {/* <div className="inline-block text-xs font-medium mr-2 text-zinc-400">Start from</div>

              <div className="inline-block font-bold text-right mb-2">
                ${Math.min(...hotel.roomTypes.map((rt) => rt.price))}
              </div> */}
            </div>
            <Button className="text-xs" size="sm" variant="teal" onClick={handleClickVewRate}>
              {/* View Rates */}
              Xem
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelItem
