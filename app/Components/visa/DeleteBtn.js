"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const DeleteBtn = () => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [checkVisa, setCheckVisa] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/visa/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await req.json();
      if (req.ok) {
        setSuccess(data.message);
        setError(null);
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/visa/visaG`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await req.json();
      if (req.ok) {
        setSuccess(data.message);
        setError(null);
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVisa = async () => {
    try {
      setLoading(true);
      const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/visa/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await req.json();
      setCheckVisa(req.ok && data.visa);
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCheckVisa();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
        if (success) window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="pt-5">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {checkVisa ? (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      ) : (
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      )}
    </div>
  );
};

export default DeleteBtn;
