"use client";
import React from "react";
interface Props {
  title: string;
  handleClick: () => void;
  className?: string;
  loading?: boolean;
  loadingPlaceholder: string;
}

const CustomButton = ({
  title,
  handleClick,
  className,
  loading,
  loadingPlaceholder,
}: Props) => {
  return (
    <>
      <button
        className={`border cursor-pointer p-2 ${className}`}
        onClick={handleClick}
      >
        {loading ? loadingPlaceholder : title}
      </button>
    </>
  );
};

export default CustomButton;
