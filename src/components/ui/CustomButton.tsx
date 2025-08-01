import React from "react";

type Props = {
  onClick: () => void;
  loading: boolean;
  label: string;
};

export default function CustomButton({ onClick, loading, label }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: "8px 16px",
        backgroundColor: "#0070f3",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "Loading..." : label}
    </button>
  );
}
