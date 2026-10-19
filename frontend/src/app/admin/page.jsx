"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Crown, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Ruler, 
  Phone, 
  Mail, 
  Calendar, 
  Scissors, 
  TrendingUp, 
  Package, 
  Users,
  Sparkles,
  Save,
  X,
  LogOut,
  UploadCloud,
  ImageIcon,
  Camera,
  Loader2
} from "lucide-react";
import { 
  getSavedOrders, 
  saveOrders, 
  updateOrderStatus, 
  getSavedDesigns, 
  saveDesigns, 
  ORDER_STATUSES,
  BUSINESS_INFO
} from "../../lib/celouraData";
import { 
  getStoredUser, 
  logoutUser, 
  getAllOrdersApi, 
  updateOrderStatusApi, 
  deleteOrderApi,
  getAllDesignsApi,
  createDesignApi,
  updateDesignApi,
  deleteDesignApi 
} from "../../lib/api";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "catalogue"
  const [orders, setOrders] = useState([]);
  const [designs, setDesigns] = useState([]);

  // Filter state for orders
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  
  // Add Design State
  const [isAddDesignOpen, setIsAddDesignOpen] = useState(false);
  const [designImagePreview, setDesignImagePreview] = useState(null);
  const [isSubmittingDesign, setIsSubmittingDesign] = useState(false);
  const designFileInputRef = React.useRef(null);

  // Edit Design State
  const [editingDesign, setEditingDesign] = useState(null);
  const [isEditDesignOpen, setIsEditDesignOpen] = useState(false);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [isUpdatingDesign, setIsUpdatingDesign] = useState(false);
  const editFileInputRef = React.useRef(null);

  const [newDesign, setNewDesign] = useState({
    id: `CEL-DSG-${Math.floor(10 + Math.random() * 90)}`,
    title: "",
    category: "Bridal Lehengas",
    price: 150000,
    priceFormatted: "LKR 150,000",
    image: "/images/hero-lehenga.jpg",
    fabric: "Raw Silk",
    color: "Black & Gold",
    embroidery: "Handcrafted Antique Gold Zardozi",
    silhouette: "Circular Flared (6-Meter Gher)",
    featured: true,
    customizable: true,
    description: "",
  });

  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (!user || user.role !== "ROLE_ADMIN") {
      router.push("/signin?role=admin");
      return;
    }
    setAuthChecked(true);
    setOrders(getSavedOrders());
    setDesigns(getSavedDesigns());

    // Fetch live orders from Spring Boot Backend
    getAllOrdersApi()
      .then((remoteOrders) => {
        if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
          setOrders(remoteOrders);
          saveOrders(remoteOrders);
        }
      })
      .catch((err) => {
        console.warn("Could not load backend orders for admin, using local fallback:", err);
      });

    // Fetch live designs from Spring Boot Backend and auto-sync any pending local designs
    getAllDesignsApi()
      .then((remoteDesigns) => {
        if (Array.isArray(remoteDesigns) && remoteDesigns.length > 0) {
          const localDesigns = getSavedDesigns();
          const missingInRemote = localDesigns.filter(
            (ld) => !remoteDesigns.some((rd) => rd.id === ld.id)
          );

          if (missingInRemote.length > 0) {
            // Push any pending local designs (like CEL-DSG-44) directly to PostgreSQL
            Promise.all(missingInRemote.map((d) => createDesignApi(d).catch(() => null)))
              .then(() => {
                getAllDesignsApi().then((refreshed) => {
                  if (Array.isArray(refreshed) && refreshed.length > 0) {
                    setDesigns(refreshed);
                    saveDesigns(refreshed);
                  }
                });
              });
            const merged = [...missingInRemote, ...remoteDesigns];
            setDesigns(merged);
            saveDesigns(merged);
          } else {
            setDesigns(remoteDesigns);
            saveDesigns(remoteDesigns);
          }
        }
      })
      .catch((err) => {
        console.warn("Could not load backend designs for admin, using local fallback:", err);
      });
  }, [router]);

  const handleAdminSignOut = () => {
    logoutUser();
    router.push("/signin?role=admin");
  };

  const handleDesignImageUpload = (file) => {
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDesignImagePreview(reader.result);
      setNewDesign((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
    if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
      setSelectedOrderDetails({ ...selectedOrderDetails, status: newStatus });
    }

    // Persist status change to Spring Boot Backend
    try {
      await updateOrderStatusApi(orderId, newStatus);
    } catch (err) {
      console.warn("Backend order status update failed:", err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to permanently delete order ${orderId}?`)) return;
    const remaining = orders.filter((o) => o.id !== orderId);
    setOrders(remaining);
    saveOrders(remaining);
    if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
      setSelectedOrderDetails(null);
    }

    try {
      await deleteOrderApi(orderId);
    } catch (err) {
      console.warn("Backend delete order failed:", err);
    }
  };

  const handleAddDesignSubmit = async (e) => {
    e.preventDefault();
    if (!newDesign.title) return;

    setIsSubmittingDesign(true);
    const finalImage = designImagePreview || newDesign.image || "/images/hero-model.jpg";
    const formattedDesign = {
      ...newDesign,
      id: newDesign.id || `CEL-DSG-${Math.floor(10 + Math.random() * 90)}`,
      image: finalImage,
      priceFormatted: `LKR ${Number(newDesign.price).toLocaleString()}`,
    };

    // Optimistically update locally
    const updatedDesigns = [formattedDesign, ...designs];
    setDesigns(updatedDesigns);
    saveDesigns(updatedDesigns);

    // Save to Spring Boot PostgreSQL backend
    try {
      await createDesignApi(formattedDesign);
    } catch (err) {
      console.warn("Backend design save warning:", err);
    }

    setIsSubmittingDesign(false);
    setIsAddDesignOpen(false);
    setDesignImagePreview(null);
    setNewDesign({
      id: `CEL-DSG-${Math.floor(10 + Math.random() * 90)}`,
      title: "",
      category: "Bridal Lehengas",
      price: 150000,
      priceFormatted: "LKR 150,000",
      image: "/images/hero-lehenga.jpg",
      fabric: "Pure Raw Silk & Zari",
      color: "Black & Gold",
      embroidery: "Handcrafted Antique Gold Zardozi",
      silhouette: "Circular Flared (6-Meter Gher)",
      featured: true,
      customizable: true,
      description: "",
    });
  };

  const handleDeleteDesign = async (id) => {
    if (!window.confirm("Are you sure you want to remove this design from catalogue?")) return;
    const updated = designs.filter((d) => d.id !== id);
    setDesigns(updated);
    saveDesigns(updated);

    try {
      await deleteDesignApi(id);
    } catch (err) {
      console.warn("Backend delete design failed:", err);
    }
  };

  const handleOpenEditDesign = (design) => {
    setEditingDesign({ ...design });
    setEditImagePreview(design.image);
    setIsEditDesignOpen(true);
  };

  const handleEditDesignImageUpload = (file) => {
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setEditImagePreview(reader.result);
      setEditingDesign((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateDesignSubmit = async (e) => {
    e.preventDefault();
    if (!editingDesign || !editingDesign.title) return;

    setIsUpdatingDesign(true);
    const finalImage = editImagePreview || editingDesign.image || "/images/hero-model.jpg";
    const formattedDesign = {
      ...editingDesign,
      image: finalImage,
      priceFormatted: `LKR ${Number(editingDesign.price).toLocaleString()}`,
    };

    // Optimistically update local list
    const updatedDesigns = designs.map((d) => 
      d.id === formattedDesign.id ? formattedDesign : d
    );
    setDesigns(updatedDesigns);
    saveDesigns(updatedDesigns);

    // Save update to Spring Boot PostgreSQL backend
    try {
      await updateDesignApi(formattedDesign.id, formattedDesign);
    } catch (err) {
      console.warn("Backend updateDesign warning:", err);
    }

    setIsUpdatingDesign(false);
    setIsEditDesignOpen(false);
    setEditingDesign(null);
    setEditImagePreview(null);
  };


  // Metrics
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const inProgressCount = orders.filter((o) => o.status === "In Progress").length;
  const readyCount = orders.filter((o) => o.status === "Ready").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.designTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <ShieldCheck className="h-10 w-10 text-amber-400 animate-pulse" />
        <p className="font-cinzel text-xs uppercase tracking-widest text-amber-300">
          Verifying Master Atelier Admin Credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Admin Header Section */}
      <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-8 shadow-2xl mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full border-2 border-amber-400/50 bg-black/90 p-0.5 shadow-gold-md overflow-hidden">
              <Image
                src="/logo.png"
                alt="Celoura Fashion Logo"
                width={80}
                height={80}
                className="h-full w-full object-cover rounded-full"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>Celoura Fashion Management</span>
              </div>
              <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-white">
                Administrator Atelier Portal
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Review incoming custom dress orders, assign tailors, adjust status, and maintain the fashion catalogue.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab("orders")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "orders"
                  ? "btn-gold text-black shadow-gold-sm"
                  : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white"
              }`}
            >
              Orders ({totalOrdersCount})
            </button>
            <button
              onClick={() => setActiveTab("catalogue")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "catalogue"
                  ? "btn-gold text-black shadow-gold-sm"
                  : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white"
              }`}
            >
              Catalogue ({designs.length})
            </button>
            <button
              onClick={handleAdminSignOut}
              className="btn-gold-outline rounded-full px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-400 flex items-center gap-1.5 cursor-pointer transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8 pt-8 border-t border-zinc-800">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 block">Total Requests</span>
            <p className="font-cinzel text-2xl font-black text-white mt-1">{totalOrdersCount}</p>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
            <span className="text-[11px] uppercase tracking-wider text-amber-300 block">Pending Review</span>
            <p className="font-cinzel text-2xl font-black text-amber-400 mt-1">{pendingCount}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <span className="text-[11px] uppercase tracking-wider text-blue-400 block">In Tailoring</span>
            <p className="font-cinzel text-2xl font-black text-blue-300 mt-1">{inProgressCount}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 block">Ready / Fitting</span>
            <p className="font-cinzel text-2xl font-black text-emerald-300 mt-1">{readyCount}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 col-span-2 lg:col-span-1">
            <span className="text-[11px] uppercase tracking-wider text-amber-300 block">Revenue Pipeline</span>
            <p className="font-cinzel text-lg font-black text-amber-300 mt-1 truncate">
              LKR {(totalRevenue / 1000).toFixed(0)}k
            </p>
          </div>
        </div>
      </div>

      {/* TAB 1: ORDER MANAGEMENT (FR-08) */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between rounded-2xl border border-zinc-800 bg-[#0e0e14] p-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search orders by customer or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {["All", "Pending", "Confirmed", "In Progress", "Ready", "Completed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    statusFilter === st
                      ? "bg-amber-400 text-black font-bold shadow-gold-sm"
                      : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto rounded-3xl border border-amber-500/20 bg-[#0b0b10] shadow-xl">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="border-b border-zinc-800 bg-zinc-950 text-[11px] uppercase tracking-wider text-amber-300/90 font-cinzel">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Design & Details</th>
                  <th className="px-6 py-4">Event Date</th>
                  <th className="px-6 py-4">Quote</th>
                  <th className="px-6 py-4">Status & Update</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-sans">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                      No customer orders match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-900/40 transition">
                      <td className="px-6 py-4 font-cinzel font-bold text-amber-400">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">
                        <strong className="text-white block">{order.customerName}</strong>
                        <span className="text-[11px] text-zinc-400">{order.customerPhone}</span>
                      </td>
                      <td className="px-6 py-4">
                        <strong className="text-zinc-200 block truncate max-w-xs">{order.designTitle}</strong>
                        <span className="text-[11px] text-zinc-400">
                          {order.colour} • {order.fabric}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {order.eventDate || "Not specified"}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        LKR {order.totalAmount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                            order.status === "Pending"
                              ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                              : order.status === "Confirmed"
                              ? "border-blue-400/60 bg-blue-400/10 text-blue-300"
                              : order.status === "In Progress"
                              ? "border-purple-400/60 bg-purple-400/10 text-purple-300"
                              : order.status === "Ready"
                              ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                              : order.status === "Completed"
                              ? "border-zinc-700 bg-zinc-900 text-zinc-400"
                              : "border-red-500/60 bg-red-500/10 text-red-300"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Ready">Ready</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="rounded-full border border-amber-500/30 bg-zinc-900 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 hover:border-amber-400 hover:text-white"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            title="Delete Order"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CATALOGUE MANAGEMENT (FR-10) */}
      {activeTab === "catalogue" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#0e0e14] p-4">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">Haute Design Catalogue</h3>
              <p className="text-xs text-zinc-400">Add, edit, or remove fashion designs showcased to clients.</p>
            </div>
            <button
              onClick={() => setIsAddDesignOpen(true)}
              className="btn-gold rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Design</span>
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {designs.map((design) => (
              <div key={design.id} className="card-luxury p-5 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden mb-3 border border-zinc-800 bg-black">
                    <img src={design.image} alt={design.title} className="h-full w-full object-cover" />
                    <span className="absolute top-2 left-2 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
                      {design.category}
                    </span>
                  </div>
                  <h4 className="font-cinzel text-base font-bold text-white truncate">{design.title}</h4>
                  <p className="text-xs font-bold text-amber-400 mt-1">{design.priceFormatted}</p>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{design.description}</p>
                  <div className="mt-3 text-[11px] text-zinc-400 space-y-1">
                    <p><strong>Fabric:</strong> {design.fabric}</p>
                    <p><strong>Embroidery:</strong> {design.embroidery}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between mt-4">
                  <span className="text-[11px] text-zinc-500 font-mono">{design.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditDesign(design)}
                      className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/20 hover:text-amber-200 transition flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDesign(design.id)}
                      className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ORDER DETAILS (FR-08) */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <h3 className="font-cinzel text-2xl font-black text-amber-400">
                {selectedOrderDetails.id}
              </h3>
              <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                {selectedOrderDetails.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6 text-xs text-zinc-300">
              <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <span className="font-bold text-amber-300 block mb-2 uppercase tracking-wider">Customer Details</span>
                <p><strong>Name:</strong> {selectedOrderDetails.customerName}</p>
                <p><strong>Phone:</strong> {selectedOrderDetails.customerPhone}</p>
                <p><strong>Email:</strong> {selectedOrderDetails.customerEmail}</p>
                <p><strong>Event Date:</strong> {selectedOrderDetails.eventDate}</p>
              </div>

              <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <span className="font-bold text-amber-300 block mb-2 uppercase tracking-wider">Garment Choice</span>
                <p><strong>Design:</strong> {selectedOrderDetails.designTitle}</p>
                <p><strong>Silhouette:</strong> {selectedOrderDetails.silhouette}</p>
                <p><strong>Colour:</strong> {selectedOrderDetails.colour}</p>
                <p><strong>Fabric:</strong> {selectedOrderDetails.fabric}</p>
                <p><strong>Quote Total:</strong> LKR {selectedOrderDetails.totalAmount?.toLocaleString()}</p>
              </div>
            </div>

            {/* Custom Design Image Reference if attached */}
            {(selectedOrderDetails.designImage || selectedOrderDetails.customReferenceImage) && (
              <div className="rounded-2xl border border-amber-500/30 bg-zinc-950 p-4 mb-6">
                <span className="font-bold text-amber-300 block mb-2 text-xs uppercase tracking-wider">
                  Attached Design Reference Photo
                </span>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative aspect-[4/3] w-48 shrink-0 rounded-xl overflow-hidden border border-amber-400/50 shadow-gold-sm bg-black">
                    <img
                      src={selectedOrderDetails.customReferenceImage || selectedOrderDetails.designImage}
                      alt="Custom Design Reference"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-zinc-300 space-y-1">
                    <p><strong className="text-white">Design Style:</strong> {selectedOrderDetails.designTitle}</p>
                    {selectedOrderDetails.customDesignNotes && (
                      <p><strong className="text-white">Client Notes:</strong> {selectedOrderDetails.customDesignNotes}</p>
                    )}
                    <span className="inline-block text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-500/30 mt-1">
                      {selectedOrderDetails.isCustomDesign ? "Custom Client Upload" : "Catalogue Foundation"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Measurements Section */}
            {selectedOrderDetails.measurements && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 mb-6">
                <span className="font-bold text-amber-300 block mb-3 text-xs uppercase tracking-wider">
                  Client Measurements ({selectedOrderDetails.measurements.unit || "inches"})
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-xs">
                  {Object.entries(selectedOrderDetails.measurements).map(([k, v]) => {
                    if (k === "unit" || !v) return null;
                    return (
                      <div key={k} className="rounded-xl bg-zinc-900 p-2.5">
                        <span className="text-[10px] uppercase text-zinc-400 block">{k}</span>
                        <strong className="text-white text-sm">{v}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Status Updater & Actions */}
            <div className="rounded-2xl border border-amber-500/20 bg-zinc-950 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-300 font-semibold">Change Order Status:</span>
              <div className="flex flex-wrap gap-2 items-center">
                {["Pending", "Confirmed", "In Progress", "Ready", "Completed", "Cancelled"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(selectedOrderDetails.id, s)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      selectedOrderDetails.status === s
                        ? "bg-amber-400 text-black shadow-gold-sm"
                        : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => handleDeleteOrder(selectedOrderDetails.id)}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition flex items-center gap-1 ml-2"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW DESIGN (FR-10) */}
      {isAddDesignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => {
                setIsAddDesignOpen(false);
                setDesignImagePreview(null);
              }}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 transition"
            >
              ✕
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-semibold text-amber-300 uppercase tracking-widest mb-2">
                <Crown className="h-3 w-3 text-amber-400" />
                <span>Atelier Fashion Creator</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-amber-400" />
                <span>Add Haute Design to Catalogue</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                New designs will immediately become available in the catalogue and for clients ordering bespoke fittings.
              </p>
            </div>

            <form onSubmit={handleAddDesignSubmit} className="space-y-4 text-xs">
              {/* Image Upload & Preview Section */}
              <div>
                <label className="text-zinc-300 block mb-1.5 font-medium flex items-center justify-between">
                  <span>Garment Photo *</span>
                  <span className="text-[11px] text-amber-400">Custom Photo or High-Res Preset</span>
                </label>

                <input
                  type="file"
                  ref={designFileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleDesignImageUpload(e.target.files?.[0])}
                />

                {designImagePreview ? (
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-black shadow-gold-sm mb-3">
                    <img
                      src={designImagePreview}
                      alt="New Design Preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => designFileInputRef.current?.click()}
                        className="rounded-full bg-black/80 px-3 py-1.5 text-[11px] font-semibold text-amber-300 border border-amber-400/50 hover:bg-black"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setDesignImagePreview(null)}
                        className="rounded-full bg-red-900/80 px-3 py-1.5 text-[11px] font-semibold text-red-200 border border-red-500/50 hover:bg-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => designFileInputRef.current?.click()}
                    className="border-2 border-dashed border-zinc-700 hover:border-amber-400 rounded-2xl p-6 text-center cursor-pointer transition bg-zinc-950/60 hover:bg-zinc-900/60 group mb-3"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 group-hover:scale-110 transition">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-white">
                      Click to upload garment photograph
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Supports JPG, PNG, WEBP from your computer
                    </p>
                  </div>
                )}

                {/* Quick Presets Picker */}
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-1.5">Or choose an atelier studio preset:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Gold Frock", img: "/images/frock-evening.jpg" },
                      { name: "Bridal Blouse", img: "/images/saree-blouse.jpg" },
                      { name: "Flared Skirt", img: "/images/skirt-flare.jpg" },
                      { name: "Ivory Dream", img: "/images/ivory-dream.jpg" },
                      { name: "Wine Velvet", img: "/images/wine-elegance.jpg" },
                      { name: "Rose Saree", img: "/images/saree-pink.jpg" },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setDesignImagePreview(preset.img);
                          setNewDesign((prev) => ({ ...prev, image: preset.img }));
                        }}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] transition ${
                          designImagePreview === preset.img
                            ? "border-amber-400 bg-amber-400/20 text-amber-300 font-bold"
                            : "border-zinc-800 bg-zinc-900/70 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design Title */}
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Design Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Jahanara Velvet Lehenga"
                  value={newDesign.title}
                  onChange={(e) => setNewDesign({ ...newDesign, title: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Category *</label>
                  <select
                    value={newDesign.category}
                    onChange={(e) => setNewDesign({ ...newDesign, category: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Bridal Lehengas">Bridal Lehengas</option>
                    <option value="Frocks & Gowns">Frocks & Gowns</option>
                    <option value="Saree Blouses">Saree Blouses</option>
                    <option value="Designer Skirts">Designer Skirts</option>
                    <option value="Couture Blouses">Couture Blouses</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Starting Price (LKR) *</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={newDesign.price}
                    onChange={(e) => setNewDesign({ ...newDesign, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Silhouette & Embroidery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Silhouette</label>
                  <select
                    value={newDesign.silhouette}
                    onChange={(e) => setNewDesign({ ...newDesign, silhouette: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Circular Flared (6-Meter Gher)">Circular Flared (6-Meter Gher)</option>
                    <option value="Heavy A-Line Flare with Triple Can-Can">Heavy A-Line Flare with Triple Can-Can</option>
                    <option value="Flared Trail Skirt with Structured Waist">Flared Trail Skirt with Structured Waist</option>
                    <option value="Princess Cut Bridal Blouse">Princess Cut Bridal Blouse</option>
                    <option value="A-Line Flared Frock">A-Line Flared Frock</option>
                    <option value="Paneled Fluted Mermaid">Paneled Fluted Mermaid</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Embroidery Style</label>
                  <input
                    type="text"
                    value={newDesign.embroidery}
                    onChange={(e) => setNewDesign({ ...newDesign, embroidery: e.target.value })}
                    placeholder="e.g. Handcrafted Antique Gold Zardozi & Dabka"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Fabric & Colour */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Fabric Type</label>
                  <input
                    type="text"
                    value={newDesign.fabric}
                    onChange={(e) => setNewDesign({ ...newDesign, fabric: e.target.value })}
                    placeholder="e.g. Pure Raw Silk & Italian Velvet"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Colour</label>
                  <input
                    type="text"
                    value={newDesign.color}
                    onChange={(e) => setNewDesign({ ...newDesign, color: e.target.value })}
                    placeholder="e.g. Obsidian Black & Imperial Gold"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Couture Description</label>
                <textarea
                  rows={3}
                  value={newDesign.description}
                  onChange={(e) => setNewDesign({ ...newDesign, description: e.target.value })}
                  placeholder="Artisan craftsmanship details, embroidery motifs, fitting recommendations..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddDesignOpen(false);
                    setDesignImagePreview(null);
                  }}
                  className="btn-gold-outline rounded-full px-5 py-2 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingDesign}
                  className="btn-gold rounded-full px-7 py-2.5 font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm disabled:opacity-60"
                >
                  {isSubmittingDesign ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                      <span>Saving to Catalogue...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Publish Design</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DESIGN */}
      {isEditDesignOpen && editingDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => {
                setIsEditDesignOpen(false);
                setEditingDesign(null);
                setEditImagePreview(null);
              }}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 transition"
            >
              ✕
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-semibold text-amber-300 uppercase tracking-widest mb-2">
                <Crown className="h-3 w-3 text-amber-400" />
                <span>Atelier Fashion Editor &bull; {editingDesign.id}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-amber-400" />
                <span>Edit Design Details</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Update couture specifications, photo, pricing, and descriptions for this design.
              </p>
            </div>

            <form onSubmit={handleUpdateDesignSubmit} className="space-y-4 text-xs">
              {/* Image Upload & Preview Section */}
              <div>
                <label className="text-zinc-300 block mb-1.5 font-medium flex items-center justify-between">
                  <span>Garment Photo *</span>
                  <span className="text-[11px] text-amber-400">Custom Photo or High-Res Preset</span>
                </label>

                <input
                  type="file"
                  ref={editFileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleEditDesignImageUpload(e.target.files?.[0])}
                />

                {editImagePreview ? (
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-black shadow-gold-sm mb-3">
                    <img
                      src={editImagePreview}
                      alt="Edit Design Preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="rounded-full bg-black/80 px-3 py-1.5 text-[11px] font-semibold text-amber-300 border border-amber-400/50 hover:bg-black"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditImagePreview(null);
                          setEditingDesign((prev) => ({ ...prev, image: "" }));
                        }}
                        className="rounded-full bg-red-900/80 px-3 py-1.5 text-[11px] font-semibold text-red-200 border border-red-500/50 hover:bg-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => editFileInputRef.current?.click()}
                    className="border-2 border-dashed border-zinc-700 hover:border-amber-400 rounded-2xl p-6 text-center cursor-pointer transition bg-zinc-950/60 hover:bg-zinc-900/60 group mb-3"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 group-hover:scale-110 transition">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-white">
                      Click to upload new garment photograph
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Supports JPG, PNG, WEBP from your computer
                    </p>
                  </div>
                )}

                {/* Quick Presets Picker */}
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-1.5">Or choose an atelier studio preset:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Gold Frock", img: "/images/frock-evening.jpg" },
                      { name: "Bridal Blouse", img: "/images/saree-blouse.jpg" },
                      { name: "Flared Skirt", img: "/images/skirt-flare.jpg" },
                      { name: "Ivory Dream", img: "/images/ivory-dream.jpg" },
                      { name: "Wine Velvet", img: "/images/wine-elegance.jpg" },
                      { name: "Rose Saree", img: "/images/saree-pink.jpg" },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setEditImagePreview(preset.img);
                          setEditingDesign((prev) => ({ ...prev, image: preset.img }));
                        }}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] transition ${
                          editImagePreview === preset.img
                            ? "border-amber-400 bg-amber-400/20 text-amber-300 font-bold"
                            : "border-zinc-800 bg-zinc-900/70 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design Title */}
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Design Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Jahanara Velvet Lehenga"
                  value={editingDesign.title || ""}
                  onChange={(e) => setEditingDesign({ ...editingDesign, title: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Category *</label>
                  <select
                    value={editingDesign.category || "Bridal Lehengas"}
                    onChange={(e) => setEditingDesign({ ...editingDesign, category: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Bridal Lehengas">Bridal Lehengas</option>
                    <option value="Frocks & Gowns">Frocks & Gowns</option>
                    <option value="Saree Blouses">Saree Blouses</option>
                    <option value="Designer Skirts">Designer Skirts</option>
                    <option value="Couture Blouses">Couture Blouses</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Starting Price (LKR) *</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={editingDesign.price || 0}
                    onChange={(e) => setEditingDesign({ ...editingDesign, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Silhouette & Embroidery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Silhouette</label>
                  <select
                    value={editingDesign.silhouette || "Circular Flared (6-Meter Gher)"}
                    onChange={(e) => setEditingDesign({ ...editingDesign, silhouette: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Circular Flared (6-Meter Gher)">Circular Flared (6-Meter Gher)</option>
                    <option value="Heavy A-Line Flare with Triple Can-Can">Heavy A-Line Flare with Triple Can-Can</option>
                    <option value="Flared Trail Skirt with Structured Waist">Flared Trail Skirt with Structured Waist</option>
                    <option value="Princess Cut Bridal Blouse">Princess Cut Bridal Blouse</option>
                    <option value="A-Line Flared Frock">A-Line Flared Frock</option>
                    <option value="Paneled Fluted Mermaid">Paneled Fluted Mermaid</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Embroidery Style</label>
                  <input
                    type="text"
                    value={editingDesign.embroidery || ""}
                    onChange={(e) => setEditingDesign({ ...editingDesign, embroidery: e.target.value })}
                    placeholder="e.g. Handcrafted Antique Gold Zardozi & Dabka"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Fabric & Colour */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Fabric Type</label>
                  <input
                    type="text"
                    value={editingDesign.fabric || ""}
                    onChange={(e) => setEditingDesign({ ...editingDesign, fabric: e.target.value })}
                    placeholder="e.g. Pure Raw Silk & Italian Velvet"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Colour</label>
                  <input
                    type="text"
                    value={editingDesign.color || ""}
                    onChange={(e) => setEditingDesign({ ...editingDesign, color: e.target.value })}
                    placeholder="e.g. Obsidian Black & Imperial Gold"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Couture Description</label>
                <textarea
                  rows={3}
                  value={editingDesign.description || ""}
                  onChange={(e) => setEditingDesign({ ...editingDesign, description: e.target.value })}
                  placeholder="Artisan craftsmanship details, embroidery motifs, fitting recommendations..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditDesignOpen(false);
                    setEditingDesign(null);
                    setEditImagePreview(null);
                  }}
                  className="btn-gold-outline rounded-full px-5 py-2 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingDesign}
                  className="btn-gold rounded-full px-7 py-2.5 font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm disabled:opacity-60"
                >
                  {isUpdatingDesign ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                      <span>Updating Design...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Update Design</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

