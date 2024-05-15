import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import Order from "./components/Order"

const OrderPage = async () => {
  const user = await currentUser()

  if (!user?.id) return <div>Please login to access this site</div>

  const orders = await db.order.findMany({
    include: {
      order_amenities: {
        include: { amenity: true },
      },
    },
  })

  return <Order orders={orders} />
}

export default OrderPage
