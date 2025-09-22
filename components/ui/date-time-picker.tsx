"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BRAND } from "@/lib/constants"

export function DateTimePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      <div className="flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-full justify-between font-normal px-6 py-6 theme-input group"
            >
              <span className={date ? "pl-3 text-white" : "pl-3 text-[var(--dark-400)] group-hover:text-[var(--dark-100)] transition-colors duration-300 ease-out"}>
                {date ? date.toLocaleDateString() : "SELECT DATE"}
              </span>
              <ChevronDownIcon className="mr-3 opacity-30" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0 bg-[var(--dark-800)] border-[var(--dark-600)]" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
              className="bg-[var(--dark-800)] text-white"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-1">
        <Select>
          <SelectTrigger className="w-full px-6 py-6 theme-input">
            <SelectValue placeholder="SELECT TIME" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--dark-800)] border-[var(--dark-600)]">
            {BRAND.CONTACT.HOURS.TIME_SLOTS.map((time) => (
              <SelectItem
                key={time}
                value={time}
                className="text-white hover:bg-[var(--dark-700)]"
              >
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
