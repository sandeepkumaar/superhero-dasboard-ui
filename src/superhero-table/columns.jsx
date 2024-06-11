import { Checkbox } from "@/components/ui/checkbox.jsx"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "id"
  },
  {
    accessorKey: "name",
    header: "name"
  },
  {
    accessorKey: "publisher",
    header: "publisher"
  },
  {
    accessorKey: "gender",
    header: "gender"
  },
  {
    accessorKey: "race",
    header: "race"
  },
  {
    accessorKey: "intelligence",
    header: "intelligence"
  },
  {
    accessorKey: "strength",
    header: "strength"
  },
  {
    accessorKey: "speed",
    header: "speed"
  },
  {
    accessorKey: "durability",
    header: "durability"
  },
  {
    accessorKey: "power",
    header: "power"
  },
  {
    accessorKey: "combat",
    header: "combat"
  },
/*
height: "$appearance.height",
weight: "$appearance.weight",
eyeColor: "$appearance.eyeColor",
hairColor: "$appearance.hairColor",
*/

];
