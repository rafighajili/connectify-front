import { Controller } from "react-hook-form";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useGetEventCategoriesQuery, useGetEventTypesQuery } from "#/services";

export function EventFields({ control }: { control: any }) {
  const { data: eventTypes, isLoading: isEventTypesLoading } = useGetEventTypesQuery();
  const { data: eventCategories, isLoading: isEventCategoriesLoading } = useGetEventCategoriesQuery();

  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Event title" {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />

      <Controller
        control={control}
        name="venue"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Event venue address" {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState: { invalid, error } }) => (
          <Textarea
            label="Event description"
            className="sm:col-span-2"
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="typeId"
        render={({ field, fieldState: { invalid, error } }) => (
          <Select
            label="Event type"
            isLoading={isEventTypesLoading}
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          >
            {/* @ts-ignore */}
            {eventTypes &&
              eventTypes.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="categories"
        render={({ field, fieldState: { invalid, error } }) => (
          <Select
            label="Event categories"
            selectionMode="multiple"
            isLoading={isEventCategoriesLoading}
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          >
            {/* @ts-ignore */}
            {eventCategories &&
              eventCategories.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="Event date"
            type="datetime-local"
            placeholder="date"
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="file"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="Event image"
            type="file"
            accept="image/*"
            placeholder="event image"
            {...field}
            // @ts-ignore
            value={field.value?.fileName}
            onChange={(event) => {
              // @ts-ignore
              field.onChange(event.target.files[0]);
            }}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="size"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="Estimated crowd size"
            type="number"
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />
    </>
  );
}
