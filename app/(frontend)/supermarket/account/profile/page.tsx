"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProfile, changePassword } from "@/app/actions/users";
import { AccountSidebar } from "../../components/account/AccountSidebar";
import { User, Mail, Phone, Lock, Eye, EyeOff, Edit2, Check, X, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!user) router.push("/supermarket/account/login");
  }, [user, router]);

  if (!user) return null;

  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg(null);
    try {
      const result = await updateProfile({ name, phone });
      if (result.success) {
        setSaveMsg("Profile updated!");
        setIsEditing(false);
        setTimeout(() => setSaveMsg(null), 3000);
        window.location.reload();
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (newPassword !== confirmPassword) return setPasswordError("Passwords do not match");
    if (newPassword.length < 6) return setPasswordError("Minimum 6 characters");
    setChangingPassword(true);
    try {
      const result = await changePassword(currentPassword, newPassword);
      if (result.success) {
        setShowPasswordForm(false);
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
        setSaveMsg("Password changed successfully!");
        setTimeout(() => setSaveMsg(null), 3000);
      } else {
        setPasswordError(result.error || "Failed to change password");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <p className="text-xs text-gray-400 mb-1">
            <Link href="/supermarket/account" className="hover:text-orange-500">Account</Link> / Profile
          </p>
          <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <AccountSidebar />

        <main className="flex-1 min-w-0 space-y-4">
          {saveMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              {saveMsg}
            </div>
          )}

          {/* Profile card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="font-semibold text-gray-900">Personal Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 text-xs text-white bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    <Check className="w-3.5 h-3.5" /> {saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => { setIsEditing(false); setName(user.name); setPhone(user.phone || ""); }}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="p-5">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                    <User className="w-3.5 h-3.5" /> Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm py-2.5">{name || "—"}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email Address
                  </label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 text-sm py-2.5">{user.email}</p>
                    <span className="text-xs text-gray-400">(cannot be changed)</span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                    <Phone className="w-3.5 h-3.5" /> Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm py-2.5">{phone || <span className="text-gray-400">Not provided</span>}</p>
                  )}
                </div>

                {/* Member since */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Member Since
                  </label>
                  <p className="text-gray-900 text-sm py-2.5">
                    {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Password card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <h2 className="font-semibold text-gray-900">Password</h2>
              </div>
              {!showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                >
                  Change password
                </button>
              )}
            </div>

            {showPasswordForm ? (
              <form onSubmit={handlePasswordChange} className="p-5 space-y-4">
                {passwordError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg text-xs flex items-center gap-2">
                    <X className="w-4 h-4" /> {passwordError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                        minLength={6}
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  >
                    {changingPassword ? "Changing…" : "Change Password"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowPasswordForm(false); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); setPasswordError(""); }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="px-5 py-4">
                <p className="text-sm text-gray-500">••••••••••••</p>
                <p className="text-xs text-gray-400 mt-1">Last changed: never</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
