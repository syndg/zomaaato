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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowDown, X } from "lucide-react";

interface CustomCheckboxProps {
  label: string;
  description?: string;
  items: string[];
  scroll?: boolean;
  maxSelections?: number;
}

const CustomCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  description,
  items,
  scroll = false,
  maxSelections = 20,
  control,
  name,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> &
  CustomCheckboxProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const selectedOptions: string[] = field.value || [];
        const canSelectMore = selectedOptions.length < maxSelections;

        return (
          <FormItem className="grid gap-4">
            <div>
              <FormLabel className="font-semibold text-lg">{label}</FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
              {selectedOptions.length !== 0 && (
                <div className="flex gap-1 items-center mt-2 flex-wrap">
                  {field.value?.map((item: string, i: number) => (
                    <span
                      key={i}
                      className="text-sm bg-white px-3 py-1 rounded-sm border border-gray-300 animate-in fade-in-10"
                    >
                      {item}
                    </span>
                  ))}
                  <button
                    className="border border-gray-400 rounded-full text-gray-400 ml-2 hover:text-primary hover:border-primary"
                    onClick={() => field.onChange([])}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              {scroll && (
                <p className="flex text-primary items-center gap-1 text-sm mt-2 font-semibold">
                  Scroll to see more options <ArrowDown size={18} />
                </p>
              )}
            </div>
            <FormMessage />
            <ScrollArea
              className={cn(
                scroll && "h-[425px] border border-gray-300 p-2 rounded-md",
              )}
            >
              <div className="grid grid-cols-2 gap-3 text-gray-800">
                {items.map((item) => (
                  <FormField
                    key={item}
                    control={control}
                    name={name}
                    render={({ field }) => {
                      const isChecked = field.value?.includes(item);
                      const isDisabled =
                        !canSelectMore &&
                        !isChecked &&
                        !selectedOptions.includes(item);

                      return (
                        <FormItem
                          key={item}
                          className="flex items-center gap-2"
                        >
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
                              disabled={isDisabled}
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
            </ScrollArea>
          </FormItem>
        );
      }}
      {...props}
    />
  );
};

export default CustomCheckbox;
