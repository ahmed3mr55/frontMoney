"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ActiveBtn = () => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [checkActive, setCheckActive] = useState(null); // null يعني حالة غير محددة بعد
  const [checkVisa, setCheckVisa] = useState(false);

  const handleCheckVisa = async () => {
    try {
      setLoading(true);
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/visa/check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await req.json();
      setCheckVisa(req.ok && data.visa); // إذا كانت التأشيرة موجودة
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckActive = async () => {
    try {
      setLoading(true);
      const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/visa/checkActive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await req.json();
      setCheckActive(req.ok ? data.status : null); // تعيين حالة الفيزا (تفعيل/تعطيل)
      setSuccess(data.message);
      setError(null);
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      setLoading(true);
      const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/visa/toggleStatus`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await req.json();
      setCheckActive(data.status); // تحديث الحالة بعد التبديل
      setSuccess(data.message);
      setError(null);
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
    if (checkVisa) {
      handleCheckActive();
    }
  }, [checkVisa]);

    useEffect(() => {
      if (success || error) {
        const timer = setTimeout(() => {
          setSuccess(null);
          setError(null);
          if (success) {
            window.location.reload();
          }
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [success, error]);

  return (
    <div>

      {/* إذا كانت التأشيرة موجودة */}
      {checkVisa && (
          <div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          {/* إذا كانت الفيزا مفعلة يظهر الزر لتوقيف التفعيل */}
          {checkActive !== null && (
            <button
              onClick={handleToggleStatus}
              className={`mt-4 text-white py-2 px-4 rounded transition ${checkActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
            >
              {checkActive ? "Deactivate Visa" : "Activate Visa"}
            </button>
          )}
        </div>
      )}
      {/* إذا كانت التأشيرة غير موجودة، لا يظهر أي شيء */}
    </div>
  );
};

export default ActiveBtn;
