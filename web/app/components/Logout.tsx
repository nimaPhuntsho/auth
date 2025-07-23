"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useLogout } from "../hooks/useLogout";

const Logout = () => {
  const { logout, logoutState } = useLogout();
  const { error, loading } = logoutState;

  return (
    <CustomButton
      loading={loading}
      loadingPlaceholder="Logging out ..."
      title="Logout"
      handleClick={logout}
    />
  );
};

export default Logout;
