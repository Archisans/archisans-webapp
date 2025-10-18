// NotificationData.js
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const allNotifications = [
  {
    img: (theme) => <InfoOutlinedIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Archisans",
    subheading: "Renew Subscription.",
    datetime: "9:00 am",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Booking Confirmed",
    subheading: "Jane has confirmed your booking request.",
    datetime: "8:00 am",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Booking Rejected",
    subheading: "Jane has rejected your booking request.",
    datetime: "7:00 am",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Work Completed",
    subheading: "The job by Jane has been completed. Please review.",
    datetime: "12-03-2025",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Cancelled by User",
    subheading: "You cancelled the booking with Elanor.",
    datetime: "12-03-2025",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Cancelled by Worker",
    subheading: "Jane cancelled your booking request.",
    datetime: "12-03-2025",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Payment Requested",
    subheading: "Jane has requested payment for the completed work.",
    datetime: "12-03-2025",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Payment Completed",
    subheading: "You have completed the payment for booking #6754.",
    datetime: "12-03-2025",
  },
  {
    img: (theme) => <InfoOutlinedIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Archisans",
    subheading: "Renew Subscription.",
    datetime: "9:00 am",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Booking Confirmed",
    subheading: "Jane has confirmed your booking request.",
    datetime: "8:00 am",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Booking Rejected",
    subheading: "Jane has rejected your booking request.",
    datetime: "7:00 am",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Work Completed",
    subheading: "The job by Jane has been completed. Please review.",
    datetime: "12-03-2025",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Cancelled by User",
    subheading: "You cancelled the booking with Elanor.",
    datetime: "12-03-2025",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Cancelled by Worker",
    subheading: "Jane cancelled your booking request.",
    datetime: "12-03-2025",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Payment Requested",
    subheading: "Jane has requested payment for the completed work.",
    datetime: "12-03-2025",
  },
  {
    img: (theme) => <NotificationsNoneIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Payment Completed",
    subheading: "You have completed the payment for booking #6754.",
    datetime: "12-03-2025",
  }
];

export const bookingNotifications = allNotifications.filter(
  (n) =>
    [
      "Booking Confirmeddd",
      "Booking Rejected",
      "Work Completed",
      "Cancelled by User",
      "Cancelled by Worker",
      "Payment Requested",
      "Payment Completed",
    ].includes(n.heading)
);

export const systemNotifications = [
  {
    img: (theme) => <InfoOutlinedIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Archisans",
    subheading: "Renew Subscription.",
    datetime: "9:00 am",
  },
  {
    img: (theme) => <InfoOutlinedIcon sx={{ color: theme.palette.primary.main }} />,
    heading: "Password Updated Successfully.",
    subheading: "Your password has been updated successfully.",
    datetime: "8:00 am",
  },
];
