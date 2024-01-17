"use client";

import { useGetSponsorshipsQuery } from "#/services";

export default function AdminRequestsPage() {
  const {} = useGetSponsorshipsQuery();

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">Requests</h1>

      <div className="space-y-6"></div>
    </div>
  );
}
