import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateKelas } from "../api/kelasApi"
import { formSchemaKelas } from "../schema"
import { UpsertKelasDto } from "../types"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FormKelasProps {
    onSuccess?: () => void
    defaultValues?: UpsertKelasDto
    mode?: "create" | "edit"
    id?: string
}

export function FormKelas({
    defaultValues,
    id,
    mode,
    onSuccess
}: FormKelasProps) {
    const { mutate: createMapel, isPending: isCreating } = useCreateKelas()
    const form = useForm<UpsertKelasDto>({
        resolver: zodResolver(formSchemaKelas),
        defaultValues: defaultValues || {
            kode_kelas: "",
            wali_kelas: 0
        }
    })

    function onSubmit(values: UpsertKelasDto) {
        if (mode === "create") {
            createMapel(values, {
                onSuccess: () => {
                    form.reset()
                    onSuccess?.()
                },
            })
        } else {
            // Handle update
            // updateMapel({ id, data: values })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Nama Field */}
                <FormField
                    control={form.control}
                    name="kode_kelas"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kode Kelas</FormLabel>
                            <FormControl>
                                <Input placeholder="S3D" {...field} />
                            </FormControl>
                            <FormDescription>
                                Kode Kelas
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Kode Field */}
                <FormField
                    control={form.control}
                    name="wali_kelas"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kode</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="wali_kelas"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                />
                            </FormControl>
                            <FormDescription>
                                Pilih Wali Kelas
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