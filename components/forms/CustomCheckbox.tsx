import { FieldValues, FieldPath, ControllerProps } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomCheckboxProps {
  label: string;
  description?: string;
  items: string[];
}

const CustomCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  description,
  items,
  control,
  name,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> &
  CustomCheckboxProps) => {
  return (
    <FormField
      name={name}
      render={() => (
        <FormItem className="grid gap-4">
          <div>
            <FormLabel className="font-semibold text-lg">{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
          <div className="grid grid-cols-2 gap-3 text-gray-800">
            {items.map((item) => (
              <FormField
                key={item}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem key={item} className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked: boolean) => {
                            return checked
                              ? field.onChange([...field.value, item])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== item,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </FormItem>
      )}
      {...props}
    />
  );
};

export default CustomCheckbox;
