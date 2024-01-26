import {
  Control,
  Controller,
  useFieldArray,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
  useWatch,
} from "react-hook-form";
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Switch, Textarea } from "@nextui-org/react";
import { useGetEventCategoriesQuery, useGetEventTypesQuery } from "#/services";
import { CreateEventRequestType } from "#/schemas";
import { BanknotesIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import { packageClassNameHelper } from "#/utils";
import { useState } from "react";
import { PackageType } from "#/entities";

type ControlProp = { control: Control<CreateEventRequestType> };

export function EventFields({ control }: ControlProp) {
  const { data: eventTypes, isLoading: isEventTypesLoading } = useGetEventTypesQuery();
  const { data: eventCategories, isLoading: isEventCategoriesLoading } = useGetEventCategoriesQuery();

  const { replace: replaceCategories } = useFieldArray({
    name: "categories",
    control,
  });

  const fieldPackages = useFieldArray({
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
              defaultSelectedKeys={field.value ? [field.value] : undefined}
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
              defaultSelectedKeys={field.value?.length > 0 ? field.value.map(({ id }) => id) : undefined}
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
              classNames={{ input: "file:hidden cursor-pointer" }}
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
        <PackageCard name="BRONZE" control={control} fieldPackages={fieldPackages} />
        <PackageCard name="SILVER" control={control} fieldPackages={fieldPackages} />
        <PackageCard name="GOLD" control={control} fieldPackages={fieldPackages} />
        <PackageCard name="DIAMOND" control={control} fieldPackages={fieldPackages} />
      </div>
    </div>
  );
}

function PackageCard({
  name,
  control,
  fieldPackages,
}: Pick<PackageType, "name"> &
  ControlProp & { fieldPackages: UseFieldArrayReturn<CreateEventRequestType, "packages"> }) {
  const index = fieldPackages.fields.findIndex((packageData) => packageData.name === name);

  const [isSelected, setIsSelected] = useState<boolean>(index !== -1);

  return (
    <Card className={twMerge("h-fit border-2", packageClassNameHelper[name].border)}>
      <CardHeader className="justify-between">
        <p className={twMerge("w-full text-lg font-medium", packageClassNameHelper[name].text)}>{name}</p>

        <Switch
          aria-label="Package activator"
          size="sm"
          isSelected={isSelected}
          onValueChange={(selected) => {
            selected ? fieldPackages.append({ name, price: 0, features: [{ name: "" }] }) : fieldPackages.remove(index);
            setIsSelected(selected);
          }}
          isDisabled={isSelected && fieldPackages.fields.filter((val) => !!val.name).length === 1}
        />
      </CardHeader>

      {isSelected && (
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

          <PackageFeatures index={index} control={control} />
        </CardBody>
      )}
    </Card>
  );
}

function PackageFeatures({ index, control }: { index: number } & ControlProp) {
  const { fields, append, remove } = useFieldArray({
    name: `packages.${index}.features`,
    control,
  });

  return (
    <div className="flex flex-col gap-y-1.5">
      {fields.map((field, featureIndex) => (
        <FeatureInput key={field.id} control={control} packageIndex={index} index={featureIndex} remove={remove} />
      ))}
      <Button color="primary" size="sm" variant="light" onPress={() => append({ name: "" })}>
        New feature
      </Button>
    </div>
  );
}

function FeatureInput({
  packageIndex,
  index,
  remove,
  control,
}: {
  packageIndex: number;
  index: number;
  remove: UseFieldArrayRemove;
} & ControlProp) {
  const watchFeatures = useWatch({ control, name: `packages.${packageIndex}.features` });

  return (
    <Controller
      control={control}
      name={`packages.${packageIndex}.features.${index}.name`}
      render={({ field, fieldState: { invalid, error } }) => (
        <Input
          label={`${index + 1}. feature`}
          variant="bordered"
          size="sm"
          endContent={
            watchFeatures &&
            watchFeatures.length > 1 && (
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                radius="full"
                className="translate-x-2"
                onPress={() => remove(index)}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            )
          }
          {...field}
          isInvalid={invalid}
          errorMessage={error?.message}
        />
      )}
    />
  );
}
