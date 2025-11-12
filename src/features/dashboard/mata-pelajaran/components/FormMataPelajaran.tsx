import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateMapel, useUpdateMapel } from "../api/MapelApi"
import { formSchema } from "../schema"
import { CreateMataPelajaranDto } from "../types"

interface FormMataPelajaranProps {
  onSuccess?: () => void
  defaultValues?: CreateMataPelajaranDto
  mode?: "create" | "edit"
  id?: number
}

export function FormMataPelajaran({ 
  onSuccess, 
  defaultValues,
  mode = "create",
  id
}: FormMataPelajaranProps) {
  const { mutate: createMapel, isPending: isCreating } = useCreateMapel()
      const { mutate, isPending, isError: updateError } = useUpdateMapel()
  
  const form = useForm<CreateMataPelajaranDto>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      nama: "",
      kode: "",
      deskripsi: "",
      kode_kelas : ""
    },
  })

  function onSubmit(values: CreateMataPelajaranDto) {
    if (mode === "create") {
      createMapel(values, {
        onSuccess: () => {
          form.reset()
          onSuccess?.()
        },
      })
    } else {
      // Handle update
      mutate({ id : id as number, data: {
        ...values,
        id : id as number
      } })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nama Field */}
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Mata Pelajaran</FormLabel>
              <FormControl>
                <Input placeholder="Matematika" {...field} />
              </FormControl>
              <FormDescription>
                Nama lengkap mata pelajaran
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Kode Field */}
        <FormField
          control={form.control}
          name="kode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode</FormLabel>
              <FormControl>
                <Input 
                  placeholder="MTK" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormDescription>
                Kode singkat mata pelajaran (akan otomatis uppercase)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kode_kelas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Kelas</FormLabel>
              <FormControl>
                <Input 
                  placeholder="3A" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormDescription>
                Kode Kelas 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Deskripsi Field */}
        <FormField
          control={form.control}
          name="deskripsi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi (Opsional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Deskripsi mata pelajaran..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Deskripsi singkat tentang mata pelajaran ini
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Menyimpan..." : mode === "create" ? "Tambah" : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  )
}