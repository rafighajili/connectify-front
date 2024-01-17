"use client";

import { useGetContactQuery } from "#/services";
import { Card, CardBody, CardFooter, CardHeader, Divider, Spinner } from "@nextui-org/react";

export default function AdminContactsPage() {
  const { data: contactsData } = useGetContactQuery();

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">Contacts</h1>

      {!contactsData ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactsData.map((contactData) => (
            <Card key={contactData.id}>
              <CardHeader>
                <p className="text-xl font-medium">{`${contactData.firstName} ${contactData.lastName}`}</p>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-sm">{contactData.message}</p>
              </CardBody>
              <Divider />
              <CardFooter className="flex-col items-start">
                <p className="text-sm text-default-500">{contactData.email}</p>
                <p className="text-sm text-default-500">{contactData.phoneNumber}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
