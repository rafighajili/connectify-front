"use client";

import { useGetContactQuery } from "#/services";
import { Card, CardBody, CardFooter, Divider, Input, Spinner, Textarea } from "@nextui-org/react";
import { MyPagination } from "#/components";
import { useCurrentPage } from "#/utils";

export default function AdminContactsPage() {
  const { data, isFetching } = useGetContactQuery({ page: useCurrentPage() });

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">Contacts</h1>

      {!data || isFetching ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((contactData) => (
            <Card key={contactData.id}>
              <CardBody className="grid grid-cols-2 gap-3">
                <Input isReadOnly label="First name" defaultValue={contactData.firstName} />
                <Input isReadOnly label="Last name" defaultValue={contactData.lastName} />
                <Input isReadOnly label="Email" defaultValue={contactData.email} />
                <Input isReadOnly label="Phone number" defaultValue={contactData.phoneNumber} />
                <Textarea isReadOnly label="Message" defaultValue={contactData.message} className="col-span-2" />
              </CardBody>
              <Divider />
              <CardFooter>
                <p className="text-sm text-default-500">
                  {new Date(contactData.createdAt).toLocaleDateString("en-UK")}{" "}
                  {new Date(contactData.createdAt).toLocaleTimeString("en-UK")}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {data && <MyPagination meta={data.meta} />}
    </div>
  );
}
