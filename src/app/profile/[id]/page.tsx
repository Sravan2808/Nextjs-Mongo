"use client";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="p-4 border border-gray-300 rounded-lg">
        <p className="text-gray-600">User ID: {id}</p>
      </div>
      <br />
      <a 
        href="/profile" 
        className="p-2 border bg-blue-500 hover:bg-blue-700 text-white border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Back to Profile
      </a>
    </div>
  );
}
