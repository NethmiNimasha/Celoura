"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  X
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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "catalogue"
  const [orders, setOrders] = useState([]);
  const [designs, setDesigns] = useState([]);

  // Filter state for orders
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isAddDesignOpen, setIsAddDesignOpen] = useState(false);
  const [newDesign, setNewDesign] = useState({
    id: `CEL-DSG-0${Math.floor(7 + Math.random() * 90)}`,
    title: "",
    category: "Bridal Lehengas",
    price: 150000,
    priceFormatted: "LKR 150,000",
    image: "/images/hero-lehenga.jpg",
    fabric: "Raw Silk",
    color: "Black & Gold",
    embroidery: "Handcrafted Zardozi",
    featured: false,
    description: "",
  });

  useEffect(() => {
    setOrders(getSavedOrders());
    setDesigns(getSavedDesigns());
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
    if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
      setSelectedOrderDetails({ ...selectedOrderDetails, status: newStatus });
    }
  };

  const handleAddDesignSubmit = (e) => {
    e.preventDefault();
    if (!newDesign.title) return;

    const formattedDesign = {
      ...newDesign,
      priceFormatted: `LKR ${Number(newDesign.price).toLocaleString()}`,
    };

    const updatedDesigns = [formattedDesign, ...designs];
    setDesigns(updatedDesigns);
    saveDesigns(updatedDesigns);
    setIsAddDesignOpen(false);
    setNewDesign({
      id: `CEL-DSG-0${Math.floor(10 + Math.random() * 90)}`,
      title: "",
      category: "Bridal Lehengas",
      price: 150000,
      priceFormatted: "LKR 150,000",
      image: "/images/hero-lehenga.jpg",
      fabric: "Raw Silk",
      color: "Black & Gold",
      embroidery: "Handcrafted Zardozi",
      featured: false,
      description: "",
    });
  };

  const handleDeleteDesign = (id) => {
    if (window.confirm("Are you sure you want to remove this design from catalogue?")) {
      const updated = designs.filter((d) => d.id !== id);
      setDesigns(updated);
      saveDesigns(updated);
    }
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Admin Header Section */}
      <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-8 shadow-2xl mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("orders")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                activeTab === "orders"
                  ? "btn-gold text-black shadow-gold-sm"
                  : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white"
              }`}
            >
              Orders ({totalOrdersCount})
            </button>
            <button
              onClick={() => setActiveTab("catalogue")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                activeTab === "catalogue"
                  ? "btn-gold text-black shadow-gold-sm"
                  : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white"
              }`}
            >
              Catalogue ({designs.length})
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
                        <button
                          onClick={() => setSelectedOrderDetails(order)}
                          className="rounded-full border border-amber-500/30 bg-zinc-900 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 hover:border-amber-400 hover:text-white"
                        >
                          View Details
                        </button>
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
                  <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden mb-3 border border-zinc-800">
                    <Image src={design.image} alt={design.title} fill className="object-cover" />
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
                  <button
                    onClick={() => handleDeleteDesign(design.id)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
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

            {/* Quick Status Updater */}
            <div className="rounded-2xl border border-amber-500/20 bg-zinc-950 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-300 font-semibold">Change Order Status:</span>
              <div className="flex gap-2">
                {["Pending", "Confirmed", "In Progress", "Ready", "Completed"].map((s) => (
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW DESIGN (FR-10) */}
      {isAddDesignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsAddDesignOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700"
            >
              ✕
            </button>

            <h3 className="font-cinzel text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5 text-amber-400" />
              <span>Add New Fashion Design</span>
            </h3>

            <form onSubmit={handleAddDesignSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Design Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Jahanara Velvet Lehenga"
                  value={newDesign.title}
                  onChange={(e) => setNewDesign({ ...newDesign, title: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Category</label>
                  <select
                    value={newDesign.category}
                    onChange={(e) => setNewDesign({ ...newDesign, category: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Bridal Lehengas">Bridal Lehengas</option>
                    <option value="Royal Velvet">Royal Velvet</option>
                    <option value="Silk & Zari">Silk & Zari</option>
                    <option value="Contemporary Fusion">Contemporary Fusion</option>
                    <option value="Festive Pastel">Festive Pastel</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Starting Price (LKR) *</label>
                  <input
                    type="number"
                    required
                    value={newDesign.price}
                    onChange={(e) => setNewDesign({ ...newDesign, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Fabric</label>
                  <input
                    type="text"
                    value={newDesign.fabric}
                    onChange={(e) => setNewDesign({ ...newDesign, fabric: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Colour</label>
                  <input
                    type="text"
                    value={newDesign.color}
                    onChange={(e) => setNewDesign({ ...newDesign, color: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={newDesign.description}
                  onChange={(e) => setNewDesign({ ...newDesign, description: e.target.value })}
                  placeholder="Artisan craftsmanship details, embroidery, flare..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDesignOpen(false)}
                  className="btn-gold-outline rounded-full px-5 py-2 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold rounded-full px-6 py-2 font-bold uppercase tracking-wider text-black"
                >
                  Save Design
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
