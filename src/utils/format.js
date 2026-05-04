import clsx from "clsx";

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function orderStatusClass(status) {
  return clsx("badge", {
    "status-pending": status === "Pending",
    "status-shipped": status === "Shipped",
    "status-delivered": status === "Delivered",
  });
}
