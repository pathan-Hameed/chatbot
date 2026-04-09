export const cn = (...classes) => classes.filter(Boolean).join(" ")

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))

export const formatCurrency = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amount)

export const truncate = (str, length = 100) =>
  str.length > length ? str.substring(0, length) + "..." : str

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)