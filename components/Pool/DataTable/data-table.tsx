'use client'
import {useState} from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DowngradientText from "../../ui/downgradient"
import { useAppContext } from "@/context/AppContext"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loadingpool:boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loadingpool
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const {setActive} = useAppContext()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state:{
      sorting,
      columnFilters,
    },
  })
 
  return (
    <div className="flex-col flex items-center w-full mt-6">

    <div className="rounded-t-xl dark-glassmorphism overflow-hidden w-full h-[600px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {loadingpool ?
                <>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                </>
                :
                <>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                <div className="flex items-center w-full rounded-lg bg-gradient-to-l to-neutral-700/50 from-transparent my-3 animate-pulse h-10"></div>
                </>
                }
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}