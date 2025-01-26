import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
        {title}
      </h1>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
}
