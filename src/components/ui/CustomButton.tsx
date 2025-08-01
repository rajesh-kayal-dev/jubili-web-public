import React, { ReactElement } from "react";

type Props = {
  onClick: () => void;
  loading: boolean;
  label: string;
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
};

export default function CustomButton({ 
  onClick, 
  loading, 
  label, 
  icon, 
  iconPosition = 'left' 
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: "8px 16px",
        backgroundColor: "#262626",
        color: "#fff",
        border: "none",
        borderRadius: "30px",
        cursor: loading ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        minWidth: "fit-content",
        transition: "all 0.2s ease",
      }}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
          )}
          {label}
          {icon && iconPosition === 'right' && (
            <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
          )}
        </>
      )}
    </button>
  );
}
