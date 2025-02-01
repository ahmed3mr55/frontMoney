'use client';
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Check = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token]);

  const handleIsAdmin = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/is-admin`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setIsAdmin(data.isAdmin); // تحديث حالة isAdmin
        setError(null);
      } else {
        setError(data.message || "An error occurred");
        router.push("/auth/login");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
      console.error(error.message);
    } finally {
      setLoading(false); // إيقاف التحميل بغض النظر عن النتيجة
    }
  };

  useEffect(() => {
    if (token) {
      handleIsAdmin();
    }
  }, [token]);

  useEffect(() => {
    // انتظر حتى تنتهي عملية التحميل قبل التوجيه
    if (!loading && isAdmin === false) {
      router.push("/auth/login");
    }
  }, [isAdmin, loading]);

  if (loading) {
    return <div>Loading...</div>; // عرض رسالة تحميل أثناء انتظار النتيجة
  }
  return <></>;
};

export default Check;
