import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="bg-white shadow-xl rounded-2xl border-6 border-b-blue-800 p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 text-center">
        {title}
      </h1>
      <div className="text-gray-700 space-y-4">{children}</div>
    </div>
  );
}
