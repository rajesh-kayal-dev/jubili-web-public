"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/lib/types/auth";
import CustomButton from "@/components/ui/CustomButton";
import AuthPopup from "@/components/shared/AuthPopup";
import Navbar from "@/components/layout/Navbar";

export default function UserProfile() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    if (!user) {
        return <AuthPopup />;
    }

    return (
        <>
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6">Profile</h1>
                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <h2 className="text-sm text-gray-600">Full Name</h2>
                        <p className="text-lg font-medium">{user.name}</p>
                    </div>
                    <div className="border-b pb-4">
                        <h2 className="text-sm text-gray-600">Email</h2>
                        <p className="text-lg font-medium">{user.email}</p>
                    </div>
                    {user.phone && (
                        <div className="border-b pb-4">
                            <h2 className="text-sm text-gray-600">Phone</h2>
                            <p className="text-lg font-medium">{user.phone}</p>
                        </div>
                    )}
                    <div className="border-b pb-4">
                        <h2 className="text-sm text-gray-600">Member Since</h2>
                        <p className="text-lg font-medium">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="mt-8">
                    <CustomButton
                        onClick={logout}
                        loading={false}
                        label="Logout"
                    />
                </div>
            </div>
        </div>
        <Navbar />
        </>
    );
}