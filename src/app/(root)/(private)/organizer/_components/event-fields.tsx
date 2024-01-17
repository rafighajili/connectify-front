import { Control, Controller, useFieldArray } from "react-hook-form";
import { Card, CardBody, CardHeader, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useGetEventCategoriesQuery, useGetEventTypesQuery } from "#/services";
import { CreateEventRequestType } from "#/schemas";
import { BanknotesIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import { packageClassNameHelper } from "#/utils";
import { capitalize } from "@nextui-org/shared-utils";

type ControlProp = { control: Control<CreateEventRequestType> };

export function EventFields({ control }: ControlProp) {
  const { data: eventTypes, isLoading: isEventTypesLoading } = useGetEventTypesQuery();
  const { data: eventCategories, isLoading: isEventCategoriesLoading } = useGetEventCategoriesQuery();

  const { replace: replaceCategories } = useFieldArray({
    name: "categories",
    control,
  });

  const { fields: fieldsPackages } = useFieldArray({
    name: "packages",
    control,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              label="Event title"
              className="sm:col-span-2"
              {...field}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
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
          name="type.id"
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
          render={({ fieldState: { invalid, error } }) => (
            <Select
              label="Event categories"
              selectionMode="multiple"
              isLoading={isEventCategoriesLoading}
              // @ts-ignore
              onSelectionChange={(keys) => replaceCategories(Array.from(keys).map((id) => ({ id })))}
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
          name="venue"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input label="Event venue address" {...field} isInvalid={invalid} errorMessage={error?.message} />
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
          name="size"
          render={({ field, fieldState: { invalid, error } }) => (
            // @ts-ignore
            <Input
              label="Estimated crowd size"
              type="number"
              step={20}
              startContent={<UserGroupIcon className="h-6 w-6 text-default-500" />}
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
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {fieldsPackages.map((field, index) => (
          <PackageCard key={index} control={control} index={index} {...field} />
        ))}
      </div>
    </div>
  );
}

function PackageCard({
  index,
  control,
  ...packageData
}: { index: number } & ControlProp & CreateEventRequestType["packages"][0]) {
  const { fields } = useFieldArray({
    name: `packages.${index}.features`,
    control,
  });

  return (
    <Card className={twMerge("border-2", packageClassNameHelper[packageData.name].border)}>
      <CardHeader>
        <p
          className={twMerge(
            "w-full text-center text-lg font-medium",
            capitalize(packageClassNameHelper[packageData.name].text).toLowerCase(),
          )}
        >
          {packageData.name}
        </p>
      </CardHeader>

      <CardBody className="gap-y-6">
        <Controller
          control={control}
          name={`packages.${index}.price`}
          render={({ field, fieldState: { invalid, error } }) => (
            // @ts-ignore
            <Input
              label="Price of the package"
              variant="faded"
              type="number"
              step={50}
              startContent={<BanknotesIcon className="h-6 w-6 text-default-500" />}
              endContent={<span className="text-lg">₼</span>}
              {...field}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />

        <div className="flex flex-col gap-y-1.5">
          {fields.map((field, featureIndex) => (
            <PackageCardFeature key={featureIndex} control={control} packageIndex={index} index={featureIndex} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

function PackageCardFeature({
  packageIndex,
  index,
  control,
}: {
  packageIndex: number;
  index: number;
} & ControlProp) {
  return (
    <Controller
      control={control}
      name={`packages.${packageIndex}.features.${index}.name`}
      render={({ field, fieldState: { invalid, error } }) => (
        <Input
          label={`${index + 1}. feature`}
          variant="bordered"
          size="sm"
          {...field}
          isInvalid={invalid}
          errorMessage={error?.message}
        />
      )}
    />
  );
}
