"use client"

import { formatInTimeZone } from "date-fns-tz"
import { CalendarIcon } from "lucide-react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Address, Sex, User } from "@prisma/client"
import { toast } from "sonner"
import axios from "axios"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar2"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface ProfileProps {
  user: User & { address: Address | null }
}

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
  phoneNumber: z.string().optional(),
  addressLine: z.string().optional(),
})

type UserInfoFormValues = z.infer<typeof formSchema>

const Profile: FC<ProfileProps> = ({ user }) => {
  const router = useRouter()

  const form = useForm<UserInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      dateOfBirth: user?.birthday ?? new Date(),
      gender: user?.sex ?? Sex.UNKNOWN,
      phoneNumber: user?.address?.phone ?? "",
      addressLine: user?.address?.addressLine ?? "",
    },
  })

  const onSubmit = async (data: UserInfoFormValues) => {
    try {
      await axios.put(`/api/users/${user?.id}`, data)
      router.refresh()
      toast.success("Updated user profile")
    } catch (err) {
      toast.error("Somethign went wrong, please try again.")
    }
  }

  return (
    <div>
      <h1 className="tracking-tight text-3xl font-bold">Profile Info</h1>
      <div className="border-[1px] rounded-2xl mt-6 p-9 px-16 flex">
        {/* TODO: add linked google, fb, etc... info like tiki */}
        {/* <div className='w-3/5 border-r-[1px] space-y-8'> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-56 text-zinc-600">First name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-56 text-zinc-600">Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-56 text-zinc-600">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => {
                  return (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-56 text-zinc-600">Date of birth</FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? formatInTimeZone(new Date(field.value), "Asia/Ho_Chi_Minh", "PPP")
                                  : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className=" w-auto p-0">
                              <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                selected={field.value}
                                onSelect={(date) => field.onChange(date)}
                                fromYear={1960}
                                toYear={2030}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </div>
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-56 text-zinc-600">Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="flex items-center w-full"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              // take me the whole morning, never gonna use shadcn again
                              // wow,
                              checked={field.value === Sex.MALE}
                              value={Sex.MALE}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem checked={field.value === Sex.FEMALE} value={Sex.FEMALE} />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem checked={field.value === Sex.UNKNOWN} value={Sex.UNKNOWN} />
                          </FormControl>
                          <FormLabel className="font-normal">Prefer not to say</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-56 text-zinc-600">Phone Number</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage className="block" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressLine"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-56 text-zinc-600">Address</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage className="block" />
                    </div>
                  </FormItem>
                )}
              />

              <Button className="ml-40" variant="blue" type="submit">
                Save Info
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Profile
